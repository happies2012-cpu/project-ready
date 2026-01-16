import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Download, FileText, Code, Presentation, Eye } from 'lucide-react';
import { Project } from '@/data/projects'; // Assuming types are here

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    // Determine image based on index or project type (for demo purposes)
    const getImage = (idx: number) => {
        if (idx % 3 === 0) return '/images/landing/project_thumb_code.png';
        if (idx % 3 === 1) return '/images/landing/project_thumb_ai.png';
        return '/images/landing/project_thumb_data.png';
    };

    return (
        <div
            className="group relative bg-card/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
        >
            {/* Dynamic Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-primary/50 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

            {/* Thumbnail Area */}
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
                <img
                    src={getImage(index)}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                        {project.difficulty}
                    </Badge>
                    {project.featured && (
                        <Badge className="bg-gradient-accent text-white border-none shadow-glow animate-pulse-slow">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-white/90 text-black hover:bg-white transition-colors backdrop-blur-sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Quick View
                            </Button>
                        </DialogTrigger>
                        {/* Reuse Dialog Content Logic later or pass as children if needed. For now keeping simple. */}
                        <DialogContent className="max-w-3xl glass border-white/20">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-display">{project.title}</DialogTitle>
                                <DialogDescription>
                                    {project.subcategory} • {project.difficulty}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-8 mt-4">
                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner">
                                    <img
                                        src={getImage(index)}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <p className="text-muted-foreground leading-relaxed">{project.abstract}</p>

                                    <div>
                                        <h4 className="text-sm font-medium mb-3 text-foreground">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technology.map((tech: string) => (
                                                <Badge key={tech} variant="outline" className="bg-primary/5 border-primary/20">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Link to={`/projects/${project.id}`} className="flex-1">
                                            <Button className="w-full gradient-primary hover:opacity-90 transition-opacity">
                                                View Details
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5">
                                            <Download className="w-4 h-4 mr-2" />
                                            Source Code
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Content */}
            <Link to={`/projects/${project.id}`} className="p-6 flex-1 flex flex-col relative z-10 bg-card/30 backdrop-blur-sm">
                <div className="text-xs text-accent font-bold uppercase tracking-wider mb-2">
                    {project.subcategory}
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all line-clamp-2">
                    {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
                    {project.abstract}
                </p>

                {/* Tech Stack Minified */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technology.slice(0, 3).map((tech: string) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-secondary/50 text-secondary-foreground border border-white/5"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technology.length > 3 && (
                        <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-secondary/50 text-secondary-foreground border border-white/5">
                            +{project.technology.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {project.rating}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5" />
                            {project.downloads}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        {project.files.sourceCode && <Code className="w-4 h-4 text-muted-foreground/50" />}
                        {project.files.documentation && <FileText className="w-4 h-4 text-muted-foreground/50" />}
                        {project.files.ppt && <Presentation className="w-4 h-4 text-muted-foreground/50" />}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;
