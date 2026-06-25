import { useEffect } from 'react';
import { Users, MessageSquare, Twitter, Award, Sparkles, Globe, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const socials = [
  {
    icon: MessageSquare,
    name: 'Discord Server',
    desc: 'Connect with 10K+ designers and engineers. Share design outputs, ask questions, and chat live with the team.',
    color: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    link: 'https://discord.com'
  },
  {
    icon: Twitter,
    name: 'Twitter / X',
    desc: 'Follow us for product updates, design tips, community highlights, and general design studio announcements.',
    color: 'hover:border-sky-500/30 hover:bg-sky-500/5',
    link: 'https://twitter.com'
  },
  {
    icon: Globe,
    name: 'Reddit Community',
    desc: 'Browse user-submitted graphics, template configurations, AI prompts, and help guide discussions.',
    color: 'hover:border-orange-500/30 hover:bg-orange-500/5',
    link: 'https://reddit.com'
  }
];

const highlights = [
  { user: 'Sasha Grey', role: 'Brand Director', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=60&h=60&fit=crop', title: 'Automated 120 Brand Banners', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&fit=crop' },
  { user: 'Marcus Vance', role: 'Freelancer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop', title: 'Published 12 Premium Templates', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&fit=crop' },
];

export default function Community() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-6 animate-slide-up">
              <Users className="w-3 h-3" /> Creators Community
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Connect with a global network<br />
              <span className="gradient-primary-text">of modern creators</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              Share your brand kits, learn from prompt engineers, participate in design sprints, and help shape PixiVisual.
            </p>
          </div>
        </section>

        {/* Social channels */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {socials.map((soc, i) => (
                <div key={soc.name} className={`p-6 rounded-2xl border border-border bg-card transition-all reveal-up group flex flex-col justify-between ${soc.color}`} style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                      <soc.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{soc.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{soc.desc}</p>
                  </div>
                  <a href={soc.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 mt-6 px-4 py-2 rounded-xl border border-border text-foreground font-semibold text-xs hover:border-primary hover:bg-primary/5 transition-all">
                    Join Channel <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spotlights */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Community Highlights</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Outstanding templates and content generated by our users.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {highlights.map((h, i) => (
                <div key={h.user} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all reveal-up flex flex-col sm:flex-row gap-5 items-center" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img src={h.image} alt={h.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-3 text-center sm:text-left flex-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full"><Sparkles className="w-3 h-3" /> SPOTLIGHT</span>
                    <h3 className="font-semibold text-foreground leading-snug">{h.title}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-2">
                      <img src={h.avatar} alt={h.user} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">{h.user}</div>
                        <div className="text-[10px] text-muted-foreground">{h.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 mb-4 reveal-up">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Weekly Design Challenges</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">
              Submit your best mockups in our weekly challenges to win free Pro subscriptions, custom badges, and templates promotion.
            </p>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              Participate on Discord <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
