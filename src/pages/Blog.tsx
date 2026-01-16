import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            title: 'Top 10 Final Year Project Ideas for CSE Students',
            excerpt: 'Struggling to choose a project? Here are the most trending topics in AI, Blockchain, and IoT for 2026.',
            date: 'Jan 15, 2026',
            category: 'Guides',
            image: '/images/landing/project_thumb_code.png'
        },
        {
            title: 'How to Write a Research Paper like a Pro',
            excerpt: 'A step-by-step guide to structuring and publishing your project research in IEEE journals.',
            date: 'Jan 10, 2026',
            category: 'Research',
            image: '/images/landing/project_thumb_data.png'
        },
        {
            title: 'The Future of AI in Education',
            excerpt: 'Exploring how Artificial Intelligence is transforming the way students learn and build projects.',
            date: 'Jan 05, 2026',
            category: 'Trends',
            image: '/images/landing/project_thumb_ai.png'
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="Project Ready Blog"
                subtitle="Insights, tutorials, and trends from the world of academic projects and technology."
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="rounded-2xl overflow-hidden mb-4 border border-border">
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </div>
                            </div>
                            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
