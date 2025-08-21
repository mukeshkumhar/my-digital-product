"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import ImageSlider from "./ImageSlider";

import productData from "@/./app/data/products.json"; // Assuming you have product data in a JSON file

const ProductSection = () => {

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
                            🎯 {productData.products[0].offer_line}
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-1 pb-6 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                        {productData.products[0].title}
                    </h2>
                    <p className="text-lg text-black max-w-3xl mx-auto">
                        {productData.products[0].subtitle}
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
                                    <span className="text-4xl font-bold text-sky-500">₹{productData.products[0].price_display}</span>
                                    <span className="text-2xl text-gray-400 line-through">
                                        ₹{productData.products[0].mrp_display}
                                    </span>
                                    <div className="bg-red-500/20 text-red-400 rounded-lg text-sm/4 px-3 py-1 border-1 border-red-400">
                                        {productData.products[0].offer}
                                    </div>
                                </div>

                                <div className="text-gray-200 mb-6 ">
                                    {productData.products[0].description}<b>{productData.products[0].dis_bold}</b>
                                    {productData.products[0].what_you_get.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 mt-3">
                                            <Check className="h-5 w-5 text-green-400" />
                                            <span>{item}</span>
                                        </div>
                                    ))}

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
                                    What&apos;s Included in this Purchase:
                                </h3>
                                <div className="space-y-3">
                                    {productData.products[0].features.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex  items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div key={index} className="flex items-center gap-2">
                                                <Shield className="h-10 w-10 text-green-400 mr-1" />
                                                <span>{item}</span>
                                                <Check className="h-8 w-8 text-green-400 ml-auto" />
                                            </div>
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
