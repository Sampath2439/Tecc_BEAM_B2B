import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  Package,
  CreditCard,
  Truck,
  Shield,
  Tag
} from "lucide-react";
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";

export default function Cart() {
  const { 
    state, 
    removeFromCart, 
    updateCartQuantity, 
    getCartTotal, 
    getCartItemsCount,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const cartItems = state.cart;
  const cartTotal = getCartTotal();
  const cartItemsCount = getCartItemsCount();

  // Calculate taxes (GST)
  const gstRate = 0.18; // 18% GST
  const subtotal = cartTotal;
  const gstAmount = subtotal * gstRate;
  const totalWithGst = subtotal + gstAmount;

  // Shipping calculation
  const freeShippingThreshold = 10000;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 500;
  const finalTotal = totalWithGst + shippingCost;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleMoveToWishlist = (item: any) => {
    const wishlistItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
      rating: 4.2, // Default rating
      reviewCount: 100 // Default review count
    };
    
    toggleWishlist(wishlistItem);
    removeFromCart(item.id);
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-16">
          <div className="max-w-md w-full mx-4 text-center">
            <Card>
              <CardHeader className="space-y-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Your Cart is Empty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Add some products to your cart to get started with bulk ordering.
                </p>
                <div className="space-y-3">
                  <Link to="/products">
                    <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                      <Package className="w-4 h-4 mr-2" />
                      Browse Products
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="outline" className="w-full">
                      View Categories
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
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cartItemsCount} items in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                          {item.image}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            {item.originalPrice && (
                              <p className="text-sm text-gray-400 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </p>
                            )}
                            <p className="text-lg font-bold text-tech-beam-600">
                              ₹{item.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">per unit</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-center border-0 focus:ring-0"
                                min="0"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <span className="text-sm text-gray-500">({item.minOrder})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveToWishlist(item)}
                              className="text-gray-600 hover:text-tech-beam-600"
                            >
                              <Heart className={`w-4 h-4 mr-1 ${isInWishlist(item.id) ? 'fill-current text-red-500' : ''}`} />
                              {isInWishlist(item.id) ? 'In Wishlist' : 'Move to Wishlist'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-600">
                            <span>GST: {item.gstNumber}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">Subtotal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Price Breakdown */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cartItemsCount} items)</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-medium">₹{gstAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${shippingCost.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    
                    {subtotal < freeShippingThreshold && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <Tag className="w-4 h-4 inline mr-1" />
                          Add ₹{(freeShippingThreshold - subtotal).toLocaleString()} more for FREE shipping
                        </p>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-tech-beam-600">₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700 h-12">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-white">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Why Shop with Tech BEAM?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-tech-beam-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">GST compliant invoicing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-tech-beam-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Fast business delivery</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-tech-beam-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Bulk order discounts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Products */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">You might also like</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="text-2xl">📄</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Premium A4 Paper</p>
                      <p className="text-xs text-gray-600">₹680 per pack</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="text-2xl">🧼</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Hand Sanitizer</p>
                      <p className="text-xs text-gray-600">₹450 per bottle</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
