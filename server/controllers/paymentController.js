   
  import Stripe from "stripe";

// Config stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   
 
   
   export const creatCheckout  = async (req, res, next) => {
    try {
        const { cartItems} = req.body;

console.log(cartItems);
        const lineItems = cartItems?.map((items)=> ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: items.foodItems.name,
                    images: [items.foodItems.image],
                },
                unit_amount: Math.round(items.foodItems.price * 100),
            },
            quantity: items.foodItems.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: 'http://localhost:5173/user/payment/success',
            cancel_url: 'http://localhost:5173/user/payment/cancel',
        });

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};
   export const sectionStatus   =   async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "internal server error");
    }
};
