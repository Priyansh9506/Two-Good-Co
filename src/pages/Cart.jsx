import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

/**
 * Elastic string — supports BOTH mouse AND touch.
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

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onEnd);
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

const Cart = () => {
    const stringRef = useRef(null);
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    useElasticString(stringRef);

    if (cartItems.length === 0) {
        return (
            <>
                <div className="cart-page cart-container" style={{ textAlign: 'center' }}>
                    <h2>Your cart is empty</h2>
                </div>
                <div id="string" ref={stringRef}>
                    <svg viewBox="0 0 1536 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                    </svg>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="cart-page">
                <div className="cart-container">
                    <h2>Your Cart</h2>
                    <br />
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div style={{ flex: 1, paddingLeft: '20px' }}>
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '20px', background: 'red', borderColor: 'red' }}>X</button>
                        </div>
                    ))}

                    <div className="cart-total">
                        Total: ${cartTotal.toFixed(2)}
                    </div>
                </div>
            </div>
            <div id="string" ref={stringRef}>
                <svg viewBox="0 0 1536 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div>
        </>
    );
}

export default Cart;
