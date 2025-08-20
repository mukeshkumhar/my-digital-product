// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import ProductSection from "./pages/ProductSection";
import RazorpayButton from "./pages/RazorpayButton";

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill: { email: string; contact: string };
  theme: { color: string };
}

export default function HomePage() {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) create order
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.order) {
        alert(data.message || "Failed to create payment order.");
        setLoading(false);
        return;
      }

      // 2) prepare Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY ?? "",
        amount: data.order.amount,
        currency: "INR",
        name: "My Digital Product",
        description: "Purchase of Digital Product",
        order_id: data.order.id,
        handler: async (response: RazorpayPaymentResponse) => {
          setVerifying(true);
          try {
            const verifyRes = await fetch("/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formData,
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              alert("✅ Payment successful! Download starting...");
              const a = document.createElement("a");
              a.href = verifyData.downloadLink;
              // window.open(verifyData.downloadLink, "_blank");
              a.download = "";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            } else {
              alert(verifyData.message || "❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("❌ Error verifying payment.");
          } finally {
            setVerifying(false);
          }
        },
        prefill: { email: formData.email, contact: formData.phone },
        theme: { color: "#3399cc" },
      };

      // 3) open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Error creating payment:", err);
      alert("❌ Failed to create payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <ProductSection />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-full p-5 mb-10 max-w-xl"
      >
        <div className="bg-gray-800 p-6 flex flex-col items-center rounded-lg border border-gray-600 hover:shadow-xl shadow-blue-900/35 transition-shadow duration-300">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">Complete Your Purchase</h1>
          <RazorpayButton />

          
          {/* <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_Qx0UdpA7KNDUuA" async> </script> </form> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-green-400">
              ✅ You will receive a confirmation email with the download link.
            </p>
            <button
              type="submit"
              disabled={loading || verifying}
              className={`w-full p-3 rounded font-semibold ${loading || verifying
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                } text-white transition`}
            >
              {loading
                ? "Creating order..."
                : verifying
                  ? "Verifying payment..."
                  : "🚀 Pay Now"}
            </button>
          </form>

        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative w-full mt-10 border-t border-gray-700 pt-6 pb-4 text-center text-gray-400 bg-gray-900"
      >
        {/* footer content */}
      </motion.footer>

      {(loading || verifying) && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
          <div className="mt-4 text-lg">
            {loading
              ? "Setting up payment..."
              : "Verifying payment... Please wait."}
          </div>
        </div>
      )}
    </div>
  );
}
