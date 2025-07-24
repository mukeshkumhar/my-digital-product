"use client";

import React, { useState } from "react";
import Script from "next/script";
import Particles from "react-tsparticles";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./pages/ParticleBackground";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import Particles from "react-tsparticles";
// import { motion } from "framer-motion";

export default function HomePage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

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
                    name: formData.name,
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
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Particles
                className="absolute inset-0"
                options={{
                    particles: {
                        number: { value: 80 },
                        size: { value: 3 },
                        move: { speed: 1 },
                        line_linked: { enable: true, color: "#ffffff" },
                    },
                }}
            />
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center p-4"
            >
                <h1 className="text-4xl font-bold mb-4">🌟 My Digital Store 🌟</h1>
                <p className="mb-6 text-lg text-gray-300">Get your amazing digital products instantly!</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 w-full max-w-md p-4"
            >
                <Swiper className="rounded-lg overflow-hidden mb-6 shadow-lg">
                    <SwiperSlide>
                        <img src="/product-image.jpg" alt="Product 1" className="w-full h-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/product-image2.jpg" alt="Product 2" className="w-full h-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/product-image3.jpg" alt="Product 3" className="w-full h-auto" />
                    </SwiperSlide>
                </Swiper>

                {/* Image slider and product info */}
                <div className="lg:h-full">
                    {/* Custom Image Slider */}
                    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-xl shadow-xl my-6">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    // key={currentSlide}
                                    // src={images[currentSlide].src}
                                    // alt={images[currentSlide].alt}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full h-64 object-cover"
                                />
                            </AnimatePresence>

                            {/* Prev button */}
                            <button
                                // onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2"
                            >
                                &#10094;
                            </button>

                            {/* Next button */}
                            <button
                                // onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2"
                            >
                                &#10095;
                            </button>

                            {/* Dot indicators */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {/* {images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-3 h-3 rounded-full transition ${idx === currentSlide
                                            ? "bg-white scale-110"
                                            : "bg-gray-500 opacity-50"
                                            }`}
                                    />
                                ))} */}
                            </div>
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="rounded-lg relative text-left mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            ✨ All-in-One Bestseller E-Book Bundle (12 Life-Changing Books) ✨
                        </h2>
                        <p className="text-gray-400 mb-4">
                            🔥 Unlock Success with the Ultimate Bestseller E-Book Bundle!<br />
                            We’ve handpicked 12 of the world’s most powerful, bestselling
                            books to help you master personal growth, business, mindset, and
                            success all in one convenient, affordable digital bundle.
                        </p>
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-white">₹499</span>
                            <span className="ml-2 text-lg text-gray-400 line-through">
                                ₹999
                            </span>
                            <span className="ml-4 text-xl font-bold text-green-400">
                                55% OFF
                            </span>
                        </div>
                        <ul className="text-gray-300 mb-4 list-disc list-inside">
                            <li>✅ Instant Download</li>
                            <li>✅ Lifetime Access</li>
                            <li>✅ Premium Support</li>
                            <li>✅ 100% Satisfaction Guarantee</li>
                        </ul>
                    </div>
                </div>

                {/* Payment info boxes */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="space-y-4 mb-6"
                >
                    <div className="text-center bg-gray-700 rounded-lg p-3">
                        <h3 className="text-sm font-semibold text-emerald-400">
                            👉🏼Life changing e-books for just ₹499!
                        </h3>
                    </div>
                    <div className="text-center bg-gray-700 rounded-lg p-3">
                        <h3 className="text-sm font-semibold text-emerald-400">
                            💳 Secure Payment via Razorpay
                        </h3>
                    </div>
                    <div className="text-center bg-gray-700 rounded-lg p-3">
                        <h3 className="text-sm font-semibold text-emerald-400">
                            ⚡ Instant Download After Payment
                        </h3>
                    </div>
                </motion.div>

                {/* How it works section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className=" bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-6 mb-6 shadow-lg"
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-emerald-400">
                        💡 How to Buy
                    </h3>
                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-2xl">📝</div>
                            <div>
                                <h4 className="font-semibold text-lg">1. Fill the Form</h4>
                                <p className="text-gray-300 text-sm">
                                    Enter your full name, email, and phone number so we can send you the
                                    product download link.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-2xl">💳</div>
                            <div>
                                <h4 className="font-semibold text-lg">2. Pay Securely</h4>
                                <p className="text-gray-300 text-sm">
                                    Click "Pay Now" and complete payment using your favorite method:
                                    UPI, card, wallet, or net banking.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-2xl">📥</div>
                            <div>
                                <h4 className="font-semibold text-lg">3. Instant Download + Email</h4>
                                <p className="text-gray-300 text-sm">
                                    After payment, your product starts downloading instantly — plus,
                                    you’ll get a confirmation email with the download link.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
            </motion.div>

            {(loading || verifying) && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="mt-4 text-white text-lg">
                        {loading ? "Setting up payment..." : "Verifying payment... Please wait."}
                    </div>
                </div>
            )}
        </div>
    );
}
