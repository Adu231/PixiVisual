import { useState, useEffect } from 'react';
import { Bell, Shield, CreditCard, Palette, Globe, Save, Check, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from '@/components/ui/Toast';
import { Link } from 'react-router-dom';

type Tab = 'notifications' | 'appearance' | 'privacy' | 'billing' | 'integrations';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('notifications');
  const { user } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [notifSettings, setNotifSettings] = useState({
    emailUpdates: true, designComments: true, teamInvites: true,
    weeklyDigest: false, productNews: true, securityAlerts: true,
  });
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true, showEmail: false, analyticsTracking: true, marketingEmails: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    toast('success', 'Settings saved successfully!');
  };

  const tabs = [
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'appearance' as Tab, label: 'Appearance', icon: Palette },
    { id: 'privacy' as Tab, label: 'Privacy', icon: Shield },
    { id: 'billing' as Tab, label: 'Billing', icon: CreditCard },
    { id: 'integrations' as Tab, label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">Settings</h1>
            <p className="text-muted-foreground text-sm">Manage your account preferences and configurations.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="bg-card border border-border rounded-2xl p-3 space-y-1 h-fit">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === tab.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <tab.icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                  {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground mb-6">Choose what notifications you'd like to receive.</p>
                  <div className="space-y-4">
                    {Object.entries(notifSettings).map(([key, value]) => {
                      const labels: Record<string, { label: string; desc: string }> = {
                        emailUpdates: { label: 'Email Updates', desc: 'Receive updates about your designs via email' },
                        designComments: { label: 'Design Comments', desc: 'When someone comments on your designs' },
                        teamInvites: { label: 'Team Invitations', desc: 'When you receive team workspace invitations' },
                        weeklyDigest: { label: 'Weekly Digest', desc: 'A weekly summary of your design activity' },
                        productNews: { label: 'Product News', desc: 'New features and product announcements' },
                        securityAlerts: { label: 'Security Alerts', desc: 'Important security notifications (recommended)' },
                      };
                      const info = labels[key];
                      return (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-all">
                          <div>
                            <p className="text-sm font-medium text-foreground">{info.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifSettings(p => ({ ...p, [key]: !value }))}
                            className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Appearance</h2>
                  <p className="text-sm text-muted-foreground mb-6">Customize the look and feel of your workspace.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ val: 'light', label: 'Light Mode' }, { val: 'dark', label: 'Dark Mode' }].map(t => (
                          <button
                            key={t.val}
                            onClick={() => { if (theme !== t.val) toggleTheme(); }}
                            className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${theme === t.val ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}
                          >
                            {theme === t.val && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                            <span className="text-sm font-medium text-foreground">{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Language</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Privacy Settings</h2>
                  <p className="text-sm text-muted-foreground mb-6">Control your privacy and data preferences.</p>
                  <div className="space-y-4">
                    {Object.entries(privacySettings).map(([key, value]) => {
                      const labels: Record<string, { label: string; desc: string }> = {
                        publicProfile: { label: 'Public Profile', desc: 'Allow others to view your profile' },
                        showEmail: { label: 'Show Email', desc: 'Display your email on your public profile' },
                        analyticsTracking: { label: 'Analytics Tracking', desc: 'Help improve PixiVisual with usage analytics' },
                        marketingEmails: { label: 'Marketing Emails', desc: 'Receive promotional offers and campaigns' },
                      };
                      const info = labels[key];
                      return (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-all">
                          <div>
                            <p className="text-sm font-medium text-foreground">{info.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings(p => ({ ...p, [key]: !value }))}
                            className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      );
                    })}
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Danger Zone</h4>
                      <button onClick={() => toast('info', 'Please contact support to delete your account.')} className="px-4 py-2 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/10 transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Billing & Subscription</h2>
                  <p className="text-sm text-muted-foreground mb-6">Manage your subscription and payment methods.</p>
                  <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Current Plan: <span className="text-primary capitalize">{user?.plan || 'Free'}</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Next billing date: July 21, 2025</p>
                      </div>
                      <Link to="/pricing" className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all">
                        Upgrade Plan
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => toast('info', 'Payment method management coming soon.')} className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/20 transition-all flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Add Payment Method</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => toast('info', 'Invoice download coming soon.')} className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/20 transition-all flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">View Billing History</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => toast('info', 'Please contact support to cancel your subscription.')} className="w-full text-left p-4 rounded-xl border border-destructive/20 hover:bg-destructive/5 transition-all flex items-center justify-between">
                      <span className="text-sm font-medium text-destructive">Cancel Subscription</span>
                      <ChevronRight className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Integrations</h2>
                  <p className="text-sm text-muted-foreground mb-6">Connect PixiVisual with your favorite tools.</p>
                  <div className="space-y-3">
                    {[
                      { name: 'Slack', desc: 'Get design notifications in Slack', icon: '💬', connected: true },
                      { name: 'Google Drive', desc: 'Sync designs to Google Drive', icon: '📁', connected: false },
                      { name: 'Dropbox', desc: 'Export directly to Dropbox', icon: '📦', connected: false },
                      { name: 'HubSpot', desc: 'Use designs in HubSpot campaigns', icon: '🔶', connected: false },
                      { name: 'Mailchimp', desc: 'Add visuals to email campaigns', icon: '📧', connected: false },
                      { name: 'Shopify', desc: 'Create product images for Shopify', icon: '🛍️', connected: false },
                    ].map(integration => (
                      <div key={integration.name} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/20 transition-all">
                        <span className="text-2xl">{integration.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">{integration.desc}</p>
                        </div>
                        <button
                          onClick={() => toast('info', `${integration.name} integration coming soon!`)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${integration.connected ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'border border-border hover:border-primary/30 text-foreground'}`}
                        >
                          {integration.connected ? '✓ Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              {activeTab !== 'billing' && activeTab !== 'integrations' && (
                <div className="mt-6 pt-4 border-t border-border">
                  <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple">
                    {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Settings</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
