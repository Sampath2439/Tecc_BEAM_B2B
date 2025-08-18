import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  FileText, 
  CheckCircle,
  Truck,
  Shield,
  Clock,
  Tag,
  Building,
  User,
  Phone,
  Mail
} from "lucide-react";
import Layout from "@/components/Layout";
import { useApp } from "@/contexts/AppContext";

type CheckoutStep = 'address' | 'payment' | 'review' | 'confirmation';

interface Address {
  id: string;
  label: string;
  companyName: string;
  contactPerson: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstNumber: string;
  isDefault: boolean;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { state, getCartTotal, getCartItemsCount, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState('');
  const [processingOrder, setProcessingOrder] = useState(false);

  const cartItems = state.cart;
  const cartTotal = getCartTotal();
  const cartItemsCount = getCartItemsCount();

  // Sample saved addresses
  const savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Head Office',
      companyName: 'TechCorp Ltd.',
      contactPerson: 'Gnana Sampath',
      addressLine1: '123 Business Park, Tech District',
      addressLine2: 'Near IT Hub, Block A',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210',
      email: 'gnana@techcorp.com',
      gstNumber: '29ABCDE1234F1Z5',
      isDefault: true
    },
    {
      id: '2',
      label: 'Branch Office',
      companyName: 'TechCorp Ltd.',
      contactPerson: 'Operations Manager',
      addressLine1: '456 Industrial Area, Sector 8',
      addressLine2: 'Manufacturing Unit',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      phone: '+91 87654 32109',
      email: 'operations@techcorp.com',
      gstNumber: '33ABCDE1234F1Z5',
      isDefault: false
    }
  ];

  // Calculate pricing
  const gstRate = 0.18;
  const subtotal = cartTotal;
  const gstAmount = subtotal * gstRate;
  const freeShippingThreshold = 10000;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 500;
  const totalWithGst = subtotal + gstAmount + shippingCost;

  const steps = [
    { id: 'address', label: 'Delivery Address', icon: MapPin },
    { id: 'payment', label: 'Payment Method', icon: CreditCard },
    { id: 'review', label: 'Review Order', icon: FileText },
    { id: 'confirmation', label: 'Confirmation', icon: CheckCircle }
  ];

  const handleNextStep = () => {
    switch (currentStep) {
      case 'address':
        if (!selectedAddressId) return;
        setCurrentStep('payment');
        break;
      case 'payment':
        if (!paymentMethod) return;
        setCurrentStep('review');
        break;
      case 'review':
        handlePlaceOrder();
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'payment':
        setCurrentStep('address');
        break;
      case 'review':
        setCurrentStep('payment');
        break;
    }
  };

  const handlePlaceOrder = async () => {
    setProcessingOrder(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show confirmation
    dispatch({ type: 'CLEAR_CART' });
    
    // Add success notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'Order Placed Successfully',
        message: `Your order for ₹${totalWithGst.toLocaleString()} has been confirmed. Invoice will be generated shortly.`,
        type: 'success',
        isRead: false,
        actionUrl: '/orders'
      }
    });
    
    setCurrentStep('confirmation');
    setProcessingOrder(false);
  };

  const getStepIcon = (stepId: string, isCompleted: boolean, isCurrent: boolean) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return null;
    
    const IconComponent = step.icon;
    
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    return (
      <IconComponent 
        className={`w-5 h-5 ${isCurrent ? 'text-tech-beam-600' : 'text-gray-400'}`} 
      />
    );
  };

  const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);

  if (cartItems.length === 0 && currentStep !== 'confirmation') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-16">
          <Card className="max-w-md w-full mx-4 text-center">
            <CardContent className="p-8 space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="w-12 h-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">Cart is Empty</h2>
                <p className="text-gray-600">Add products to your cart before proceeding to checkout.</p>
              </div>
              <Link to="/products">
                <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/cart">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">{cartItemsCount} items • ₹{totalWithGst.toLocaleString()} total</p>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const stepIndex = steps.findIndex(s => s.id === currentStep);
                  const isCompleted = index < stepIndex;
                  const isCurrent = steps[index].id === currentStep;
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-100' 
                            : isCurrent 
                              ? 'bg-tech-beam-100' 
                              : 'bg-gray-100'
                        }`}>
                          {getStepIcon(step.id, isCompleted, isCurrent)}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            isCurrent ? 'text-tech-beam-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 ${
                          isCompleted ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Address Selection */}
              {currentStep === 'address' && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Select Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup 
                      value={selectedAddressId} 
                      onValueChange={setSelectedAddressId}
                      className="space-y-4"
                    >
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 hover:border-tech-beam-300 transition-colors">
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Label htmlFor={address.id} className="font-medium text-gray-900">
                                  {address.label}
                                </Label>
                                {address.isDefault && (
                                  <Badge variant="outline" className="text-xs">Default</Badge>
                                )}
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Building className="w-4 h-4" />
                                  <span>{address.companyName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span>{address.contactPerson}</span>
                                </div>
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && <p>{address.addressLine2}</p>}
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span className="text-xs">{address.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span className="text-xs">{address.email}</span>
                                  </div>
                                </div>
                                <p className="text-xs">GST: {address.gstNumber}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 'payment' && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Business Credit Terms</p>
                                <p className="text-sm text-gray-600">Net 30 days payment terms</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                            </div>
                          </Label>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="netbanking" id="netbanking" />
                          <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Net Banking</p>
                              <p className="text-sm text-gray-600">Pay directly from your business account</p>
                            </div>
                          </Label>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">UPI Payment</p>
                              <p className="text-sm text-gray-600">Quick payment via UPI ID</p>
                            </div>
                          </Label>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 'review' && (
                <div className="space-y-6">
                  {/* Delivery Address */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Delivery Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedAddress && (
                        <div className="space-y-2">
                          <p className="font-medium">{selectedAddress.companyName}</p>
                          <p className="text-gray-600">{selectedAddress.contactPerson}</p>
                          <p className="text-gray-600">{selectedAddress.addressLine1}</p>
                          {selectedAddress.addressLine2 && (
                            <p className="text-gray-600">{selectedAddress.addressLine2}</p>
                          )}
                          <p className="text-gray-600">
                            {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                          </p>
                          <p className="text-sm text-gray-500">GST: {selectedAddress.gstNumber}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Order Items */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Order Items ({cartItemsCount})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                          <div className="text-2xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} • {item.minOrder}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">₹{item.price.toLocaleString()} each</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Order Notes */}
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Special Instructions (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Any special delivery instructions or notes for this order..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 'confirmation' && (
                <Card className="bg-white text-center">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
                      <p className="text-gray-600">Your wholesale order has been confirmed and is being processed.</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="font-medium">TB-{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Order Total:</span>
                        <span className="font-medium">₹{totalWithGst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium capitalize">{paymentMethod}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link to="/orders">
                        <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                          <FileText className="w-4 h-4 mr-2" />
                          View Order Details
                        </Button>
                      </Link>
                      <Link to="/products">
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {currentStep !== 'confirmation' && (
              <div className="space-y-6">
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
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-tech-beam-600">₹{totalWithGst.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="space-y-3 pt-4">
                      {currentStep !== 'address' && (
                        <Button 
                          variant="outline" 
                          onClick={handlePreviousStep}
                          className="w-full"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous Step
                        </Button>
                      )}
                      
                      <Button 
                        onClick={handleNextStep}
                        disabled={
                          (currentStep === 'address' && !selectedAddressId) ||
                          (currentStep === 'payment' && !paymentMethod) ||
                          processingOrder
                        }
                        className="w-full bg-tech-beam-600 hover:bg-tech-beam-700"
                      >
                        {processingOrder ? (
                          <>Processing...</>
                        ) : currentStep === 'review' ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Place Order
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Security & Features */}
                <Card className="bg-white">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
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
                        <Clock className="w-5 h-5 text-tech-beam-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Order tracking included</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
