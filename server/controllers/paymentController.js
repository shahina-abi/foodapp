
  import Stripe from "stripe";

// Config stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   
 console.log(process.env.STRIPE_SECRET_KEY);export const creatCheckout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.foodItem.name,
          images: [item.foodItem.image],
        },
        unit_amount: Math.round(item.foodItem.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/user/payment/success",
      cancel_url: "http://localhost:5173/user/payment/cancel",
    });

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

   
//   
// export const creatCheckout = async (req, res, next) => {
//     try {
//         const { cartItems } = req.body;

//         // Ensure cartItems is properly structured
//         const lineItems = cartItems.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.foodItem.name,
//                     images: [item.foodItem.image],
//                 },
//                 unit_amount: Math.round(item.foodItem.price * 100),
//             },
//             quantity: item.quantity, // Ensure quantity is sent directly
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: 'http://localhost:5173/user/payment/success',
//             cancel_url: 'http://localhost:5173/user/payment/cancel',
//         });

//         res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//         res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
//     }
// };
// export const creatCheckout = async (req, res, next) => {
//     try {
//         const { cartItems, discount } = req.body;

//         const lineItems = cartItems.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.foodItem.name,
//                     images: [item.foodItem.image],
//                 },
//                 unit_amount: Math.round(item.foodItem.price * 100),
//             },
//             quantity: item.quantity,
//         }));

//         const totalAmount = lineItems.reduce(
//             (total, item) => total + item.price_data.unit_amount * item.quantity,
//             0
//         );

//         const discountedAmount = Math.max(0, totalAmount - discount);

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:5173/user/payment/success",
//             cancel_url: "http://localhost:5173/user/payment/cancel",
//         });

//         res.json({ success: true, sessionId: session.id, amountDue: discountedAmount });
//     } catch (error) {
//         res.status(500).json({ error: error.message || "Internal Server Error" });
//     }
// };

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
