import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";
export type CartItem = {
  key: string;
  productId: number;
  color: string;
  size: string;
  quantity: number;
};
type Store = {
  cart: CartItem[];
  wishlist: number[];
  toast: string;
  addToCart: (
    product: Product,
    color: string,
    size: string,
    quantity?: number,
  ) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  toggleWishlist: (id: number) => void;
  notify: (message: string) => void;
  clearCart: () => void;
};
const Ctx = createContext<Store | null>(null);
function stored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => stored("avano-cart", []));
  const [wishlist, setWishlist] = useState<number[]>(() =>
    stored("avano-wishlist", []),
  );
  const [toast, setToast] = useState("");
  useEffect(() => {
    localStorage.setItem("avano-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("avano-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const notify = (message: string) => setToast(message);
  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity = 1,
  ) => {
    if (product.stock === 0) {
      notify("این محصول در حال حاضر موجود نیست");
      return;
    }
    const key = `${product.id}-${color}-${size}`;
    setCart((items) => {
      const existing = items.find((i) => i.key === key);
      return existing
        ? items.map((i) =>
            i.key === key
              ? {
                  ...i,
                  quantity: Math.min(product.stock, i.quantity + quantity),
                }
              : i,
          )
        : [
            ...items,
            {
              key,
              productId: product.id,
              color,
              size,
              quantity: Math.min(product.stock, quantity),
            },
          ];
    });
    notify("محصول به سبد خرید اضافه شد");
  };
  const removeFromCart = (key: string) => {
    setCart((items) => items.filter((i) => i.key !== key));
    notify("محصول از سبد خرید حذف شد");
  };
  const updateQuantity = (key: string, quantity: number) =>
    setCart((items) =>
      items.map((i) =>
        i.key === key
          ? {
              ...i,
              quantity: Math.min(
                products.find((p) => p.id === i.productId)?.stock || 1,
                Math.max(1, quantity),
              ),
            }
          : i,
      ),
    );
  const toggleWishlist = (id: number) =>
    setWishlist((ids) => {
      const exists = ids.includes(id);
      notify(exists ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
      return exists ? ids.filter((i) => i !== id) : [...ids, id];
    });
  return (
    <Ctx.Provider
      value={{
        cart,
        wishlist,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        notify,
        clearCart: () => setCart([]),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw Error("StoreProvider missing");
  return ctx;
}
export function useCartTotals() {
  const { cart } = useStore();
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (products.find((p) => p.id === item.productId)?.price || 0) *
        item.quantity,
    0,
  );
  const shipping = subtotal >= 3000000 || subtotal === 0 ? 0 : 120000;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    count: cart.reduce((sum, i) => sum + i.quantity, 0),
  };
}
