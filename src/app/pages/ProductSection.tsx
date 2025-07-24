import { motion } from "framer-motion";
import { Check, Star, Download, Shield, Zap, Book } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import ImageSlider from "./ImageSlider";

const ProductSection = () => {
    const features = [
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text: "Expertly Written Hindi Summaries Clear, easy- to - understand breakdowns of 5 best - selling financial books in pure Hindi."
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text: "Chapter-wise Breakdown Each book is summarized chapter by chapter, capturing every key idea and principle."
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text: "Key Learnings & Concepts at a Glance Highlighted points, simplified financial lessons, and deep insights from each book."
        },
        {
            icon: <Shield className="text-green-400 h-5 w-5" />,
            text: "Attractive Visual Design Richly designed pages with illustrations, infographics, icons, and charts to make reading fun"
        }
    ];

    const scrollToPayment = () => {
        const element = document.getElementById('payment-form');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="product-section" className="py-10 px-4 relative">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className=" text-center mb-16"
                >
                    <div className="flex justify-center">
                        <div className=" mb-4 px-4 py-2 text-sm text-black bg-amber-500 border-1 rounded-2xl w-fit ">🎯 Limited Time Offer</div>
                    </div>
                    {/* <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-primary/20 text-primary border-primary/30">
                        🎯 Limited Time Offer
                    </Badge> */}
                    <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-1 pb-6 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                        Wealth Wisdom books Collection 
                    </h2>
                    <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                        Hurry Download all time best selling books in Hindi. 📚
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
                                {/* <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
                                </div> */}

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl font-bold text-sky-500">₹199</span>
                                    <span className="text-2xl text-gray-400 line-through">₹499</span>
                                    <div className="bg-red-500/20 text-red-400 rounded-lg text-sm/4 px-3 py-1 border-1 border-red-400">50% OFF</div>
                                    {/* <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                                        76% OFF
                                    </Badge> */}
                                </div>

                                <div className="text-gray-200 mb-6 ">
                                    What you will get in this purchase.<b>(Top 5 selling books in Hindi PDF)</b>
                                    <ul>
                                        <li>👉🏼 Rich Dad Poor Dad – by Robert T. Kiyosaki</li>
                                        <li>👉🏼 Think and Grow Rich – by Napoleon Hill</li>
                                        <li>👉🏼 The Millionaire Next Door – by Thomas J. Stanley & William D. Danko</li>
                                        <li>👉🏼 The Richest Man in Babylon – by George S. Clason</li>
                                        <li>👉🏼 Your Money or Your Life – by Vicki Robin & Joe Dominguez</li>
                                    </ul>
                                </div>
                                


                                {/* <button
                                    className="flex items-center justify-center text-white px-6 py-4 rounded-lg shadow-lg bg-cyan-600  hover:bg-emerald-700 transition-colors duration-300 w-full mb-4"
                                    onClick={scrollToPayment}
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Buy Now - Instant Access
                                </button> */}

                                {/* <Button
                                    variant="glow"
                                    size="lg"
                                    className="w-full mb-4"
                                    onClick={scrollToPayment}
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Buy Now - Instant Access
                                </Button> */}

                                <p className="text-center text-sm text-muted-foreground">
                                    💳 Secure payment via Razorpay • 🔒 SSL protected
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="border-1 border-gray-700 rounded-2xl bg-gray-900 p-6">
                            <div className="p-0">
                                <h3 className="text-xl font-bold mb-4 text-sky-500">What's Included in each book:</h3>
                            
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
                                            <div className="text-primary">
                                                {feature.icon}
                                            </div>
                                            <span className="text-foreground">{feature.text}</span>
                                            <Check className="h-5 w-5 text-green-400 ml-auto" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Urgency */}
                        {/* <motion.div
                            className="text-center p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-red-400 font-semibold">
                                ⚡ Limited time offer expires in:
                            </p>
                            <div className="flex justify-center mt-2 space-x-2">
                                {['23', '59', '47'].map((time, i) => (
                                    <div key={i} className="bg-red-500/30 rounded px-2 py-1 min-w-[40px]">
                                        <span className="text-white font-mono font-bold">{time}</span>
                                        <div className="text-xs text-red-200">
                                            {['HRS', 'MIN', 'SEC'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;