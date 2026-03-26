## Getting Started

# Reversio – Shopify Returns App

A Next.js app built as part of a coding challenge for [Reversio](https://www.reversio.io/).
It allows users to create returns for Shopify orders via the Shopify GraphQL Admin API.

Built by **Thea Birk Berger**.

## Tech Stack
- Next.js 16, React, TypeScript
- Shopify Admin API (`@shopify/admin-api-client`)

Requires Node 20+

To get project

```bash
git clone https://github.com/BirkBerger/ReversioAssignment.git
cd reversio-assignment
```

Create file .env.local in root
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
SHOPIFY_SHOP_DOMAIN=<your-doman>   # e.g. my-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=<your-token>  # From your Shopify admin dashboard
```

To run project

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser to see the result.
