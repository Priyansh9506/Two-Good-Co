import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id || item.name === product.name);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id || item.name === product.name) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
      setCartItems(prev => prev.filter(item => item.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
      if(quantity < 1) {
          removeFromCart(productName);
          return;
      }
      setCartItems(prev => prev.map(item => 
          item.name === productName ? { ...item, quantity } : item
      ));
  }

  const clearCart = () => setCartItems([]);

  const value = {
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      cartTotal: cartItems.reduce((acc, item) => {
          // Parse price string "$190" -> 190
          const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
          return acc + (price * item.quantity);
      }, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
