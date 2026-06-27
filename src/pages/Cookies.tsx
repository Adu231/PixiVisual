import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Search, ArrowRight, BookOpen, AlertCircle, Mail, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cookieSections = [
  {
    id: 'definition',
    title: '1. What are Cookies',
    content: 'Cookies are small text file fragments downloaded to your computer or mobile hardware when you load web-based apps. PixiVisual utilizes cookies, secure pixel nodes, local storage tokens, and index trackers to authenticate workspace members, secure sessions, and compile performance statistics.',
    bullets: [
      'First-party cookies: Set directly by pixivisual.com to preserve workspace theme presets and states.',
      'Third-party cookies: Dispatched by integrated services (e.g. Stripe, Google Analytics) to process tokens and metrics.',
      'Session cookies expire when you close the browser; persistent cookies remain until cleared.'
    ]
  },
  {
    id: 'essential',
    title: '2. Essential Platform Cookies',
    content: 'These cookies are mandatory for platform operation. They sustain secure login sessions, protect Stripe checkout routing sequences, store brand workspace configurations, and enable layers restoration. Without them, PixiVisual cannot operate.',
    bullets: [
      'Session Authentication: Links your browser session to secure workspace credentials.',
      'Cross-Site Request Forgery (CSRF): Blocks malicious sites from copying editor actions.',
      'Shopping Cart & Billing: Prevents payment interruptions during Stripe checkout operations.'
    ]
  },
  {
    id: 'analytics',
    title: '3. Analytics & Usage Tracking',
    content: 'We use analytics tracking to analyze creator behaviors, measure rendering duration speeds, identify UI bugs, and catalog layout preferences. This is done to continuously scale and optimize our cloud design engines.',
    bullets: [
      'Aggregates canvas load times and prompt generation latency statistics.',
      'Logs feature usage ratios (e.g. background removal vs logo generation counts).',
      'Provides crash summaries to help engineering patches reach systems quicker.'
    ]
  },
  {
    id: 'advertising',
    title: '4. Advertising & Pixel Partners',
    content: 'PixiVisual does not sell custom design assets or text prompts to advertising brokers. However, we occasionally use pixel nodes (like Google Ads or Meta Pixels) on public marketing pages to measure promotional campaign conversion rates.',
    bullets: [
      'Measures sign-up ratios of external referral links.',
      'Custom graphics, user uploads, and brand kit colors are NEVER shared with pixels.',
      'Pixel data is fully anonymized before compilation by marketing servers.'
    ]
  },
  {
    id: 'controls',
    title: '5. Browser Controls & Revoking Consent',
    content: 'You can block cookies by adjusting browser preferences. However, disabling essential cookies will immediately break account authentication and prevent canvas files saving. You can also revoke optional tracking consent below or in the Settings panel.',
    bullets: [
      'Chrome/Safari: Manage settings in the Privacy & Security options menu.',
      'Privacy-focused browsers (Brave, DuckDuckGo) automatically shield pixel scripts.',
      'Clicking "Revoke Analytics Consent" in workspace settings toggles off usage trackers.'
    ]
  },
  {
    id: 'contact',
    title: '6. Data Auditing & DPO Contacts',
    content: 'We audit cookie usage audits regularly to verify tracking nodes compliance. For question logs, pixel records, or general data auditing inquiries, write to our data protection officer at privacy@pixivisual.com.',
    bullets: [
      'Auditing records updated semi-annually for CCPA compliance.',
      'DPO email: privacy@pixivisual.com',
      'Detailed cookie lists and domains index provided on DPO request.'
    ]
  }
];

export default function Cookies() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('definition');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scrollspy logic to highlight active sidebar index
  useEffect(() => {
    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of cookieSections) {
        const el = sectionRefs.current[section.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollspy);
    return () => window.removeEventListener('scroll', handleScrollspy);
  }, []);

  const filteredSections = cookieSections.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.content.toLowerCase().includes(search.toLowerCase()) ||
    s.bullets.some(b => b.toLowerCase().includes(search.toLowerCase()))
  );

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Visual Header */}
      <section className="relative pt-32 pb-12 overflow-hidden border-b border-border/50 bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <Cookie className="w-3.5 h-3.5 text-primary" /> Cookie & Tracking Center
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">Cookies Policy</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Last updated: June 27, 2026 · Effective Immediately
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search cookie sections..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Dynamic Scrollspy Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-1 bg-card/50 p-4 rounded-2xl border border-border/60">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Cookie Chapters</p>
                {cookieSections.map(s => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                        isActive 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <span className="truncate">{s.title.substring(3)}</span>
                      {isActive && <ArrowRight className="w-3 h-3 text-primary flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Cookies Document Content */}
            <div className="lg:col-span-3 space-y-10">
              
              {/* Takeaways Alert Card */}
              <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
                <h3 className="font-semibold text-foreground text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" /> Key Cookie Highlights
                </h3>
                <ul className="list-disc list-inside space-y-1 text-2xs text-muted-foreground pl-1 leading-relaxed">
                  <li>We use essential cookies to maintain secure sessions and process Stripe operations.</li>
                  <li>No uploaded design assets or prompt files are processed by tracking pixels.</li>
                  <li>You can block non-essential analytics tracking in your browser or Account panel.</li>
                </ul>
              </div>

              {/* Loop Sections */}
              {filteredSections.map(s => (
                <div
                  key={s.id}
                  id={s.id}
                  ref={el => { sectionRefs.current[s.id] = el; }}
                  className="scroll-mt-24 space-y-4"
                >
                  <h2 className="text-base font-display font-semibold text-foreground border-b border-border/80 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full gradient-primary" />
                    {s.title}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.content}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                    <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" /> Core Provisions:
                    </h4>
                    <ul className="space-y-1.5">
                      {s.bullets.map((b, idx) => (
                        <li key={idx} className="text-2xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-xs">No matching cookie clauses found. Try another search query.</p>
                </div>
              )}

              {/* Bottom Support links */}
              <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-2xs text-muted-foreground">
                <p>Have questions about cookie usage? Our compliance team is here to support you.</p>
                <div className="flex gap-3">
                  <Link to="/contact" className="text-primary hover:underline flex items-center gap-1 font-semibold">
                    <Mail className="w-3 h-3" /> Contact Support
                  </Link>
                  <Link to="/privacy" className="text-primary hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
