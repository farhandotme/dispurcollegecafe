This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables
### 📦 Environment Variables

Copy the following into your `.env` file:

<div style="position: relative; margin-top: 1em;">
  <pre style="background: #000; border: 1px solid #d1d5da; border-radius: 6px; padding: 1em; overflow: auto;"><code id="env-vars">BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=5JjX9cnRX7GymR3C1rTg9bTTTyGxinSc
MONGO_URI=mongodb://localhost:27017/your-database</code></pre>
  <button onclick="navigator.clipboard.writeText(document.getElementById('env-vars').innerText)" style="position: absolute; top: 8px; right: 8px; background-color: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Copy</button>
</div>

