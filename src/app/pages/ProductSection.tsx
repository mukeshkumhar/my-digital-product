"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import ImageSlider from "./ImageSlider";

const ProductSection = () => {
    const features = [
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text:
                "Expertly Written Hindi Summaries Clear, easy- to - understand breakdowns of 5 best - selling financial books in pure Hindi.",
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text:
                "Chapter-wise Breakdown Each book is summarized chapter by chapter, capturing every key idea and principle.",
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text:
                "Key Learnings & Concepts at a Glance Highlighted points, simplified financial lessons, and deep insights from each book.",
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text:
                "Attractive Visual Design Richly designed pages with illustrations, infographics, icons, and charts to make reading fun",
        },
    ];

    return (
        <section id="product-section" className="py-10 px-4 relative">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center">
                        <div className="mb-4 px-4 py-2 text-sm text-black bg-amber-500 border-1 rounded-2xl w-fit">
                            🎯 Limited Time Offer
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-1 pb-6 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                        Wealth Wisdom books Collection
                    </h2>
                    <p className="text-lg text-black max-w-3xl mx-auto">
                        Hurry Download all time best selling books in Hindi. 📚📚📚📚
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ImageSlider />
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Pricing */}
                        <div className="border-1 border-gray-700 rounded-2xl bg-gray-900 p-6">
                            <div className="p-0">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl font-bold text-sky-500">₹199</span>
                                    <span className="text-2xl text-gray-400 line-through">
                                        ₹499
                                    </span>
                                    <div className="bg-red-500/20 text-red-400 rounded-lg text-sm/4 px-3 py-1 border-1 border-red-400">
                                        50% OFF
                                    </div>
                                </div>

                                <div className="text-gray-200 mb-6 ">
                                    What you will get in this purchase.<b>(Top 5 selling books in Hindi PDF)</b>
                                    <ul>
                                        <li>👉🏼 Rich Dad Poor Dad – by Robert T. Kiyosaki</li>
                                        <li>👉🏼 Think and Grow Rich – by Napoleon Hill</li>
                                        <li>
                                            👉🏼 The Millionaire Next Door – by Thomas J. Stanley & William D. Danko
                                        </li>
                                        <li>👉🏼 The Richest Man in Babylon – by George S. Clason</li>
                                        <li>👉🏼 Your Money or Your Life – by Vicki Robin & Joe Dominguez</li>
                                    </ul>
                                </div>

                                <p className="text-center text-sm text-muted-foreground">
                                    💳 Secure payment via Razorpay • 🔒 SSL protected
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="border-1 border-gray-700 rounded-2xl bg-gray-900 p-6">
                            <div className="p-0">
                                {/* ESCAPED APOSTROPHE BELOW */}
                                <h3 className="text-xl font-bold mb-4 text-sky-500">
                                    What&apos;s Included in each book:
                                </h3>
                                <div className="space-y-3">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="text-primary">{feature.icon}</div>
                                            <span className="text-foreground">{feature.text}</span>
                                            <Check className="h-5 w-5 text-green-400 ml-auto" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
