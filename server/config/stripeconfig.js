import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Stripe secret key is missing. Please check your .env file.");
  process.exit(1); // Exit if the key is missing
}

// Test Stripe connectivity
const testStripe = async () => {
  try {
    const balance = await stripe.balance.retrieve();
    console.log("Stripe Balance:", balance);
  } catch (error) {
    console.error("Stripe Connection Error:", error.message);
  }
};

// Run the testStripe function when this file is loaded
testStripe();

// Export the Stripe instance for use in other parts of the application
export default stripe;
