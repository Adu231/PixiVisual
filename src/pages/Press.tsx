import { useEffect } from 'react';
import { Award, Download, FileText, Globe, Mail, MessageSquare, Newspaper, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const releases = [
  {
    date: 'June 18, 2025',
    tag: 'Product Launch',
    title: 'PixiVisual Releases AI Design Studio 2.0 with Real-Time Style Transfer',
    desc: 'The next generation of our design suite enables users to transfer style presets from any image source using state-of-the-art diffusion adapters.'
  },
  {
    date: 'November 12, 2024',
    tag: 'Corporate',
    title: 'PixiVisual Exceeds 2 Million Active Creators Globally',
    desc: 'Rapid adoption by marketing agencies and content creators drives exponential platform scaling across 150 countries.'
  },
  {
    date: 'August 04, 2024',
    tag: 'Funding',
    title: 'PixiVisual Closes $18M Series A Funding Led by Visionary Ventures',
    desc: 'The capital will fund expansion of deep generative model research and native team collaboration dashboard integrations.'
  },
];

const assets = [
  { title: 'PixiVisual Logo Pack', type: 'ZIP / SVG / PNG', size: '4.8 MB', desc: 'Primary and secondary brand logo marks, color variations, and usage constraints.' },
  { title: 'Product Screenshot Suite', type: 'ZIP / High-Res PNG', size: '18.2 MB', desc: 'Mockups of the AI Canvas, Team Dashboard Workspace, and Analytics suite.' },
  { title: 'Executive Headshots & Bios', type: 'ZIP / PDF', size: '12.5 MB', desc: 'Portraits and professional profiles of co-founders David Okonkwo and Jessica Park.' },
];

export default function Press() {
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
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold mb-6 animate-slide-up">
              <Newspaper className="w-3 h-3" /> Pressroom
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Latest news &<br />
              <span className="gradient-primary-text">brand assets</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              Welcome to the PixiVisual media center. Find company announcements, downloadable branding resources, and media contacts here.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Press Releases</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Read our latest platform news and statements.</p>
            </div>
            <div className="space-y-6">
              {releases.map((rel, i) => (
                <div key={rel.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all reveal-up" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-semibold text-primary">{rel.tag}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{rel.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">{rel.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Downloads */}
        <section className="py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Download Media Kit</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Everything you need to cover PixiVisual in your article or blog.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {assets.map((asset, i) => (
                <div key={asset.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 flex flex-col justify-between transition-all reveal-up group" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{asset.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{asset.desc}</p>
                  </div>
                  <div className="border-t border-border pt-4 mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{asset.type} ({asset.size})</span>
                    <button className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white group-hover:scale-105 transition-all shadow-glow-purple">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4 reveal-up">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Media Inquiries</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">
              For interviews, review access requests, or custom graphics, please contact our PR team. We typically respond within 24 hours.
            </p>
            <a href="mailto:press@pixivisual.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              press@pixivisual.com
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
