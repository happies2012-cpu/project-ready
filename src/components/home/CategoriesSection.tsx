import { Link } from 'react-router-dom';
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

const CategoriesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find projects across all major academic and professional domains
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${categoryColors[category.id]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-4xl mb-3 block">{category.icon}</span>
                    <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Project Count */}
                <div className="text-2xl font-display font-bold text-primary mb-4">
                  {category.projectCount}+ Projects
                </div>

                {/* Subcategories Preview */}
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
