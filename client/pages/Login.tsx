import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon, Building2, Zap, Users, TrendingUp } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, redirect to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tech-beam-50 to-white flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23e0f2fe\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding and Welcome */}
        <div className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-tech-beam-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tech <span className="text-tech-beam-600">BEAM</span>
              </h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                Wholesale Portal
              </h2>
              <p className="text-lg text-tech-beam-600 font-medium">
                Buy in Bulk. Manage Smart. Save More.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-tech-beam-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-tech-beam-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Business-First</h3>
                <p className="text-gray-600">Designed specifically for B2B wholesale operations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-tech-beam-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-tech-beam-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enterprise Management</h3>
                <p className="text-gray-600">Complete account and inventory management tools</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-tech-beam-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-tech-beam-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Better Pricing</h3>
                <p className="text-gray-600">Wholesale rates and bulk discounts for your business</p>
              </div>
            </div>
          </div>

          <div className="bg-tech-beam-50 rounded-2xl p-6 border border-tech-beam-200">
            <p className="text-sm text-gray-600">
              "Tech BEAM has transformed our procurement process. The bulk ordering system 
              and automated invoicing have saved us countless hours each week."
            </p>
            <div className="mt-3 flex items-center space-x-2">
              <div className="w-8 h-8 bg-tech-beam-200 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                <p className="text-xs text-gray-500">Procurement Manager, TechCorp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center pb-6">
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-tech-beam-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Tech <span className="text-tech-beam-600">BEAM</span>
                </h1>
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your wholesale account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Company ID / Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your business email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 px-4 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 px-4 pr-12 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      className="border-gray-300"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-tech-beam-600 hover:text-tech-beam-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-tech-beam-600 hover:bg-tech-beam-700 text-white font-medium rounded-xl transition-colors"
                >
                  Sign In to Wholesale Portal
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Need a wholesale account?{" "}
                  <Link
                    to="/register"
                    className="text-tech-beam-600 hover:text-tech-beam-700 font-medium hover:underline"
                  >
                    Contact Sales
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Tech BEAM. All rights reserved. | Business Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
