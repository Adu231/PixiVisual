import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layout, Palette, Users, BarChart, Store, Image, Video, Brain, Zap, Check, ArrowRight, Globe, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const features = [
  {
    id: 'ai-studio',
    icon: Sparkles,
    title: 'AI Design Studio',
    subtitle: 'Generate stunning visuals in seconds',
    description: 'Describe what you want and our AI generates multiple high-quality design variations instantly. Trained on millions of professional designs, our AI understands color theory, composition, and brand aesthetics.',
    capabilities: ['Text-to-image generation', 'AI poster creation', 'Ad creative generation', 'AI social media posts', 'Product mockup generation', 'AI presentation design'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'editor',
    icon: Layout,
    title: 'Professional Design Editor',
    subtitle: 'Layer-based drag-and-drop perfection',
    description: 'A full-featured design editor with layer management, 100,000+ elements, smart alignment, and professional typography tools. Everything you need without the steep learning curve.',
    capabilities: ['Layer-based editing', '100K+ templates', 'Smart alignment guides', 'Advanced typography', 'Background removal', 'Image enhancement tools'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Brand Kit & Identity',
    subtitle: 'Your brand, perfectly consistent everywhere',
    description: 'Store brand colors, fonts, logos, and guidelines. Apply your brand identity across all designs with one click. Generate logos, business cards, and complete brand systems.',
    capabilities: ['Logo generator', 'Brand guidelines creator', 'Color palette management', 'Business card designer', 'Brand asset library', 'Consistency checker'],
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop',
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Team Collaboration',
    subtitle: 'Design together, deliver faster',
    description: 'Real-time collaborative editing, threaded comments, approval workflows, and version history. Bring your entire creative team and clients into one seamless workspace.',
    capabilities: ['Real-time co-editing', 'Design comments', 'Approval workflows', 'Version history', 'Client review portal', 'Team workspaces'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    color: 'from-green-500 to-blue-500',
  },
  {
    id: 'analytics',
    icon: BarChart,
    title: 'Analytics & Insights',
    subtitle: 'Data-driven creative decisions',
    description: 'Track content performance, measure brand consistency, analyze campaign effectiveness, and get AI-powered recommendations to optimize your visual strategy.',
    capabilities: ['Content performance tracking', 'Brand consistency scores', 'Campaign analytics', 'Design usage reports', 'Engagement metrics', 'AI optimization tips'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    color: 'from-orange-500 to-pink-500',
  },
  {
    id: 'templates',
    icon: Store,
    title: 'Template Marketplace',
    subtitle: 'Buy, sell, and discover premium designs',
    description: 'Browse thousands of professional templates from top designers. Sell your own templates to earn passive income. Hire designers for custom projects.',
    capabilities: ['10K+ premium templates', 'Designer marketplace', 'Custom commissions', 'Portfolio showcase', 'Design competitions', 'Revenue sharing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    color: 'from-teal-500 to-green-500',
  },
];

export default function Features() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[100px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Zap className="w-3 h-3" /> Everything you need to create
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Features built for<br />
              <span className="gradient-primary-text">modern creators</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              From AI-powered generation to team collaboration and analytics — every tool you need in one beautifully designed platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in">
              {['AI Generation', 'Design Editor', 'Brand Kit', 'Collaboration', 'Analytics', 'Marketplace', 'Video Studio', 'Stock Media'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        {features.map((f, i) => (
          <section key={f.id} id={f.id} className={`py-16 lg:py-24 ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
            <div className="container max-w-7xl mx-auto px-4">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'reveal-right lg:order-2' : 'reveal-left'}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${f.color} bg-opacity-10 text-xs font-semibold mb-4 text-white/80`}
                    style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))` }}>
                    <f.icon className="w-3 h-3 text-primary" />
                    <span className="text-primary">{f.subtitle}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">{f.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{f.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {f.capabilities.map(cap => (
                      <div key={cap} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5">
                    Try {f.title} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={i % 2 === 1 ? 'reveal-left lg:order-1' : 'reveal-right'}>
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-purple-500/10">
                    <img src={f.image} alt={f.title} className="w-full h-72 lg:h-80 object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-20`} />
                    <div className="absolute top-4 left-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg`}>
                        <f.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Features Grid */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3 reveal-up">And much more</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Dozens of additional features to supercharge your creative workflow.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: Video, label: 'Video Studio' }, { icon: Image, label: 'Stock Media' },
                { icon: Brain, label: 'AI Voiceover' }, { icon: Globe, label: 'Social Scheduler' },
                { icon: Shield, label: 'Enterprise SSO' }, { icon: Zap, label: 'Batch Export' },
                { icon: Users, label: 'Client Portal' }, { icon: BarChart, label: 'ROI Tracking' },
              ].map((item, i) => (
                <div key={item.label} className={`p-4 rounded-2xl border border-border bg-card hover:border-primary/20 flex items-center gap-3 transition-all reveal-up`} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4 reveal-up">
              Ready to experience all of this? <span className="gradient-primary-text">It's free to start.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 reveal-up stagger-1">
              <Link to="/register" className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 shadow-glow-purple hover:-translate-y-0.5 transition-all">
                Start for Free
              </Link>
              <Link to="/pricing" className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 transition-all">
                See Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
