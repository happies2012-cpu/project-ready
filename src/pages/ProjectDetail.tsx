import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/data/projects';
import {
  Star, Download, ArrowLeft, BookMarked, Share2,
  FileCode, FileText, Presentation, BookOpen, Image,
  HelpCircle, Lock, Check, Clock, Globe, Laptop
} from 'lucide-react';
import { toast } from 'sonner';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper to get image (consistent with ProjectCard)
  const getImage = () => {
    // We can use a hash of the ID to pick an image consistently if we had a proper ID system
    // For now, we'll just check the project ID length or similar hack, or random based on ID
    const idx = project.id.charCodeAt(0);
    if (idx % 3 === 0) return '/images/landing/project_thumb_code.png';
    if (idx % 3 === 1) return '/images/landing/project_thumb_ai.png';
    return '/images/landing/project_thumb_data.png';
  };

  const files = [
    { icon: FileCode, label: 'Source Code', format: 'ZIP', available: project.files.sourceCode },
    { icon: Presentation, label: 'PPT Presentation', format: 'PPTX', available: project.files.ppt },
    { icon: FileText, label: 'Documentation', format: 'DOCX', available: project.files.documentation },
    { icon: FileText, label: 'PDF Report', format: 'PDF', available: project.files.report },
    { icon: BookOpen, label: 'Research Paper', format: 'IEEE PDF', available: project.files.researchPaper },
    { icon: Image, label: 'Diagrams', format: 'PNG/PDF', available: project.files.diagrams },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <img
          src={getImage()}
          alt={project.title}
          className="w-full h-full object-cover blur-sm scale-110 opacity-50"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/projects" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Projects
              </Link>
              <span>/</span>
              <span>{project.subcategory}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/10 text-white border-white/20">{project.subcategory}</Badge>
                  <Badge className="bg-primary text-white border-none">{project.difficulty}</Badge>
                  {project.featured && (
                    <Badge className="bg-accent text-white border-none animate-pulse-slow">Featured</Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-md">
                  {project.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-white">{project.rating}</span>
                    <span>(120+ reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-5 h-5" />
                    {project.downloads} downloads
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    Instant Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="pb-16 pt-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Tabs for Richer Content */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  <TabsTrigger value="viva">Viva & FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Abstract */}
                  <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Project Abstract</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.abstract}
                      </p>
                      <div className="my-6 p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-4">
                        <Laptop className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Academic Ready</h4>
                          <p className="text-sm text-muted-foreground">
                            This project is designed to meet strict university guidelines. It includes a complete
                            synopsis, system architecture diagrams, and testing reports required for your final submission.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
                      <Globe className="w-8 h-8 text-accent mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Real-world Application</h3>
                      <p className="text-muted-foreground text-sm">Solves actual industry problems, making your resume stand out.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
                      <FileCode className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Clean Architecture</h3>
                      <p className="text-muted-foreground text-sm">Follows best coding practices with modular and scalable code structure.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-6">
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Built With</h2>
                    <div className="flex flex-wrap gap-4">
                      {project.technology.map((tech) => (
                        <div key={tech} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-border">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">System Requirements</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Node.js 18.0 or higher</li>
                        <li>Modern Web Browser (Chrome, Firefox, Safari)</li>
                        <li>4GB RAM minimum</li>
                        <li>VS Code (Recommended Editor)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="viva" className="space-y-6">
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-primary" />
                      Sample Viva Questions
                    </h2>
                    <div className="space-y-4">
                      {[
                        'What is the main objective of this project?',
                        'Explain the architecture and design patterns used.',
                        'What are the advantages of using this technology stack?',
                        'How does the system handle security and authentication?',
                        'What are the future enhancements possible for this project?',
                      ].map((q, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/30">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-foreground font-medium pt-1">{q}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300 flex items-center gap-3">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Answers to all these questions are included in the documentation.</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* File Contents Preview */}
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">Package Contents</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${file.available
                          ? 'bg-success/5 border-success/20 hover:bg-success/10 transition-colors'
                          : 'bg-muted/50 border-border opacity-60'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${file.available ? 'bg-success/10' : 'bg-muted'
                        }`}>
                        <file.icon className={`w-6 h-6 ${file.available ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{file.label}</div>
                        <div className="text-sm text-muted-foreground">{file.format}</div>
                      </div>
                      {file.available ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download Card */}
              <div className="p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-xl sticky top-24">
                <div className="text-center mb-8">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Complete Package
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-display font-bold text-foreground">₹499</span>
                    <span className="text-xl text-muted-foreground line-through decoration-destructive/50">₹2,999</span>
                  </div>
                  <Badge variant="outline" className="mt-3 bg-green-500/10 text-green-600 border-green-200">
                    83% OFF - Limited Time
                  </Badge>
                </div>

                <Link to="/auth?mode=register">
                  <Button size="lg" className="w-full mb-3 h-12 text-lg shadow-lg shadow-primary/25 gradient-primary hover:opacity-90 transition-all">
                    <Download className="w-5 h-5 mr-2" />
                    Get Instant Access
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => toast.success('Project added to wishlist!')}
                >
                  <BookMarked className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
                    <Lock className="w-4 h-4" />
                    Secure Payment via UPI
                  </div>
                  <div className="text-xs text-center text-muted-foreground/60">
                    By purchasing, you agree to our Terms and Service.
                    <br /> 100% Money Back Guarantee if files are corrupted.
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-medium text-foreground mb-4">Share this project</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-1" onClick={() => toast.success('Link copied')}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  {/* Add more share buttons here if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
