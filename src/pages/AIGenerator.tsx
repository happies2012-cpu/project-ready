import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from '@/data/projects';
import { Sparkles, Wand2, FileCode, FileText, Presentation, BookOpen, Download, RefreshCw, Lock, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const technologies = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'Flutter', 'Django',
  'TensorFlow', 'PyTorch', 'Arduino', 'Raspberry Pi', 'MongoDB', 'MySQL',
  'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Blockchain', 'IoT'
];

const AIGenerator = () => {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    technology: '',
    difficulty: '',
    description: '',
  });

  const selectedCategory = categories.find(c => c.id === formData.category);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setGenerating(false);
    setGenerated(true);
    toast.success('Project generated successfully!');
  };

  const generatedProject = {
    title: 'Smart Campus Navigation System using AR & IoT',
    abstract: 'An augmented reality-based navigation system integrated with IoT sensors for real-time indoor navigation in educational campuses. The system provides accessibility features for differently-abled students.',
    objectives: [
      'Develop AR-based indoor navigation',
      'Integrate IoT sensors for location tracking',
      'Implement accessibility features',
      'Create mobile-friendly interface',
    ],
    technologies: ['React Native', 'ARCore', 'Python', 'Firebase', 'Arduino'],
    modules: [
      'User Authentication Module',
      'AR Navigation Engine',
      'IoT Sensor Integration',
      'Map Generation System',
      'Accessibility Controller',
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">AI-Powered</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Generate Your Unique Project
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI creates completely unique, plagiarism-free projects tailored to your requirements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                    step >= s 
                      ? 'gradient-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Select Your Course & Branch
                    </h2>
                    <p className="text-muted-foreground">Choose the academic domain for your project</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v, subcategory: '' })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Branch / Specialization</Label>
                      <Select 
                        value={formData.subcategory} 
                        onValueChange={(v) => setFormData({ ...formData, subcategory: v })}
                        disabled={!selectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory?.subcategories.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={() => setStep(2)}
                      disabled={!formData.category || !formData.subcategory}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Technology & Difficulty
                    </h2>
                    <p className="text-muted-foreground">Configure technical requirements for your project</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Primary Technology</Label>
                      <Select value={formData.technology} onValueChange={(v) => setFormData({ ...formData, technology: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select technology" />
                        </SelectTrigger>
                        <SelectContent>
                          {technologies.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                              {tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <Select value={formData.difficulty} onValueChange={(v) => setFormData({ ...formData, difficulty: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Requirements (Optional)</Label>
                    <Textarea
                      placeholder="Describe any specific requirements, features, or preferences..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={() => setStep(3)}
                      disabled={!formData.technology || !formData.difficulty}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && !generated && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                    <Wand2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Ready to Generate!
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Our AI will create a unique {formData.difficulty} level {formData.technology} project for {formData.subcategory}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button 
                      variant="gradient" 
                      size="lg"
                      onClick={handleGenerate}
                      disabled={generating}
                    >
                      {generating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Project
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && generated && (
                <div className="animate-fade-in">
                  {/* Generated Project Preview */}
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-accent">Project Generated Successfully</span>
                  </div>

                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                    {generatedProject.title}
                  </h2>

                  <p className="text-muted-foreground mb-6">
                    {generatedProject.abstract}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <h3 className="font-medium text-foreground mb-3">Key Objectives</h3>
                      <ul className="space-y-2">
                        {generatedProject.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <h3 className="font-medium text-foreground mb-3">Project Modules</h3>
                      <ul className="space-y-2">
                        {generatedProject.modules.map((mod, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center text-xs text-primary mt-0.5">
                              {i + 1}
                            </div>
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {generatedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Available Files */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { icon: FileCode, label: 'Source Code', available: true },
                      { icon: FileText, label: 'Documentation', available: true },
                      { icon: Presentation, label: 'PPT Slides', available: true },
                      { icon: BookOpen, label: 'Research Paper', available: true },
                    ].map((file, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                        <file.icon className="w-8 h-8 mx-auto mb-2 text-success" />
                        <div className="text-sm font-medium text-foreground">{file.label}</div>
                        <div className="text-xs text-success">Ready</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => { setGenerated(false); handleGenerate(); }}>
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Link to="/auth?mode=register" className="flex-1">
                      <Button variant="gradient" size="lg" className="w-full">
                        <Download className="w-4 h-4" />
                        Unlock & Download (₹499)
                      </Button>
                    </Link>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    One-time payment for lifetime access to all projects
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIGenerator;
