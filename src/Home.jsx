
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils/index.js";
import { 
  Leaf, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "./components/ui/button.js";
import { Card, CardContent } from "./components/ui/card.js";

export default function Home() {
  const features = [
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "We use only environmentally safe, non-toxic cleaning products that protect your health and our planet."
    },
    {
      icon: Shield,
      title: "Meticulous Care",
      description: "Every detail matters. Our thorough approach ensures consistent, reliable results you can trust."
    },
    {
      icon: CheckCircle,
      title: "Transparent Service",
      description: "Clear pricing, reliable scheduling, and quality you can count on every time."
    }
  ];

  const services = [
    {
      title: "Commercial Cleaning",
      description: "Keep your workplace healthy and productive with our eco-friendly office cleaning.",
    },
    {
      title: "Rental Properties Cleaning",
      description: "Ensure your rental is pristine for new tenants with our end-of-tenancy cleaning.",
    },
    {
      title: "Pre Sale Cleaning",
      description: "Maximise your property's appeal with a deep clean before it hits the market.",
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-green-700 font-medium">ECO-FRIENDLY COMMERCIAL CLEANING</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Clean with Care.
              <br />
              <span className="text-green-600">Clean with Purpose.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional cleaning services for Christchurch businesses using only eco-friendly products. 
              We care about your space, your health, and our environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Quote")}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+6431234567">
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why KiwiPure?</h2>
            <p className="text-xl text-gray-600">Three reasons businesses trust us with their cleaning needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Professional cleaning with environmental responsibility.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link to={createPageUrl("Quote")}>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Get Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a Cleaner, Greener Workspace?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your free quote today and discover the KiwiPure difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Quote")}>
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+6431234567">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                +64 3 123 4567
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
