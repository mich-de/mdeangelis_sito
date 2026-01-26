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

## Deploy on Coolify

To deploy this Next.js 15 application on Coolify using Nixpacks:

1.  **Create Service**:
    *   Select "Application" -> "Public GitHub Repository".
    *   Choose this repository `mich-de/mdeangelis_sito`.

2.  **Configuration**:
    *   **Build Pack**: Select `Nixpacks`.
    *   **Environment Variables**:
        *   Key: `NIXPACKS_NODE_VERSION`
        *   Value: `22`
    *   **Commands (CRITICAL)**:
        *   **Build Command**: Leave EMPTY.
        *   **Install Command**: Leave EMPTY.
        *   **Start Command**: Leave EMPTY.
        *   *Note: Nixpacks automatically detects `package.json` and handles the build/start process.*
    *   **Docker Registry**: Leave EMPTY.
    *   **Publish Directory**: Leave EMPTY (or `.next` if required, but usually auto-detected).

3.  **Deploy**:
    *   Click "Save".
    *   Click "Deploy" (or "Redeploy").

The application uses `output: "standalone"` in `next.config.ts` for optimized Docker builds.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
