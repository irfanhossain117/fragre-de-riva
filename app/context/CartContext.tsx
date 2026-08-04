"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity?: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (id: number, size: string) => void;
  increaseQuantity: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  cartUpdated: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartUpdated, setCartUpdated] = useState<boolean>(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartUpdated((prev) => !prev);
  }, [cart]);

  const addToCart = (item: CartItem, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + quantity;
        return updated;
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantityMap = (prevCart: CartItem[], id: number, size: string, delta: number) => {
    return prevCart.map((item) => {
      if (item.id === id && item.size === size) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
  };

  const increaseQuantity = (id: number, size: string) => {
    setCart((prevCart) => updateQuantityMap(prevCart, id, size, 1));
  };

  const decreaseQuantity = (id: number, size: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = (item.quantity || 1) - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => (item.quantity || 1) > 0);
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
        cartUpdated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}