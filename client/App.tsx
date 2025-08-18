import "./global.css";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Checkout from "./pages/Checkout";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Product & Catalog Routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={
            <PlaceholderPage
              title="Category Products"
              description="View all products in this category with Amazon-style filtering and search."
              suggestionText="This will show the product catalog page with left sidebar filters."
            />
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={
            <PlaceholderPage
              title="Product Details"
              description="Detailed product information with bulk pricing and quantity selection."
              suggestionText="This will show the product details page with images, specs, and bulk ordering."
            />
          } />
          <Route path="/search" element={
            <PlaceholderPage
              title="Search Results"
              description="Your search results with relevant products and suggestions."
              suggestionText="This will show search results with filtering and sorting options."
            />
          } />
          <Route path="/deals" element={<Deals />} />

          {/* Cart & Checkout Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={
            <PlaceholderPage
              title="Order Confirmed"
              description="Your wholesale order has been placed successfully."
              suggestionText="This will show order confirmation with invoice generation and tracking info."
            />
          } />

          {/* Account & Order Management */}
          <Route path="/orders" element={
            <PlaceholderPage
              title="Order History"
              description="View and manage all your previous wholesale orders."
              suggestionText="This will show the orders table with filters, status, and reorder options."
            />
          } />
          <Route path="/order/:id" element={
            <PlaceholderPage
              title="Order Details"
              description="Detailed view of your order with tracking and invoice information."
              suggestionText="This will show individual order details with full item list and status."
            />
          } />
          <Route path="/invoices" element={
            <PlaceholderPage
              title="Invoices"
              description="Download and manage your GST-compliant business invoices."
              suggestionText="This will show invoice listing with download and print options."
            />
          } />
          <Route path="/profile" element={
            <PlaceholderPage
              title="Business Profile"
              description="Manage your business account, addresses, and preferences."
              suggestionText="This will show the profile management page with business details and settings."
            />
          } />

          {/* Support & Information */}
          <Route path="/help" element={
            <PlaceholderPage
              title="Help Center"
              description="Get support for your wholesale orders and account management."
              suggestionText="This will show FAQ, guides, and contact information for B2B support."
            />
          } />
          <Route path="/contact" element={
            <PlaceholderPage
              title="Contact Sales"
              description="Get in touch with our B2B sales team for custom requirements."
              suggestionText="This will show contact form and sales team information."
            />
          } />
          <Route path="/register" element={
            <PlaceholderPage
              title="Business Registration"
              description="Apply for a wholesale business account with Tech BEAM."
              suggestionText="This will show the business account application form."
            />
          } />
          <Route path="/forgot-password" element={
            <PlaceholderPage
              title="Reset Password"
              description="Reset your wholesale account password."
              suggestionText="This will show the password reset form and instructions."
            />
          } />

          {/* Legal Pages */}
          <Route path="/terms" element={
            <PlaceholderPage
              title="Terms of Service"
              description="Terms and conditions for using the Tech BEAM wholesale portal."
              suggestionText="This will show the legal terms and conditions for B2B customers."
            />
          } />
          <Route path="/privacy" element={
            <PlaceholderPage
              title="Privacy Policy"
              description="How we protect and use your business information."
              suggestionText="This will show the privacy policy specific to B2B operations."
            />
          } />

          {/* Catch-all route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
