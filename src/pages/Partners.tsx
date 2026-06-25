import { useEffect } from 'react';
import { ArrowRight, DollarSign, Handshake, Network, Share2, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const programs = [
  {
    icon: Share2,
    title: 'Affiliate Partner',
    desc: 'Earn 30% recurring commission for the first 12 months on every referral. Ideal for bloggers, content creators, and educators.',
    stipends: ['Dedicated tracking dashboard', '30-day cookie window', 'Ready-to-use promo assets']
  },
  {
    icon: Network,
    title: 'Integration Partner',
    desc: 'Build native app connectors, custom integrations, or templates for the PixiVisual library. Ideal for developer groups and SaaS companies.',
    stipends: ['Priority API access keys', 'Sandbox developer support', 'Listing in Integrations store']
  },
  {
    icon: Handshake,
    title: 'Agency Partner',
    desc: 'Bundle PixiVisual accounts with your creative services. Co-brand client reports and enjoy discounted pricing bundles.',
    stipends: ['Volume discount schemes', 'Custom template sharing', 'Co-marketing opportunities']
  }
];

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 animate-slide-up">
              <Handshake className="w-3 h-3" /> Partner Program
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Grow your business<br />
              <span className="gradient-primary-text">by partnering with us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              Join the PixiVisual ecosystem. Promote our tools, build integrations on our API, or co-sell creative bundles to agencies.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((prog, i) => (
                <div key={prog.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 flex flex-col justify-between transition-all reveal-up group" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                      <prog.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{prog.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{prog.desc}</p>
                    <ul className="space-y-2 mt-4 pt-4 border-t border-border/60">
                      {prog.stipends.map((stipend) => (
                        <li key={stipend} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {stipend}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="mailto:partners@pixivisual.com" className="inline-flex items-center justify-center gap-2 mt-8 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
                    Apply to Program <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Detail */}
        <section className="py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">Why Partner with PixiVisual?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We are building the most advanced browser-based design editor. Our partners help creators and business managers tap into the full potential of AI automation.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0 mt-0.5">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Top-Tier Commissions</h4>
                      <p className="text-xs text-muted-foreground">Highest-paying recurring payouts in the graphic and creator economy SaaS market.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Next-Gen AI Capabilities</h4>
                      <p className="text-xs text-muted-foreground">Co-marketing platforms built around real value: AI generation tools that actually deliver results.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Reliable Payments</h4>
                      <p className="text-xs text-muted-foreground">Payments made on-time every month via wire or PayPal, tracked statefully via our partner portal.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reveal-right">
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" alt="Partners meeting" className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4 reveal-up">Have a custom collaboration proposal?</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">
              If your corporate service or marketing agency is seeking custom volume accounts or white-label APIs, we want to hear from you.
            </p>
            <a href="mailto:partners@pixivisual.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              Contact Partnerships <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
