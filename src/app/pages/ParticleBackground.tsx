import { useCallback, useEffect, useState } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    const [shouldRenderParticles, setShouldRenderParticles] = useState(false);

    useEffect(() => {
        // Only render particles on desktop and devices with good performance
        const checkDevice = () => {
            const isDesktop = window.innerWidth >= 1024;
            const hasGoodPerformance = navigator.hardwareConcurrency >= 4;
            const isNotMobile = !(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

            setShouldRenderParticles(isDesktop && (hasGoodPerformance || isNotMobile));
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // console.log(container); // Removed console.log for better performance
    }, []);

    if (!shouldRenderParticles) {
        return null; // Don't render particles on mobile or low-performance devices
    }

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            className="absolute inset-0 -z-10"
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60, // Reduced from 120 to 60 for better performance
                interactivity: {
                    events: {
                        onClick: {
                            enable: false, // Disabled click interactions to reduce CPU load
                        },
                        onHover: {
                            enable: false, // Disabled hover interactions to reduce CPU load
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#00d4ff", "#b347d9"],
                    },
                    links: {
                        enable: false, // Disabled links for better performance
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.5, // Reduced from 1 to 0.5 for smoother animation
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1200, // Increased area to reduce particle density
                        },
                        value: 30, // Reduced from 80 to 30 particles for better performance
                    },
                    opacity: {
                        value: 0.3, // Reduced opacity for subtle effect
                        random: true,
                        animation: {
                            enable: false, // Disabled opacity animation to reduce CPU usage
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 4 }, // Slightly larger particles to maintain visibility
                        animation: {
                            enable: false, // Disabled size animation to reduce CPU usage
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticleBackground;