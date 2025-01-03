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

interface UserState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

const updateCartandSave = (
  modifyCart: (cartItems: CartItem[]) => CartItem[]
): CartItem[] => {
  const currentCart = loadCartFromLocalStorage();
  const updateCart = modifyCart(currentCart);
  localStorage.setItem("cartItems", JSON.stringify(updateCart));
  return updateCart;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: loadCartFromLocalStorage(),

  addToCart: (item) => {
    set(() => {
      const updateCart = updateCartandSave((cartItems) => {
        const existingItem = cartItems.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
          return cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...cartItems, { ...item, quantity: 1 }];
      });
      return { cartItems: updateCart };
    });
  },

  removeFromCart: (id) => {
    set(() => {
      const updateCart = updateCartandSave((cartItems) =>
        cartItems.filter((cartItem) => cartItem.id !== id)
      );
      return { cartItems: updateCart };
    });
  },

  increaseQuantity: (id) => {
    set(() => {
      const updateCart = updateCartandSave((cartItems) =>
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      return { cartItems: updateCart };
    });
  },

  decreaseQuantity: (id) => {
    set(() => {
      const updateCart = updateCartandSave((cartItems) =>
        cartItems
          .map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0)
      );
      return { cartItems: updateCart };
    });
  },

  clearCart: () => {
    set(() => {
      localStorage.removeItem("cartItems");
      return { cartItems: [] };
    });
  },
}));

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  login: () => {
    set(() => ({ isAuthenticated: true }));
    localStorage.setItem("isAuthenticated", "true");
  },
  logout: () => {
    set(() => ({ isAuthenticated: false }));
    localStorage.removeItem("isAuthenticated");
  },
}));
