import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PRICING_PLANS, FAQ_ITEMS } from '@/constants';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const billingFAQs = FAQ_ITEMS.filter(f => ['Billing', 'General'].includes(f.category));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Zap className="w-3 h-3" /> Simple, transparent pricing
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-5 animate-slide-up">
              Start free. <span className="gradient-primary-text">Scale as you grow.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 animate-slide-up">
              No hidden fees. No surprise charges. Cancel anytime.
            </p>
            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-xl bg-muted animate-slide-up">
              <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${!yearly ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>Monthly</button>
              <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-bold">-20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRICING_PLANS.map((plan, i) => (
                <div key={plan.id} className={`relative p-6 rounded-2xl border flex flex-col transition-all reveal-up ${
                  plan.highlighted
                    ? 'border-primary bg-primary/5 shadow-glow-purple'
                    : 'border-border bg-card hover:border-primary/20'
                }`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  {plan.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${plan.highlighted ? 'gradient-primary text-white' : 'bg-card border border-border text-foreground'}`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-display font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-5">{plan.description}</p>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-4xl font-display font-bold text-foreground">${yearly ? plan.price.yearly : plan.price.monthly}</span>
                      <span className="text-sm text-muted-foreground mb-1.5">/month</span>
                    </div>
                    {yearly && plan.price.monthly > 0 && (
                      <p className="text-xs text-green-500">Billed ${(yearly ? plan.price.yearly : plan.price.monthly) * 12}/year · Save ${(plan.price.monthly - plan.price.yearly) * 12}</p>
                    )}
                    {!yearly && plan.price.monthly === 0 && <p className="text-xs text-muted-foreground">Free forever</p>}
                  </div>
                  <Link to="/register" className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all mb-6 ${
                    plan.highlighted
                      ? 'gradient-primary text-white hover:opacity-90 shadow-glow-purple'
                      : 'border border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5'
                  }`}>
                    {plan.price.monthly === 0 ? 'Get Started Free' : 'Start 14-Day Trial'}
                  </Link>
                  <div className="flex-1 space-y-3">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              All paid plans include a 14-day free trial · No credit card required · Instant access
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8 reveal-up">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-1/3">Feature</th>
                    {PRICING_PLANS.map(p => (
                      <th key={p.id} className="text-center py-3 px-4 text-sm font-semibold text-foreground">
                        {p.name}
                        {p.highlighted && <span className="ml-1 text-xs text-primary">★</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'AI Generations/mo', values: ['5', '100', 'Unlimited', 'Unlimited'] },
                    { label: 'Design Projects', values: ['10', 'Unlimited', 'Unlimited', 'Unlimited'] },
                    { label: 'Templates', values: ['500+', '10,000+', 'All + Custom', 'All + Custom'] },
                    { label: 'Cloud Storage', values: ['1GB', '20GB', '100GB', '1TB'] },
                    { label: 'Brand Kits', values: ['—', '3', 'Unlimited', 'Unlimited'] },
                    { label: 'Team Members', values: ['1', '1', '10', 'Unlimited'] },
                    { label: 'Background Removal', values: ['—', '✓', '✓', '✓'] },
                    { label: 'Analytics', values: ['—', 'Basic', 'Advanced', 'Enterprise'] },
                    { label: 'API Access', values: ['—', '—', '✓', '✓'] },
                    { label: 'White-label', values: ['—', '—', '—', '✓'] },
                    { label: 'Support', values: ['Community', 'Priority', 'Dedicated', '24/7 SLA'] },
                  ].map((row, i) => (
                    <tr key={row.label} className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="py-3 px-4 text-sm text-foreground">{row.label}</td>
                      {row.values.map((val, j) => (
                        <td key={j} className="py-3 px-4 text-center text-sm text-muted-foreground">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8 reveal-up">Pricing FAQ</h2>
            <div className="space-y-3">
              {billingFAQs.map((faq, i) => (
                <div key={faq.id} className={`border rounded-2xl transition-all reveal-up ${openFAQ === faq.id ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`} style={{ transitionDelay: `${i * 0.05}s` }}>
                  <button onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.question}</span>
                    {openFAQ === faq.id ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-5 pb-5"><p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Still have questions?</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">Our team is here to help you choose the right plan.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-up stagger-2">
              <Link to="/contact" className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 shadow-glow-purple transition-all">
                Contact Sales <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <Link to="/faq" className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 transition-all">
                View Full FAQ
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
