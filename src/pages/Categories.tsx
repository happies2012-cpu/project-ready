import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { categories } from '@/data/projects';
import { ArrowRight, ChevronRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  engineering: 'from-blue-500 to-blue-600',
  science: 'from-purple-500 to-purple-600',
  medical: 'from-red-500 to-red-600',
  management: 'from-amber-500 to-amber-600',
  arts: 'from-pink-500 to-pink-600',
  tech: 'from-teal-500 to-teal-600',
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Browse by Category
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find projects across all major academic and professional domains
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${categoryColors[category.id]} text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="text-5xl">{category.icon}</span>
                    <div className="text-right">
                      <div className="text-3xl font-display font-bold">{category.projectCount}+</div>
                      <div className="text-sm opacity-80">Projects</div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-display font-bold mt-4">{category.name}</h2>
                </div>

                {/* Subcategories */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Subcategories</h3>
                  <div className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/projects?category=${category.id}&subcategory=${encodeURIComponent(sub)}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors group/item"
                      >
                        <span className="text-foreground">{sub}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* View All Button */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/projects?category=${category.id}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all font-medium"
                  >
                    View All {category.name} Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
