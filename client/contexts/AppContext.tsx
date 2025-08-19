import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

// Types
export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  notifications: Notification[];
  user: {
    name: string;
    company: string;
    email: string;
    isLoggedIn: boolean;
  };
}

// Action Types
type AppAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_USER'; payload: Partial<AppState['user']> }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> };

// Initial State
const initialState: AppState = {
  cart: [],
  wishlist: [],
  notifications: [
    {
      id: '1',
      title: 'New Bulk Deal Available',
      message: 'Premium Basmati Rice now 20% off for orders above 100kg',
      type: 'success',
      isRead: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actionUrl: '/deals'
    },
    {
      id: '2',
      title: 'Order Shipped',
      message: 'Your order #TB-2024-001 has been shipped and will arrive in 2-3 days',
      type: 'info',
      isRead: false,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      actionUrl: '/orders'
    },
    {
      id: '3',
      title: 'Stock Alert',
      message: 'Industrial Hand Soap is running low in stock. Order now!',
      type: 'warning',
      isRead: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      actionUrl: '/products'
    }
  ],
  user: {
    name: 'Gnana Sampath',
    company: 'Gnana Sampath',
    email: 'gnana@example.com',
    isLoggedIn: true,
  }
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (exists) return state;
      
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [{
          ...action.payload,
          id: Date.now().toString(),
          timestamp: new Date()
        }, ...state.notifications]
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        )
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getUnreadNotificationsCount: () => number;
} | undefined>(undefined);

// Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('techbeam-cart');
      const savedWishlist = localStorage.getItem('techbeam-wishlist');
      const savedNotifications = localStorage.getItem('techbeam-notifications');
      
      if (savedCart || savedWishlist || savedNotifications) {
        dispatch({
          type: 'LOAD_FROM_STORAGE',
          payload: {
            cart: savedCart ? JSON.parse(savedCart) : [],
            wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
            notifications: savedNotifications ? JSON.parse(savedNotifications) : state.notifications
          }
        });
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('techbeam-cart', JSON.stringify(state.cart));
      localStorage.setItem('techbeam-wishlist', JSON.stringify(state.wishlist));
      localStorage.setItem('techbeam-notifications', JSON.stringify(state.notifications));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state.cart, state.wishlist, state.notifications]);

  // Helper functions
  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: number) => {
    const item = state.cart.find(item => item.id === productId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.name} has been removed from your cart.`,
      });
    }
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
  };

  const addToWishlist = (product: WishlistItem) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: number) => {
    const item = state.wishlist.find(item => item.id === productId);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    if (item) {
      toast({
        title: "Removed from Wishlist",
        description: `${item.name} has been removed from your wishlist.`,
      });
    }
  };

  const toggleWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) => {
    return state.wishlist.some(item => item.id === productId);
  };

  const isInCart = (productId: number) => {
    return state.cart.some(item => item.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    const item = state.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getUnreadNotificationsCount = () => {
    return state.notifications.filter(notification => !notification.isRead).length;
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      isInCart,
      getCartItemQuantity,
      getCartTotal,
      getCartItemsCount,
      getUnreadNotificationsCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
