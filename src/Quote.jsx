
import React, { useState, useEffect } from "react";
import { Quote } from "./entities/Quote.js";
import { Button } from "./components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.jsx";
import { Input } from "./components/ui/input.jsx";
import { Label } from "./components/ui/label.jsx";
import { Textarea } from "./components/ui/textarea.jsx";
// Note: Use native select/option in this file to ensure value updates trigger calculations
import { Calculator, CheckCircle, Clock, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert.jsx";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils/index.js";

export default function QuotePage() {
  // Constants per provided spec
  const PRICING = {
    hourlyRate: 58,
    chemPerHour: 2,
    gst: 0.15,
    minVisitHours: 2.0,
    roundStep: 0.25,
    productivity: {
      office: 200,
      factory: 150,
      medical: 100,
      gym: 120,
      others: 120
    },
    frequency: {
      daily:       { multiplier: 0.85, monthlyVisits: 21.67 },
      thrice:      { multiplier: 0.92, monthlyVisits: 13.00 },
      twice:       { multiplier: 0.92, monthlyVisits: 8.67 },
      weekly:      { multiplier: 1.00, monthlyVisits: 4.33 },
      fortnightly: { multiplier: 1.10, monthlyVisits: 2.17 }
    },
    pointMinutes: {
      restroom: 8,
      kitchenette: 8,
      bin: 0.75
    }
  };

  const [formData, setFormData] = useState({
    // Contact details
    contactName: "",
    email: "",
    phone: "",
    address: "",
    // Site details
    areaM2: "",
    premisesType: "",
    frequency: "",
    timeWindows: [],
    // Toggles (scope)
    includeDesks: true,
    includeVacuum: true,
    includeMop: true,
    includeDusting: true,
    includeRestrooms: true,
    includeKitchenette: true,
    includeTrash: true,
    // Points
    restrooms: 0,
    kitchenettes: 0,
    bins: 0,
    // Notes
    special_requirements: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [outputs, setOutputs] = useState({
    monthlyInclGST: 0,
    monthlyExGST: 0,
    perVisitExGST: 0,
    perVisitInclGST: 0,
    hoursPerVisit: 0
  });

  const roundUp = (value, step) => {
    if (!isFinite(value)) return 0;
    return Math.ceil(value / step) * step;
  };

  const handleInputChange = (field, value) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    calculateOutputs(next);
  };

  const handleCheckboxChange = (field) => {
    const next = { ...formData, [field]: !formData[field] };
    setFormData(next);
    calculateOutputs(next);
  };

  const handleMultiSelectToggle = (option) => {
    let next = { ...formData };
    const set = new Set(next.timeWindows);
    if (set.has(option)) set.delete(option); else set.add(option);
    next.timeWindows = Array.from(set);
    setFormData(next);
    // No effect on pricing, so no need to recalc
  };

  const calculateOutputs = (data) => {
    const area = Math.max(0, parseFloat(data.areaM2) || 0);
    if (!area || !data.premisesType || !data.frequency) {
      setOutputs({ monthlyInclGST: 0, monthlyExGST: 0, perVisitExGST: 0, perVisitInclGST: 0, hoursPerVisit: 0 });
      return;
    }

    const productivity = PRICING.productivity[data.premisesType] || PRICING.productivity.others;
    const freq = PRICING.frequency[data.frequency];
    const pointsMinutes = (parseFloat(data.restrooms) || 0) * PRICING.pointMinutes.restroom
      + (parseFloat(data.kitchenettes) || 0) * PRICING.pointMinutes.kitchenette
      + (parseFloat(data.bins) || 0) * PRICING.pointMinutes.bin;

    const baseHours = (area / productivity) * (freq?.multiplier || 1);
    const pointsHours = pointsMinutes / 60.0;
    const rawHours = baseHours + pointsHours;

    let roundedHours = roundUp(rawHours, PRICING.roundStep);
    if (roundedHours < PRICING.minVisitHours) roundedHours = PRICING.minVisitHours;

    const visitExGST = (roundedHours * PRICING.hourlyRate) + (roundedHours * PRICING.chemPerHour);
    const monthlyExGST = visitExGST * (freq?.monthlyVisits || 0);
    const monthlyInclGST = monthlyExGST * (1 + PRICING.gst);
    const perVisitExGST = visitExGST;
    const perVisitInclGST = perVisitExGST * (1 + PRICING.gst);

    setOutputs({
      monthlyInclGST: Math.round(monthlyInclGST),
      monthlyExGST: Math.round(monthlyExGST),
      perVisitExGST: Math.round(perVisitExGST),
      perVisitInclGST: Math.round(perVisitInclGST),
      hoursPerVisit: roundedHours
    });
  };

  // Always keep outputs in sync with form data
  useEffect(() => {
    calculateOutputs(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.premisesType, formData.frequency, formData.areaM2, formData.restrooms, formData.kitchenettes, formData.bins]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map to entity if needed
      const result = await Quote.create({
        client_name: formData.contactName,
        client_email: formData.email,
        client_phone: formData.phone,
        company_name: "",
        service_type: dataPremisesToService(formData.premisesType),
        building_type: formData.premisesType,
        area_size: parseFloat(formData.areaM2) || 0,
        frequency: formData.frequency,
        special_requirements: formData.special_requirements,
        location: formData.address,
        estimated_price: outputs.monthlyInclGST
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dataPremisesToService = (v) => v || "others";

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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Estimated Monthly Price (incl. GST)</h3>
                <p className="text-3xl font-bold text-blue-600">${outputs.monthlyInclGST}</p>
                <p className="text-sm text-blue-700 mt-2">Per visit: ${outputs.perVisitExGST} ex GST (~{outputs.hoursPerVisit} h/visit)</p>
                <p className="text-xs text-blue-700 mt-1">Disclaimer: Instant estimate. Final price subject to site walk-through.</p>
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
                        <Label htmlFor="contactName" className="text-base">Contact name *</Label>
                        <Input id="contactName" value={formData.contactName} onChange={(e) => handleInputChange('contactName', e.target.value)} placeholder="Your Name" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base">Email *</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your@email.com" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-base">Phone *</Label>
                        <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="+64 21 123 4567" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-base">Site address</Label>
                        <Input id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="e.g., Christchurch CBD" className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Premises & Frequency</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="premisesType" className="text-base">Premises type *</Label>
                        <select
                          id="premisesType"
                          className="mt-2 w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          value={formData.premisesType}
                          onChange={(e) => handleInputChange('premisesType', e.target.value)}
                          required
                        >
                          <option value="" disabled>Select premises type</option>
                          <option value="office">Office</option>
                          <option value="factory">Factory</option>
                          <option value="medical">Medical</option>
                          <option value="gym">Gym</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="areaM2" className="text-base">Cleanable area (m²) *</Label>
                        <Input id="areaM2" type="number" min={20} value={formData.areaM2} onChange={(e) => handleInputChange('areaM2', e.target.value)} placeholder="e.g., 200" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="frequency" className="text-base">Cleaning frequency *</Label>
                        <select
                          id="frequency"
                          className="mt-2 w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                          value={formData.frequency}
                          onChange={(e) => handleInputChange('frequency', e.target.value)}
                          required
                        >
                          <option value="" disabled>Select frequency</option>
                          <option value="daily">Daily</option>
                          <option value="thrice">3x per week</option>
                          <option value="twice">2x per week</option>
                          <option value="weekly">Weekly</option>
                          <option value="fortnightly">Fortnightly</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-base">Preferred time window</Label>
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={formData.timeWindows.includes('businessHours')} onChange={() => handleMultiSelectToggle('businessHours')} />
                            Business hours
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={formData.timeWindows.includes('evening')} onChange={() => handleMultiSelectToggle('evening')} />
                            Evening
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={formData.timeWindows.includes('weekend')} onChange={() => handleMultiSelectToggle('weekend')} />
                            Weekend
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Scope of Work</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeDesks} onChange={() => handleCheckboxChange('includeDesks')} /> Desks wipe
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeVacuum} onChange={() => handleCheckboxChange('includeVacuum')} /> Vacuum floors
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeMop} onChange={() => handleCheckboxChange('includeMop')} /> Mop hard floors
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeDusting} onChange={() => handleCheckboxChange('includeDusting')} /> General dusting
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeRestrooms} onChange={() => handleCheckboxChange('includeRestrooms')} /> Restrooms cleaning
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeKitchenette} onChange={() => handleCheckboxChange('includeKitchenette')} /> Kitchenette cleaning
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={formData.includeTrash} onChange={() => handleCheckboxChange('includeTrash')} /> Trash & liners
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Points</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="restrooms" className="text-base"># of restrooms *</Label>
                        <Input id="restrooms" type="number" min={0} value={formData.restrooms} onChange={(e) => handleInputChange('restrooms', e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="kitchenettes" className="text-base"># of kitchenettes *</Label>
                        <Input id="kitchenettes" type="number" min={0} value={formData.kitchenettes} onChange={(e) => handleInputChange('kitchenettes', e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="bins" className="text-base"># of bins *</Label>
                        <Input id="bins" type="number" min={0} value={formData.bins} onChange={(e) => handleInputChange('bins', e.target.value)} className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="special_requirements" className="text-base">Special requirements</Label>
                    <Textarea id="special_requirements" value={formData.special_requirements} onChange={(e) => handleInputChange('special_requirements', e.target.value)} placeholder="Any additional notes..." rows={4} className="mt-2" />
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
                  <div className="text-4xl font-bold text-blue-600 mb-2">${outputs.monthlyExGST}</div>
                  <p className="text-gray-600">Estimated monthly price (ex GST)</p>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800">
                    Scope included: {' '}
                    {[
                      formData.includeDesks && 'desks',
                      formData.includeVacuum && 'vacuum',
                      formData.includeMop && 'mop',
                      formData.includeDusting && 'dusting',
                      formData.includeRestrooms && 'restrooms',
                      formData.includeKitchenette && 'kitchenette',
                      formData.includeTrash && 'trash'
                    ].filter(Boolean).join(', ')}.
                    {' '}Disclaimer: Instant estimate. Final price subject to site walk-through.
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
