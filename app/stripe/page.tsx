"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import products from "@/data/products.json";
import { createCheckoutSession } from "@/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

export default function Stripe() {
  const [loading, startTransition] = useTransition();
  const [selectedId, setSelectedId] = React.useState(products[0]?.id ?? 1);
  const product = products.find((p) => p.id === selectedId) || products[0];

  function handleBuy() {
    startTransition(async () => {
      const result = await createCheckoutSession({ productId: product.id, quantity: 1 });

      if (!result || result.error || !result.sessionId) {
        alert("Error creating checkout session");
        return;
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
      if (!publishableKey) {
        alert("Stripe public key is missing");
        return;
      }
      const stripe = await loadStripe(publishableKey);

      if (!stripe) {
        alert("Error loading stripe");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: result.sessionId,
      });

      if (error) {
        alert("Error redirecting to checkout");
      }
    });
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-lg  bg-white dark:bg-gray-950 shadow-md">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Choose product</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="mb-4 w-full rounded border px-3 py-2"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ₹{p.price.toLocaleString("en-IN")}
            </option>
          ))}
        </select>

        <div className="relative m-2 w-full overflow-hidden rounded-xl bg-white" style={{ paddingTop: "75%" }}>
          <Image src={product.image} alt={product.name} fill className="object-contain" />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {product.discount}% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900 dark:text-gray-200">
              {product.name}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900 dark:text-gray-200">
                ${(product.price - product.price * (product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-slate-900 dark:text-gray-200 line-through">
                ${product.price.toFixed(2)}
              </span>
            </p>
          </div>
          <button
            disabled={loading}
            onClick={handleBuy}
            className="w-full rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {loading ? "Loading..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
