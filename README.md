# Collection of tools I use daily

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Routes

### Position size calculator

Position size calculator is a tool I use to determine risk and lot size of fx and gold before entering a trade.

I built it because the calculators I've seen and used doesn't fit my specification and criteria, and they are rigid. Some doesn't even work.

The calculator is based on the popular lot size formula:

```js
lots = riskAmount / (stopLossPips * pipValuePerLot);
```

[Position size calculator](https://util-belt.vercel.app/trading-tools/position-size-calculator)
