import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, Sparkles, Zap, Layout, Users, BarChart, Store } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/lib/auth';
import { getInitials } from '@/lib/utils';
import { APP_NAME } from '@/constants';

const navLinks = [
  {
    label: 'Features',
    href: '/features',
    children: [
      { label: 'AI Design Studio', href: '/features#ai-studio', icon: Sparkles, desc: 'Generate visuals with AI' },
      { label: 'Design Editor', href: '/features#editor', icon: Layout, desc: 'Professional drag-and-drop editor' },
      { label: 'Team Collaboration', href: '/features#collaboration', icon: Users, desc: 'Work together seamlessly' },
      { label: 'Analytics', href: '/features#analytics', icon: BarChart, desc: 'Track creative performance' },
      { label: 'Marketplace', href: '/features#marketplace', icon: Store, desc: 'Templates & assets' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const handleDashboard = () => {
    if (user) navigate(getDashboardRoute(user.role));
    setUserMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow-purple group-hover:shadow-glow-pink transition-all duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-primary-text">{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}>
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link to={link.href} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}>
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-2xl p-2 animate-scale-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/5 group transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <child.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{child.label}</p>
                          <p className="text-xs text-muted-foreground">{child.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-7 h-7 rounded-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`;
                      }}
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>


                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl p-2 animate-scale-in">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">{user.plan}</span>
                    </div>
                    <button onClick={handleDashboard} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-primary/5 text-foreground transition-colors">Dashboard</button>
                    <Link to="/profile" className="block px-3 py-2 rounded-xl text-sm hover:bg-primary/5 text-foreground transition-colors">Profile</Link>
                    <Link to="/settings" className="block px-3 py-2 rounded-xl text-sm hover:bg-primary/5 text-foreground transition-colors">Settings</Link>
                    <div className="border-t border-border mt-1 pt-1">
                      <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-destructive/10 text-destructive transition-colors">Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-bold gradient-primary text-white hover:opacity-90 transition-all duration-200 shadow-glow-purple hover:shadow-glow-pink">
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border animate-slide-up">
          <div className="container px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {link.children.map((child) => (
                      <Link key={child.href} to={child.href} className="block px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 rounded-xl bg-muted flex items-center gap-3">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`;
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleDashboard} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium gradient-primary text-white">
                    Go to Dashboard
                  </button>
                  <Link to="/profile" className="block px-4 py-3 rounded-xl text-sm font-medium border border-border text-center">Profile</Link>
                  <Link to="/settings" className="block px-4 py-3 rounded-xl text-sm font-medium border border-border text-center">Settings</Link>
                  <button onClick={handleLogout} className="w-full px-4 py-3 rounded-xl text-sm font-medium text-destructive border border-destructive/20">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 rounded-xl text-sm font-medium border border-border text-center text-foreground">Sign In</Link>
                  <Link to="/register" className="block px-4 py-3 rounded-xl text-sm font-bold gradient-primary text-white text-center">Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
