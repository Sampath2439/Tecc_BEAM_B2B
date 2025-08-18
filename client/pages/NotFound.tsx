import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full mx-4">
          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900">
                404
              </CardTitle>
              <p className="text-xl text-gray-600">
                Page Not Found
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                The page you're looking for doesn't exist or may have been moved.
              </p>
              <div className="bg-tech-beam-50 rounded-lg p-4">
                <p className="text-sm text-tech-beam-700">
                  🔍 <strong>Tip:</strong> Use the search bar above to find products or browse our categories.
                </p>
              </div>
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
