import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Award, Heart, Zap, Target, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';



const values = [
  { icon: Heart, title: 'Creativity First', desc: 'We believe every person deserves powerful creative tools regardless of design experience or budget.' },
  { icon: Users, title: 'Community Driven', desc: 'Our product is shaped by millions of creators. We listen, iterate, and build what matters most.' },
  { icon: Award, title: 'Quality Always', desc: 'We hold ourselves to the highest standards. Every feature shipped is polished and production-ready.' },
  { icon: Globe, title: 'Globally Inclusive', desc: 'Creative tools for everyone, everywhere. We support 50+ languages and serve users in 150+ countries.' },
];

const milestones = [
  { year: '2021', title: 'Founded', desc: 'PixiVisual was founded with a mission to make professional design accessible to everyone.' },
  { year: '2022', title: '100K Users', desc: 'Reached 100,000 active users and launched our AI design generation feature.' },
  { year: '2023', title: 'Series A', desc: 'Raised $18M Series A, launched Team Collaboration and the Template Marketplace.' },
  { year: '2024', title: '1M Users', desc: 'Hit 1 million users. Launched Video Studio, Brand Kit 2.0, and Analytics.' },
  { year: '2025', title: '2M+ Users', desc: 'Now serving 2M+ users globally. Expanding AI capabilities and enterprise features.' },
];

export default function About() {
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
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[100px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Sparkles className="w-3 h-3" />
              Our Story
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              We're on a mission to make<br />
              <span className="gradient-primary-text">great design accessible to all</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              PixiVisual was born from a simple belief: you shouldn't need years of design training 
              or a huge budget to create stunning visuals. We built the platform we wished existed.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {[{ v: '2021', l: 'Founded' }, { v: '2M+', l: 'Users' }, { v: '$22M', l: 'Raised' }, { v: '150+', l: 'Countries' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-display font-bold gradient-primary-text">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold mb-4">
                  <Target className="w-3 h-3" />
                  OUR MISSION
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-5">
                  Empowering every creator with the tools
                  <span className="gradient-primary-text"> they deserve</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For too long, professional-grade design tools were locked behind steep learning curves, 
                  expensive subscriptions, and technical barriers. We're changing that.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  PixiVisual combines AI intelligence with professional design capabilities to give anyone — 
                  from solo creators to enterprise teams — the power to tell their story visually.
                </p>
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5">
                  Join Our Mission <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 reveal-right">
                {values.map((v, i) => (
                  <div key={v.title} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all group" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <v.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Our Journey</h2>
              <p className="text-muted-foreground reveal-up stagger-1">From a bold idea to a global creative platform.</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-pink-500/40 to-primary/10" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative flex gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center reveal-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="hidden lg:block flex-1" />
                    <div className="absolute left-4 lg:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full gradient-primary flex items-center justify-center shadow-glow-purple flex-shrink-0 z-10">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className={`flex-1 ml-14 lg:ml-0 p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all`}>
                      <span className="text-xs font-bold text-primary">{m.year}</span>
                      <h3 className="text-base font-semibold text-foreground mt-1 mb-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4 reveal-up">
              Join our growing <span className="gradient-primary-text">community</span>
            </h2>
            <p className="text-muted-foreground mb-8 reveal-up stagger-1">
              Be part of the creative revolution. Start designing for free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-up stagger-2">
              <Link to="/register" className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5">
                Start for Free
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 hover:bg-primary/5 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
