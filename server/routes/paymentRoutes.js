import express from 'express';
import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route: Create Stripe Checkout Session
router.post('/create-checkout-session', authUser, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items provided for payment.' });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.food.name,
          description: item.food.description,
        },
        unit_amount: Math.round(item.food.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: { userId: req.user._id },
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route: Handle Stripe Webhook Events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).json({ success: false, message: `Webhook error: ${error.message}` });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // Mark order as paid
      const userId = session.metadata.userId;
      const order = new Order({
        user: userId,
        items: session.display_items.map((item) => ({
          food: item.custom.name,
          quantity: item.quantity,
        })),
        totalPrice: session.amount_total / 100,
        paymentMethod: 'Stripe',
        isPaid: true,
        status: 'Paid',
      });

      await order.save();

      // Clear user's cart
      await Cart.findOneAndUpdate({ user: userId }, { items: [], totalPrice: 0 });

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

// Route: Success Payment
router.get('/payment-success', authUser, async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: 'Session ID not provided.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      res.status(200).json({ success: true, message: 'Payment successful.', session });
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route: Cancel Payment
router.get('/payment-cancel', (req, res) => {
  res.status(200).json({ success: false, message: 'Payment canceled.' });
});

export default router;
