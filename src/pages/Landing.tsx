import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Play, Star, Check, ChevronDown, ChevronUp,
  Zap, Palette, Users, BarChart, Layout, Store, Image, Video, Brain,
  Globe, Shield, Infinity, X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TESTIMONIALS, PRICING_PLANS, FAQ_ITEMS, STATS } from '@/constants';
import { useInView, useCountUp } from '@/hooks/useScrollReveal';
import { useAuth } from '@/context/AuthContext';
const heroDashboard = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=675&fit=crop';

// Rotating text component
function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className="gradient-primary-text inline-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {words[index]}
    </span>
  );
}

// Stat Counter
function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView();
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const count = useCountUp(numericValue, 2000, inView);

  return (
    <div ref={ref} className="text-center reveal-up">
      <div className="text-3xl lg:text-4xl font-display font-bold gradient-primary-text mb-1">
        {inView ? `${count}${suffix}` : value}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

// FAQ Item
function FAQAccordion({ question, answer, isOpen, onToggle }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm font-semibold text-foreground pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 animate-slide-up">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [billingYearly, setBillingYearly] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubmitted(true);
      setEmail('');
    }
  };

  const features = [
    { icon: Sparkles, title: 'AI Design Studio', desc: 'Generate stunning visuals from text prompts in seconds. Our AI understands your brand.', color: 'from-purple-500 to-pink-500' },
    { icon: Layout, title: 'Professional Editor', desc: '100,000+ templates, elements, and fonts. Drag-and-drop simplicity with pro-level power.', color: 'from-pink-500 to-rose-500' },
    { icon: Palette, title: 'Brand Kit Builder', desc: 'Keep your brand colors, fonts, and logos organized. Apply across all designs instantly.', color: 'from-blue-500 to-purple-500' },
    { icon: Users, title: 'Team Collaboration', desc: 'Real-time co-editing, approvals, and version control. Create together, deliver faster.', color: 'from-green-500 to-blue-500' },
    { icon: BarChart, title: 'Performance Analytics', desc: 'Track content performance, brand consistency, and campaign ROI in one dashboard.', color: 'from-orange-500 to-pink-500' },
    { icon: Store, title: 'Template Marketplace', desc: 'Browse thousands of premium templates or sell your own designs to millions of users.', color: 'from-teal-500 to-green-500' },
  ];

  const workflowSteps = [
    { step: '01', title: 'Describe Your Vision', desc: 'Type a prompt or choose from intelligent templates. Our AI understands your creative intent.', icon: Brain },
    { step: '02', title: 'Generate & Customize', desc: 'AI creates multiple variations instantly. Refine with our professional drag-and-drop editor.', icon: Sparkles },
    { step: '03', title: 'Brand & Collaborate', desc: 'Apply your brand kit, gather team feedback, and manage approvals — all in one place.', icon: Users },
    { step: '04', title: 'Publish & Analyze', desc: 'Export in any format, schedule posts, and track performance with detailed analytics.', icon: BarChart },
  ];

  const benefits = [
    { icon: Zap, title: '10x Faster Creation', desc: 'What used to take hours now takes minutes with AI-powered design generation.' },
    { icon: Globe, title: 'Platform-Optimized', desc: 'Perfect dimensions for every social platform, ad network, and print format.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II certified with end-to-end encryption and GDPR compliance.' },
    { icon: Infinity, title: 'Unlimited Creativity', desc: 'No creative limits — generate, remix, and reimagine designs without restrictions.' },
    { icon: Image, title: '10M+ Stock Assets', desc: 'Royalty-free photos, illustrations, icons, and videos built right into your workflow.' },
    { icon: Video, title: 'Motion & Video', desc: 'Create animated social posts, intro videos, and motion graphics in minutes.' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-[150px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 container max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8 animate-slide-up">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Visual Creation Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Create Visuals That Are
              <br />
              <RotatingText words={['Stunning', 'Memorable', 'On-Brand', 'Conversion-Ready', 'AI-Powered']} />
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Design social media posts, logos, ads, presentations, and brand assets with AI. 
              Used by <strong className="text-foreground">2M+ creators, businesses, and agencies</strong> worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/register"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-primary text-white font-bold text-base hover:opacity-90 transition-all duration-300 shadow-glow-purple hover:shadow-glow-pink hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5" />
                Start Creating Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setShowDemoVideo(true)}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border bg-card text-foreground font-semibold text-base hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-2">
                {['photo-1494790108755-2616b612b5e5', 'photo-1507003211169-0a1dd7228f2d', 'photo-1438761681033-6461ffad8d80', 'photo-1472099645785-5658abf4ff4e', 'photo-1535713875002-d1d0cf377fde'].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=36&h=36&fit=crop&crop=face`}
                    className="w-9 h-9 rounded-full border-2 border-background object-cover"
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-sm font-semibold text-foreground ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-muted-foreground">Trusted by 2M+ users across 150 countries</p>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-purple-500/10 max-w-5xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10 pointer-events-none" />
                <div className="bg-muted h-8 flex items-center px-4 gap-2 flex-shrink-0 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 text-xs text-muted-foreground text-center">pixivisual.com/studio</div>
                </div>
                <img
                  src={heroDashboard}
                  alt="PixiVisual Dashboard"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -left-4 top-1/3 hidden lg:flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl animate-float">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Generated</p>
                  <p className="text-xs text-muted-foreground">in 2.3 seconds</p>
                </div>
              </div>
              <div className="absolute -right-4 top-1/2 hidden lg:flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl animate-float-delay">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs font-semibold text-foreground">1,247 users online now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 border-y border-border bg-surface/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 reveal-up">
              <Zap className="w-3 h-3" />
              POWERFUL FEATURES
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              Everything you need to<br />
              <span className="gradient-primary-text">create stunning visuals</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed reveal-up stagger-2">
              From AI-powered generation to professional editing and team collaboration — 
              PixiVisual is the all-in-one creative platform for modern teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                onClick={() => setSelectedFeature(f)}
                className={`group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-glow-purple transition-all duration-300 cursor-pointer reveal-up`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <button className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none hover:underline">
                  Learn more <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW SECTION ========== */}
      <section className="py-24 lg:py-32 bg-surface/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold mb-4 reveal-up">
              <Brain className="w-3 h-3" />
              HOW IT WORKS
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              From idea to stunning visual
              <br />
              <span className="gradient-primary-text">in 4 simple steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-500/20 via-pink-500/40 to-purple-500/20 z-0" />

            {workflowSteps.map((step, i) => (
              <div key={step.step} className={`relative z-10 text-center reveal-up`} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-glow-purple">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-xs font-bold text-primary/60 mb-2">{step.step}</div>
                <h3 className="text-base font-display font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center reveal-up">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gradient-primary text-white font-semibold hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5"
            >
              Try It Free — No Credit Card Required
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 reveal-left">
                <Shield className="w-3 h-3" />
                WHY PIXIVISUAL
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-left stagger-1">
                Built for creators
                <br />
                <span className="gradient-primary-text">who demand more</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 reveal-left stagger-2">
                We built PixiVisual because we knew great design shouldn't require a design degree, 
                a massive budget, or a team of 10. Just a great idea and the right tools.
              </p>
              <div className="space-y-4 reveal-left stagger-3">
                {['10,000+ premium templates ready to customize', 'AI that understands your brand personality', 'One-click resize for every platform format', '14-day free trial, no credit card required'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-4 reveal-left stagger-4">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="text-sm font-medium text-primary hover:underline">See pricing →</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal-right">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <b.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== DASHBOARD PREVIEW SECTION ========== */}
      <section className="py-24 lg:py-32 bg-surface/50 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 reveal-up">
              <Layout className="w-3 h-3" />
              DASHBOARD & ANALYTICS
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              Your creative command
              <br />
              <span className="gradient-primary-text">center</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed reveal-up stagger-2">
              Monitor your creative output, track brand performance, and manage your entire 
              visual workflow from a single intelligent dashboard.
            </p>
          </div>

          {/* Mock Dashboard */}
          <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl shadow-purple-500/10 reveal-up stagger-3">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">PixiVisual Dashboard — Business Pro</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Sidebar mini */}
              <div className="hidden md:block border-r border-border pr-4 space-y-2">
                {['Dashboard', 'Projects', 'Brand Kit', 'AI Studio', 'Templates', 'Analytics', 'Team', 'Settings'].map((item, i) => (
                  <div key={item} className={`px-3 py-2 rounded-xl text-xs font-medium ${i === 0 ? 'gradient-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                    {item}
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div className="md:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Designs Created', value: '2,847', delta: '+12%', color: 'from-purple-500 to-pink-500' },
                    { label: 'AI Generations', value: '1,234', delta: '+28%', color: 'from-blue-500 to-purple-500' },
                    { label: 'Team Members', value: '18', delta: '+3', color: 'from-green-500 to-blue-500' },
                  ].map(stat => (
                    <div key={stat.label} className="p-4 rounded-xl border border-border bg-background">
                      <div className={`text-xl font-bold font-display bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                      <div className="text-xs text-green-500 font-medium mt-1">{stat.delta} this week</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <h4 className="text-xs font-semibold text-foreground mb-3">Recent Projects</h4>
                    <div className="space-y-2">
                      {['Summer Campaign', 'Product Launch', 'Social Media Kit', 'Brand Refresh'].map((proj, i) => (
                        <div key={proj} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex-shrink-0`}
                            style={{ background: `hsl(${260 + i*30}, 70%, ${55 + i*5}%)` }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{proj}</p>
                            <p className="text-xs text-muted-foreground">Updated {i + 1}h ago</p>
                          </div>
                          <span className="text-xs text-green-500 font-medium">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background">
                    <h4 className="text-xs font-semibold text-foreground mb-3">AI Usage</h4>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Image Generation', pct: 78 },
                        { label: 'Template AI', pct: 54 },
                        { label: 'Background Remove', pct: 91 },
                        { label: 'Brand AI', pct: 42 },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{item.label}</span>
                            <span className="text-xs font-medium text-foreground">{item.pct}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full gradient-primary rounded-full" style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center reveal-up">
            <Link to="/register" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              Explore your dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-semibold mb-4 reveal-up">
              <Star className="w-3 h-3 fill-current" />
              LOVED BY CREATORS
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              Trusted by{' '}
              <span className="gradient-primary-text">2 million+</span>
              <br />creative professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 reveal-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section className="py-24 lg:py-32 bg-surface/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold mb-4 reveal-up">
              <Zap className="w-3 h-3" />
              TRANSPARENT PRICING
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              Simple, honest pricing<br />
              <span className="gradient-primary-text">for every team size</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 reveal-up stagger-2">
              Start free. Scale as you grow. No hidden fees.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-muted reveal-up stagger-3">
              <button
                onClick={() => setBillingYearly(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!billingYearly ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingYearly(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billingYearly ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Yearly
                <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-semibold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-2xl border transition-all duration-300 reveal-up ${
                  plan.highlighted
                    ? 'border-primary bg-primary/5 shadow-glow-purple'
                    : 'border-border bg-card hover:border-primary/20 hover:shadow-card'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
                    plan.highlighted ? 'gradient-primary text-white' : 'bg-card border border-border text-foreground'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-base font-display font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-display font-bold text-foreground">
                      ${billingYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground mb-1">/mo</span>
                  </div>
                  {billingYearly && plan.price.monthly > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Save ${(plan.price.monthly - plan.price.yearly) * 12}/year
                    </p>
                  )}
                </div>

                <Link
                  to={isAuthenticated && plan.price.monthly > 0 ? `/payment?plan=${plan.id}&yearly=${billingYearly}` : '/register'}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-5 ${
                    plan.highlighted
                      ? 'gradient-primary text-white hover:opacity-90 shadow-glow-purple'
                      : 'border border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  {plan.price.monthly === 0 ? 'Get Started Free' : 'Start Free Trial'}
                </Link>

                <div className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 reveal-up">
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 reveal-up">
              FREQUENTLY ASKED
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5 reveal-up stagger-1">
              Questions? <span className="gradient-primary-text">We have answers.</span>
            </h2>
            <p className="text-lg text-muted-foreground reveal-up stagger-2">
              Everything you need to know about PixiVisual.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.slice(0, 8).map((faq, i) => (
              <div key={faq.id} className={`reveal-up`} style={{ transitionDelay: `${i * 0.05}s` }}>
                <FAQAccordion
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center reveal-up">
            <Link to="/faq" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
              View all questions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER SECTION ========== */}
      <section className="py-24 lg:py-32 overflow-hidden relative">
        <div className="absolute inset-0 gradient-primary opacity-90 z-0" />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, white 2px, transparent 2px), radial-gradient(circle at 75% 50%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
          <div className="animate-float inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Join 2M+ creative professionals
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Start creating beautiful
            <br />visuals today — for free
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            No design skills required. No credit card needed. Just powerful AI and
            <br className="hidden md:block" />
            professional tools ready for you to use right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-bold text-base hover:bg-white/90 transition-all duration-300 shadow-2xl hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              Start Free — No Credit Card
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-semibold text-base hover:bg-white/20 transition-all duration-300"
            >
              View Pricing Plans
            </Link>
          </div>

          {/* Newsletter */}
          <div className="mt-16 max-w-md mx-auto">
            <p className="text-white/70 text-sm mb-4">Get design tips and AI updates in your inbox</p>
            {newsletterSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-white font-medium">
                <Check className="w-5 h-5" />
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm outline-none focus:border-white/50 transition-colors"
                />
                <button type="submit" className="px-5 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors flex-shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Demo Video Modal */}
      {showDemoVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowDemoVideo(false)} />
          <div className="relative z-10 w-full max-w-4xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowDemoVideo(false)} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full bg-black">
              <video 
                src="https://assets.mixkit.co/videos/preview/mixkit-web-design-project-on-screen-41710-large.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedFeature(null)} />
          <div className="relative z-10 w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedFeature(null)} 
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <selectedFeature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">{selectedFeature.title}</h3>
                <span className="text-xs text-primary font-semibold">PixiVisual Core Tool</span>
              </div>
            </div>
            
            <div className="space-y-4 my-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedFeature.desc} Our advanced suite provides professional-grade tools simplified for high-growth visual marketing teams.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Key Capabilities Included:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedFeature.title === 'AI Design Studio' && [
                    'Text-to-image visual generator',
                    'Automatic brand style alignment',
                    'Smart color palettes and layouts',
                    'Text prompts parsed by custom LLMs'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}

                  {selectedFeature.title === 'Professional Editor' && [
                    '100,000+ templates and graphic components',
                    'Seamless drag-and-drop layering canvas',
                    'Built-in royalty-free media library (stock photos/videos)',
                    'Smart alignment snapping and guidelines'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}

                  {selectedFeature.title === 'Brand Kit Builder' && [
                    'Centralized color hex palette compliance',
                    'Upload custom font weights and OTF/WOFF files',
                    'Version-controlled vector logo management',
                    'One-click brand formatting across all active designs'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}

                  {selectedFeature.title === 'Team Collaboration' && [
                    'Real-time live multi-cursor co-editing',
                    'Contextual comment threads and design reviews',
                    'Role-based workspace folders and permissions',
                    'Auto-notifying approval loops'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}

                  {selectedFeature.title === 'Performance Analytics' && [
                    'Asset impressions and download counters',
                    'Brand compliance scoring reports',
                    'Social media API performance monitoring',
                    'Conversion performance correlation analytics'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}

                  {selectedFeature.title === 'Template Marketplace' && [
                    'Browse community-designed premium templates',
                    'Sell your visual formats to creators globally',
                    'High creator royalty payout tiers',
                    'Verified seller certification program'
                  ].map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {cap}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <button 
                onClick={() => setSelectedFeature(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all"
              >
                Close
              </button>
              <Link 
                to="/register"
                className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-bold text-center hover:opacity-90 transition-all shadow-glow-purple"
              >
                Try this feature
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========== FOOTER SECTION ========== */}
      <Footer />
    </div>
  );
}
