import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Code, Terminal } from 'lucide-react';

const Documentation = () => {
    const guides = [
        { icon: BookOpen, title: 'Getting Started', desc: 'How to download and set up your first project.' },
        { icon: FileText, title: 'Project Structure', desc: 'Understanding the folder layout and key files.' },
        { icon: Code, title: 'Customization', desc: 'How to modify the source code for your needs.' },
        { icon: Terminal, title: 'Troubleshooting', desc: 'Common build errors and how to fix them.' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="Documentation"
                subtitle="Everything you need to know about setting up and running your projects."
                image="/images/landing/documentation_library_3d.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {guides.map((guide, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <guide.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                            <p className="text-muted-foreground text-sm">{guide.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
                    <h2>Quick Start Guide</h2>
                    <p>
                        Every project download comes with a <code>README.md</code> file specific to that project.
                        However, most projects follow a standard structure.
                    </p>

                    <h3>Prerequisites</h3>
                    <ul>
                        <li>Node.js (for Web/JS projects)</li>
                        <li>Python 3.8+ (for AI/ML projects)</li>
                        <li>VS Code or IntelliJ IDEA</li>
                    </ul>

                    <h3>Running a Project</h3>
                    <p>
                        1. Unzip the downloaded file.<br />
                        2. Open the folder in your terminal.<br />
                        3. Run the setup command:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg">npm install</pre>
                    <p>or for Python:</p>
                    <pre className="bg-muted p-4 rounded-lg">pip install -r requirements.txt</pre>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Documentation;
