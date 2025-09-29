
import React, { useState } from "react";
import { Quote } from "./entities/Quote.js";
import { Button } from "./components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.jsx";
import { Input } from "./components/ui/input.jsx";
import { Label } from "./components/ui/label.jsx";
import { Textarea } from "./components/ui/textarea.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.jsx";
import { Calculator, CheckCircle, Clock, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert.jsx";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils/index.js";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    company_name: "",
    service_type: "",
    building_type: "",
    area_size: "",
    frequency: "",
    special_requirements: "",
    location: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    calculatePrice({ ...formData, [field]: value });
  };

  const calculatePrice = (data) => {
    const areaSize = parseFloat(data.area_size) || 0;
    
    // Base rate per sqm is $3 NZD
    const baseRatePerSqm = 3;
    
    // Frequency coefficients
    const frequencyCoefficients = {
      one_time: 1.0,    // 100%
      monthly: 0.95,    // 95%
      bi_weekly: 0.9,   // 90%
      weekly: 0.85      // 85%
    };

    let frequencyCoeff = 1.0;
    if (data.frequency && frequencyCoefficients[data.frequency]) {
      frequencyCoeff = frequencyCoefficients[data.frequency];
    }

    // Base calculation: Area × Base Rate × Frequency Coefficient
    let basePrice = areaSize * baseRatePerSqm * frequencyCoeff;
    
    // Special requirements surcharge (10% if there are special requirements)
    let surcharge = 0;
    if (data.special_requirements && data.special_requirements.trim().length > 0) {
      surcharge = basePrice * 0.1;
    }

    const total = Math.round(basePrice + surcharge);
    setEstimatedPrice(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await Quote.create({
        ...formData,
        area_size: parseFloat(formData.area_size),
        estimated_price: estimatedPrice
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Thank you for choosing KiwiPure Cleaning. We will be in touch within 24 hours with a detailed, personalised quote.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Estimated Price</h3>
                <p className="text-3xl font-bold text-blue-600">${estimatedPrice}</p>
                <p className="text-sm text-blue-700 mt-2">*Final price subject to confirmation based on specific requirements.</p>
              </div>
              <Link to={createPageUrl("Home")}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Free Quote</span>
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below for a transparent, no-obligation quote for your cleaning needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Quote Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client_name" className="text-base">Full Name *</Label>
                        <Input id="client_name" value={formData.client_name} onChange={(e) => handleInputChange('client_name', e.target.value)} placeholder="Your Name" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="client_email" className="text-base">Email Address *</Label>
                        <Input id="client_email" type="email" value={formData.client_email} onChange={(e) => handleInputChange('client_email', e.target.value)} placeholder="your@email.com" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="client_phone" className="text-base">Phone Number</Label>
                        <Input id="client_phone" value={formData.client_phone} onChange={(e) => handleInputChange('client_phone', e.target.value)} placeholder="+64 21 123 4567" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="company_name" className="text-base">Company Name</Label>
                        <Input id="company_name" value={formData.company_name} onChange={(e) => handleInputChange('company_name', e.target.value)} placeholder="Your Company Ltd" className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="building_type" className="text-base">Property Type *</Label>
                        <Select value={formData.building_type} onValueChange={(value) => handleInputChange('building_type', value)}>
                          <SelectTrigger className="mt-2"><SelectValue placeholder="Select property type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="medical">Medical Centre</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="area_size" className="text-base">Area Size (sqm) *</Label>
                        <Input id="area_size" type="number" value={formData.area_size} onChange={(e) => handleInputChange('area_size', e.target.value)} placeholder="e.g., 200" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="frequency" className="text-base">Cleaning Frequency *</Label>
                        <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
                          <SelectTrigger className="mt-2"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi_weekly">Fortnightly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="one_time">One-off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-base">Service Address</Label>
                        <Input id="location" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="e.g., Christchurch CBD" className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="special_requirements" className="text-base">Special Requirements</Label>
                    <Textarea id="special_requirements" value={formData.special_requirements} onChange={(e) => handleInputChange('special_requirements', e.target.value)} placeholder="Please describe any specific cleaning needs or areas of focus..." rows={4} className="mt-2" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    {isSubmitting ? 'Submitting...' : 'Submit for Detailed Quote'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Instant Estimate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">${estimatedPrice}</div>
                  <p className="text-gray-600">Estimated Price (NZD)</p>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800">
                    This is a preliminary estimate based on the information provided. Our commitment to transparent pricing means your final quote will be detailed and all-inclusive.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Our Promise
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Quote within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Free on-site assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Transparent, all-inclusive pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Our Quality Promise on all work</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
