"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  createCart,
  addToCart as addToCartApi,
  updateCart,
  removeFromCart as removeFromCartApi,
  getCart,
} from "@/lib/shopify/cart";
import { transformCart } from "@/lib/shopify/transformers";
import { products as localProducts } from "@/data/products";

const CartContext = createContext();

// Local catalog products (used while Shopify is unreachable) get a browser-only cart
const LOCAL_CART_ID = "local-cart";
const isLocalVariant = (variantId) => variantId?.startsWith("demo-variant-");

function getLocalLines(cart) {
  if (cart.id !== LOCAL_CART_ID) return [];
  return cart.items.map(({ variantId, quantity }) => ({ variantId, quantity }));
}

function buildLocalCart(lines) {
  const items = lines
    .map(({ variantId, quantity }) => {
      const product = localProducts.find((p) => p.variantId === variantId);
      if (!product) return null;

      return {
        lineId: variantId,
        variantId,
        name: product.name,
        variantTitle: null,
        price: product.price,
        quantity,
        image: product.image,
        slug: product.slug,
      };
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { id: LOCAL_CART_ID, checkoutUrl: null, items, subtotal, total: subtotal };
}

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

  // Queue system to prevent race conditions
  const cartIdRef = useRef(null);
  const pendingOperations = useRef([]);
  const isProcessing = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    cartIdRef.current = cart.id;
  }, [cart.id]);

  // Function to refresh cart from Shopify
  const refreshCart = useCallback(async () => {
    const savedCartId = localStorage.getItem("shopifyCartId");

    if (savedCartId === LOCAL_CART_ID) {
      try {
        setCart(buildLocalCart(JSON.parse(localStorage.getItem("localCartLines") || "[]")));
      } catch {
        localStorage.removeItem("localCartLines");
      }
    } else if (savedCartId) {
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
        console.warn("Error loading cart:", error);
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

  // Persist local cart lines so they survive a page reload
  useEffect(() => {
    if (cart.id === LOCAL_CART_ID) {
      localStorage.setItem("localCartLines", JSON.stringify(getLocalLines(cart)));
    }
  }, [cart]);

  // Process queued operations sequentially
  const processQueue = useCallback(async () => {
    if (isProcessing.current || pendingOperations.current.length === 0) return;

    isProcessing.current = true;

    while (pendingOperations.current.length > 0) {
      const { variantId, quantity, resolve } = pendingOperations.current.shift();

      try {
        if (isLocalVariant(variantId)) {
          setCart((prev) => {
            const lines = getLocalLines(prev);
            const existing = lines.find((line) => line.variantId === variantId);
            if (existing) existing.quantity += quantity;
            else lines.push({ variantId, quantity });
            return buildLocalCart(lines);
          });
          cartIdRef.current = LOCAL_CART_ID;
          resolve(true);
          continue;
        }

        const lines = [{ merchandiseId: variantId, quantity }];
        let shopifyCart;

        if (cartIdRef.current && cartIdRef.current !== LOCAL_CART_ID) {
          shopifyCart = await addToCartApi(cartIdRef.current, lines);
        } else {
          shopifyCart = await createCart(lines);
        }

        const transformedCart = transformCart(shopifyCart);
        cartIdRef.current = transformedCart.id;
        setCart(transformedCart);
        resolve(true);
      } catch (error) {
        console.error("Error adding to cart:", error);
        resolve(false);
      } finally {
        setLoadingItems((prev) => {
          const next = new Set(prev);
          next.delete(variantId);
          return next;
        });
      }
    }

    isProcessing.current = false;
  }, []);

  const addToCart = useCallback(
    (variantId, quantity = 1) => {
      setLoadingItems((prev) => new Set(prev).add(variantId));

      return new Promise((resolve) => {
        pendingOperations.current.push({ variantId, quantity, resolve });
        processQueue();
      });
    },
    [processQueue]
  );

  const isItemLoading = useCallback(
    (variantId) => loadingItems.has(variantId),
    [loadingItems]
  );

  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      if (!cart.id || quantity < 1) return;

      if (cart.id === LOCAL_CART_ID) {
        setCart((prev) =>
          buildLocalCart(
            getLocalLines(prev).map((line) =>
              line.variantId === lineId ? { ...line, quantity } : line
            )
          )
        );
        return;
      }

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

      if (cart.id === LOCAL_CART_ID) {
        setCart((prev) =>
          buildLocalCart(getLocalLines(prev).filter((line) => line.variantId !== lineId))
        );
        return;
      }

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
    localStorage.removeItem("localCartLines");
  }, []);

  // Count unique items in cart (not total quantity)
  const cartCount = cart.items.length;

  return (
    <CartContext.Provider
      value={{
        cart: cart.items,
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
        isLocalCart: cart.id === LOCAL_CART_ID,
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
