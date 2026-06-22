import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const sections = [
  {
    id: 'overview', title: '1. Overview',
    content: 'PixiVisual ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.'
  },
  {
    id: 'information', title: '2. Information We Collect',
    content: 'We collect information you provide directly to us (account registration, profile info, payment info), information collected automatically (usage data, device info, IP address, cookies), and information from third parties (social logins, analytics providers).'
  },
  {
    id: 'use', title: '3. How We Use Your Information',
    content: 'We use your information to provide and improve our services, process transactions, send service notifications, respond to support requests, personalize your experience, analyze usage patterns, and comply with legal obligations.'
  },
  {
    id: 'sharing', title: '4. Information Sharing',
    content: 'We do not sell your personal information. We may share your data with service providers who assist in our operations (payment processors, cloud providers), when required by law, or with your explicit consent. All third parties are bound by strict confidentiality agreements.'
  },
  {
    id: 'cookies', title: '5. Cookies & Tracking',
    content: 'We use essential cookies for platform operation, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can control cookie settings through your browser. Some features may not work without certain cookies.'
  },
  {
    id: 'security', title: '6. Data Security',
    content: 'We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, SOC 2 Type II compliance, regular security audits, and access controls. However, no method of transmission over the internet is 100% secure.'
  },
  {
    id: 'gdpr', title: '7. GDPR & Your Rights',
    content: 'If you are in the European Economic Area, you have rights including access to your data, correction of inaccurate data, deletion of your data, data portability, and objection to processing. To exercise these rights, contact us at privacy@pixivisual.com.'
  },
  {
    id: 'retention', title: '8. Data Retention',
    content: 'We retain your data for as long as your account is active or as needed to provide services. When you delete your account, we delete your personal data within 30 days, except where we are required to retain it for legal or compliance purposes.'
  },
  {
    id: 'children', title: '9. Children\'s Privacy',
    content: 'Our services are not directed to children under 13 (or 16 in the EU). We do not knowingly collect information from children. If we learn we have collected such information, we will delete it promptly.'
  },
  {
    id: 'changes', title: '10. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.'
  },
  {
    id: 'contact-privacy', title: '11. Contact Us',
    content: 'For privacy-related questions or to exercise your rights, contact our Data Protection Officer at privacy@pixivisual.com or write to us at: PixiVisual, Inc., 548 Market St, San Francisco, CA 94104.'
  },
];

export default function Privacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 21, 2025 · Effective: June 21, 2025</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Contents</p>
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="block text-xs text-muted-foreground hover:text-primary py-1 transition-colors">{s.title}</a>
                ))}
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
                This Privacy Policy describes how PixiVisual collects, uses, and shares information about you when you use our services.
              </div>
              {sections.map(s => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-lg font-display font-semibold text-foreground mb-3">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
                </div>
              ))}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Questions about this policy?{' '}
                  <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
                  {' '}or review our{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
