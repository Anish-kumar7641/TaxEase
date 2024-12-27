import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { FileText, Clock, Shield, HelpCircle } from "lucide-react";
import TaxForm from "../components/taxForm";

function TaxFilingPage() {
  const benefits = [
    {
      icon: Clock,
      title: "Quick Filing",
      description: "Complete your tax filing in minutes with our smart auto-fill feature and intuitive form design."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Your data is encrypted and handled securely. All submissions are validated against latest tax regulations."
    },
    {
      icon: HelpCircle,
      title: "Expert Assistance",
      description: "Get real-time validation and guidance throughout the filing process to ensure accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Smart Tax Filing Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            File your taxes with confidence using our intelligent tax filing system. 
            Get automatic calculations, smart validations, and instant feedback.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-full bg-blue-50 mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Steps Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Filing Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Enter Details</h3>
                  <p className="text-gray-600">Fill in your personal and financial information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Verify Information</h3>
                  <p className="text-gray-600">Review auto-calculated deductions and validate entries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Submit Return</h3>
                  <p className="text-gray-600">Securely submit your verified tax return</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Section */}
        <div className="mb-8">
          <TaxForm />
        </div>

        {/* Help Section */}
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to assist you with any questions about your tax filing. 
                  Contact us through chat or email for immediate assistance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TaxFilingPage;