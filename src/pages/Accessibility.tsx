import { useEffect } from 'react';
import { Eye, Shield, Users, HelpCircle, Sparkles, Mail, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const guidelines = [
  {
    icon: Eye,
    title: 'Visual Accommodations',
    desc: 'We support customizable contrast options, text resizing, and screen reader labels. All color combinations meet WCAG contrast guidelines.'
  },
  {
    icon: Users,
    title: 'Keyboard Navigability',
    desc: 'All editing tools, modals, dashboard settings, and navbar layouts are designed to be accessible via keyboard keys (Tab, Esc, Enter, arrows).'
  },
  {
    icon: Shield,
    title: 'WCAG 2.1 Level AA Compliance',
    desc: 'Our design system, component libraries, and page templates aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.'
  }
];

export default function Accessibility() {
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
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Eye className="w-3 h-3" /> Accessibility Statement
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Accessible design tools<br />
              <span className="gradient-primary-text">for everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              PixiVisual is dedicated to ensuring that digital creativity is inclusive. We constantly audit and improve our editor tools to conform with WCAG standards.
            </p>
          </div>
        </section>

        {/* Accommodations */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {guidelines.map((g, i) => (
                <div key={g.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all reveal-up group" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-4 text-white group-hover:scale-105 transition-transform">
                    <g.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Progress */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Continuous Auditing Process</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Web accessibility is an ongoing journey. We conduct automated checking, design reviews, and manual user testing with assistive technology.
                </p>
                <div className="space-y-3">
                  {['ARIA landmark roles & attributes', 'Screen reader screen labels', 'High contrast toggle features', 'Focus outline state management'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal-right bg-card border border-border rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Conformity Status
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We are working towards conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA criteria. We recommend using the latest browser version combined with screen reader tools (JAWS, NVDA, or VoiceOver) for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Contact */}
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4 reveal-up">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Feedback & Support</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1 text-sm">
              If you experience any accessibility barriers while using our templates, creator dashboards, or editor canvas, please contact our support team.
            </p>
            <a href="mailto:support@pixivisual.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              support@pixivisual.com
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
