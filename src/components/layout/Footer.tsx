import { Link, useLocation } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Instagram, Youtube, Github, Mail, MapPin } from 'lucide-react';
import { APP_NAME } from '@/constants';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Templates', href: '/features#templates' },
    { label: 'AI Studio', href: '/features#ai-studio' },
    { label: 'Brand Kit', href: '/features#branding' },
    { label: 'Analytics', href: '/features#analytics' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Community', href: '/community' },
    { label: 'Help Center', href: '/faq' },
    { label: 'Status', href: '/status' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy#cookies' },
    { label: 'GDPR', href: '/privacy#gdpr' },
    { label: 'Security', href: '/privacy#security' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    const [path, hash] = href.split('#');
    if (location.pathname === path) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-primary-text">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              The AI-powered visual content creation platform for businesses, creators, designers, and marketing teams worldwide.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 text-muted-foreground">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 text-muted-foreground">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 text-muted-foreground">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 text-muted-foreground">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 text-muted-foreground">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <a href="mailto:hello@pixivisual.com" className="hover:text-primary transition-colors">hello@pixivisual.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>San Francisco, CA, USA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 {APP_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" onClick={() => handleLinkClick('/privacy')} className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" onClick={() => handleLinkClick('/terms')} className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link to="/contact" onClick={() => handleLinkClick('/contact')} className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
