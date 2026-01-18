# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Configuration

Before running the project, you need to set up your environment variables:

1. Copy `.env.sample` to `.env`:
```bash
cp .env.sample .env
```

2. Generate secure secrets for:
   - `AUTH_COOKIE_SECRET`: Used to encrypt session cookies
   - `MAGIC_LINK_SECRET`: Used for magic link authentication

Generate a secure random string using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Fill in the `.env` file with your actual values (this file is ignored by Git)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
