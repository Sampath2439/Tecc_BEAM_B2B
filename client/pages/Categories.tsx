import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ArrowRight, 
  TrendingUp,
  Package,
  Zap,
  Star
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    {
      id: 1,
      name: "Groceries & Food Items",
      slug: "groceries-food",
      description: "Bulk food products, grains, spices, and packaged goods for retail and hospitality",
      productCount: 2847,
      subcategories: ["Rice & Grains", "Spices & Seasonings", "Packaged Foods", "Beverages", "Cooking Oils"],
      image: "🛒",
      color: "bg-green-100 text-green-800",
      trending: true,
      avgOrderValue: "₹25,000",
      topBrands: ["Tata", "ITC", "Nestle", "Britannia"],
    },
    {
      id: 2,
      name: "Personal Care & Hygiene",
      slug: "personal-care",
      description: "Soaps, shampoos, cosmetics, and personal hygiene products for retail chains",
      productCount: 1856,
      subcategories: ["Bath & Body", "Hair Care", "Oral Care", "Skincare", "Fragrances"],
      image: "🧴",
      color: "bg-pink-100 text-pink-800",
      trending: false,
      avgOrderValue: "₹18,500",
      topBrands: ["Unilever", "P&G", "Godrej", "Dabur"],
    },
    {
      id: 3,
      name: "Electronics & Technology",
      slug: "electronics",
      description: "Mobile accessories, gadgets, and electronic items for retailers and distributors",
      productCount: 1234,
      subcategories: ["Mobile Accessories", "Audio Devices", "Chargers & Cables", "Smart Devices", "Tablets"],
      image: "📱",
      color: "bg-blue-100 text-blue-800",
      trending: true,
      avgOrderValue: "₹45,000",
      topBrands: ["Samsung", "Apple", "Mi", "OnePlus"],
    },
    {
      id: 4,
      name: "Home & Cleaning Supplies",
      slug: "home-cleaning",
      description: "Detergents, cleaners, and household maintenance products for commercial use",
      productCount: 1567,
      subcategories: ["Detergents", "Floor Cleaners", "Bathroom Cleaners", "Kitchen Supplies", "Air Fresheners"],
      image: "🏠",
      color: "bg-purple-100 text-purple-800",
      trending: false,
      avgOrderValue: "₹22,000",
      topBrands: ["Surf", "Harpic", "Vim", "Lizol"],
    },
    {
      id: 5,
      name: "Office & Stationery",
      slug: "office-stationery",
      description: "Paper products, writing instruments, and office supplies for businesses",
      productCount: 892,
      subcategories: ["Paper Products", "Writing Instruments", "Filing & Storage", "Printing Supplies", "Desk Accessories"],
      image: "📄",
      color: "bg-orange-100 text-orange-800",
      trending: false,
      avgOrderValue: "₹15,000",
      topBrands: ["JK Paper", "Classmate", "Reynolds", "Staedtler"],
    },
    {
      id: 6,
      name: "Health & Wellness",
      slug: "health-wellness",
      description: "Health supplements, first aid supplies, and wellness products for pharmacies",
      productCount: 723,
      subcategories: ["Supplements", "First Aid", "Health Devices", "Fitness Equipment", "Medical Supplies"],
      image: "💊",
      color: "bg-red-100 text-red-800",
      trending: true,
      avgOrderValue: "₹35,000",
      topBrands: ["Himalaya", "Baidyanath", "Patanjali", "Abbott"],
    },
    {
      id: 7,
      name: "Textiles & Apparel",
      slug: "textiles-apparel",
      description: "Clothing, fabrics, and textile products for retail and fashion businesses",
      productCount: 1456,
      subcategories: ["Men's Wear", "Women's Wear", "Kids Wear", "Fabrics", "Accessories"],
      image: "👕",
      color: "bg-indigo-100 text-indigo-800",
      trending: false,
      avgOrderValue: "₹30,000",
      topBrands: ["Raymond", "Fabindia", "Peter England", "Allen Solly"],
    },
    {
      id: 8,
      name: "Sports & Fitness",
      slug: "sports-fitness",
      description: "Sports equipment, fitness gear, and recreational products for gyms and retailers",
      productCount: 634,
      subcategories: ["Fitness Equipment", "Sports Gear", "Outdoor Activities", "Nutrition", "Athletic Wear"],
      image: "⚽",
      color: "bg-yellow-100 text-yellow-800",
      trending: true,
      avgOrderValue: "₹28,000",
      topBrands: ["Nike", "Adidas", "Puma", "Decathlon"],
    },
    {
      id: 9,
      name: "Beauty & Cosmetics",
      slug: "beauty-cosmetics",
      description: "Makeup, beauty tools, and cosmetic products for salons and beauty retailers",
      productCount: 945,
      subcategories: ["Makeup", "Beauty Tools", "Nail Care", "Hair Styling", "Professional Products"],
      image: "💄",
      color: "bg-rose-100 text-rose-800",
      trending: true,
      avgOrderValue: "₹20,000",
      topBrands: ["Lakme", "Maybelline", "L'Oreal", "Nykaa"],
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.productCount - a.productCount;
      case "name":
        return a.name.localeCompare(b.name);
      case "trending":
        return b.trending === a.trending ? 0 : b.trending ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-tech-beam-600 to-tech-beam-700 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Product Categories</h1>
              <p className="text-xl text-tech-beam-100 max-w-2xl mx-auto">
                Explore our comprehensive range of wholesale products organized by business categories
              </p>
              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{categories.length}+</p>
                  <p className="text-sm text-tech-beam-200">Categories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}+</p>
                  <p className="text-sm text-tech-beam-200">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-tech-beam-200">Brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-50 border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="name">Name A-Z</option>
                    <option value="trending">Trending</option>
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

        {/* Categories Grid/List */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCategories.map((category) => (
                <Link key={category.id} to={`/category/${category.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 h-full">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Category Header */}
                        <div className="flex items-start justify-between">
                          <div className="text-4xl">{category.image}</div>
                          <div className="flex flex-col items-end gap-2">
                            {category.trending && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-tech-beam-600 transition-colors" />
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-tech-beam-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {category.description}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-center bg-gray-50 rounded-lg p-3">
                            <p className="text-lg font-bold text-tech-beam-600">{category.productCount.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">Products</p>
                          </div>
                          <div className="text-center bg-gray-50 rounded-lg p-3">
                            <p className="text-lg font-bold text-tech-beam-600">{category.avgOrderValue}</p>
                            <p className="text-xs text-gray-600">Avg Order</p>
                          </div>
                        </div>

                        {/* Subcategories */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-700">Popular Subcategories:</p>
                          <div className="flex flex-wrap gap-1">
                            {category.subcategories.slice(0, 3).map((sub, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
                            {category.subcategories.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{category.subcategories.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Top Brands */}
                        <div className="border-t pt-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">Top Brands:</p>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            {category.topBrands.slice(0, 3).join(", ")}
                            {category.topBrands.length > 3 && ` +${category.topBrands.length - 3} more`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedCategories.map((category) => (
                <Link key={category.id} to={`/category/${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="text-4xl">{category.image}</div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-tech-beam-600 transition-colors">
                              {category.name}
                            </h3>
                            {category.trending && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{category.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {category.productCount.toLocaleString()} products
                            </span>
                            <span>Avg order: {category.avgOrderValue}</span>
                            <span>Brands: {category.topBrands.slice(0, 2).join(", ")}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-tech-beam-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {sortedCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or browse all categories</p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Business Benefits Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Categories?</h2>
              <p className="text-lg text-gray-600">Organized for business efficiency and bulk procurement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Business-Focused Organization</h3>
                <p className="text-gray-600">Categories designed specifically for B2B procurement and bulk ordering</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quality Brands</h3>
                <p className="text-gray-600">Curated selection of trusted brands and suppliers for business customers</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-tech-beam-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Fast Procurement</h3>
                <p className="text-gray-600">Streamlined category navigation for quick bulk ordering and reordering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
