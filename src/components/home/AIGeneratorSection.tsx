import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, FileCode, FileText, Presentation, BookOpen, ArrowRight, Check } from 'lucide-react';

const AIGeneratorSection = () => {
  const features = [
    { icon: FileCode, label: 'Source Code', desc: 'Complete project code' },
    { icon: FileText, label: 'Documentation', desc: 'Word & PDF reports' },
    { icon: Presentation, label: 'PPT Slides', desc: 'Presentation ready' },
    { icon: BookOpen, label: 'Research Paper', desc: 'IEEE format' },
  ];

  const steps = [
    'Select your course & branch',
    'Choose technology stack',
    'Set difficulty level',
    'Generate unique project',
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Generate Unique Projects
              <br />
              <span className="text-gradient">With AI in Seconds</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Our AI generates completely unique projects tailored to your course, branch, and requirements. 
              Get complete documentation, code, and presentations instantly.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-foreground font-medium">{step}</span>
                </div>
              ))}
            </div>

            <Link to="/ai-generator">
              <Button variant="gradient" size="xl">
                <Wand2 className="w-5 h-5" />
                Try AI Generator
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right - Interactive Demo */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-pink-500/20 rounded-3xl blur-3xl" />
            
            {/* Card */}
            <div className="relative bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">AI Project Generator</h3>
                    <p className="text-sm text-muted-foreground">Create your unique project</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Generated Project Preview */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    <span className="text-sm font-medium text-accent">Generated Project</span>
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Smart Waste Management System using IoT
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    An intelligent waste management solution using IoT sensors for real-time monitoring...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">Python</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">Arduino</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">Firebase</span>
                  </div>
                </div>

                {/* Output Files */}
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                <Button variant="gradient" className="w-full" size="lg">
                  <Sparkles className="w-4 h-4" />
                  Regenerate Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGeneratorSection;
