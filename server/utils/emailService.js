
import nodemailer from "nodemailer";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or App Password (if using Gmail)
  },
});

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Food Ordering App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html, // HTML content for email
    });
    console.log("Order confirmation email sent successfully to:", to);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export default sendEmail;
