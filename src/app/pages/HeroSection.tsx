import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import Image from 'next/image';
import Link from 'next/link';
import banner from '../images/book3.png';

const HeroSection = () => {
    const scrollToProduct = () => {
        const element = document.getElementById('product-section');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* <ParticleBackground /> */}

            <Image
                src={banner}
                alt="Hero background"
                fill              
                style={{ objectFit: 'cover' }}
                quality={100}
                priority
            />
            {/* Gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/50 to-background/95 pointer-events-none" /> */}

            <div className="container mx-auto px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Store Name */}
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold mb-3 pb-6 bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        My Digital Store
                    </motion.h1>

                    {/* Tagline */}
                    {/* <motion.p
                        className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Premium Digital Products & Instant Downloads
                        <br />
                        <span className="gradient-text-accent font-semibold bg-gradient-to-r from-cyan-500 to-amber-500 bg-clip-text text-transparent">Transform Your Business Today</span>
                    </motion.p> */}

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {/* <button
                            className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold hover:bg-gradient-to-r hover:from-cyan-600 hover:to-indigo-700 transition-colors duration-300 group"
                            onClick={scrollToProduct}
                        >
                            Explore Products
                            <motion.span
                                className="ml-2 group hover:translate-x-1 transition-transform"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                            >
                                →
                            </motion.span>
                        </button> */}
                        {/* <Button
                            variant="hero"
                            size="xl"
                            onClick={scrollToProduct}
                            className="group"
                        >
                            Explore Products
                            <motion.span
                                className="ml-2 group-hover:translate-x-1 transition-transform"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                            >
                                →
                            </motion.span>
                        </Button> */}

                        {/* <button
                            className="border-2  border-blue-400 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-indigo-700 transition-colors duration-300 group"
                            onClick={() => {
                                const element = document.getElementById('how-to-buy');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Learn More
                        </button> */}

                        {/* <Button
                            variant="outline"
                            size="xl"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            onClick={() => {
                                const element = document.getElementById('how-to-buy');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Learn More
                        </Button> */}
                    </motion.div>

                    {/* Reduced floating elements for better performance */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 justify-center items-center flex flex-col  transform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                <motion.div
                    className="w-6 h-10 border-2  border-b-blue-500 rounded-full flex justify-center cursor-pointer"
                    onClick={scrollToProduct}
                    whileHover={{ scale: 1.1 }}
                >
                    <motion.div
                        className="w-1 h-3 bg-primary rounded-full bg-blue-600 mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
                <p className="text-sm text-blue-400  text-muted-foreground mt-2">Scroll to explore</p>
            </motion.div>
        </section>
    );
};

export default HeroSection;