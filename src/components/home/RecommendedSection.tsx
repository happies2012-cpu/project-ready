import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';

const RecommendedSection = () => {
    // Pick 3 random projects that are not featured, or just different ones
    const recommended = projects.slice(3, 6);

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-foreground">Recommended for You</h2>
                        <p className="text-muted-foreground">Based on popular categories</p>
                    </div>
                    <Link to="/projects">
                        <span className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommended.map((project) => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="flex group bg-muted/30 rounded-xl border border-border overflow-hidden hover:bg-muted/50 transition-colors"
                        >
                            <div className="w-24 bg-muted h-auto flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">💡</span>
                            </div>
                            <div className="p-4 flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <Badge variant="outline" className="text-[10px] h-5">{project.difficulty}</Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Star className="w-3 h-3 fill-warning text-warning" />
                                        {project.rating}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{project.abstract}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedSection;
