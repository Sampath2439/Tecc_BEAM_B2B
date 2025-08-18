import React from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { sampleCartItems, sampleWishlistItems } from "@/utils/sampleData";

export function DemoActions() {
  const { dispatch, state } = useApp();

  const loadSampleData = () => {
    // Add sample cart items
    sampleCartItems.forEach(item => {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    });
    
    // Add sample wishlist items
    sampleWishlistItems.forEach(item => {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    });

    // Add a sample notification
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: {
        title: 'Demo Data Loaded',
        message: 'Sample products have been added to your cart and wishlist!',
        type: 'success',
        isRead: false,
        actionUrl: '/cart'
      }
    });
  };

  const clearAllData = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    // Clear wishlist by removing each item
    state.wishlist.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id });
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <Button 
        onClick={loadSampleData}
        className="bg-tech-beam-600 hover:bg-tech-beam-700 text-white shadow-lg"
        size="sm"
      >
        🎯 Load Demo Data
      </Button>
      <br />
      <Button 
        onClick={clearAllData}
        variant="outline"
        className="bg-white shadow-lg"
        size="sm"
      >
        🗑️ Clear All
      </Button>
    </div>
  );
}
