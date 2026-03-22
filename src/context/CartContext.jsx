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
  const [loadingItems, setLoadingItems] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to refresh cart from Shopify
  const refreshCart = useCallback(async () => {
    const savedCartId = localStorage.getItem("shopifyCartId");

    if (savedCartId) {
      try {
        const shopifyCart = await getCart(savedCartId);
        if (shopifyCart) {
          setCart(transformCart(shopifyCart));
        } else {
          // Cart no longer exists (completed checkout), clear it
          localStorage.removeItem("shopifyCartId");
          setCart({
            id: null,
            checkoutUrl: null,
            items: [],
            subtotal: 0,
            total: 0,
          });
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem("shopifyCartId");
      }
    }
    setIsLoaded(true);
  }, []);

  // Load cart from Shopify on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Refresh cart when user returns to the page (from checkout)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshCart();
      }
    };

    const handleFocus = () => {
      refreshCart();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshCart]);

  // Save cartId to localStorage whenever it changes
  useEffect(() => {
    if (cart.id) {
      localStorage.setItem("shopifyCartId", cart.id);
    }
  }, [cart.id]);

  const addToCart = useCallback(
    async (variantId, quantity = 1) => {
      setLoadingItems((prev) => new Set(prev).add(variantId));
      try {
        const lines = [{ merchandiseId: variantId, quantity }];

        let shopifyCart;
        if (cart.id) {
          shopifyCart = await addToCartApi(cart.id, lines);
        } else {
          shopifyCart = await createCart(lines);
        }

        setCart(transformCart(shopifyCart));
        return true;
      } catch (error) {
        console.error("Error adding to cart:", error);
        return false;
      } finally {
        setLoadingItems((prev) => {
          const next = new Set(prev);
          next.delete(variantId);
          return next;
        });
      }
    },
    [cart.id]
  );

  const isItemLoading = useCallback(
    (variantId) => loadingItems.has(variantId),
    [loadingItems]
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

  // Count unique items in cart (not total quantity)
  const cartCount = cart.items.length;

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
        isItemLoading,
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
