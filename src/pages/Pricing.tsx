import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, ArrowRight, Shield, Clock, Sparkles, CreditCard } from 'lucide-react';

const Pricing = () => {
  const features = [
    'Access to 1500+ Projects',
    'Complete Source Code',
    'PPT Presentations',
    'Word Documentation',
    'PDF Reports',
    'Research Papers (IEEE)',
    'Flow & ER Diagrams',
    'AI Project Generator',
    'Unlimited Downloads',
    'Lifetime Access',
    'Viva Q&A Support',
    'Priority Updates',
    '24/7 Support',
    'Certificate of Access',
  ];

  const faqs = [
    {
      q: 'Is this a one-time payment?',
      a: 'Yes! Pay once and get lifetime access to all projects and features. No recurring charges.'
    },
    {
      q: 'Can I download unlimited projects?',
      a: 'Absolutely! Once you pay ₹499, you can download as many projects as you want. Forever.'
    },
    {
      q: 'Are the projects plagiarism-free?',
      a: 'Yes, especially AI-generated projects are unique. However, we recommend customizing for your specific needs.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with our platform.'
    },
    {
      q: 'Can I use projects for my college submission?',
      a: 'Yes! Our projects are designed for academic submissions. We recommend understanding and customizing them.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept UPI, GPay, PhonePe, Paytm, all major cards, and international payments via Stripe.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Special Launch Price</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One-time payment. Lifetime access. No hidden fees.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-pink-500/20 rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-card rounded-3xl border-2 border-primary/20 overflow-hidden shadow-xl">
                {/* Popular Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium rounded-bl-2xl flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Best Value
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  {/* Plan Name */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                      <Zap className="w-4 h-4" />
                      Student Pro Access
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-6xl md:text-7xl font-display font-bold text-foreground">₹499</span>
                      <span className="text-muted-foreground text-xl line-through">₹2,999</span>
                    </div>
                    <p className="text-muted-foreground text-lg">One-time payment • Lifetime Access</p>
                    
                    {/* Savings */}
                    <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-success/10 text-success font-medium">
                      <span>🎉 You save ₹2,500 (83% off)</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to="/auth?mode=register">
                    <Button variant="gradient" size="xl" className="w-full">
                      Get Started Now
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>

                  {/* Payment Methods */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-3">Secure payments powered by</p>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                      <CreditCard className="w-8 h-8" />
                      <span className="text-lg font-medium">UPI</span>
                      <span className="text-lg font-medium">Razorpay</span>
                      <span className="text-lg font-medium">Stripe</span>
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-4">
                      <Shield className="w-10 h-10 text-success" />
                      <div>
                        <h4 className="font-medium text-foreground">7-Day Money Back Guarantee</h4>
                        <p className="text-sm text-muted-foreground">
                          Not satisfied? Get a full refund within 7 days. No questions asked.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-20 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                ))}
              </div>
              <span className="text-sm font-medium">45,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium">500+ Universities Trust Us</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
