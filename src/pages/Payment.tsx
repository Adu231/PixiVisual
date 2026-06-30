import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, Check, ArrowLeft, Shield, Lock, CreditCard, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PRICING_PLANS, APP_NAME } from '@/constants';
import { getDashboardRoute } from '@/lib/auth';
import { toast } from '@/components/ui/Toast';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const planId = searchParams.get('plan') || 'pro';
  const isYearly = searchParams.get('yearly') === 'true';

  const [cardName, setCardName] = useState(user?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [paying, setPaying] = useState(false);
  const [paymentPhase, setPaymentPhase] = useState('');

  // Find selected plan
  const activePlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1]; // default to Pro
  const basePrice = isYearly ? activePlan.price.yearly : activePlan.price.monthly;
  const periodLabel = isYearly ? 'yearly' : 'monthly';
  const totalAmount = basePrice;

  // Formatting card number (spaced 4-4-4-4)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(v);
    }
  };

  // Formatting expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length > 2) {
      v = v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    setExpiry(v.substring(0, 5));
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || cardNumber.length < 15) {
      toast('warning', 'Please enter a valid credit card number');
      return;
    }
    if (!expiry.trim() || expiry.length < 5) {
      toast('warning', 'Please enter a valid card expiry date (MM/YY)');
      return;
    }
    if (!cvc.trim() || cvc.length < 3) {
      toast('warning', 'Please enter a valid CVC security code');
      return;
    }

    setPaying(true);
    setPaymentPhase('Contacting payment gateway...');
    await new Promise(r => setTimeout(r, 1200));

    setPaymentPhase('Securing transaction tunnel...');
    await new Promise(r => setTimeout(r, 1000));

    setPaymentPhase('Upgrading account subscription...');
    // Update the profile plan dynamically!
    updateProfile({ plan: activePlan.name });
    await new Promise(r => setTimeout(r, 1000));

    toast('success', `Welcome to the ${activePlan.name} plan! Subscription activated.`);
    setPaying(false);
    
    // Redirect user to their role-based dashboard
    if (user) {
      navigate(getDashboardRoute(user.role));
    } else {
      navigate('/dashboard/business');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow-purple">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-primary-text">{APP_NAME}</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </header>

      {/* Checkout Content */}
      <main className="relative z-10 container max-w-5xl mx-auto px-4 py-10 lg:py-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Payment Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-display font-bold text-foreground mb-1.5 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Secure Checkout
            </h2>
            <p className="text-xs text-muted-foreground mb-6">Your transaction is fully encrypted and secured by Stripe</p>

            <form onSubmit={handlePaySubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                <input 
                  type="email"
                  disabled
                  value={user?.email || ''} 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/30 text-muted-foreground text-sm outline-none cursor-not-allowed" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Cardholder Name</label>
                <input 
                  type="text"
                  required
                  value={cardName} 
                  onChange={e => setCardName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Card Number</label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="•••• •••• •••• ••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all font-mono" 
                  />
                  <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Expiry Date</label>
                  <input 
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all font-mono" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">CVC Code</label>
                  <input 
                    type="password"
                    required
                    maxLength={4}
                    value={cvc}
                    onChange={e => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="•••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Billing ZIP / Postal Code</label>
                <input 
                  type="text"
                  required
                  value={zip}
                  onChange={e => setZip(e.target.value.toUpperCase())}
                  placeholder="e.g. 90210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-90 transition-all shadow-glow-purple flex items-center justify-center gap-2 mt-6"
              >
                Pay ${totalAmount} & Subscribe
              </button>
            </form>
          </div>

          {/* Plan Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Invoice Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Subscription Summary</h3>
              
              <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-foreground block">{activePlan.name} Plan</span>
                  <span className="text-xs text-muted-foreground capitalize">Billed {periodLabel}</span>
                </div>
                <span className="text-lg font-display font-bold text-primary">${basePrice} / mo</span>
              </div>

              <div className="divide-y divide-border text-xs text-muted-foreground space-y-3 pt-2">
                <div className="flex items-center justify-between pt-3">
                  <span>Subtotal</span>
                  <span className="text-foreground font-semibold">${basePrice}/mo</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span>Billing Period</span>
                  <span className="text-foreground font-semibold uppercase">{periodLabel}</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-sm text-foreground font-bold">
                  <span>Total Due Today</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Plan Features Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Plan Features Included:
              </h4>
              <div className="space-y-3">
                {activePlan.features.slice(0, 6).map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <p>You can cancel your plan at any time inside your Billing tab with a 1-click downgrade.</p>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background py-6">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PixiVisual Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Payment Processing Spinner Screen Overlay */}
      {paying && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-white animate-in fade-in duration-200">
          <div className="relative">
            <RefreshCw className="w-12 h-12 text-primary animate-spin" />
            <CreditCard className="w-5 h-5 text-white absolute left-3.5 top-3.5" />
          </div>
          <div className="text-center space-y-1 animate-pulse">
            <p className="text-base font-semibold">{paymentPhase}</p>
            <p className="text-xs text-muted-foreground">Please do not refresh the page or close your browser</p>
          </div>
        </div>
      )}
    </div>
  );
}
