import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap, Home, FolderOpen, Wand2, Download, BookMarked, Settings, LogOut,
  Search, Bell, User, Star, FileText, Code, Presentation, ChevronRight, TrendingUp,
  Clock, Award, Sparkles
} from 'lucide-react';
import { projects, categories, stats } from '@/data/projects';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: FolderOpen, label: 'Browse Projects', href: '/projects' },
    { icon: Wand2, label: 'AI Generator', href: '/ai-generator' },
    { icon: Download, label: 'Downloads', href: '/dashboard/downloads' },
    { icon: BookMarked, label: 'Saved Projects', href: '/dashboard/saved' },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
  ];

  const recentProjects = projects.slice(0, 4);
  const savedProjects = projects.slice(4, 8);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed left-0 top-0 bottom-0 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Project Ready</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <button
            onClick={() => { toast.info('Logged out'); window.location.href = '/'; }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">Premium Member</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground">
              You have lifetime access to all {stats.totalProjects}+ projects
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Projects Downloaded</div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">AI Projects Generated</div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">15</div>
              <div className="text-sm text-muted-foreground">Saved Projects</div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Certificates Earned</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link to="/ai-generator" className="group p-6 rounded-2xl gradient-primary text-primary-foreground hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">Generate New Project</h3>
                  <p className="text-primary-foreground/80">Create unique projects with AI</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                Start generating <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/projects" className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">Browse Projects</h3>
                  <p className="text-muted-foreground">Explore {stats.totalProjects}+ ready projects</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-primary">
                Explore now <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-foreground">Recently Viewed</h2>
              <Link to="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden mb-4">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/landing/project_thumb_code.png';
                      }}
                    />
                  </div>
                  <div className="text-xs text-primary font-medium mb-1">{project.subcategory}</div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Viewed 2h ago</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Quick Access */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-foreground">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all text-center"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {category.projectCount} projects
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
