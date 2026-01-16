import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            Start Building Your
            <br />
            Academic Success Today
          </h2>

          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Join 45,000+ students who have already transformed their academic journey with Project Ready
          </p>

          {/* CTA */}
          <Link to="/auth?mode=register">
            <Button variant="hero" size="xl" className="mb-8">
              <Sparkles className="w-5 h-5" />
              Get Lifetime Access for ₹499
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">7-Day Refund</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
