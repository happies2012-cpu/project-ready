import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, Check, Facebook, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(formData.email, formData.password);
        toast.success('Login successful! Redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        await signUpWithEmail(formData.email, formData.password, {
          full_name: formData.name,
          phone: formData.phone,
        });
        toast.success('Account created! Please check your email for verification.');
        navigate('/payment');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Access to 1500+ Academic Projects',
    'Complete Source Code & Documentation',
    'AI-Powered Project Generator',
    'PPT, Reports & Research Papers',
    'Lifetime Access & Updates',
    'Viva Q&A Support',
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Form */}
      <div className="flex flex-col p-8 lg:p-12">
        {/* Back Link */}
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Project Ready</span>
          </Link>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? 'Enter your credentials to access your dashboard'
              : 'Get lifetime access to all projects for just ₹499'}
          </p>

          {/* Social Auth */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <Button
              variant="outline"
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-2 h-12"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="sr-only sm:not-sr-only">Google</span>
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={() => toast.info("Configure Facebook App ID in Supabase")}
              className="w-full flex items-center justify-center gap-2 h-12"
            >
              <Facebook className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="sr-only sm:not-sr-only">Facebook</span>
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={() => toast.info("Configure LinkedIn Client ID in Supabase")}
              className="w-full flex items-center justify-center gap-2 h-12"
            >
              <Linkedin className="w-5 h-5 text-blue-700 flex-shrink-0" />
              <span className="sr-only sm:not-sr-only">LinkedIn</span>
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account & Pay ₹499'
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Panel - Benefits */}
      <div className="hidden lg:flex gradient-hero p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Everything you need for academic success
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-10">
            Get instant access to thousands of projects with complete documentation
          </p>

          {/* Benefits List */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-success-foreground" />
                </div>
                <span className="text-primary-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Price Badge */}
          <div className="mt-10 inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
            <div>
              <div className="text-3xl font-display font-bold text-primary-foreground">₹499</div>
              <div className="text-sm text-primary-foreground/70">One-time payment</div>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-primary-foreground/70 text-sm">
              Lifetime<br />Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
