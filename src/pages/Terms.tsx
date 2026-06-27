import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Search, ArrowRight, BookOpen, AlertCircle, Mail, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const termsSections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: 'By accessing, registering, or using PixiVisual tools, editor canvases, asset storage, and templates, you represent that you have read and agree to follow these Terms of Service. If you do not agree to all terms, you are prohibited from utilizing our creative studio platform.',
    bullets: [
      'Constitutes a binding legal contract between you and PixiVisual, Inc.',
      'Applies to all individual creators, designers, marketing agencies, and business teams.',
      'Your continued use of our services indicates acceptance of any future terms revisions.'
    ]
  },
  {
    id: 'accounts',
    title: '2. Credentials & Registration',
    content: 'To use our AI Design Studio and templates, you must register a secure creator workspace. You are solely responsible for protecting your account credentials, maintaining API token secrecy, and updating email contact info. You must be at least 13 years of age.',
    bullets: [
      'Must provide valid billing records and workspace details.',
      'Unauthorized access or data breaches must be reported immediately.',
      'Accounts cannot be sold or transferred between external agencies without consent.'
    ]
  },
  {
    id: 'use',
    title: '3. Acceptable Use Standards',
    content: 'You agree to use PixiVisual tools solely for creative and legal business activities. You may not use our platform to generate illegal graphics, violate copyrights, spread malicious code, overload server rendering queues, or bypass platform access barriers.',
    bullets: [
      'Banned: Generating hate speech, trademark infringements, or deceptive advertising.',
      'Prohibited: Scraping templates directories or copying custom design systems.',
      'Queue limits must not be bypassed via bot networks or script triggers.'
    ]
  },
  {
    id: 'ip',
    title: '4. Intellectual Property Rights',
    content: 'You retain full ownership of all prompts, text configs, vector graphics, and layouts you create on PixiVisual. PixiVisual retains all rights to the platform framework, our proprietary editor canvas software, AI templates models, and base kits.',
    bullets: [
      'You grant us a limited hosting license to parse and compile your asset layers.',
      'Commercial usage rights are fully granted for assets created on paid plans.',
      'Base marketplace templates remain copyrighted properties of PixiVisual or listing designers.'
    ]
  },
  {
    id: 'payment',
    title: '5. Subscription & Payment Rules',
    content: 'All paid subscription fees (Pro, Business, Enterprise) are billed in advance on monthly or yearly cycles. Prices are exclusive of local taxes. Subscription renewals are automatic until cancelled from account settings.',
    bullets: [
      'Failed payments trigger a grace period, after which accounts are downgraded.',
      'Refunds are covered under our 30-day money-back guarantee for first-time signups.',
      'Pricing adjustments are published with a minimum of 30 days notice.'
    ]
  },
  {
    id: 'liability',
    title: '6. Limitation of Liability',
    content: 'PixiVisual services are provided on an "as-is" and "as-available" basis. We make no guarantees that asset rendering will be uninterrupted or error-free. Our total liability is capped at the amount paid by you in the 12 months preceding the claim.',
    bullets: [
      'We are not liable for design losses, cloud storage wipes, or server downtimes.',
      'No liability is accepted for indirect, accidental, or punitive damage claims.',
      'You are responsible for backing up finished graphic renders locally.'
    ]
  },
  {
    id: 'governing',
    title: '7. Governing Law & Claims',
    content: 'These terms are governed by and construed under the laws of the State of California, United States, without regard to conflicts of law. Disputes shall be resolved in the federal or state courts located in San Francisco County, California.',
    bullets: [
      'Claims must be brought within one (1) year of the cause of action arising.',
      'Disputes are subject to binding arbitration, as detailed in our claim guides.',
      'Should any clause be ruled invalid, the remaining terms continue in full force.'
    ]
  }
];

export default function Terms() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('acceptance');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scrollspy logic to highlight active sidebar index
  useEffect(() => {
    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of termsSections) {
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

  const filteredSections = termsSections.filter(s =>
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
                <Scale className="w-3.5 h-3.5 text-primary" /> Terms & Compliance Center
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">Terms of Service</h1>
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
                placeholder="Search contract clauses..."
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
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Contract Sections</p>
                {termsSections.map(s => {
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

            {/* Terms Document Content */}
            <div className="lg:col-span-3 space-y-10">
              
              {/* Takeaways Alert Card */}
              <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                <h3 className="font-semibold text-foreground text-xs flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4" /> Crucial Usage Warnings
                </h3>
                <ul className="list-disc list-inside space-y-1 text-2xs text-muted-foreground pl-1 leading-relaxed">
                  <li>By registering, you accept personal legal responsibility for all graphic files generated.</li>
                  <li>Paid plans auto-renew dynamically until explicit cancellation steps are performed.</li>
                  <li>Abuse of server rendering capabilities or API queues triggers immediate profile bans.</li>
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
                  <p className="text-muted-foreground text-xs">No matching terms clauses found. Try another search query.</p>
                </div>
              )}

              {/* Bottom Support links */}
              <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-2xs text-muted-foreground">
                <p>Have questions about these Terms of Service? Our compliance team is here to help.</p>
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
