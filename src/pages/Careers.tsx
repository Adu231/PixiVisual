import { useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Target, Sparkles, Smile, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const departments = [
  {
    name: 'Engineering & AI',
    roles: [
      { id: '1', title: 'Senior AI Research Engineer', type: 'Full-time', location: 'San Francisco, CA / Remote', desc: 'Work on scaling Stable Diffusion and GAN generative architectures for creative assets.' },
      { id: '2', title: 'Lead Full-Stack React Engineer', type: 'Full-time', location: 'Remote (US/EU)', desc: 'Own complex visual editing tools, browser-based drag-and-drop systems, and real-time collaboration engines.' },
      { id: '3', title: 'Senior Infrastructure Engineer', type: 'Full-time', location: 'San Francisco, CA', desc: 'Optimize low-latency image generation clusters, CDN distributions, and high-concurrency API nodes.' },
    ]
  },
  {
    name: 'Product & Design',
    roles: [
      { id: '4', title: 'Senior Product Designer', type: 'Full-time', location: 'London, UK / Remote', desc: 'Design next-generation canvas interfaces, user flows for template builders, and AI-wizard interactions.' },
      { id: '5', title: 'Product Manager, Creator Tools', type: 'Full-time', location: 'San Francisco, CA / Hybrid', desc: 'Define roadmap features for template marketplaces, team collaboration workflows, and design portals.' },
    ]
  },
  {
    name: 'Sales & Growth',
    roles: [
      { id: '6', title: 'Head of Growth Marketing', type: 'Full-time', location: 'Remote (Global)', desc: 'Scale performance campaigns, affiliate channels, and content generation loops from 2M to 10M+ users.' },
      { id: '7', title: 'Enterprise Account Executive', type: 'Full-time', location: 'New York, NY / Hybrid', desc: 'Partner with global brand directors and marketing agencies to deploy enterprise team dashboard solutions.' },
    ]
  }
];

const benefits = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Premium medical, dental, and vision insurance covered 100% for you and your dependents.' },
  { icon: Smile, title: 'Flexible Workstyles', desc: 'Fully remote-friendly culture with core timezone alignment. Work from wherever you are happiest.' },
  { icon: Target, title: 'Learning Stipend', desc: '$2,000 annual budget for workshops, design classes, conferences, books, and courses.' },
  { icon: Sparkles, title: 'Workspace Support', desc: 'Home-office setup allowance including high-spec laptops, ergonomic chairs, and 4K external monitors.' },
  { icon: Shield, title: 'Equity Options', desc: 'Competitive baseline salary along with robust early-stage stock options in a fast-growing SaaS startup.' },
  { icon: Briefcase, title: 'Paid Time Off', desc: 'Unlimited flexible time off policies with a recommended 4 weeks minimum annual leave to recharge.' },
];

export default function Careers() {
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
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Briefcase className="w-3 h-3" /> We're hiring!
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Help us build the future of<br />
              <span className="gradient-primary-text">visual content creation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              Join a team of designers, engineers, and creatives working to make high-fidelity design tools accessible to every creator globally.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Company Perks & Benefits</h2>
              <p className="text-muted-foreground reveal-up stagger-1">We take care of our team so they can build great things.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={b.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all reveal-up group" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-115 transition-transform">
                    <b.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3 reveal-up">Open Opportunities</h2>
              <p className="text-muted-foreground reveal-up stagger-1">Select a role to start your application journey.</p>
            </div>

            <div className="space-y-12">
              {departments.map((dept) => (
                <div key={dept.name} className="reveal-up">
                  <h3 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">{dept.name}</h3>
                  <div className="space-y-4">
                    {dept.roles.map((role) => (
                      <div key={role.id} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-card-hover transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                        <div className="space-y-2 max-w-xl">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{role.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{role.desc}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {role.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {role.type}</span>
                          </div>
                        </div>
                        <a href="mailto:careers@pixivisual.com" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:bg-primary/5 transition-all self-start md:self-auto group-hover:gradient-primary group-hover:text-white group-hover:border-transparent">
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4 reveal-up">Don't see your dream role?</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">
              We are always looking for passionate creators, engineers, and strategists. Drop us a line and tell us how you can help shape the platform.
            </p>
            <a href="mailto:careers@pixivisual.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              Send Open Application <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
