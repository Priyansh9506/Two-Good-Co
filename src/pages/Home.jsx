import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const products = [
    { id: 1, name: "alamais cook", image: "product1.jpg", price: "$190" },
    { id: 2, name: "rocky road", image: "product2.jpg", price: "$24" },
    { id: 3, name: "crackers", image: "product3.jpg", price: "$16" },
    { id: 4, name: "candel", image: "product4.jpg", price: "$59" },
    { id: 5, name: "fregrence oil", image: "product5.jpg", price: "$39" },
    { id: 6, name: "happy teddy", image: "product6.jpg", price: "$49" },
    { id: 7, name: "Sleep Pack", image: "product7.jpg", price: "$129" },
    { id: 8, name: "Donate Meal", image: "product8.jpg", price: "$10" }
];

/**
 * Hook up the elastic string SVG — supports BOTH mouse AND touch.
 */
function useElasticString(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const pathEl = el.querySelector("path");
        if (!pathEl) return;

        const finalPath = "M 50 100 Q 768 100 1486 100";

        const getCoords = (e) => {
            const rect = el.getBoundingClientRect();
            // Touch or mouse
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };
        };

        const onMove = (e) => {
            const { x, y } = getCoords(e);
            gsap.to(pathEl, {
                attr: { d: `M 50 100 Q ${x} ${y} 1486 100` },
                ease: "power3.out",
                duration: 0.3,
            });
        };

        const onEnd = () => {
            gsap.to(pathEl, {
                attr: { d: finalPath },
                duration: 0.5,
                ease: "elastic.out(1,0.2)",
            });
        };

        // Mouse
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onEnd);
        // Touch
        el.addEventListener("touchmove", onMove, { passive: true });
        el.addEventListener("touchend", onEnd);

        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onEnd);
            el.removeEventListener("touchmove", onMove);
            el.removeEventListener("touchend", onEnd);
        };
    }, [ref]);
}

const Home = () => {
    const stringRef = useRef(null);
    const taglineRef = useRef(null);
    const videoContainerRef = useRef(null);
    const playBtnRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { addToCart } = useCart();

    // Elastic string — works on both touch and mouse
    useElasticString(stringRef);

    /* ─── Check viewport on mount + resize ─── */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    /* ─── Intersection Observer: lazy-load the video src ─── */
    useEffect(() => {
        const container = videoContainerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        // On mobile, don't autoload — user taps to play
        if (isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !videoLoaded) {
                        video.src = '/video.mp4';
                        video.load();
                        setVideoLoaded(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '200px', threshold: 0.1 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [isMobile, videoLoaded]);

    /* ─── Handle video play on mobile tap ─── */
    const handleMobilePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!videoLoaded) {
            video.src = '/video.mp4';
            video.load();
            setVideoLoaded(true);
        }

        if (video.paused) {
            video.muted = false;
            video.play().catch(() => {
                video.muted = true;
                video.play();
            });
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }, [videoLoaded]);

    /* ─── Handle desktop click: toggle mute ─── */
    const handleDesktopClick = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.muted) {
            video.muted = false;
            setIsPlaying(true);
        } else {
            video.muted = true;
            setIsPlaying(false);
        }
    }, []);

    useEffect(() => {
        // Split text animation for tagline
        const tagline = taglineRef.current;
        if (tagline) {
            const lines = tagline.querySelectorAll('.line');
            lines.forEach(line => {
                const text = line.innerText;
                line.innerHTML = text.split('').map((char) =>
                    char === ' ' ? '<span class="char" style="display:inline-block">&nbsp;</span>' : `<span class="char" style="display:inline-block;opacity:0;transform:translateY(100px) rotateX(-90deg)">${char}</span>`
                ).join('');
            });

            gsap.to(tagline.querySelectorAll('.char'), {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.7)",
                delay: 0.3
            });
        }

        // Scroll Animations
        const ctx = gsap.context(() => {
            gsap.from("#info h2", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                    once: true
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from("#info p", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 75%",
                    once: true
                },
                opacity: 0,
                y: 30,
                delay: 0.3,
                duration: 1,
                ease: "power2.out"
            });

            gsap.from(["#img1", "#img2"], {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 70%",
                    once: true
                },
                opacity: 0,
                scale: 0.9,
                duration: 1,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });

            gsap.from(".product-card", {
                scrollTrigger: {
                    trigger: "#product-section",
                    start: "top 85%",
                    once: true
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });

            gsap.from("#info-1 p, #info-2 p", {
                scrollTrigger: {
                    trigger: "#product-about",
                    start: "top 80%",
                    once: true
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out"
            });
        });

        // Play button animation (desktop only — cursor follower)
        const videoContainer = videoContainerRef.current;
        const playBtn = playBtnRef.current;
        let videoCleanup = () => {};

        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (videoContainer && playBtn && !isTouch) {
            const handleVideoMouseEnter = () => {
                gsap.to(playBtn, { scale: 1, opacity: 1 });
            };

            const handleVideoMouseLeave = () => {
                gsap.to(playBtn, { scale: 0, opacity: 0 });
            };

            const handleVideoMouseMove = (dets) => {
                const rect = videoContainer.getBoundingClientRect();
                const x = dets.clientX - rect.left;
                const y = dets.clientY - rect.top;
                gsap.to(playBtn, { left: x, top: y });
            };

            videoContainer.addEventListener("mouseenter", handleVideoMouseEnter);
            videoContainer.addEventListener("mouseleave", handleVideoMouseLeave);
            videoContainer.addEventListener("mousemove", handleVideoMouseMove);

            videoCleanup = () => {
                videoContainer.removeEventListener("mouseenter", handleVideoMouseEnter);
                videoContainer.removeEventListener("mouseleave", handleVideoMouseLeave);
                videoContainer.removeEventListener("mousemove", handleVideoMouseMove);
            };
        }

        return () => {
            videoCleanup();
            ctx.revert();
        };
    }, []);

    return (
        <>
            <div id="home">
                <div id="tagline" ref={taglineRef}>
                    <h1><div className="line">CHANGE</div><div className="line">THE COURSE</div></h1>
                </div>
                <div
                    id="video-container"
                    ref={videoContainerRef}
                    onClick={isMobile ? handleMobilePlay : handleDesktopClick}
                >
                    <video
                        ref={videoRef}
                        autoPlay={!isMobile}
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster="/video-poster.png"
                    ></video>

                    {/* Desktop: cursor-follower play button */}
                    {!isMobile && (
                        <div id="play" ref={playBtnRef}>{isPlaying ? 'Pause' : 'Play'}</div>
                    )}

                    {/* Mobile: centered tap-to-play overlay */}
                    {isMobile && !isPlaying && (
                        <div className="mobile-play-overlay">
                            <div className="mobile-play-btn">
                                <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span>Tap to Play</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br /><br /><br /><br />

            <div id="product">
                <div id="product-about">
                    <div id="info-1">
                        <h1>
                            <p>We Believe in people,</p>
                            <p>until they belive in</p>
                            <p>Themselves Again.</p>
                        </h1>
                    </div>
                    <div id="info-2">
                        <p>Everything we do is designed to rebuild self </p>
                        <p>worth and independence, in order to break free </p>
                        <p>from the cycle of disadvantage. </p><br /><br />
                        <p>With every purchase you make with us, you're </p>
                        <p>helping to change the course of someone's life;</p>
                        <p>you're walking alongside vulnerable women as</p>
                        <p>hey find their way home again.</p>
                    </div>
                </div><br /><br /><br /><br />

                <div className="product-section" id="product-section">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <img src={product.image} alt={product.name} loading="lazy" />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <div className="product-footer">
                                    <span className="price">{product.price}</span>
                                    <button className="add-btn" onClick={() => addToCart(product)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br /><br /><br /><br /><br />

            <div id="about">
                <div id="info">
                    <h2>Our Impact.</h2><br /><br />
                    <p>The thing is, we don't save anyone.</p><br /><br />
                    <p>What we do is provide a safe space for women to change the course of their own lives.</p><br /><br />
                    <p>After many years of living in crisis, abuse and complex trauma, restoring self-worth is foundational for independence. We believe that through experiences that promote love and respect, we can spark and nurture a sense of self-worth for those on the path of healing.</p>
                </div>
                <div id="img1"><img src="/img1.jpg" alt="Two Employees at Two Good Co" loading="lazy" /></div>
                <div id="img2"><img src="/img2.jpg" alt="Old Women as Employees at Two Good Co" loading="lazy" /></div>
            </div>

            <div id="string" ref={stringRef}>
                <svg viewBox="0 0 1536 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div><br /><br /><br />
        </>
    );
}

export default Home;
