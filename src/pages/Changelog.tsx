import { useEffect } from 'react';
import { GitPullRequest, Sparkles, Check, Settings, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const logs = [
  {
    version: 'v2.5.0',
    date: 'June 2025',
    headline: 'AI Style Presets & Collaborative Team Workspaces',
    badge: 'Latest',
    features: [
      'Added AI Style Transfer inside the Design Studio allowing users to replicate aesthetics from reference images.',
      'Released stateful member invite modals and direct messaging systems in the Team Hub dashboard.',
      'Integrated real-time web socket syncing for co-editing canvas designs.'
    ],
    improvements: [
      'Refactored analytical dashboard graphs to scale dynamically in percentage-height panels.',
      'Optimized Stable Diffusion canvas generation queuing, cutting server response times by 35%.'
    ],
    fixes: [
      'Resolved background cutout clipping errors on high-contrast stock media PNG uploads.',
      'Fixed workspace settings modal overflow bugs on smaller viewport sizes.'
    ]
  },
  {
    version: 'v2.4.0',
    date: 'April 2025',
    headline: 'Brand Kit Consistency Checker & Asset Drag-and-Drop',
    badge: 'Update',
    features: [
      'Created native brand consistency validator that highlights out-of-spec font size and color mismatches.',
      'Released the premium drag-and-drop asset uploader with auto-calculated size labels and file formats parsing.'
    ],
    improvements: [
      'Polished navigation dropdown menus and made dashboard workspaces loading skeletons smoother.'
    ],
    fixes: [
      'Patched template filters state lag when searching between marketplace design categories.'
    ]
  },
  {
    version: 'v2.0.0',
    date: 'January 2025',
    headline: 'V2.0 Launch: generative mockup engines and vector exports',
    badge: 'Major',
    features: [
      'Launched native mockups generator enabling creators to apply designs to t-shirts, packaging, and screens.',
      'Enabled high-fidelity export formats including SVG, PDF, and high-res vector graphics.'
    ],
    improvements: [
      'Upgraded subscription checkout portals to securely route payment trial options and card billing settings.'
    ],
    fixes: [
      'Fixed cursor offset problems during custom coordinate rotations on the design canvas.'
    ]
  }
];

export default function Changelog() {
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
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <GitPullRequest className="w-3 h-3" /> Product Changelog
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              What's new in<br />
              <span className="gradient-primary-text">PixiVisual</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              We release product upgrades and workflow enhancements regularly. Follow our changelog timeline below to explore latest updates.
            </p>
          </div>
        </section>

        {/* Timeline Log */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-pink-500/30 to-border/10" />

              <div className="space-y-16">
                {logs.map((log, index) => (
                  <div key={log.version} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-start reveal-up`} style={{ transitionDelay: `${index * 0.05}s` }}>
                    <div className="hidden md:block flex-1" />
                    
                    {/* Circle icon marker */}
                    <div className="absolute left-6 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full gradient-primary flex items-center justify-center shadow-glow-purple z-10">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>

                    {/* Content card */}
                    <div className="flex-1 ml-12 md:ml-0 p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all w-full">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">{log.version}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{log.date}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.badge === 'Latest' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>{log.badge}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-4">{log.headline}</h3>

                      {/* Log items */}
                      <div className="space-y-4">
                        {log.features && log.features.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> New Features</h4>
                            <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground pl-1 leading-relaxed">
                              {log.features.map(feat => <li key={feat}>{feat}</li>)}
                            </ul>
                          </div>
                        )}

                        {log.improvements && log.improvements.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Settings className="w-3.5 h-3.5 text-primary" /> Improvements</h4>
                            <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground pl-1 leading-relaxed">
                              {log.improvements.map(imp => <li key={imp}>{imp}</li>)}
                            </ul>
                          </div>
                        )}

                        {log.fixes && log.fixes.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-pink-500" /> Bug Fixes</h4>
                            <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground pl-1 leading-relaxed">
                              {log.fixes.map(fix => <li key={fix}>{fix}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="container max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1 text-sm">
              Subscribe to get product updates and releases highlights delivered directly to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto reveal-up stagger-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 flex items-center gap-2 shadow-glow-purple">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
