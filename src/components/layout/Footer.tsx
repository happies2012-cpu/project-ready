import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: 'Engineering', href: '/categories/engineering' },
      { name: 'Science & IT', href: '/categories/science' },
      { name: 'Medical', href: '/categories/medical' },
      { name: 'Management', href: '/categories/management' },
      { name: 'Arts & Education', href: '/categories/arts' },
    ],
    resources: [
      { name: 'AI Generator', href: '/ai-generator' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 dark:from-black dark:via-purple-950/30 dark:to-black text-white border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img
                src="/logo.png"
                alt="Project Ready Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl">Project Ready</span>
            </Link>
            <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-sm">
              Your ultimate destination for academic and professional projects. Access 1500+ projects, AI-powered generation, and comprehensive documentation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-300 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@projectready.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bangalore, India
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          © {currentYear} Project Ready. All rights reserved. Powered by GuideSoft.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
