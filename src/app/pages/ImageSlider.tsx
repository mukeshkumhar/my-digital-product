import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from 'next/image';
// import banner from '../images/banner.jpg'; // Update with your actual image path


const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Placeholder product images
    const slides = [
        {
            id: 1,
            image: "https://ik.imagekit.io/jejxgl1wi/ChatGPT%20Image%20Jul%2023,%202025,%2011_13_17%20PM.png?updatedAt=1753292619461",
            title: "Finance Classics Mega-Pack",
            description: "Grow rich, think smart, live free download all-time bestsellers."
        },
        // {
        //     id: 2,
        //     image: "https://m.media-amazon.com/images/I/91UP2DOLUhL.jpg",
        //     title: "Professional Templates",
        //     description: "Premium design templates for your business"
        // },
        // {
        //     id: 3,
        //     image: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/06/24161033/Top-10-Famous-Books-of-Ruskin-Bond.png",
        //     title: "Automation Tools",
        //     description: "Streamline your workflow with our tools"
        // }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Main slider container */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                            style={{ backgroundImage: `url(${slides[currentSlide].image}?w=800&h=500&fit=crop&crop=center)` }}
                        >
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {slides[currentSlide].title}
                                </motion.h3>
                                <motion.p
                                    className="text-lg opacity-90"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {slides[currentSlide].description}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg transition-colors duration-300"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button> */}

                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg transition-colors duration-300"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button> */}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center mt-6 space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "bg-blue-500 shadow-blue-400 scale-125"
                                : "bg-blue-900 hover:bg-blue-200"
                            }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>

            {/* Auto-play progress bar */}
            <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    key={currentSlide}
                    transition={{ duration: 5, ease: "linear" }}
                    onAnimationComplete={nextSlide}
                />
            </div>
        </div>
    );
};

export default ImageSlider;