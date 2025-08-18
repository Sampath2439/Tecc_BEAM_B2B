import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  X, 
  Package,
  ArrowLeft,
  Grid3X3,
  List
} from "lucide-react";
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";

export default function Wishlist() {
  const { 
    state, 
    removeFromWishlist, 
    addToCart,
    isInCart,
    getCartItemQuantity 
  } = useApp();

  const wishlistItems = state.wishlist;

  const handleAddToCart = (item: any) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      minOrder: "1 unit", // Default min order
      category: item.category,
      gstNumber: "GST123456789" // Default GST number
    };
    
    addToCart(cartItem, 1);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      if (!isInCart(item.id)) {
        handleAddToCart(item);
      }
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-16">
          <div className="max-w-md w-full mx-4 text-center">
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-gray-600">
                    Save products you love to your wishlist and buy them later.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link to="/products">
                    <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                      <Package className="w-4 h-4 mr-2" />
                      Browse Products
                    </Button>
                  </Link>
                  <Link to="/deals">
                    <Button variant="outline" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />
                      View Deals
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600">{wishlistItems.length} products saved</p>
              </div>
              
              {wishlistItems.length > 0 && (
                <Button 
                  onClick={handleAddAllToCart}
                  className="bg-tech-beam-600 hover:bg-tech-beam-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              )}
            </div>
          </div>

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Product Image and Remove Button */}
                    <div className="relative">
                      <Link to={`/product/${item.id}`}>
                        <div className="text-6xl text-center py-6 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                          {item.image}
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 p-1 h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </Button>
                      <div className="absolute top-2 left-2">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 uppercase font-medium">{item.brand}</p>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-tech-beam-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {/* Category Badge */}
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating) 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({item.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-tech-beam-600">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {item.originalPrice && (
                          <div className="text-xs text-green-600 font-medium">
                            Save ₹{(item.originalPrice - item.price).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2">
                        {isInCart(item.id) ? (
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full" disabled>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              In Cart ({getCartItemQuantity(item.id)})
                            </Button>
                            <Link to="/cart">
                              <Button variant="ghost" className="w-full text-xs">
                                View Cart
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-tech-beam-600 hover:bg-tech-beam-700"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                        
                        <Link to={`/product/${item.id}`}>
                          <Button variant="ghost" className="w-full text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State Fallback (if items exist but none match filters) */}
          {wishlistItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items in wishlist</h3>
              <p className="text-gray-600 mb-4">Start adding products to your wishlist to see them here</p>
              <Link to="/products">
                <Button variant="outline">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}

          {/* Recommendations */}
          {wishlistItems.length > 0 && (
            <div className="mt-16">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
                    <p className="text-gray-600">Based on your wishlist preferences</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">📱</div>
                        <h3 className="font-medium">Wireless Chargers</h3>
                        <p className="text-sm text-gray-600">From ₹1,200</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Category
                        </Button>
                      </div>
                      
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">🏠</div>
                        <h3 className="font-medium">Home Essentials</h3>
                        <p className="text-sm text-gray-600">From ₹450</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Category
                        </Button>
                      </div>
                      
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">📄</div>
                        <h3 className="font-medium">Office Supplies</h3>
                        <p className="text-sm text-gray-600">From ₹680</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Category
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
