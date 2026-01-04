import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page cart-container" style={{ textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h2>Your Cart</h2>
                <br />
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div style={{ flex: 1, paddingLeft: '20px' }}>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.name)} style={{ marginLeft: '20px', background: 'red', borderColor: 'red' }}>X</button>
                    </div>
                ))}

                <div className="cart-total">
                    Total: ${cartTotal.toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default Cart;
