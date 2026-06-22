import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms', content: 'By accessing or using PixiVisual services, you agree to these Terms of Service. If you do not agree, please do not use our services. These terms constitute a binding legal agreement between you and PixiVisual, Inc.' },
  { id: 'account', title: '2. Account Registration', content: 'You must create an account to access most features. You are responsible for maintaining the confidentiality of your credentials, all activities under your account, and ensuring your account information is accurate and current. You must be at least 13 years old.' },
  { id: 'acceptable-use', title: '3. Acceptable Use', content: 'You agree not to use PixiVisual for illegal activities, harassment, spreading malware, violating intellectual property rights, creating deceptive content, interfering with platform operations, or any activity that violates applicable laws.' },
  { id: 'ip', title: '4. Intellectual Property', content: 'You retain ownership of content you create on PixiVisual. By using our platform, you grant PixiVisual a limited license to host and process your content to provide our services. PixiVisual retains ownership of the platform, AI models, templates, and all platform features.' },
  { id: 'user-content', title: '5. User-Generated Content', content: 'You are solely responsible for content you create, upload, or share. Content must not infringe third-party rights, be defamatory, contain malware, or violate our community guidelines. We reserve the right to remove content that violates these terms.' },
  { id: 'payment', title: '6. Payment Terms', content: 'Paid subscriptions are billed in advance. All fees are non-refundable except as specified in our refund policy. We may modify pricing with 30 days notice. Failed payments may result in service suspension. Prices are exclusive of applicable taxes.' },
  { id: 'subscriptions', title: '7. Subscriptions & Cancellation', content: 'Subscriptions automatically renew unless cancelled. You can cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period. We offer a 30-day money-back guarantee for first-time subscribers.' },
  { id: 'liability', title: '8. Limitation of Liability', content: 'PixiVisual services are provided "as is". We do not warrant uninterrupted or error-free operation. Our liability is limited to the amount you paid in the past 12 months. We are not liable for indirect, incidental, or consequential damages.' },
  { id: 'termination', title: '9. Account Termination', content: 'We may suspend or terminate accounts that violate these terms, pose security risks, or remain inactive for extended periods. You may delete your account at any time. Upon termination, your right to use the service ends immediately.' },
  { id: 'governing', title: '10. Governing Law', content: 'These Terms are governed by the laws of California, USA, without regard to conflict of law provisions. Disputes shall be resolved in the courts of San Francisco County, California, or through binding arbitration at our election.' },
  { id: 'changes-terms', title: '11. Changes to Terms', content: 'We may update these Terms with 30 days notice for material changes. Continued use after changes constitutes acceptance. If you disagree with changes, you must stop using our services and cancel your subscription.' },
];

export default function Terms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 21, 2025 · Effective: June 21, 2025</p>
          </div>
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Contents</p>
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="block text-xs text-muted-foreground hover:text-primary py-1 transition-colors">{s.title}</a>
                ))}
              </div>
            </aside>
            <div className="lg:col-span-3 space-y-8">
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-sm text-muted-foreground">
                Please read these Terms of Service carefully before using PixiVisual. By using our services, you agree to be bound by these terms.
              </div>
              {sections.map(s => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-lg font-display font-semibold text-foreground mb-3">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
                </div>
              ))}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Questions about these terms?{' '}
                  <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
                  {' '}or review our{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
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
