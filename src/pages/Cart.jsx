import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const stringRef = useRef(null);
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    useEffect(() => {
        // String Animation - wait for ref to be available
        if (!stringRef.current) return;

        const pathRef = stringRef.current.querySelector("path");
        if (!pathRef) return;

        const finalPath = "M 50 100 Q 768 100 1486 100";

        const handleMouseMove = (dets) => {
            const rect = stringRef.current.getBoundingClientRect();
            const relativeY = dets.clientY - rect.top;
            const relativeX = dets.clientX - rect.left;
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

        return () => {
            stringEl.removeEventListener("mousemove", handleMouseMove);
            stringEl.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (cartItems.length === 0) {
        return (
            <>
                <div className="cart-page cart-container" style={{ textAlign: 'center' }}>
                    <h2>Your cart is empty</h2>
                </div>
                <div id="string" ref={stringRef}>
                    <svg width="1536" height="200" style={{ width: '100%' }}>
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
                <svg width="1536" height="200" style={{ width: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div>
        </>
    );
}

export default Cart;
