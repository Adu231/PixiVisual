import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, MessageSquare, HelpCircle, Briefcase } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/components/ui/Toast';

const contactTypes = [
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
  { value: 'support', label: 'Technical Support', icon: HelpCircle },
  { value: 'sales', label: 'Sales & Enterprise', icon: Briefcase },
  { value: 'billing', label: 'Billing Question', icon: Mail },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'general', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
    toast('success', "Message sent! We'll get back to you within 24 hours.");
  };

  const update = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-20 relative">
          <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 animate-slide-up">
              Get in <span className="gradient-primary-text">touch</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-slide-up">
              We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Info */}
              <div className="space-y-6 reveal-left">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-2">Contact Information</h2>
                  <p className="text-sm text-muted-foreground">Reach out through any of these channels or use the form.</p>
                </div>
                {[
                  { icon: Mail, label: 'Email', value: 'hello@pixivisual.com', href: 'mailto:hello@pixivisual.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                  { icon: MapPin, label: 'Office', value: '548 Market St, San Francisco, CA 94104', href: '#' },
                  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9AM–6PM PST', href: '#' },
                ].map(item => (
                  <a key={item.label} href={item.href} className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}

                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Enterprise Sales</h3>
                  <p className="text-xs text-muted-foreground mb-3">Need a custom solution for your team? Let's talk.</p>
                  <a href="mailto:enterprise@pixivisual.com" className="text-xs font-semibold text-primary hover:underline">enterprise@pixivisual.com</a>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 reveal-right">
                {submitted ? (
                  <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <h3 className="text-lg font-display font-bold text-foreground mb-6">Send us a message</h3>

                    {/* Contact Type */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-foreground mb-2">What can we help you with?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {contactTypes.map(ct => (
                          <button
                            key={ct.value}
                            type="button"
                            onClick={() => update('type', ct.value)}
                            className={`p-3 rounded-xl border text-left transition-all ${form.type === ct.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}
                          >
                            <ct.icon className={`w-4 h-4 mb-1.5 ${form.type === ct.value ? 'text-primary' : 'text-muted-foreground'}`} />
                            <p className="text-xs font-medium text-foreground">{ct.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                          <input value={form.name} onChange={e => update('name', e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${errors.name ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="Your full name" />
                          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                          <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${errors.email ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="you@company.com" />
                          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Company (optional)</label>
                        <input value={form.company} onChange={e => update('company', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Your company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                        <input value={form.subject} onChange={e => update('subject', e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all ${errors.subject ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="How can we help?" />
                        {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                        <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5} className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-all resize-none ${errors.message ? 'border-destructive' : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'}`} placeholder="Tell us more about your inquiry..." />
                        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                        <p className="mt-1 text-xs text-muted-foreground text-right">{form.message.length} characters</p>
                      </div>
                      <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple hover:-translate-y-0.5">
                        {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
