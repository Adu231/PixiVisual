import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, Mail, Check } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
    toast('success', 'Password reset instructions sent to your email!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg gradient-primary-text">PixiVisual</span>
        </Link>

        {!submitted ? (
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-display font-bold text-foreground mb-2">Reset your password</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${
                    error ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  placeholder="you@company.com"
                />
                {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground mb-2">Check your inbox</h1>
            <p className="text-sm text-muted-foreground mb-6">
              We've sent a password reset link to <strong className="text-foreground">{email}</strong>.
              Check your email and follow the instructions.
            </p>
            <p className="text-xs text-muted-foreground mb-4">Didn't receive the email? Check your spam folder.</p>
            <button
              onClick={() => { setSubmitted(false); setEmail(''); }}
              className="text-sm text-primary hover:underline"
            >
              Try a different email address
            </button>
            <div className="mt-4">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
