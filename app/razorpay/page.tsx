"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import products from "@/data/products.json";
import { createOrders, verifyPayment } from "@/actions/razorpay";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Razorpay() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState(products[0]?.id ?? 1);
  const product = products.find((p) => p.id === selectedId) || products[0];

  function handleBuy() {
    startTransition(async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = async () => {
  const result = await createOrders({ productId: product.id, quantity: 1 });

        if (result.error) {
          alert("Error creating orders");
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: (product.price - product.price * (product.discount / 100)) * 100,
          currency: "INR",
          name: "Payment Gateways Demo",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`,
          order_id: result.orderId,
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            const result = await verifyPayment(response);
            if (result.error) {
              toast.error("Payment failed");
              router.push("/payment?status=failed");
              return;
            }
            router.push("/payment?status=success");
            toast.success("Payment successful");
          },
          prefill: {
            name: "Payment Gateways Demo",
            email: "premprakash@example.com",
            contact: "9999999999",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      document.body.appendChild(script);
    });
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg  bg-white dark:bg-gray-950 shadow-md">
        <div className="px-5 pt-5">
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

          <div className="relative m-2 flex h-72 items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image
              height={600}
              width={800}
              className="object-contain max-h-full"
              src={product.image}
              alt={product.name}
            />
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
                ₹{(product.price - product.price * (product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-slate-900 dark:text-gray-200 line-through">
                ₹{product.price.toFixed(2)}
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
  </div>
  );
}
