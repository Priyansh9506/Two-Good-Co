import React, { useEffect, useRef, useState } from 'react';
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

const Home = () => {
    const stringRef = useRef(null);
    const taglineRef = useRef(null);
    const videoContainerRef = useRef(null);
    const playBtnRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { addToCart } = useCart();

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

        // String Animation
        const pathRef = stringRef.current.querySelector("path");
        const finalPath = "M 50 100 Q 768 100 1486 100";

        const handleMouseMove = (dets) => {
            // Calculate relative coordinates to the SVG container if needed, 
            // but legacy code used dets.x and dets.y directly from mousemove event 
            // which are relative to viewport or page. 
            // We need to be careful about coordinate space. 
            // If the SVG is full width, global X might be fine.
            // Let's use rect for better precision relative to SVG.
            const rect = stringRef.current.getBoundingClientRect();
            const relativeY = dets.clientY - rect.top;
            const relativeX = dets.clientX - rect.left;

            // Legacy code logic: path = `M 50 100 Q ${dets.x} ${dets.y} 1486 100`;
            // It used dets.x/y directly. Let's try to match that or improve it.
            // SVG is 1536 wide in legacy.

            const path = `M 50 100 Q ${relativeX} ${relativeY} 1486 100`;

            gsap.to(pathRef, {
                attr: { d: path },
                ease: "power3.out",
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathRef, {
                attr: { d: finalPath },
                duration: 0.5,
                ease: "elastic.out(1,0.2)",
            });
        };

        const stringEl = stringRef.current;
        stringEl.addEventListener("mousemove", handleMouseMove);
        stringEl.addEventListener("mouseleave", handleMouseLeave);


        // Scroll Animations
        const ctx = gsap.context(() => {
            gsap.from("#info h2", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
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
                    toggleActions: "play none none reverse"
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
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                scale: 0.9,
                duration: 1,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });

            // Product cards staggered reveal animation
            gsap.from(".product-card", {
                scrollTrigger: {
                    trigger: "#product-section",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Product section text animation
            gsap.from("#info-1 p, #info-2 p", {
                scrollTrigger: {
                    trigger: "#product-about",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out"
            });
        });

        // Play button animation
        const videoContainer = videoContainerRef.current;
        const playBtn = playBtnRef.current;

        const handleVideoMouseEnter = () => {
            gsap.to(playBtn, {
                scale: 1,
                opacity: 1
            });
        };

        const handleVideoMouseLeave = () => {
            gsap.to(playBtn, {
                scale: 0,
                opacity: 0
            });
        };

        const handleVideoMouseMove = (dets) => {
            const rect = videoContainer.getBoundingClientRect();
            const x = dets.clientX - rect.left;
            const y = dets.clientY - rect.top;
            gsap.to(playBtn, {
                left: x,
                top: y
            });
        };

        videoContainer.addEventListener("mouseenter", handleVideoMouseEnter);
        videoContainer.addEventListener("mouseleave", handleVideoMouseLeave);
        videoContainer.addEventListener("mousemove", handleVideoMouseMove);

        return () => {
            stringEl.removeEventListener("mousemove", handleMouseMove);
            stringEl.removeEventListener("mouseleave", handleMouseLeave);
            videoContainer.removeEventListener("mouseenter", handleVideoMouseEnter);
            videoContainer.removeEventListener("mouseleave", handleVideoMouseLeave);
            videoContainer.removeEventListener("mousemove", handleVideoMouseMove);
            ctx.revert();
        };
    }, []);

    return (
        <>
            <div id="home">
                <div id="tagline" ref={taglineRef}>
                    <h1><div className="line">CHANGE</div><div className="line">THE COURSE</div></h1>
                </div>
                <div id="video-container" ref={videoContainerRef} onClick={() => {
                    const video = videoRef.current;
                    if (video.muted) {
                        video.muted = false;
                        setIsPlaying(true);
                    } else {
                        video.muted = true;
                        setIsPlaying(false);
                    }
                }}>
                    <video ref={videoRef} autoPlay muted loop src="/video.mp4" height="100%" width="100%"></video>
                    <div id="play" ref={playBtnRef}>{isPlaying ? 'Pause' : 'Play'}</div>
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
                            <img src={product.image} alt={product.name} />
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
                <div id="img1"><img src="/img1.jpg" alt="Two Employees at Two Good Co" /></div>
                <div id="img2"><img src="/img2.jpg" alt="Old Women as Employees at Two Good Co" /></div>
            </div>

            <div id="string" ref={stringRef}>
                <svg width="1536" height="200" style={{ width: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div><br /><br /><br />
        </>
    );
}

export default Home;
