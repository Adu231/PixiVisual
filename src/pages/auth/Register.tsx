import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/lib/auth';
import { toast } from '@/components/ui/Toast';
import type { UserRole } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: 'content-creator', label: 'Content Creator', desc: 'Social media, blogs, YouTube' },
  { value: 'business-owner', label: 'Business Owner', desc: 'Marketing & brand materials' },
  { value: 'designer', label: 'Designer', desc: 'Professional design work' },
  { value: 'marketing-agency', label: 'Marketing Agency', desc: 'Client campaigns & creatives' },
  { value: 'freelancer', label: 'Freelancer', desc: 'Portfolio & client projects' },
  { value: 'enterprise', label: 'Enterprise Team', desc: 'Large-scale brand management' },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('content-creator');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleStep1 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await register(name, email, password, selectedRole);
    setIsLoading(false);
    if (result.success && result.user) {
      toast('success', `Welcome to PixiVisual, ${result.user.name}! Your account is ready.`);
      navigate(getDashboardRoute(result.user.role), { replace: true });
    } else {
      toast('error', result.error || 'Registration failed. Please try again.');
      setStep(1);
    }
  };

  const passwordStrength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
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
          <span className="text-sm text-muted-foreground">Already have an account?</span>
          <Link to="/login" className="text-sm font-semibold text-primary hover:underline">Sign in</Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                  step > s ? 'gradient-primary text-white' : step === s ? 'border-2 border-primary text-primary bg-primary/10' : 'border-2 border-border text-muted-foreground'
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className={`text-xs font-medium ${step === s ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Account Info' : 'Select Role'}
                </span>
                {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-primary' : 'bg-border'} transition-all`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="animate-slide-up">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">Create your account</h1>
              <p className="text-muted-foreground text-sm mb-8">Start creating beautiful visuals for free — no credit card required.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                      errors.name ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                      errors.email ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                        errors.password ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-muted'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{strengthLabels[passwordStrength]} password</p>
                    </div>
                  )}
                  {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                        errors.confirmPassword ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder="Repeat your password"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1.5 text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleStep1}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">How will you use PixiVisual?</h1>
              <p className="text-muted-foreground text-sm mb-6">We'll personalize your experience based on your role.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {roles.map(role => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedRole === role.value
                        ? 'border-primary bg-primary/10 shadow-glow-purple'
                        : 'border-border hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        selectedRole === role.value ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedRole === role.value && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{role.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{role.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
