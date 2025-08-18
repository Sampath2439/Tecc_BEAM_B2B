import { CartItem, WishlistItem } from '@/contexts/AppContext';

export const sampleCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    brand: "Royal Brand",
    price: 2400,
    originalPrice: 2800,
    image: "🌾",
    quantity: 2,
    minOrder: "50 kg bags",
    category: "Groceries",
    gstNumber: "GST123456789"
  },
  {
    id: 2,
    name: "Industrial Hand Soap",
    brand: "CleanPro",
    price: 1200,
    originalPrice: 1500,
    image: "🧼",
    quantity: 1,
    minOrder: "24 units",
    category: "Personal Care",
    gstNumber: "GST987654321"
  }
];

export const sampleWishlistItems: WishlistItem[] = [
  {
    id: 3,
    name: "Wireless Bluetooth Earphones",
    brand: "TechSound",
    price: 1800,
    image: "🎧",
    category: "Electronics",
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: 4,
    name: "Multi-Purpose Cleaner",
    brand: "SparkleClean",
    price: 580,
    image: "🧽",
    category: "Home & Cleaning",
    rating: 4.0,
    reviewCount: 203
  },
  {
    id: 5,
    name: "A4 Premium Paper",
    brand: "PaperMax",
    price: 680,
    originalPrice: 800,
    image: "📄",
    category: "Office Supplies",
    rating: 4.4,
    reviewCount: 134
  }
];
