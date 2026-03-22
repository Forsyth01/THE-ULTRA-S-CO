"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  createCart,
  addToCart as addToCartApi,
  updateCart,
  removeFromCart as removeFromCartApi,
  getCart,
} from "@/lib/shopify/cart";
import { transformCart } from "@/lib/shopify/transformers";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    id: null,
    checkoutUrl: null,
    items: [],
    subtotal: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from Shopify on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem("shopifyCartId");

    if (savedCartId) {
      getCart(savedCartId)
        .then((shopifyCart) => {
          if (shopifyCart) {
            setCart(transformCart(shopifyCart));
          } else {
            // Cart no longer exists, clear it
            localStorage.removeItem("shopifyCartId");
          }
        })
        .catch((error) => {
          console.error("Error loading cart:", error);
          localStorage.removeItem("shopifyCartId");
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Save cartId to localStorage whenever it changes
  useEffect(() => {
    if (cart.id) {
      localStorage.setItem("shopifyCartId", cart.id);
    }
  }, [cart.id]);

  const addToCart = useCallback(
    async (variantId, quantity = 1) => {
      setIsLoading(true);
      try {
        const lines = [{ merchandiseId: variantId, quantity }];

        let shopifyCart;
        if (cart.id) {
          shopifyCart = await addToCartApi(cart.id, lines);
        } else {
          shopifyCart = await createCart(lines);
        }

        setCart(transformCart(shopifyCart));
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id]
  );

  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      if (!cart.id || quantity < 1) return;

      setIsLoading(true);
      try {
        const shopifyCart = await updateCart(cart.id, [{ id: lineId, quantity }]);
        setCart(transformCart(shopifyCart));
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id]
  );

  const removeFromCart = useCallback(
    async (lineId) => {
      if (!cart.id) return;

      setIsLoading(true);
      try {
        const shopifyCart = await removeFromCartApi(cart.id, [lineId]);
        setCart(transformCart(shopifyCart));
      } catch (error) {
        console.error("Error removing from cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id]
  );

  const clearCart = useCallback(() => {
    setCart({
      id: null,
      checkoutUrl: null,
      items: [],
      subtotal: 0,
      total: 0,
    });
    localStorage.removeItem("shopifyCartId");
  }, []);

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: cart.items,
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal: cart.total,
        cartSubtotal: cart.subtotal,
        isLoading,
        isLoaded,
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
