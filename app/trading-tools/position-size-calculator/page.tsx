'use client';

import { useMemo, useState } from "react";

type Pair =
  | "EUR/USD"
  | "GBP/USD"
  | "USD/JPY"
  | "AUD/USD"
  | "USD/CAD"
  | "USD/CHF"
  | "NZD/USD"
  | "XAU/USD"
  | "EUR/JPY";

type PairConfig = {
  price: number;
  pipSize: number;
  quoteCurrency: "USD" | "JPY" | "CAD" | "CHF";
};

const PAIRS: Record<Pair, PairConfig> = {
  "EUR/USD": { price: 1.0842, pipSize: 0.0001, quoteCurrency: "USD" },
  "GBP/USD": { price: 1.2735, pipSize: 0.0001, quoteCurrency: "USD" },
  "USD/JPY": { price: 149.68, pipSize: 0.01, quoteCurrency: "JPY" },
  "AUD/USD": { price: 0.6531, pipSize: 0.0001, quoteCurrency: "USD" },
  "USD/CAD": { price: 1.3618, pipSize: 0.0001, quoteCurrency: "CAD" },
  "USD/CHF": { price: 0.8924, pipSize: 0.0001, quoteCurrency: "CHF" },
  "NZD/USD": { price: 0.5982, pipSize: 0.0001, quoteCurrency: "USD" },
  "XAU/USD": { price: 1925.50, pipSize: 0.1, quoteCurrency: "USD" },
  "EUR/JPY": { price: 161.25, pipSize: 0.01, quoteCurrency: "JPY" }
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  const [balance, setBalance] = useState(10000);
  const [pair, setPair] = useState<Pair>("EUR/USD");
  const [riskPercent, setRiskPercent] = useState<1 | 2>(1);
  const [stopLossPips, setStopLossPips] = useState(20);

  const result = useMemo(() => {
    const riskAmount = balance * (riskPercent / 100);
    const pipValuePerLot = 10; // simplified assumption
    const lots = riskAmount / (stopLossPips * pipValuePerLot);

    const potentialProfitUSD = riskAmount * 2;
    const potentialProfitPips = stopLossPips * 2;

    return { riskAmount, stopLossPips, lots, potentialProfitUSD, potentialProfitPips };
  }, [balance, pair, riskPercent, stopLossPips]);

  return (
    <section className="mt-10 bg-slate-900 text-white rounded-xl border border-slate-700 max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Position Size Calculator</h2>

      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        <label className="flex flex-col text-sm font-medium text-slate-300">
          Account balance (USD)
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="mt-2 rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-white"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-300">
          Currency pair
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value as Pair)}
            className="mt-2 rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-white"
          >
            {Object.keys(PAIRS).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-300">
          Stop loss (pips)
          <input
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(Number(e.target.value))}
            className="mt-2 rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-white"
          />
        </label>
      </div>

      <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
        <span className="text-sm font-medium text-slate-300">Risk %</span>
        <div className="flex bg-slate-800 rounded-md p-1">
          {[1, 2].map((value) => (
            <button
              key={value}
              onClick={() => setRiskPercent(value as 1 | 2)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold ${
                riskPercent === value
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {value}%
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 bg-slate-800 rounded-lg p-4 mb-6">
        <div>
          <span className="block text-xs text-slate-400 mb-1">Max loss</span>
          <strong>{money.format(result.riskAmount)}</strong>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">Lot size</span>
          <strong>{result.lots.toFixed(2)} lots</strong>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">Profit (USD)</span>
          <strong className="text-green-400">{money.format(result.potentialProfitUSD)}</strong>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">Profit (pips)</span>
          <strong className="text-green-400">{result.potentialProfitPips} pips</strong>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Lot size is calculated using your account balance, risk %, and stop loss distance. Potential profit is shown both in USD and pips (based on a 1:2 risk/reward ratio).
      </p>
    </section>
  );
}
