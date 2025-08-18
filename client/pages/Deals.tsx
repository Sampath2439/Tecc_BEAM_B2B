import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/contexts/AppContext";
import { 
  Timer, 
  TrendingUp, 
  ShoppingCart, 
  Star, 
  Package, 
  Users,
  Zap,
  Target,
  Gift,
  Percent,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Layout from "@/components/Layout";

interface Deal {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  savingsPercent: number;
  savingsAmount: number;
  minOrder: string;
  maxOrder?: string;
  dealType: "flash" | "bulk" | "clearance" | "seasonal" | "featured";
  timeLeft?: string;
  unitsAvailable?: number;
  unitsSold?: number;
  rating: number;
  reviewCount: number;
  gstNumber: string;
  highlights: string[];
  bulkTiers: Array<{
    minQty: number;
    maxQty?: number;
    price: number;
    label: string;
  }>;
}

export default function Deals() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dealType, setDealType] = useState("all");
  const { addToCart, isInCart } = useApp();

  const deals: Deal[] = [
    {
      id: 1,
      title: "Premium Basmati Rice - Bulk Deal",
      brand: "Royal Brand",
      category: "Groceries",
      description: "Premium aged basmati rice with exceptional aroma and taste. Perfect for hotels, restaurants, and retail chains.",
      image: "🌾",
      originalPrice: 2800,
      dealPrice: 2400,
      savingsPercent: 14,
      savingsAmount: 400,
      minOrder: "50 kg bags",
      maxOrder: "500 kg bags",
      dealType: "bulk",
      timeLeft: "5 days",
      unitsAvailable: 200,
      unitsSold: 45,
      rating: 4.5,
      reviewCount: 245,
      gstNumber: "GST123456789",
      highlights: ["Premium Grade", "Export Quality", "1 Year Aged", "Free Delivery"],
      bulkTiers: [
        { minQty: 50, maxQty: 99, price: 2400, label: "50-99 bags" },
        { minQty: 100, maxQty: 199, price: 2300, label: "100-199 bags" },
        { minQty: 200, price: 2200, label: "200+ bags" },
      ],
    },
    {
      id: 2,
      title: "Industrial Hand Soap - Flash Sale",
      brand: "CleanPro",
      category: "Personal Care",
      description: "Antibacterial hand soap for commercial and industrial use. Hospital-grade quality.",
      image: "🧼",
      originalPrice: 1500,
      dealPrice: 1200,
      savingsPercent: 20,
      savingsAmount: 300,
      minOrder: "24 units",
      dealType: "flash",
      timeLeft: "12 hours",
      unitsAvailable: 500,
      unitsSold: 320,
      rating: 4.2,
      reviewCount: 156,
      gstNumber: "GST987654321",
      highlights: ["Hospital Grade", "Antibacterial", "Bulk Pack", "Same Day Shipping"],
      bulkTiers: [
        { minQty: 24, maxQty: 47, price: 1200, label: "24-47 units" },
        { minQty: 48, maxQty: 95, price: 1150, label: "48-95 units" },
        { minQty: 96, price: 1100, label: "96+ units" },
      ],
    },
    {
      id: 3,
      title: "Office Paper A4 - Seasonal Offer",
      brand: "PaperMax",
      category: "Office Supplies",
      description: "High-quality A4 paper for all your printing and documentation needs. Perfect for offices and print shops.",
      image: "📄",
      originalPrice: 800,
      dealPrice: 680,
      savingsPercent: 15,
      savingsAmount: 120,
      minOrder: "10 reams",
      dealType: "seasonal",
      timeLeft: "2 weeks",
      rating: 4.4,
      reviewCount: 134,
      gstNumber: "GST321654987",
      highlights: ["Premium Quality", "FSC Certified", "90 GSM", "Jam-Free"],
      bulkTiers: [
        { minQty: 10, maxQty: 24, price: 680, label: "10-24 reams" },
        { minQty: 25, maxQty: 49, price: 650, label: "25-49 reams" },
        { minQty: 50, price: 620, label: "50+ reams" },
      ],
    },
    {
      id: 4,
      title: "Multi-Purpose Cleaner - Clearance",
      brand: "SparkleClean",
      category: "Home & Cleaning",
      description: "All-in-one cleaning solution for home and office use. Effective on all surfaces.",
      image: "🧽",
      originalPrice: 750,
      dealPrice: 450,
      savingsPercent: 40,
      savingsAmount: 300,
      minOrder: "12 bottles",
      dealType: "clearance",
      unitsAvailable: 150,
      unitsSold: 89,
      rating: 4.0,
      reviewCount: 203,
      gstNumber: "GST789123456",
      highlights: ["All Surfaces", "Eco-Friendly", "Concentrated", "Last Stock"],
      bulkTiers: [
        { minQty: 12, maxQty: 23, price: 450, label: "12-23 bottles" },
        { minQty: 24, maxQty: 47, price: 420, label: "24-47 bottles" },
        { minQty: 48, price: 400, label: "48+ bottles" },
      ],
    },
    {
      id: 5,
      title: "Wireless Earphones - Featured Deal",
      brand: "TechSound",
      category: "Electronics",
      description: "Premium wireless earphones with superior sound quality and long battery life.",
      image: "🎧",
      originalPrice: 2200,
      dealPrice: 1800,
      savingsPercent: 18,
      savingsAmount: 400,
      minOrder: "10 pieces",
      dealType: "featured",
      timeLeft: "3 days",
      rating: 4.3,
      reviewCount: 89,
      gstNumber: "GST456789123",
      highlights: ["12hr Battery", "Noise Cancelling", "Wireless Charging", "1 Year Warranty"],
      bulkTiers: [
        { minQty: 10, maxQty: 24, price: 1800, label: "10-24 pieces" },
        { minQty: 25, maxQty: 49, price: 1750, label: "25-49 pieces" },
        { minQty: 50, price: 1700, label: "50+ pieces" },
      ],
    },
    {
      id: 6,
      title: "Cotton T-Shirts - Bulk Special",
      brand: "ComfortWear",
      category: "Textiles",
      description: "High-quality cotton t-shirts in various sizes. Perfect for retail chains and uniform suppliers.",
      image: "👕",
      originalPrice: 2800,
      dealPrice: 2500,
      savingsPercent: 11,
      savingsAmount: 300,
      minOrder: "25 pieces",
      dealType: "bulk",
      rating: 4.1,
      reviewCount: 67,
      gstNumber: "GST147258369",
      highlights: ["100% Cotton", "Multiple Sizes", "Color Options", "Retail Ready"],
      bulkTiers: [
        { minQty: 25, maxQty: 49, price: 2500, label: "25-49 pieces" },
        { minQty: 50, maxQty: 99, price: 2400, label: "50-99 pieces" },
        { minQty: 100, price: 2300, label: "100+ pieces" },
      ],
    },
  ];

  const categories = ["all", ...Array.from(new Set(deals.map(d => d.category)))];
  const dealTypes = [
    { value: "all", label: "All Deals" },
    { value: "flash", label: "Flash Sales" },
    { value: "bulk", label: "Bulk Discounts" },
    { value: "clearance", label: "Clearance" },
    { value: "seasonal", label: "Seasonal" },
    { value: "featured", label: "Featured" },
  ];

  const filteredDeals = deals.filter(deal => {
    if (selectedCategory !== "all" && deal.category !== selectedCategory) return false;
    if (dealType !== "all" && deal.dealType !== dealType) return false;
    return true;
  });

  const getDealTypeColor = (type: string) => {
    switch (type) {
      case "flash": return "bg-red-100 text-red-800";
      case "bulk": return "bg-blue-100 text-blue-800";
      case "clearance": return "bg-orange-100 text-orange-800";
      case "seasonal": return "bg-green-100 text-green-800";
      case "featured": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDealTypeIcon = (type: string) => {
    switch (type) {
      case "flash": return <Zap className="w-3 h-3" />;
      case "bulk": return <Package className="w-3 h-3" />;
      case "clearance": return <Target className="w-3 h-3" />;
      case "seasonal": return <Gift className="w-3 h-3" />;
      case "featured": return <Star className="w-3 h-3" />;
      default: return <Percent className="w-3 h-3" />;
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Percent className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-bold">B2B Deals & Offers</h1>
              </div>
              <p className="text-xl text-red-100 max-w-2xl mx-auto">
                Exclusive wholesale pricing and bulk discounts for business customers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6">
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Up to 40% Off</p>
                  <p className="text-sm text-red-200">On bulk orders</p>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <Timer className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Limited Time</p>
                  <p className="text-sm text-red-200">Flash sales daily</p>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">B2B Exclusive</p>
                  <p className="text-sm text-red-200">Business customers only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-tech-beam-500 focus:ring-tech-beam-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-tech-beam-500 focus:ring-tech-beam-500"
                  >
                    {dealTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                {filteredDeals.length} deals available
              </p>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{deal.image}</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getDealTypeColor(deal.dealType)} text-xs px-2 py-1`}>
                            {getDealTypeIcon(deal.dealType)}
                            <span className="ml-1 capitalize">{deal.dealType}</span>
                          </Badge>
                          {deal.timeLeft && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {deal.timeLeft} left
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-tech-beam-600 transition-colors">
                          {deal.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 uppercase">{deal.brand}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">
                        {deal.savingsPercent}% OFF
                      </div>
                      <div className="text-sm text-gray-500">
                        Save ₹{deal.savingsAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{deal.description}</p>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-tech-beam-600">
                          ₹{deal.dealPrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ₹{deal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Starting from • Min: {deal.minOrder}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(deal.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">({deal.reviewCount} reviews)</p>
                    </div>
                  </div>

                  {/* Bulk Pricing Tiers */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-gray-900 text-sm">Bulk Pricing Tiers:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {deal.bulkTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-md p-3 border text-center">
                          <p className="text-xs text-gray-600 mb-1">{tier.label}</p>
                          <p className="font-bold text-tech-beam-600">
                            ₹{tier.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar for Limited Deals */}
                  {deal.unitsAvailable && deal.unitsSold && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {deal.unitsSold} sold • {deal.unitsAvailable - deal.unitsSold} remaining
                        </span>
                        <span className="text-orange-600 font-medium">
                          {Math.round((deal.unitsSold / deal.unitsAvailable) * 100)}% sold
                        </span>
                      </div>
                      <Progress 
                        value={(deal.unitsSold / deal.unitsAvailable) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {deal.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Link to={`/product/${deal.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      className="flex-1 bg-tech-beam-600 hover:bg-tech-beam-700"
                      onClick={() => {
                        const cartItem = {
                          id: deal.id,
                          name: deal.title,
                          brand: deal.brand,
                          price: deal.dealPrice,
                          originalPrice: deal.originalPrice,
                          image: deal.image,
                          minOrder: deal.bulkTiers[0]?.label || "1 unit",
                          category: deal.category,
                          gstNumber: deal.gstNumber
                        };
                        addToCart(cartItem, 1);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isInCart(deal.id) ? "Added to Cart" : "Add to Cart"}
                    </Button>
                  </div>

                  {/* GST Info */}
                  <div className="text-xs text-gray-500 border-t pt-2">
                    GST: {deal.gstNumber} • Prices include applicable taxes
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600 mb-4">Try selecting different filters or check back later for new deals</p>
              <Button onClick={() => {setSelectedCategory("all"); setDealType("all");}} variant="outline">
                Show All Deals
              </Button>
            </div>
          )}
        </div>

        {/* Business Benefits */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our B2B Deals?</h2>
              <p className="text-lg text-gray-600">Designed specifically for business customers and bulk procurement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Better Margins</h3>
                <p className="text-gray-600">Exclusive wholesale pricing with tiered discounts for larger orders</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Bulk Focused</h3>
                <p className="text-gray-600">Minimum order quantities designed for business customers and retailers</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Timer className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Time-Sensitive</h3>
                <p className="text-gray-600">Flash sales and limited-time offers to maximize your procurement savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
