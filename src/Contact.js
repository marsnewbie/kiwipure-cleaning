import React, { useState } from "react";
import { ContactMessage } from "@/entities/ContactMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ContactMessage.create(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-green-700 font-medium">CONTACT US</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-6">
                  For quotes, service inquiries, or general questions, please don't hesitate to contact us.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a href="tel:+6431234567" className="text-green-600 hover:underline">+64 3 123 4567</a>
                    <p className="text-sm text-gray-500">Mon - Fri, 9am - 5pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:info@kiwipure.co.nz" className="text-green-600 hover:underline">info@kiwipure.co.nz</a>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Christchurch, New Zealand</p>
                    <p className="text-sm text-gray-500">Service across the Canterbury region</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl">
              <CardHeader className="bg-gray-50 p-6">
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </CardHeader>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-600">Your message has been sent successfully. We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-medium">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-medium">Email Address</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-medium">Phone Number (Optional)</Label>
                      <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+64 21 123 4567" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-medium">Message</Label>
                      <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} required placeholder="How can we help you?" rows={5} />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}