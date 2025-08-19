import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useApp } from "@/contexts/AppContext";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  Heart,
  Package,
  Grid3X3,
  List,
  SlidersHorizontal,
  ArrowLeft,
} from "lucide-react";
import Layout from "@/components/Layout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLevel: "high" | "medium" | "low";
  description: string;
  subcategory: string;
  discount?: number;
}

const categoryData = {
  1: {
    name: "Groceries & Food",
    slug: "groceries-food",
    description: "Fresh groceries, packaged foods, and daily essentials",
    image: "🛒",
    color: "bg-green-100 text-green-800",
    subcategories: ["Rice & Grains", "Spices & Seasonings", "Packaged Foods", "Beverages", "Cooking Oils"],
  },
  2: {
    name: "Personal Care",
    slug: "personal-care",
    description: "Soaps, shampoos, cosmetics, and hygiene products",
    image: "🧴",
    color: "bg-pink-100 text-pink-800",
    subcategories: ["Bath & Body", "Hair Care", "Oral Care", "Skincare", "Fragrances"],
  },
  3: {
    name: "Electronics",
    slug: "electronics",
    description: "Phones, accessories, and electronic gadgets",
    image: "📱",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["Mobile Phones", "Accessories", "Audio", "Smart Devices", "Computers"],
  },
  4: {
    name: "Home & Cleaning",
    slug: "home-cleaning",
    description: "Detergents, cleaners, and household items",
    image: "🏠",
    color: "bg-purple-100 text-purple-800",
    subcategories: ["Detergents", "Cleaners", "Kitchen Items", "Home Decor", "Storage"],
  },
  5: {
    name: "Office & Stationery",
    slug: "office-stationery",
    description: "Stationery, paper, and office equipment",
    image: "📄",
    color: "bg-orange-100 text-orange-800",
    subcategories: ["Paper Products", "Writing Instruments", "Filing & Storage", "Printing Supplies", "Desk Accessories"],
  },
  6: {
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Supplements, first aid, and health products",
    image: "💊",
    color: "bg-red-100 text-red-800",
    subcategories: ["Supplements", "First Aid", "Health Devices", "Fitness Equipment", "Medical Supplies"],
  },
  7: {
    name: "Textiles & Apparel",
    slug: "textiles-apparel",
    description: "Clothing, fabrics, and textile products",
    image: "👕",
    color: "bg-indigo-100 text-indigo-800",
    subcategories: ["Men's Wear", "Women's Wear", "Kids Wear", "Fabrics", "Accessories"],
  },
  8: {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Sports equipment, fitness gear, and recreational products",
    image: "⚽",
    color: "bg-yellow-100 text-yellow-800",
    subcategories: ["Fitness Equipment", "Sports Gear", "Outdoor Activities", "Nutrition", "Athletic Wear"],
  },
};

const mockProducts: Record<number, Product[]> = {
  1: [ // Groceries & Food
    {
      id: 101,
      name: "Premium Basmati Rice",
      brand: "Royal Brand",
      category: "Groceries & Food",
      price: 240,
      originalPrice: 280,
      image: "🌾",
      rating: 4.5,
      reviewCount: 1234,
      inStock: true,
      stockLevel: "high",
      description: "Premium quality basmati rice with long grains and aromatic fragrance",
      subcategory: "Rice & Grains",
      discount: 14,
    },
    {
      id: 102,
      name: "Organic Turmeric Powder",
      brand: "Nature's Best",
      category: "Groceries & Food",
      price: 180,
      originalPrice: 200,
      image: "🌿",
      rating: 4.7,
      reviewCount: 856,
      inStock: true,
      stockLevel: "medium",
      description: "Pure organic turmeric powder for cooking and health benefits",
      subcategory: "Spices & Seasonings",
      discount: 10,
    },
    {
      id: 103,
      name: "Whole Wheat Pasta",
      brand: "Italiano",
      category: "Groceries & Food",
      price: 120,
      image: "🍝",
      rating: 4.3,
      reviewCount: 542,
      inStock: true,
      stockLevel: "high",
      description: "Healthy whole wheat pasta made from premium wheat",
      subcategory: "Packaged Foods",
    },
    {
      id: 104,
      name: "Green Tea Bags",
      brand: "TeaTime",
      category: "Groceries & Food",
      price: 250,
      originalPrice: 300,
      image: "🍵",
      rating: 4.4,
      reviewCount: 723,
      inStock: true,
      stockLevel: "high",
      description: "Premium green tea bags with natural antioxidants",
      subcategory: "Beverages",
      discount: 17,
    },
    {
      id: 105,
      name: "Cold Pressed Coconut Oil",
      brand: "Pure Nature",
      category: "Groceries & Food",
      price: 320,
      image: "🥥",
      rating: 4.6,
      reviewCount: 467,
      inStock: true,
      stockLevel: "medium",
      description: "Cold pressed virgin coconut oil for cooking and health",
      subcategory: "Cooking Oils",
    },
  ],
  2: [ // Personal Care
    {
      id: 201,
      name: "Premium Hand Soap",
      brand: "CleanPro",
      category: "Personal Care",
      price: 120,
      originalPrice: 150,
      image: "🧼",
      rating: 4.5,
      reviewCount: 1024,
      inStock: true,
      stockLevel: "high",
      description: "Gentle antibacterial hand soap with moisturizing formula",
      subcategory: "Bath & Body",
      discount: 20,
    },
    {
      id: 202,
      name: "Herbal Shampoo",
      brand: "HerbCare",
      category: "Personal Care",
      price: 280,
      image: "🧴",
      rating: 4.3,
      reviewCount: 678,
      inStock: true,
      stockLevel: "medium",
      description: "Natural herbal shampoo for all hair types",
      subcategory: "Hair Care",
    },
    {
      id: 203,
      name: "Whitening Toothpaste",
      brand: "SmileBright",
      category: "Personal Care",
      price: 85,
      originalPrice: 100,
      image: "🦷",
      rating: 4.4,
      reviewCount: 892,
      inStock: true,
      stockLevel: "high",
      description: "Advanced whitening toothpaste with fluoride protection",
      subcategory: "Oral Care",
      discount: 15,
    },
    {
      id: 204,
      name: "Face Moisturizer",
      brand: "GlowSkin",
      category: "Personal Care",
      price: 450,
      image: "✨",
      rating: 4.6,
      reviewCount: 523,
      inStock: true,
      stockLevel: "medium",
      description: "Daily face moisturizer with SPF protection",
      subcategory: "Skincare",
    },
  ],
  3: [ // Electronics
    {
      id: 301,
      name: "Wireless Earphones",
      brand: "SoundMax",
      category: "Electronics",
      price: 1200,
      originalPrice: 1500,
      image: "🎧",
      rating: 4.5,
      reviewCount: 1456,
      inStock: true,
      stockLevel: "high",
      description: "High-quality wireless earphones with noise cancellation",
      subcategory: "Audio",
      discount: 20,
    },
    {
      id: 302,
      name: "Phone Case",
      brand: "ProtectMax",
      category: "Electronics",
      price: 350,
      image: "📱",
      rating: 4.2,
      reviewCount: 834,
      inStock: true,
      stockLevel: "high",
      description: "Durable phone case with drop protection",
      subcategory: "Accessories",
    },
    {
      id: 303,
      name: "Power Bank",
      brand: "PowerBoost",
      category: "Electronics",
      price: 800,
      originalPrice: 1000,
      image: "🔋",
      rating: 4.4,
      reviewCount: 672,
      inStock: true,
      stockLevel: "medium",
      description: "10000mAh power bank with fast charging",
      subcategory: "Accessories",
      discount: 20,
    },
    {
      id: 304,
      name: "Smart Watch",
      brand: "FitTrack",
      category: "Electronics",
      price: 2500,
      image: "⌚",
      rating: 4.3,
      reviewCount: 445,
      inStock: true,
      stockLevel: "medium",
      description: "Smart watch with fitness tracking and heart rate monitor",
      subcategory: "Smart Devices",
    },
  ],
  4: [ // Home & Cleaning
    {
      id: 401,
      name: "All-Purpose Cleaner",
      brand: "CleanMaster",
      category: "Home & Cleaning",
      price: 180,
      image: "🧽",
      rating: 4.5,
      reviewCount: 756,
      inStock: true,
      stockLevel: "high",
      description: "Multi-surface cleaner for kitchen and bathroom",
      subcategory: "Cleaners",
    },
    {
      id: 402,
      name: "Laundry Detergent",
      brand: "FreshWash",
      category: "Home & Cleaning",
      price: 220,
      originalPrice: 250,
      image: "🧴",
      rating: 4.4,
      reviewCount: 923,
      inStock: true,
      stockLevel: "high",
      description: "Concentrated laundry detergent with stain removal",
      subcategory: "Detergents",
      discount: 12,
    },
    {
      id: 403,
      name: "Kitchen Towels",
      brand: "SoftTouch",
      category: "Home & Cleaning",
      price: 120,
      image: "🧻",
      rating: 4.3,
      reviewCount: 567,
      inStock: true,
      stockLevel: "medium",
      description: "Absorbent kitchen towels for cleaning and drying",
      subcategory: "Kitchen Items",
    },
  ],
  5: [ // Office Supplies
    {
      id: 501,
      name: "A4 Paper Pack",
      brand: "PaperMax",
      category: "Office Supplies",
      price: 68,
      originalPrice: 80,
      image: "📄",
      rating: 4.2,
      reviewCount: 432,
      inStock: true,
      stockLevel: "high",
      description: "High-quality A4 paper for printing and copying",
      subcategory: "Paper Products",
      discount: 15,
    },
    {
      id: 502,
      name: "Ball Point Pens",
      brand: "WriteWell",
      category: "Office Supplies",
      price: 45,
      image: "✏️",
      rating: 4.1,
      reviewCount: 654,
      inStock: true,
      stockLevel: "high",
      description: "Smooth writing ball point pens pack of 10",
      subcategory: "Stationery",
    },
    {
      id: 503,
      name: "File Folders",
      brand: "OrganiMax",
      category: "Office Supplies",
      price: 150,
      image: "📁",
      rating: 4.3,
      reviewCount: 289,
      inStock: true,
      stockLevel: "medium",
      description: "Durable file folders for document organization",
      subcategory: "Storage",
    },
  ],
  6: [ // Health & Wellness
    {
      id: 601,
      name: "Vitamin C Tablets",
      brand: "HealthBoost",
      category: "Health & Wellness",
      price: 280,
      image: "💊",
      rating: 4.5,
      reviewCount: 678,
      inStock: true,
      stockLevel: "high",
      description: "High-strength vitamin C tablets for immunity",
      subcategory: "Supplements",
    },
    {
      id: 602,
      name: "First Aid Kit",
      brand: "MediCare",
      category: "Health & Wellness",
      price: 450,
      originalPrice: 500,
      image: "🩹",
      rating: 4.4,
      reviewCount: 345,
      inStock: true,
      stockLevel: "medium",
      description: "Complete first aid kit for home and office",
      subcategory: "First Aid",
      discount: 10,
    },
    {
      id: 603,
      name: "Protein Powder",
      brand: "FitMax",
      category: "Health & Wellness",
      price: 1200,
      image: "💪",
      rating: 4.6,
      reviewCount: 823,
      inStock: true,
      stockLevel: "medium",
      description: "Whey protein powder for muscle building",
      subcategory: "Fitness",
    },
  ],
};

export default function CategoryProducts() {
  const { id } = useParams<{ id: string }>();

  // Handle both numeric IDs and slugs
  let categoryId: number;
  if (id && isNaN(parseInt(id))) {
    // It's a slug, find the category ID
    const foundCategory = Object.entries(categoryData).find(([_, cat]) => cat.slug === id);
    categoryId = foundCategory ? parseInt(foundCategory[0]) : 1;
  } else {
    // It's a numeric ID
    categoryId = parseInt(id || "1");
  }

  const category = categoryData[categoryId as keyof typeof categoryData];
  const products = mockProducts[categoryId] || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSubcategory = selectedSubcategories.length === 0 || 
                                selectedSubcategories.includes(product.subcategory);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      return matchesSearch && matchesPrice && matchesSubcategory && matchesBrand;
    });

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, searchQuery, priceRange, selectedSubcategories, selectedBrands, sortBy]);

  if (!category) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
            <p className="text-gray-600 mb-4">The requested category could not be found.</p>
            <Link to="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/categories">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{category.image}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-lg text-gray-600">{category.description}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Price Range</h3>
                <div className="space-y-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Subcategories</h3>
                <div className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory} className="flex items-center space-x-2">
                      <Checkbox
                        id={subcategory}
                        checked={selectedSubcategories.includes(subcategory)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSubcategories([...selectedSubcategories, subcategory]);
                          } else {
                            setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategory));
                          }
                        }}
                      />
                      <label htmlFor={subcategory} className="text-sm text-gray-700">
                        {subcategory}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                      />
                      <label htmlFor={brand} className="text-sm text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{product.image}</div>
                        <Badge className={category.color} variant="secondary">
                          {product.subcategory}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-600">{product.brand}</p>
                        
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-tech-beam-600">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {product.discount && (
                            <Badge variant="destructive" className="text-xs">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-gray-500">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              brand: product.brand,
                              price: product.price,
                              originalPrice: product.originalPrice,
                              image: product.image,
                              category: product.category,
                            }, 1);
                          }}
                          className="flex-1 h-8 text-xs"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleWishlist({
                            id: product.id,
                            name: product.name,
                            brand: product.brand,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            category: product.category,
                            rating: product.rating,
                            reviewCount: product.reviewCount,
                          })}
                          className="h-8 w-8 p-0"
                        >
                          <Heart 
                            className={`w-3 h-3 ${
                              isInWishlist(product.id) 
                                ? "text-red-500 fill-current" 
                                : "text-gray-400"
                            }`} 
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{product.image}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.brand}</p>
                              <Badge className={category.color} variant="secondary">
                                {product.subcategory}
                              </Badge>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-tech-beam-600">
                                  ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              {product.discount && (
                                <Badge variant="destructive" className="text-xs">
                                  -{product.discount}% off
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {product.rating} ({product.reviewCount})
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-500">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  addToCart({
                                    id: product.id,
                                    name: product.name,
                                    brand: product.brand,
                                    price: product.price,
                                    originalPrice: product.originalPrice,
                                    image: product.image,
                                    category: product.category,
                                  }, 1);
                                }}
                                disabled={!product.inStock}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => toggleWishlist({
                                  id: product.id,
                                  name: product.name,
                                  brand: product.brand,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  image: product.image,
                                  category: product.category,
                                  rating: product.rating,
                                  reviewCount: product.reviewCount,
                                })}
                              >
                                <Heart 
                                  className={`w-4 h-4 mr-2 ${
                                    isInWishlist(product.id) 
                                      ? "text-red-500 fill-current" 
                                      : "text-gray-400"
                                  }`} 
                                />
                                Wishlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
