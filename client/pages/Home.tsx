import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Package, 
  Clock, 
  Star,
  ShoppingCart,
  Zap,
  Shield,
  Truck,
  HeadphonesIcon
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredCategories = [
    {
      id: 1,
      name: "Groceries & Food",
      image: "🛒",
      productCount: "2,500+ items",
      description: "Rice, Sugar, Spices, Packaged Foods",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Personal Care",
      image: "🧴",
      productCount: "1,200+ items", 
      description: "Soaps, Shampoos, Cosmetics, Hygiene",
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: 3,
      name: "Electronics",
      image: "📱",
      productCount: "800+ items",
      description: "Phones, Accessories, Gadgets",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      name: "Home & Cleaning",
      image: "🏠",
      productCount: "950+ items",
      description: "Detergents, Cleaners, Household Items",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 5,
      name: "Office Supplies",
      image: "📄",
      productCount: "600+ items",
      description: "Stationery, Paper, Office Equipment",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 6,
      name: "Health & Wellness",
      image: "💊",
      productCount: "450+ items",
      description: "Supplements, First Aid, Health Products",
      color: "bg-red-100 text-red-800",
    },
  ];

  const topDeals = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      brand: "Royal Brand",
      originalPrice: 2800,
      dealPrice: 2400,
      savings: 400,
      minQuantity: "50 kg bags",
      image: "🌾",
      badge: "HOT DEAL",
    },
    {
      id: 2,
      name: "Industrial Hand Soap",
      brand: "CleanPro",
      originalPrice: 1500,
      dealPrice: 1200,
      savings: 300,
      minQuantity: "24 units",
      image: "🧼",
      badge: "BULK SAVINGS",
    },
    {
      id: 3,
      name: "Office Paper A4",
      brand: "PaperMax",
      originalPrice: 800,
      dealPrice: 680,
      savings: 120,
      minQuantity: "10 reams",
      image: "📄",
      badge: "LIMITED TIME",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tech-beam-600 via-tech-beam-700 to-tech-beam-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-tech-beam-500/20 text-tech-beam-100 border-tech-beam-400 px-3 py-1">
                  ⚡ Wholesale Portal
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                  Buy in <span className="text-tech-beam-200">Bulk</span>,<br />
                  Manage <span className="text-tech-beam-200">Smart</span>,<br />
                  Save <span className="text-tech-beam-200">More</span>
                </h1>
                <p className="text-xl text-tech-beam-100 max-w-lg">
                  Your complete B2B e-commerce solution for wholesale procurement. 
                  Get better prices, streamlined ordering, and professional invoicing.
                </p>
              </div>

              {/* Hero Search */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Start Shopping Now</h3>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search for products, brands, categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-xl border-0 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-tech-beam-300"
                    />
                  </div>
                  <Button type="submit" className="h-12 px-8 bg-white text-tech-beam-700 hover:bg-tech-beam-50 font-semibold rounded-xl">
                    Search
                  </Button>
                </form>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">Bulk Orders</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">GST Ready</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <HeadphonesIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">B2B Support</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-beam-400/20 to-transparent rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Dashboard Preview</h3>
                    <Badge className="bg-green-500 text-white">Live</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="text-2xl font-bold">₹2.4L</p>
                      <p className="text-sm opacity-80">This Month</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm opacity-80">Orders</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Recent Order</span>
                      <span className="text-green-300">Delivered</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="font-medium">Office Supplies Bundle</p>
                      <p className="text-sm opacity-80">₹15,600 • 24 items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our extensive wholesale catalog organized by business categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{category.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-tech-beam-600 transition-colors">
                            {category.name}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-tech-beam-600 transition-colors" />
                        </div>
                        <Badge className={`${category.color} text-xs mb-2`}>
                          {category.productCount}
                        </Badge>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-tech-beam-300 text-tech-beam-700 hover:bg-tech-beam-50">
              View All Categories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top B2B Deals */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Deals for B2B</h2>
              <p className="text-lg text-gray-600">Exclusive wholesale pricing and bulk discounts</p>
            </div>
            <Link to="/deals">
              <Button className="bg-tech-beam-600 hover:bg-tech-beam-700">
                View All Deals
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDeals.map((deal) => (
              <Card key={deal.id} className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-red-500 text-white font-medium">
                    {deal.badge}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{deal.image}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{deal.name}</h3>
                    <p className="text-sm text-gray-600">{deal.brand}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-tech-beam-600">₹{deal.dealPrice.toLocaleString()}</span>
                        <span className="text-lg text-gray-400 line-through">₹{deal.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Save ₹{deal.savings.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Minimum Order</p>
                      <p className="font-medium text-gray-900">{deal.minQuantity}</p>
                    </div>

                    <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700 group-hover:scale-105 transition-transform">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Tech BEAM?</h2>
            <p className="text-lg text-gray-600">Built specifically for B2B wholesale operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-tech-beam-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Bulk Pricing</h3>
              <p className="text-gray-600">Wholesale rates and volume discounts for business customers</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-tech-beam-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">GST Compliant</h3>
              <p className="text-gray-600">Automated GST calculations and compliant invoice generation</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-tech-beam-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Fast Processing</h3>
              <p className="text-gray-600">Quick order processing and expedited business deliveries</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-tech-beam-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Dedicated Support</h3>
              <p className="text-gray-600">Dedicated account managers and B2B customer support</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
