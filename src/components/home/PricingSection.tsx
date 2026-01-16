import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, ArrowRight, GraduationCap } from 'lucide-react';

const PricingSection = () => {
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
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            One Price, Everything Included
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get lifetime access to all projects, AI generator, and premium features for a one-time payment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Plan */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-pink-500/20 rounded-3xl blur-2xl" />

            {/* Card */}
            <div className="relative bg-card rounded-3xl border-2 border-primary/20 overflow-hidden shadow-xl h-full flex flex-col">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium rounded-bl-2xl flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Most Popular
                </div>
              </div>

              <div className="p-8 md:p-12 flex-1 flex flex-col">
                {/* Plan Name */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                    <Zap className="w-4 h-4" />
                    Student Pro Access
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-display font-bold text-foreground">₹499</span>
                    <span className="text-muted-foreground text-lg line-through">₹2,999</span>
                  </div>
                  <p className="text-muted-foreground">One-time payment • Lifetime Access</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-10 flex-1">
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

                {/* Guarantee */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  🔒 Secure Payment • 7-Day Money Back Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* University Plan */}
          <div className="relative mt-8 md:mt-0">
            <div className="relative bg-card rounded-3xl border border-border overflow-hidden shadow-lg h-full flex flex-col">
              <div className="p-8 md:p-12 flex-1 flex flex-col">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground font-medium mb-4">
                    <GraduationCap className="w-4 h-4" />
                    University / College
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-display font-bold text-foreground">Custom</span>
                  </div>
                  <p className="text-muted-foreground">For Bulk Licenses & Faculty</p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {['Bulk Student Licenses', 'Admin Dashboard', 'Faculty Monitoring', 'Custom Domain', 'API Access', 'Priority Support'].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact">
                  <Button variant="outline" size="xl" className="w-full">
                    Contact Sales
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
              ))}
            </div>
            <span className="text-sm">45,000+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-warning fill-warning" />
            <span className="text-sm">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-sm">500+ Universities Trust Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
