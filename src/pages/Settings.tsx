import { useState, useEffect } from 'react';
import { Bell, Shield, CreditCard, Palette, Globe, Save, Check, ChevronRight, X, Lock, Download, AlertTriangle, MessageSquare, Folder, Package, Target, Mail, ShoppingBag } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getSidebarItemsForRole, getRoleLabel } from '@/components/layout/sidebarHelpers';
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

  // Billing & Subscription States
  const [activeBillingModal, setActiveBillingModal] = useState<null | 'add-card' | 'history' | 'cancel'>(null);
  const [paymentMethods, setPaymentMethods] = useState<Array<{ id: string; cardholder: string; number: string; expiry: string; brand: string }>>([
    { id: '1', cardholder: 'Jessica Park', number: '•••• •••• •••• 4242', expiry: '12/28', brand: 'visa' }
  ]);
  const [newCard, setNewCard] = useState({ cardholder: '', number: '', expiry: '', cvv: '' });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [billingPlan, setBillingPlan] = useState(user?.plan || 'pro');
  const [billingHistory, setBillingHistory] = useState([
    { id: 'INV-2025-001', date: 'June 21, 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2025-002', date: 'May 21, 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2025-003', date: 'April 21, 2025', amount: '$29.00', status: 'Paid' },
  ]);

  // Integrations State
  const [integrationsList, setIntegrationsList] = useState([
    { name: 'Slack', desc: 'Get design notifications in Slack', icon: MessageSquare, connected: true },
    { name: 'Google Drive', desc: 'Sync designs to Google Drive', icon: Folder, connected: false },
    { name: 'Dropbox', desc: 'Export directly to Dropbox', icon: Package, connected: false },
    { name: 'HubSpot', desc: 'Use designs in HubSpot campaigns', icon: Target, connected: false },
    { name: 'Mailchimp', desc: 'Add visuals to email campaigns', icon: Mail, connected: false },
    { name: 'Shopify', desc: 'Create product images for Shopify', icon: ShoppingBag, connected: false },
  ]);

  const handleToggleIntegration = (name: string) => {
    setIntegrationsList(prev => prev.map(integration => {
      if (integration.name === name) {
        const nextConnected = !integration.connected;
        toast('success', `${integration.name} ${nextConnected ? 'connected' : 'disconnected'} successfully!`);
        return { ...integration, connected: nextConnected };
      }
      return integration;
    }));
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.number.replace(/\s+/g, '').length < 16) {
      toast('error', 'Please enter a valid 16-digit card number.');
      return;
    }
    if (newCard.expiry.length < 5) {
      toast('error', 'Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (newCard.cvv.length < 3) {
      toast('error', 'Please enter a valid CVV.');
      return;
    }

    setIsAddingCard(true);
    await new Promise(r => setTimeout(r, 800));
    setIsAddingCard(false);

    const brand = newCard.number.startsWith('4') ? 'visa' : 'master';
    const cleanNumber = '•••• •••• •••• ' + newCard.number.slice(-4);
    
    setPaymentMethods(p => [
      ...p,
      {
        id: Date.now().toString(),
        cardholder: newCard.cardholder,
        number: cleanNumber,
        expiry: newCard.expiry,
        brand
      }
    ]);

    setNewCard({ cardholder: '', number: '', expiry: '', cvv: '' });
    setActiveBillingModal(null);
    toast('success', 'Payment method added successfully!');
  };

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
    <DashboardLayout
      sidebarItems={getSidebarItemsForRole(user?.role || 'content-creator')}
      title="Settings"
      roleLabel={user ? getRoleLabel(user.role) : 'User'}
    >
      <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground mb-1">Settings</h1>
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
                        <p className="text-sm font-semibold text-foreground">Current Plan: <span className="text-primary capitalize">{billingPlan}</span></p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {billingPlan === 'free' ? 'No active subscription' : 'Next billing date: July 21, 2025'}
                        </p>
                      </div>
                      {billingPlan === 'free' && (
                        <Link to="/pricing" className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all">
                          Upgrade Plan
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Saved Payment Methods List */}
                  <div className="mb-6 space-y-3">
                    <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Saved Payment Methods</h3>
                    {paymentMethods.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No payment methods saved.</p>
                    ) : (
                      <div className="space-y-2">
                        {paymentMethods.map(pm => (
                          <div key={pm.id} className="p-4 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                {pm.brand}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{pm.number}</p>
                                <p className="text-[10px] text-muted-foreground">Expires {pm.expiry} · Cardholder: {pm.cardholder}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setPaymentMethods(p => p.filter(x => x.id !== pm.id));
                                toast('success', 'Payment method removed successfully.');
                              }}
                              className="text-xs text-destructive hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button onClick={() => setActiveBillingModal('add-card')} className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/20 transition-all flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Add Payment Method</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => setActiveBillingModal('history')} className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/20 transition-all flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">View Billing History</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {billingPlan !== 'free' && (
                      <button onClick={() => setActiveBillingModal('cancel')} className="w-full text-left p-4 rounded-xl border border-destructive/20 hover:bg-destructive/5 transition-all flex items-center justify-between">
                        <span className="text-sm font-medium text-destructive">Cancel Subscription</span>
                        <ChevronRight className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>

                  {/* Add Payment Method Modal */}
                  {activeBillingModal === 'add-card' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveBillingModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Add Payment Method</h3>
                        <form onSubmit={handleAddCard} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Cardholder Name</label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              value={newCard.cardholder}
                              onChange={e => setNewCard(p => ({ ...p, cardholder: e.target.value }))}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Card Number</label>
                            <input
                              type="text"
                              required
                              maxLength={19}
                              placeholder="1234 5678 1234 5678"
                              value={newCard.number}
                              onChange={e => {
                                const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                const matches = v.match(/\d{4,16}/g);
                                const match = (matches && matches[0]) || '';
                                const parts = [];
                                for (let i = 0, len = match.length; i < len; i += 4) {
                                  parts.push(match.substring(i, i + 4));
                                }
                                const formatted = parts.length > 0 ? parts.join(' ') : v;
                                setNewCard(p => ({ ...p, number: formatted }));
                              }}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Expiration</label>
                              <input
                                type="text"
                                required
                                maxLength={5}
                                placeholder="MM/YY"
                                value={newCard.expiry}
                                onChange={e => {
                                  const v = e.target.value.replace(/[^0-9]/g, '');
                                  if (v.length >= 2) {
                                    setNewCard(p => ({ ...p, expiry: `${v.substring(0, 2)}/${v.substring(2, 4)}` }));
                                  } else {
                                    setNewCard(p => ({ ...p, expiry: v }));
                                  }
                                }}
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">CVV</label>
                              <input
                                type="password"
                                required
                                maxLength={4}
                                placeholder="•••"
                                value={newCard.cvv}
                                onChange={e => setNewCard(p => ({ ...p, cvv: e.target.value.replace(/[^0-9]/g, '') }))}
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                              />
                            </div>
                          </div>
                          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setActiveBillingModal(null)} className="px-4 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all">
                              Cancel
                            </button>
                            <button type="submit" disabled={isAddingCard} className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple flex items-center gap-2">
                              {isAddingCard ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Lock className="w-4 h-4" /> Save Card</>}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Billing History Modal */}
                  {activeBillingModal === 'history' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                      <div className="bg-card border border-border rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
                        <button onClick={() => setActiveBillingModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Billing History</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-border/80 text-xs font-semibold text-muted-foreground uppercase">
                                <th className="pb-3">Invoice ID</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                              {billingHistory.map((inv) => (
                                <tr key={inv.id} className="text-foreground">
                                  <td className="py-4 font-mono text-xs">{inv.id}</td>
                                  <td className="py-4 text-xs">{inv.date}</td>
                                  <td className="py-4 text-xs font-medium">{inv.amount}</td>
                                  <td className="py-4">
                                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                      {inv.status}
                                    </span>
                                  </td>
                                  <td className="py-4 text-right">
                                    <button
                                      onClick={() => {
                                        toast('success', `Downloading invoice ${inv.id}...`);
                                      }}
                                      className="p-1.5 rounded bg-muted hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                                      title="Download Invoice"
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="pt-4 border-t border-border flex items-center justify-end mt-4">
                          <button onClick={() => setActiveBillingModal(null)} className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cancel Subscription Modal */}
                  {activeBillingModal === 'cancel' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveBillingModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3 text-destructive mb-4">
                          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                          <h3 className="text-lg font-display font-semibold text-foreground">Cancel Subscription</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          Are you sure you want to cancel your <span className="text-primary font-semibold capitalize">{billingPlan}</span> subscription? You will lose access to premium AI templates, team collaborate libraries, and priority render queue slots at the end of your billing cycle.
                        </p>
                        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                          <button onClick={() => setActiveBillingModal(null)} className="px-4 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all">
                            Keep Subscription
                          </button>
                          <button
                            onClick={() => {
                              setBillingPlan('free');
                              setActiveBillingModal(null);
                              toast('success', 'Your subscription was cancelled. Your plan will downgrade to Free at the end of the billing period.');
                            }}
                            className="px-5 py-2.5 rounded-xl bg-destructive text-white font-semibold text-sm hover:bg-destructive/90 transition-all"
                          >
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <h2 className="text-base font-display font-semibold text-foreground mb-1">Integrations</h2>
                  <p className="text-sm text-muted-foreground mb-6">Connect PixiVisual with your favorite tools.</p>
                  <div className="space-y-3">
                    {integrationsList.map(integration => (
                      <div key={integration.name} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/20 transition-all">
                        <integration.icon className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">{integration.desc}</p>
                        </div>
                        <button
                          onClick={() => handleToggleIntegration(integration.name)}
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
      </DashboardLayout>
  );
}
