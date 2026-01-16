import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AIGeneratorSection from '@/components/home/AIGeneratorSection';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import ChatAssistant from '@/components/home/ChatAssistant';
import RecommendedSection from '@/components/home/RecommendedSection';

const Index = () => {
  return (
    <div className="min-h-screen animate-fade-in relative">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProjects />
        <RecommendedSection />
        <AIGeneratorSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
