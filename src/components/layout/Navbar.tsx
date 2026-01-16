import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Categories', href: '/categories' },
    { name: 'AI Generator', href: '/ai-generator' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome
        ? 'bg-black/40 dark:bg-black/60 backdrop-blur-xl border-b border-white/10'
        : 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Project Ready Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className={`font-display font-bold text-xl ${isHome ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
              Project Ready
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-medium transition-colors ${isHome
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}>
              Home
            </Link>
            <Link to="/projects" className={`font-medium transition-colors ${isHome
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}>
              Projects
            </Link>
            <Link to="/categories" className={`font-medium transition-colors ${isHome
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}>
              Categories
            </Link>
            <Link to="/blog" className={`font-medium transition-colors ${isHome
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}>
              Blog
            </Link>
            <Link to="/about" className={`font-medium transition-colors ${isHome
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}>
              About
            </Link>
          </div>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className={`${isHome
                    ? 'text-white hover:bg-white/10 border border-white/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/50"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isHome ? 'text-white' : 'text-gray-900 dark:text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isHome ? 'text-white' : 'text-gray-900 dark:text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10 shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Switch Theme</span>
                <ModeToggle />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="py-3 px-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-white/10 my-2" />
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
