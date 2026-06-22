import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/lib/auth';
import { toast } from '@/components/ui/Toast';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || null;

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success && result.user) {
      toast('success', `Welcome back, ${result.user.name}!`);
      const dest = from || getDashboardRoute(result.user.role);
      navigate(dest, { replace: true });
    } else {
      toast('error', result.error || 'Login failed. Please try again.');
    }
  };

  const quickLogin = async (testEmail: string) => {
    setEmail(testEmail);
    setPassword('password123');
    setIsLoading(true);
    const result = await login(testEmail, 'password123');
    setIsLoading(false);
    if (result.success && result.user) {
      toast('success', `Welcome back, ${result.user.name}!`);
      navigate(getDashboardRoute(result.user.role), { replace: true });
    }
  };

  const demoAccounts = [
    { email: 'creator@pixivisual.com', label: 'Content Creator' },
    { email: 'business@pixivisual.com', label: 'Business Owner' },
    { email: 'designer@pixivisual.com', label: 'Designer' },
    { email: 'agency@pixivisual.com', label: 'Agency' },
    { email: 'freelancer@pixivisual.com', label: 'Freelancer' },
    { email: 'team@pixivisual.com', label: 'Enterprise Team' },
    { email: 'admin@pixivisual.com', label: 'Admin' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative gradient-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, white 2px, transparent 2px), radial-gradient(circle at 70% 70%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Create. Design. Inspire.</h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Join 2 million+ creators using PixiVisual to craft stunning visuals that captivate audiences worldwide.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2M+', label: 'Active Users' },
              { value: '50M+', label: 'Designs Made' },
              { value: '150+', label: 'Countries' },
              { value: '4.9★', label: 'App Rating' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-xl font-display font-bold">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg gradient-primary-text">PixiVisual</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-sm text-muted-foreground">Don't have an account?</span>
            <Link to="/register" className="text-sm font-semibold text-primary hover:underline">Sign up</Link>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground text-sm">Sign in to your PixiVisual account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                    errors.email ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                    className={`w-full px-4 py-3 pr-11 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                      errors.password ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-glow-purple hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground text-center mb-3">Demo accounts — click to login instantly:</p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map(acc => (
                  <button
                    key={acc.email}
                    onClick={() => quickLogin(acc.email)}
                    disabled={isLoading}
                    className="text-left px-3 py-2 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all text-xs disabled:opacity-50"
                  >
                    <div className="font-semibold text-foreground">{acc.label}</div>
                    <div className="text-muted-foreground truncate mt-0.5">{acc.email}</div>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
