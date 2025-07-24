import { motion } from "framer-motion";
import { FileText, CreditCard, Download } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

const HowToBuySection = () => {
    const steps = [
        {
            id: 1,
            icon: <FileText className="h-8 w-8" />,
            title: "Fill the Form",
            description: "Enter your details in our secure checkout form. All information is encrypted and protected.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            icon: <CreditCard className="h-8 w-8" />,
            title: "Secure Payment",
            description: "Complete your purchase using Razorpay's secure payment gateway. Multiple payment methods accepted.",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            icon: <Download className="h-8 w-8" />,
            title: "Instant Access",
            description: "Download your products immediately and receive email confirmation with all your digital assets.",
            color: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <section id="how-to-buy" className="py-20 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-6">
                        How to Buy
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Get your digital products in 3 simple steps. The entire process takes less than 2 minutes!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relative ">
                    {/* Connection lines for desktop */}
                    {/* <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-cyan-600 to-transparent -translate-y-1/2 z-0" /> */}

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative z-10 border-1 border-gray-700 rounded-2xl bg-gray-900/40 backdrop-blur-xs "
                        >
                            <div className="card-glow text-center p-8 h-full hover:shadow-2xl transition-all duration-300 group">
                                <div className="p-0 space-y-6">
                                    {/* Step Number */}
                                    <div className="relative">
                                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="text-2xl font-bold text-white">{step.id}</span>
                                        </div>
                                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-xl font-bold gradient-text mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="flex justify-center space-x-1 opacity-50">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <div className="card-glow p-6 max-w-2xl mx-auto">
                        <div className="p-0">
                            <h4 className="text-lg font-semibold gradient-text mb-3">
                                🔒 100% Secure & Instant
                            </h4>
                            <p className="text-muted-foreground">
                                Your purchase is protected by industry-standard SSL encryption.
                                All digital products are delivered instantly to your email address upon successful payment.
                                No waiting, no delays - start transforming your business today!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowToBuySection;