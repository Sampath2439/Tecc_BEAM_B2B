import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useApp } from "@/contexts/AppContext";
import { DemoActions } from "@/components/DemoActions";
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
  Truck,
  Shield,
  Grid3X3,
  List,
  SlidersHorizontal
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
  minOrder: string;
  description: string;
  gstNumber: string;
  isDealer?: boolean;
  isFeatured?: boolean;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();

  // Mock product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      brand: "Royal Brand",
      category: "Groceries",
      price: 2400,
      originalPrice: 2800,
      image: "🌾",
      rating: 4.5,
      reviewCount: 245,
      inStock: true,
      stockLevel: "high",
      minOrder: "50 kg bags",
      description: "Premium quality aged basmati rice, perfect for retail and hospitality",
      gstNumber: "GST123456789",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Industrial Hand Soap",
      brand: "CleanPro",
      category: "Personal Care",
      price: 1200,
      originalPrice: 1500,
      image: "🧼",
      rating: 4.2,
      reviewCount: 156,
      inStock: true,
      stockLevel: "medium",
      minOrder: "24 units",
      description: "Antibacterial hand soap for commercial and industrial use",
      gstNumber: "GST987654321",
      isDealer: true,
    },
    {
      id: 3,
      name: "Wireless Bluetooth Earphones",
      brand: "TechSound",
      category: "Electronics",
      price: 1800,
      image: "🎧",
      rating: 4.3,
      reviewCount: 89,
      inStock: true,
      stockLevel: "high",
      minOrder: "10 pieces",
      description: "High-quality wireless earphones with premium sound",
      gstNumber: "GST456789123",
    },
    {
      id: 4,
      name: "Multi-Purpose Cleaner",
      brand: "SparkleClean",
      category: "Home & Cleaning",
      price: 580,
      image: "🧽",
      rating: 4.0,
      reviewCount: 203,
      inStock: true,
      stockLevel: "low",
      minOrder: "12 bottles",
      description: "All-in-one cleaning solution for home and office use",
      gstNumber: "GST789123456",
    },
    {
      id: 5,
      name: "A4 Premium Paper",
      brand: "PaperMax",
      category: "Office Supplies",
      price: 680,
      originalPrice: 800,
      image: "📄",
      rating: 4.4,
      reviewCount: 134,
      inStock: true,
      stockLevel: "high",
      minOrder: "10 reams",
      description: "High-quality A4 paper for printing and documentation",
      gstNumber: "GST321654987",
      isFeatured: true,
    },
    {
      id: 6,
      name: "Vitamin C Tablets",
      brand: "HealthPlus",
      category: "Health & Wellness",
      price: 450,
      image: "💊",
      rating: 4.6,
      reviewCount: 312,
      inStock: false,
      stockLevel: "low",
      minOrder: "50 bottles",
      description: "Essential vitamin C supplements for immunity support",
      gstNumber: "GST654987321",
    },
    {
      id: 7,
      name: "Cotton T-Shirts",
      brand: "ComfortWear",
      category: "Textiles",
      price: 2500,
      image: "👕",
      rating: 4.1,
      reviewCount: 67,
      inStock: true,
      stockLevel: "medium",
      minOrder: "25 pieces",
      description: "High-quality cotton t-shirts for retail chains",
      gstNumber: "GST147258369",
    },
    {
      id: 8,
      name: "Yoga Mats",
      brand: "FitLife",
      category: "Sports & Fitness",
      price: 1250,
      image: "🧘",
      rating: 4.3,
      reviewCount: 98,
      inStock: true,
      stockLevel: "high",
      minOrder: "20 mats",
      description: "Professional yoga mats for gyms and fitness centers",
      gstNumber: "GST258369147",
    },
  ];

  const categories = [...new Set(allProducts.map(p => p.category))];
  const brands = [...new Set(allProducts.map(p => p.brand))];
  const availabilityOptions = ["In Stock", "Low Stock", "Out of Stock"];

  // Filter products based on current filters
  const filteredProducts = allProducts.filter(product => {
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Availability filter
    if (selectedAvailability.length > 0) {
      const availability = product.inStock ? 
        (product.stockLevel === "low" ? "Low Stock" : "In Stock") : 
        "Out of Stock";
      if (!selectedAvailability.includes(availability)) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedAvailability([]);
    setSearchParams({});
  };

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedAvailability.length;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                  <p className="text-gray-600">{sortedProducts.length} products found</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search products, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 space-y-6`}>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Price Range */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                    <span className="font-medium text-gray-700">Price Range</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-2">
                    <div className="space-y-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Categories */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
                    <span className="font-medium text-gray-700">Categories</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                        />
                        <label htmlFor={`cat-${category}`} className="text-sm text-gray-700 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Brands */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
                    <span className="font-medium text-gray-700">Brands</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Availability */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-t pt-4">
                    <span className="font-medium text-gray-700">Availability</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 pt-2">
                    {availabilityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`avail-${option}`}
                          checked={selectedAvailability.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAvailability([...selectedAvailability, option]);
                            } else {
                              setSelectedAvailability(selectedAvailability.filter(a => a !== option));
                            }
                          }}
                        />
                        <label htmlFor={`avail-${option}`} className="text-sm text-gray-700 cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Product Grid/List */}
            <div className="flex-1">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Product Image and Badges */}
                            <div className="relative">
                              <div className="text-6xl text-center py-4 bg-gray-50 rounded-lg">
                                {product.image}
                              </div>
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {product.isFeatured && (
                                  <Badge className="bg-tech-beam-600 text-white text-xs">
                                    Featured
                                  </Badge>
                                )}
                                {product.originalPrice && (
                                  <Badge className="bg-red-500 text-white text-xs">
                                    Sale
                                  </Badge>
                                )}
                              </div>
                              <div className="absolute top-2 right-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const wishlistItem = {
                                      id: product.id,
                                      name: product.name,
                                      brand: product.brand,
                                      price: product.price,
                                      originalPrice: product.originalPrice,
                                      image: product.image,
                                      category: product.category,
                                      rating: product.rating,
                                      reviewCount: product.reviewCount
                                    };
                                    toggleWishlist(wishlistItem);
                                  }}
                                >
                                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
                                </Button>
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                              <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                              <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-tech-beam-600 transition-colors">
                                {product.name}
                              </h3>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
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
                                <span className="text-xs text-gray-500">
                                  ({product.reviewCount})
                                </span>
                              </div>

                              {/* Price */}
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-tech-beam-600">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                      ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500">Min order: {product.minOrder}</p>
                              </div>

                              {/* Stock Status */}
                              <div className="flex items-center gap-2">
                                {product.inStock ? (
                                  <Badge variant="outline" className={`text-xs ${
                                    product.stockLevel === "high" ? "text-green-600 border-green-200" :
                                    product.stockLevel === "medium" ? "text-yellow-600 border-yellow-200" :
                                    "text-orange-600 border-orange-200"
                                  }`}>
                                    {product.stockLevel === "high" ? "In Stock" :
                                     product.stockLevel === "medium" ? "Limited Stock" :
                                     "Low Stock"}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                                    Out of Stock
                                  </Badge>
                                )}
                                {product.isDealer && (
                                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>

                              {/* Add to Cart Button */}
                              <Button
                                className="w-full bg-tech-beam-600 hover:bg-tech-beam-700 text-white"
                                disabled={!product.inStock}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (product.inStock) {
                                    const cartItem = {
                                      id: product.id,
                                      name: product.name,
                                      brand: product.brand,
                                      price: product.price,
                                      originalPrice: product.originalPrice,
                                      image: product.image,
                                      minOrder: product.minOrder,
                                      category: product.category,
                                      gstNumber: product.gstNumber
                                    };
                                    addToCart(cartItem, 1);
                                  }
                                }}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {product.inStock ? (isInCart(product.id) ? "Added to Cart" : "Add to Cart") : "Out of Stock"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 bg-white">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="text-4xl">{product.image}</div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-sm text-gray-500 uppercase">{product.brand}</p>
                                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-tech-beam-600 transition-colors">
                                    {product.name}
                                  </h3>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const wishlistItem = {
                                      id: product.id,
                                      name: product.name,
                                      brand: product.brand,
                                      price: product.price,
                                      originalPrice: product.originalPrice,
                                      image: product.image,
                                      category: product.category,
                                      rating: product.rating,
                                      reviewCount: product.reviewCount
                                    };
                                    toggleWishlist(wishlistItem);
                                  }}
                                >
                                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
                                </Button>
                              </div>
                              
                              <p className="text-gray-600 text-sm">{product.description}</p>
                              
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(product.rating) 
                                          ? "text-yellow-400 fill-current" 
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-500 ml-2">
                                    ({product.reviewCount} reviews)
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {product.inStock ? (
                                    <Badge variant="outline" className={`text-xs ${
                                      product.stockLevel === "high" ? "text-green-600 border-green-200" :
                                      product.stockLevel === "medium" ? "text-yellow-600 border-yellow-200" :
                                      "text-orange-600 border-orange-200"
                                    }`}>
                                      {product.stockLevel === "high" ? "In Stock" :
                                       product.stockLevel === "medium" ? "Limited Stock" :
                                       "Low Stock"}
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                                      Out of Stock
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-tech-beam-600">
                                      ₹{product.price.toLocaleString()}
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-lg text-gray-400 line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">Min order: {product.minOrder}</p>
                                </div>
                                
                                <Button
                                  className="bg-tech-beam-600 hover:bg-tech-beam-700 text-white px-8"
                                  disabled={!product.inStock}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (product.inStock) {
                                      const cartItem = {
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand,
                                        price: product.price,
                                        originalPrice: product.originalPrice,
                                        image: product.image,
                                        minOrder: product.minOrder,
                                        category: product.category,
                                        gstNumber: product.gstNumber
                                      };
                                      addToCart(cartItem, 1);
                                    }
                                  }}
                                >
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  {product.inStock ? (isInCart(product.id) ? "Added to Cart" : "Add to Cart") : "Out of Stock"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DemoActions />
    </Layout>
  );
}
