import { useEffect, useState } from 'react';
import { Activity, CheckCircle, AlertTriangle, Clock, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const services = [
  { name: 'Web Application Canvas', status: 'Operational', uptime: '99.99%', health: 100 },
  { name: 'Generative AI Rendering Engines', status: 'Operational', uptime: '99.94%', health: 100 },
  { name: 'REST APIs & Developer SDKs', status: 'Operational', uptime: '99.98%', health: 100 },
  { name: 'Global CDN & Asset Storage', status: 'Operational', uptime: '100.0%', health: 100 },
  { name: 'Payment Gateways & Subscriptions', status: 'Operational', uptime: '99.99%', health: 100 },
];

const incidents = [
  { date: 'June 18, 2025', title: 'Generative AI Engine Latency Degradation', severity: 'Minor', resolved: true, desc: 'We experienced a surge in AI image generation requests causing temporary queues. Resolved within 22 minutes by auto-scaling GPU nodes.' },
  { date: 'May 04, 2025', title: 'Scheduled Database Maintenance', severity: 'Maintenance', resolved: true, desc: 'Database migration and indexing completed successfully during low-traffic window. No service downtime observed.' },
  { date: 'March 14, 2025', title: 'Asset Delivery Server Interruption', severity: 'Major', resolved: true, desc: 'Our storage CDN edge cache node in Western Europe experienced partial packet drops. Re-routed traffic to alternative caches.' },
];

export default function Status() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Status Header */}
        <section className="py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold mb-6 animate-pulse shadow-glow-emerald">
              <CheckCircle className="w-5 h-5 flex-shrink-0" /> All Systems Operational
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              System Service Status
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We proactively monitor our global AI generation servers, CDN delivery caches, and payment databases. Live service status logs are updated in real-time.
            </p>
          </div>
        </section>

        {/* Services Status List */}
        <section className="py-12 bg-surface/50">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="border border-border bg-card rounded-2xl overflow-hidden shadow-xl reveal-up">
              <div className="p-5 border-b border-border/80 flex items-center justify-between bg-card/60">
                <span className="text-sm font-bold text-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Active Components</span>
                <span className="text-xs text-muted-foreground">Uptime (Last 90 days)</span>
              </div>
              <div className="divide-y divide-border/60">
                {services.map((srv) => (
                  <div key={srv.name} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card hover:bg-card/50 transition-colors">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{srv.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">{srv.status}</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center justify-between sm:justify-end gap-6 text-sm font-medium text-foreground">
                      <span className="text-xs text-muted-foreground sm:text-foreground">{srv.uptime}</span>
                      <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Healthy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Incident History */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3 reveal-up">Incident History</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Log of past updates, migrations, and service restorations.</p>
            </div>
            <div className="space-y-6">
              {incidents.map((inc, i) => (
                <div key={inc.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all reveal-up" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{inc.date}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${inc.severity === 'Major' ? 'bg-rose-500/10 text-rose-500' : inc.severity === 'Minor' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {inc.severity}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{inc.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{inc.desc}</p>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Resolved & Monitored
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="container max-w-xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4 reveal-up">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Subscribe to Alerts</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1 text-sm">
              Get automated email notifications whenever an incident is logged or scheduled maintenance is planned.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold animate-slide-up">
                Successfully subscribed to system status updates!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto reveal-up stagger-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 flex items-center gap-2 shadow-glow-purple">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
