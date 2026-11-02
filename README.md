# FoodBae Food Ordering Platform

FoodBae is a restaurant ordering application with a customer-facing storefront and a separate admin portal. Customers can browse restaurants and menus, manage a cart, pay through Stripe Checkout, and review order status. Admins can manage restaurant menus, orders, users, and coupons.

## Highlights

- Browse restaurants and filter menu items.
- Register and sign in as a customer or administrator.
- Add menu items to a server-backed cart, update quantities, and remove items.
- Apply coupons and pay with Stripe Checkout.
- View order history, payment confirmation, and order progress.
- Admin tools for restaurants, food items, orders, users, coupons, and dashboard analytics.
- Store uploaded restaurant and food images with Cloudinary.
- Send order-related email through Nodemailer and Gmail SMTP.

## Tech Stack

| Area                 | Technologies                                             |
| -------------------- | -------------------------------------------------------- |
| Frontend             | React 18, Vite, React Router, Redux Toolkit              |
| UI and styling       | Tailwind CSS, DaisyUI, React Icons, Font Awesome, Lucide |
| Charts and animation | Chart.js, Recharts, Framer Motion, GSAP, Swiper, Lenis   |
| API client and forms | Axios, React Hook Form                                   |
| Backend              | Node.js, Express 4, ES modules                           |
| Database             | MongoDB with Mongoose                                    |
| Authentication       | JSON Web Tokens, bcrypt, HTTP cookies                    |
| Payments             | Stripe Checkout and Stripe.js                            |
| Image storage        | Cloudinary and Multer                                    |
| Email                | Nodemailer with Gmail                                    |
| Hosting              | Vercel (separate client and server projects)             |

## Repository Layout

```text
client/   React/Vite storefront and admin portal
server/   Express API, MongoDB models, authentication, and integrations
uploads/  Local upload directory used by the server configuration
```

The API is mounted under `/api`. Main route groups are `/user`, `/admin`, `/restaurants`, `/foods`, `/cart`, `/orders`, `/payment`, `/coupons`, and `/reviews`.

## Requirements

- Node.js 20 or later
- npm
- A MongoDB database, such as MongoDB Atlas
- Stripe API keys for checkout
- Cloudinary credentials for image uploads
- Gmail credentials or an app password if order email is enabled

## Local Development

Install and start the API in one terminal:

```bash
cd server
npm install
npm run dev
```

The API listens on port `3002` by default. Start the frontend in a second terminal:

```bash
cd client
npm install
npm run dev
```

Vite normally serves the client at `http://localhost:5173`. If that port is in use, Vite may choose another port; the API currently allows local origins on ports `5173` and `5174`.

## Environment Variables

Create `server/.env` for server-only settings:

```env
PORT=3002
MONGO_URI=<MongoDB connection string>
JWT_SECRET_KEY=<long random secret>
STRIPE_SECRET_KEY=<Stripe secret key>
CLIENT_DOMAIN=<frontend origin, for example http://localhost:5173>
CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>
EMAIL_USER=<Gmail address>
EMAIL_PASS=<Gmail app password>
NODE_ENV=development
```

Create `client/.env` for browser-safe settings:

```env
VITE_API_URL=http://localhost:3002
VITE_STRIPE_Publishable_key=<Stripe publishable key>
```

Never commit `.env` files or put server secrets in `client/.env`. In production, set the same variables in the corresponding Vercel project settings. Set the production `CLIENT_DOMAIN` to the frontend's deployed origin and `VITE_API_URL` to the deployed API origin.

## Admin Setup

Open `/admin/register` to register an administrator and its initial restaurant, then sign in at `/admin/login`. Registration creates both records. Do not register the same administrator again just to add another restaurant; use the existing admin account and restaurant management tools.

## Build and Checks

Build the frontend:

```bash
cd client
npm run build
```

Run the frontend linter:

```bash
cd client
npm run lint
```

The server package currently has no automated test suite configured.

## Deploying to Vercel Manually

The repository has separate Vercel configurations in `client/vercel.json` and `server/vercel.json`. Configure two Vercel projects, with the project root set to `client` for the frontend and `server` for the API. Add the environment variables above to the matching project before deploying.

To prepare and push code to GitHub from the repository root:

```bash
git status --short
git add README.md
git diff --cached
git commit -m "Document FoodBae project"
git push
```

For application code changes, stage only the intended files as well. In VS Code, review **Source Control → Changes**, click the `+` next to each file you want to publish, review **Staged Changes**, then commit and push. Avoid staging `.env` files, dependencies, or generated build output.

Pushing to GitHub does not always deploy automatically. If a Vercel project is connected to that GitHub repository and automatic deployments are enabled, a push to its production branch will normally trigger a deployment. Since you prefer to deploy manually, push the commit first, then open each Vercel project and deploy the latest commit from its **Deployments** page. Deploy both the frontend and API when a change affects both projects. A manual redeploy only includes code that has already been pushed to GitHub.
