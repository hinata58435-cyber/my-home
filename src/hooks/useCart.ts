import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCTS, type Product } from '@/data/products';

export interface CartItem {
  id: string;
  quantity: number;
}

const STORAGE_KEY = 'myhome_cart_v1';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === 'string' && typeof x.quantity === 'number')
      .map((x) => ({ id: x.id, quantity: Math.max(1, Math.floor(x.quantity)) }));
  } catch {
    return [];
  }
}

const productById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { id, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById(item.id);
          if (!product) return null;
          return { ...item, product, lineTotal: product.price * item.quantity };
        })
        .filter((x): x is CartLine => x !== null),
    [items],
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.lineTotal, 0),
    [detailedItems],
  );

  return {
    items,
    detailedItems,
    count,
    subtotal,
    addToCart,
    setQuantity,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  };
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}
