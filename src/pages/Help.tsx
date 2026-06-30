import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LifeBuoy, Search, HelpCircle, BookOpen, Play, 
  MessageSquare, Shield, Activity, Users, ArrowRight, Mail, Clock 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const helpCategories = [
  {
    title: 'FAQs & Troubleshoot',
    icon: HelpCircle,
    desc: 'Quick answers for login issues, rendering errors, and billing resets.',
    href: '/faq',
    color: 'from-purple-500 to-indigo-500 shadow-purple-500/10'
  },
  {
    title: 'Developer Portal',
    icon: BookOpen,
    desc: 'API keys authorization, React components wrappers, and REST SDKs.',
    href: '/docs',
    color: 'from-blue-500 to-cyan-500 shadow-blue-500/10'
  },
  {
    title: 'Video Tutorials',
    icon: Play,
    desc: 'Interactive guides, layers templates setup, and animations clips.',
    href: '/tutorials',
    color: 'from-pink-500 to-rose-500 shadow-pink-500/10'
  },
  {
    title: 'Message Support',
    icon: MessageSquare,
    desc: 'Direct email support, ticket logs, and enterprise SLAs custom deals.',
    href: '/contact',
    color: 'from-emerald-500 to-teal-500 shadow-emerald-500/10'
  },
  {
    title: 'Platform Status',
    icon: Activity,
    desc: 'Real-time infrastructure logs, host server load, and API performance.',
    href: '/status',
    color: 'from-amber-500 to-orange-500 shadow-amber-500/10'
  },
  {
    title: 'Community Space',
    icon: Users,
    desc: 'Engage with prompt engineers, share kits, and discuss designs.',
    href: '/community',
    color: 'from-cyan-500 to-blue-500 shadow-cyan-500/10'
  }
];

const featuredGuides = [
  {
    title: 'How to rotate and manage API tokens',
    category: 'Security',
    desc: 'Learn how to generate secondary authorization tokens and cycle them safely inside your apps.'
  },
  {
    title: 'Troubleshooting layer save issues',
    category: 'Canvas Editor',
    desc: 'Steps to audit local storage space, reset WebGL renderer layers, and push save commands.'
  },
  {
    title: 'Setting custom aspect ratios in AI Generator',
    category: 'AI Studio',
    desc: 'Unlock mobile-optimized portrait formats and custom banner dimensions inside prompt presets.'
  }
];

export default function Help() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = helpCategories.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Search Header Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-border/50 bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <LifeBuoy className="w-3.5 h-3.5 animate-float" /> PixiVisual Help Center
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How can we <span className="gradient-primary-text">help you?</span>
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base max-w-xl mx-auto mb-8">
            Search our knowledge directories, read API setup references, watch tutorial workflows, or contact developer support.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search help topics, guides, error codes..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.href}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-4 text-white`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors flex items-center gap-1.5 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{cat.desc}</p>
                </div>
                <div className="text-[10px] font-bold text-primary flex items-center gap-1.5 pt-2 border-t border-border/50 uppercase tracking-wider">
                  Browse Section <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-xs">No help sections found matching your search. Try typing another category name.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="py-16 border-t border-border/40 bg-surface/30">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-primary animate-pulse-slow" /> Popular & Featured Guides
          </h2>
          <div className="space-y-4">
            {featuredGuides.map((guide, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-primary/10 text-primary uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <h3 className="font-semibold text-foreground text-xs">{guide.title}</h3>
                  <p className="text-muted-foreground text-2xs leading-relaxed">{guide.desc}</p>
                </div>
                <Link 
                  to="/docs" 
                  className="px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-[10px] text-foreground font-semibold flex items-center justify-center gap-1.5 transition-all flex-shrink-0"
                >
                  Read Guide <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA support */}
      <section className="py-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Still need assistance?
          </h2>
          <p className="text-muted-foreground text-xs max-w-sm mx-auto mb-8">
            Our specialized support team answers requests daily. Submit a ticket directly or send us an email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-xs hover:opacity-90 transition-all shadow-glow-purple flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Open Support Ticket
            </Link>
            <a 
              href="mailto:hello@pixivisual.com" 
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold text-xs hover:border-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Email support@pixivisual.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
