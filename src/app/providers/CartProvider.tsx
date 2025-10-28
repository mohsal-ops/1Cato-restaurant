"use client";

import { createContext, useContext, ReactNode } from "react";
import useSWR, { KeyedMutator } from "swr";

interface CartContextType {
  cartItems: any[];
  cartId: string | null;
  mutate: KeyedMutator<any>;
}

// Create context with correct type
const CartContext = createContext<CartContextType | null>(null);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CartProvider({ children }: { children: ReactNode }) {
  const { data, mutate } = useSWR("/api/cart/get", fetcher);

  const cartItems = data?.cart?.items ?? [];
  const cartId = data?.cart?.id ?? null;

  return (
    <CartContext.Provider value={{ cartItems, cartId, mutate }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
