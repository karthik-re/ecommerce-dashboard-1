This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Install Stripe CLI

To make the mini-project fully functional you need to install the Stripe CLI to run locally on your PC.

Take a look at this useful video if you're on Windows. https://www.youtube.com/watch?v=LUHeCvVFATU

Use the following command to get the webhook up and running after the CLI.

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

# API keys necessary

The following keys are required to make sure the app functions as intended.

1. Stripe Public and Secret key
2. Stripe webhook secret (you will only see this immediately after creating it make sure to save it)
3. Resend API key

Note: If you want the email functionality to work you must use onboarding@resend.dev as your sended email and the receivers email should always be the one you use the one to create the API key.
