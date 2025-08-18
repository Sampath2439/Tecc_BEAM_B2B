import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestionText?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  suggestionText = "Continue prompting to fill in this page content if you want it." 
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-md w-full mx-4">
          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 bg-tech-beam-100 rounded-2xl flex items-center justify-center mx-auto">
                <Construction className="w-8 h-8 text-tech-beam-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                {description}
              </p>
              <div className="bg-tech-beam-50 rounded-lg p-4">
                <p className="text-sm text-tech-beam-700">
                  💡 <strong>Development Note:</strong><br />
                  {suggestionText}
                </p>
              </div>
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full bg-tech-beam-600 hover:bg-tech-beam-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" className="w-full">
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
}
