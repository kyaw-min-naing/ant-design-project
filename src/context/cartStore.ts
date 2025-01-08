import { create } from "zustand";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

const loadCart = (): CartItem[] => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = (cartItems: CartItem[]): void => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: loadCart(),

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      const updatedCart = existingItem
        ? state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...state.cartItems, { ...item, quantity: 1 }];

      saveCart(updatedCart);
      return { cartItems: updatedCart };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const updatedCart = state.cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      saveCart(updatedCart);
      return { cartItems: updatedCart };
    });
  },

  increaseQuantity: (id) => {
    set((state) => {
      const updatedCart = state.cartItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      saveCart(updatedCart);
      return { cartItems: updatedCart };
    });
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const updatedCart = state.cartItems
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);
      saveCart(updatedCart);
      return { cartItems: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      localStorage.removeItem("cartItems");
      return { cartItems: [] };
    });
  },
}));
