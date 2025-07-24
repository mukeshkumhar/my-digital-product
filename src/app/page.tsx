"use client";

import React, { useState } from "react";
import Script from "next/script";
// import Particles from "react-tsparticles";
import { motion} from "framer-motion";
// import ParticleBackground from "./pages/ParticleBackground";
// import HeroSection from "./pages/HeroSection";
import ProductSection from "./pages/ProductSection";
// import HowToBuySection from "./pages/HowToBuySection";
// import Image from 'next/image';
// import Link from 'next/link';
// import banner from './images/banner.jpg';


export default function HomePage() {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "https://surejob.in/wp-content/uploads/2022/03/Untitled-design-2.jpg",
      alt: "Product 1",
    },
    {
      src: "https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg",
      alt: "Product 2",
    },
    {
      src: "https://surejob.in/wp-content/uploads/2022/03/Untitled-design-2.jpg",
      alt: "Product 3",
    },
  ];

  // const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  // const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "My Digital Product",
        description: "Purchase of Digital Product",
        order_id: data.order.id,
        handler: async (response: any) => {
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
        prefill: {
          // name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
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
      {/* <Image
        src={banner}
        alt="Hero background"  
        fill              // makes the image absolutely fill its parent
        style={{ objectFit: 'cover' }}
        quality={100}
      /> */}
      {/* <HeroSection /> */}
      <ProductSection />
      {/* <HowToBuySection /> */}
      {/* <ParticleBackground /> */}

      {/* Header */}

      {/* <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center p-4"
      >
        <h1 className="text-2xl font-bold mb-4">🌟 My Digital Store 🌟</h1>
        <p className="text-sm text-gray-300">
          Get your amazing digital products instantly!
        </p>
      </motion.div> */}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-full p-5 mb-10 max-w-xl"
      >



        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Secure Checkout
          </h2>
          <p className=" text-muted-foreground">
            Complete your purchase and get instant access to all digital products
          </p>
        </motion.div> */}



        {/* Form */}
        <div className="bg-gray-800 p-6 rounded-lg border-1 border-gray-600 hover:shadow-xl shadow-blue-900/35 transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
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



      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative w-full mt-10 border-t border-gray-700 pt-6 pb-4 text-center text-gray-400 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* <div className="text-sm">
            © {new Date().getFullYear()} My Digital Store. All rights reserved.
          </div> */}

          {/* <div className="flex space-x-4 text-sm">
            <a
              href="#"
              className="hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <a
              href="mailto:support@mydigitalstore.com"
              className="hover:text-white transition"
            >
              Contact Support
            </a>
          </div> */}
        </div>
      </motion.footer>


      {/* Loader overlay */}
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