import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { stats } from '@/data/projects';
import HeroSlider from './HeroSlider';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">AI-Powered Project Generation</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 animate-slide-up leading-tight">
              Your Complete
              <br />
              <span className="bg-gradient-to-r from-accent via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Academic Project
              </span>
              <br />
              Universe
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Access 1500+ ready-made projects with complete documentation, source code, PPTs, and research papers.
              Generate unique projects with AI in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/auth?mode=register">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start for ₹499
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Explore Projects
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-1">
                  {stats.totalProjects.toLocaleString()}+
                </div>
                <div className="text-xs text-primary-foreground/60">Projects</div>
              </div>
              <div className="p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-1">
                  {(stats.totalDownloads / 1000).toFixed(0)}K+
                </div>
                <div className="text-xs text-primary-foreground/60">Downloads</div>
              </div>
              <div className="p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-1">
                  {(stats.activeStudents / 1000).toFixed(0)}K+
                </div>
                <div className="text-xs text-primary-foreground/60">Students</div>
              </div>
              <div className="p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-1">
                  {stats.universities}+
                </div>
                <div className="text-xs text-primary-foreground/60">Universities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Slider */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <HeroSlider />
            {/* Glow effect behind slider */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary/30 blur-3xl -z-10 opacity-50" />
          </div>
        </div>

      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
