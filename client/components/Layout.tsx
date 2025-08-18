import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  Zap,
  Package,
  FileText,
  Settings,
  LogOut,
  Bell
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = true }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    { name: "Categories", href: "/categories", current: location.pathname === "/categories" },
    { name: "Products", href: "/products", current: location.pathname === "/products" },
    { name: "Deals", href: "/deals", current: location.pathname === "/deals" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (!showNavigation) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-6">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-tech-beam-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    Tech <span className="text-tech-beam-600">BEAM</span>
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Wholesale Portal</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    item.current
                      ? "text-tech-beam-600 bg-tech-beam-50"
                      : "text-gray-700 hover:text-tech-beam-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-4 hidden lg:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    name="search"
                    type="search"
                    placeholder="Search products, categories, brands..."
                    className="pl-10 pr-4 h-10 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500 rounded-xl"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="relative p-2">
                <Heart className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-tech-beam-500 text-white text-xs">
                  12
                </Badge>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" className="relative p-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-tech-beam-500 text-white text-xs">
                  5
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2">
                    <div className="w-8 h-8 bg-tech-beam-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-tech-beam-600" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900">TechCorp Ltd.</p>
                      <p className="text-xs text-gray-500">Business Account</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile & Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="w-4 h-4 mr-2" />
                    Order History
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    Invoices
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="search"
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 h-10 border-gray-300 focus:border-tech-beam-500 focus:ring-tech-beam-500 rounded-xl"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    item.current
                      ? "text-tech-beam-600 bg-tech-beam-50"
                      : "text-gray-700 hover:text-tech-beam-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Quick Actions</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist (12)
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart (5)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-tech-beam-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Tech BEAM</h3>
                  <p className="text-sm text-gray-400">Wholesale Portal</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted B2B partner for wholesale procurement and business management.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/categories" className="hover:text-white">Browse Categories</Link></li>
                <li><Link to="/deals" className="hover:text-white">Current Deals</Link></li>
                <li><Link to="/orders" className="hover:text-white">Order History</Link></li>
                <li><Link to="/invoices" className="hover:text-white">Invoices</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Sales</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="pt-2">
                  <span className="text-tech-beam-400">24/7 Online Ordering</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Tech BEAM Wholesale Portal. All rights reserved. | Business Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
