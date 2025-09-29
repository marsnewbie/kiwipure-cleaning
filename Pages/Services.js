import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Building2, 
  Home, 
  Tag, 
  Leaf, 
  CheckCircle,
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description: "Comprehensive cleaning for offices, retail spaces, and other commercial properties. We create a healthy, productive environment for your team and customers using eco-friendly products.",
      features: [
        "Regular maintenance schedules",
        "Deep cleaning and sanitisation",
        "Floor care and carpet cleaning",
        "Window and surface cleaning",
        "Restroom and kitchen hygiene"
      ]
    },
    {
      icon: Home,
      title: "Rental Properties Cleaning",
      description: "Thorough end-of-tenancy cleaning to ensure your property is pristine for new occupants. We help you meet inspection standards and secure your bond.",
      features: [
        "Full interior deep clean",
        "Kitchen and appliance cleaning",
        "Bathroom sanitisation",
        "Carpet steam cleaning",
        "Wall and window washing",
        "Move-in/move-out ready"
      ]
    },
    {
      icon: Tag,
      title: "Pre Sale Cleaning",
      description: "Maximise your property's value and appeal to potential buyers with a meticulous pre-sale deep clean. We make your property shine for open homes and photography.",
      features: [
        "Detailed interior and exterior cleaning",
        "Focus on presentation and first impressions",
        "Window and glass for a sparkling finish",
        "Garden and outdoor area tidy-up",
        "Making your property photo-ready"
      ]
    }
  ];

  const ecoFeatures = [
    "Plant-based cleaning solutions",
    "Biodegradable products only",
    "Microfibre cloths (reusable)",
    "Concentrated formulas (less packaging)",
    "No harmful chemical residues",
    "Safe for people and pets"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-green-700 font-medium">ECO-FRIENDLY CLEANING SERVICES</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Cleaning with Environmental Responsibility
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver thorough, reliable cleaning using only eco-friendly products that are safe for your team and the environment.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-xl flex flex-col">
                <CardHeader className="bg-green-50 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key features:</h4>
                    <div className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t mt-auto">
                    <Link to={createPageUrl("Quote")}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Request a Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Friendly Features */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Leaf className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Eco-Friendly Promise</h2>
            <p className="text-xl text-gray-600">We care about the health of your workspace and our planet.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Go Green?</h3>
            <p className="text-xl text-gray-600 mb-8">
              Get a personalised quote for eco-friendly cleaning that's thorough, reliable, and responsible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Quote")}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+6431234567">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +64 3 123 4567
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}