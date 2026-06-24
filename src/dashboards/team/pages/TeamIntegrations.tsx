import { useState } from 'react';
import { Globe, Check, Plus, Settings, Zap, RefreshCw, X, Shield, Code, Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const integrations = [
  { name: 'Slack', desc: 'Get notified when assets are uploaded or brand violations detected', category: 'Communication', connected: true, icon: '💬', color: 'from-purple-500 to-pink-500' },
  { name: 'Google Drive', desc: 'Automatically sync brand assets to shared Google Drive folders', category: 'Storage', connected: true, icon: '📁', color: 'from-blue-500 to-green-500' },
  { name: 'Microsoft Teams', desc: 'Collaborate on designs directly inside Microsoft Teams channels', category: 'Communication', connected: false, icon: '🔷', color: 'from-blue-600 to-blue-400' },
  { name: 'Dropbox', desc: 'Two-way sync for all brand assets with your Dropbox Business', category: 'Storage', connected: false, icon: '📦', color: 'from-blue-500 to-blue-300' },
  { name: 'HubSpot', desc: 'Push approved marketing assets directly to HubSpot campaigns', category: 'Marketing', connected: true, icon: '🟠', color: 'from-orange-500 to-red-500' },
  { name: 'Figma', desc: 'Import Figma designs directly as brand assets with one click', category: 'Design', connected: false, icon: '🎨', color: 'from-pink-500 to-purple-500' },
  { name: 'Shopify', desc: 'Sync product images and promotional assets with your Shopify store', category: 'E-commerce', connected: false, icon: '🛍️', color: 'from-green-500 to-teal-500' },
  { name: 'Zapier', desc: 'Connect PixiVisual to 5,000+ apps through automated Zapier workflows', category: 'Automation', connected: false, icon: '⚡', color: 'from-orange-400 to-yellow-400' },
];

const extraIntegrationsList = [
  { name: 'Airtable', desc: 'Sync asset metadata automatically with Airtable bases', category: 'Automation', connected: false, icon: '🗂️', color: 'from-blue-500 to-indigo-500' },
  { name: 'Mailchimp', desc: 'Sync marketing designs directly into Mailchimp template gallery', category: 'Marketing', connected: false, icon: '🐵', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Pinterest', desc: 'Automate pins for new campaign graphics on selected boards', category: 'Marketing', connected: false, icon: '📌', color: 'from-red-500 to-red-700' },
];

const categories = ['All', 'Communication', 'Storage', 'Marketing', 'Design', 'E-commerce', 'Automation'];

export default function TeamIntegrations() {
  const [integrationsList, setIntegrationsList] = useState(integrations);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [syncingName, setSyncingName] = useState<string | null>(null);
  
  // Modals state
  const [showBrowseAll, setShowBrowseAll] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [connectingIntg, setConnectingIntg] = useState<typeof integrations[0] | null>(null);
  const [settingsIntg, setSettingsIntg] = useState<typeof integrations[0] | null>(null);

  // Form inputs
  const [tokenInput, setTokenInput] = useState('');
  const [webhookInput, setWebhookInput] = useState('');
  const [syncFreq, setSyncFreq] = useState('Real-time');

  const connectedCount = integrationsList.filter(i => i.connected).length;

  const filteredIntegrations = selectedCategory === 'All'
    ? integrationsList
    : integrationsList.filter(i => i.category === selectedCategory);

  const handleSync = (name: string) => {
    setSyncingName(name);
    setTimeout(() => {
      setSyncingName(null);
      toast('success', `${name} integration synchronized successfully!`);
    }, 1500);
  };

  const handleOpenConnect = (intg: typeof integrations[0]) => {
    setConnectingIntg(intg);
    setTokenInput('');
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      toast('warning', 'Please enter a connection key or authorization token');
      return;
    }
    setIntegrationsList(prev => prev.map(i => {
      if (i.name === connectingIntg?.name) {
        return { ...i, connected: true };
      }
      return i;
    }));
    toast('success', `Connected to ${connectingIntg?.name} successfully!`);
    setConnectingIntg(null);
  };

  const handleOpenSettings = (intg: typeof integrations[0]) => {
  setSettingsIntg(intg);

  setWebhookInput(
    intg.name === 'Slack'
      ? 'Enter Slack Webhook URL'
      : ''
  );

  setSyncFreq('Real-time');
};
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', `Saved settings for ${settingsIntg?.name}!`);
    setSettingsIntg(null);
  };

  const handleInstallExtra = (extra: typeof extraIntegrationsList[0]) => {
    // Add to integrations list
    setIntegrationsList(prev => {
      if (prev.some(i => i.name === extra.name)) return prev;
      return [...prev, { ...extra, connected: true }];
    });
    toast('success', `${extra.name} integration installed and connected!`);
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Integrations" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Integrations</h2>
            <p className="text-sm text-muted-foreground">{connectedCount} of {integrationsList.length} integrations connected</p>
          </div>
          <button onClick={() => setShowBrowseAll(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Browse All
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat 
                  ? 'gradient-primary text-white' 
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Connected Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Connected', value: connectedCount, color: 'text-green-500' },
            { label: 'Available', value: integrationsList.length - connectedCount, color: 'text-muted-foreground' },
            { label: 'API Requests Today', value: '14,231', color: 'text-primary' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className={`text-xl font-display font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredIntegrations.map(intg => (
            <div key={intg.name} className={`bg-card border rounded-2xl p-5 transition-all ${intg.connected ? 'border-primary/20 animate-in fade-in-50 duration-300' : 'border-border hover:border-primary/10'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${intg.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {intg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-display font-semibold text-foreground">{intg.name}</h3>
                    {intg.connected && (
                      <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium">
                        <Check className="w-2.5 h-2.5" /> Connected
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{intg.category}</span>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{intg.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {intg.connected ? (
                  <>
                    <button 
                      onClick={() => handleSync(intg.name)} 
                      disabled={syncingName === intg.name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${syncingName === intg.name ? 'animate-spin text-primary' : ''}`} /> 
                      {syncingName === intg.name ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <button 
                      onClick={() => handleOpenSettings(intg)} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:border-primary/30 transition-all"
                    >
                      <Settings className="w-3 h-3" /> Settings
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleOpenConnect(intg)} 
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all"
                  >
                    <Zap className="w-3 h-3" /> Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <Globe className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Need a custom integration?</p>
            <p className="text-xs text-muted-foreground">Use our REST API to build integrations with any tool.</p>
          </div>
          <button 
            onClick={() => setShowApiDocs(true)} 
            className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0"
          >
            View API Docs
          </button>
        </div>
      </div>

      {/* Browse All Integrations Modal */}
      {showBrowseAll && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowBrowseAll(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Integration Store
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Add third-party automation tools and asset repositories</p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {extraIntegrationsList.map(extra => {
                const installed = integrationsList.some(i => i.name === extra.name);
                return (
                  <div key={extra.name} className="flex items-center justify-between p-3.5 border border-border rounded-xl bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${extra.color} flex items-center justify-center text-xl flex-shrink-0`}>
                        {extra.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground">{extra.name}</span>
                          <span className="text-[10px] text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded-full">{extra.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{extra.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInstallExtra(extra)}
                      disabled={installed}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        installed 
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                          : 'gradient-primary text-white hover:opacity-90'
                      }`}
                    >
                      {installed ? 'Added' : 'Install'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowBrowseAll(false)}
                className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connect Integration Modal */}
      {connectingIntg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setConnectingIntg(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Connect {connectingIntg.name}
            </h3>
            <p className="text-xs text-muted-foreground">Authenticate your account to grant asset and check scopes</p>

            <form onSubmit={handleConnectSubmit} className="space-y-4 my-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-normal">
                  Granting authorization lets PixiVisual read and write media, trigger webhooks, and sync metadata with {connectingIntg.name}.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">API Token / Access Key</label>
                <input
                  type="password"
                  placeholder={`Paste your ${connectingIntg.name} integration key`}
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setConnectingIntg(null)}
                  className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-colors shadow-glow-purple"
                >
                  Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsIntg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSettingsIntg(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Configure {settingsIntg.name}
            </h3>
            <p className="text-xs text-muted-foreground">Adjust settings, frequencies, and sync actions</p>

            <form onSubmit={handleSettingsSubmit} className="space-y-4 my-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Sync Frequency</label>
                <select
                  value={syncFreq}
                  onChange={(e) => setSyncFreq(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-foreground"
                >
                  <option>Real-time (Webhook-driven)</option>
                  <option>Every hour</option>
                  <option>Daily at midnight</option>
                  <option>Manual sync only</option>
                </select>
              </div>

              {settingsIntg.name === 'Slack' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Slack Webhook URL</label>
                  <input
                    type="text"
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all font-mono text-xs"
                    placeholder="Enter Slack Webhook URL"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase block">Event Notifications</label>
                <div className="space-y-2">
                  {['Assets uploaded', 'Guidelines modified', 'Violations detected'].map((event) => (
                    <label key={event} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span>{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSettingsIntg(null)}
                  className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-colors flex items-center gap-1.5 shadow-glow-purple"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Developer API Docs Modal */}
      {showApiDocs && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowApiDocs(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              REST API Reference
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Leverage our secure JSON API to manage assets and sync workspaces externally</p>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Authentication</h4>
                <p className="text-xs text-muted-foreground">Authenticate using your bearer token in the HTTP Authorization header.</p>
                <pre className="bg-muted p-3 rounded-xl text-[11px] font-mono overflow-x-auto text-foreground border border-border">
                  Authorization: Bearer pixi_live_7c3aed9b4c48995a
                </pre>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">1. Upload Asset</h4>
                <p className="text-xs text-muted-foreground">Upload a file to a specific workspace. Content must be multipart form-data.</p>
                <pre className="bg-muted p-3 rounded-xl text-[11px] font-mono overflow-x-auto text-foreground border border-border">
{`curl -X POST https://api.pixivisual.com/v1/assets \\
  -H "Authorization: Bearer pixi_..." \\
  -F "file=@/path/to/logo.png" \\
  -F "workspace_id=global_hq" \\
  -F "category=Logo"`}
                </pre>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">2. Retrieve Active Violations</h4>
                <p className="text-xs text-muted-foreground">List all active brand guidelines check violations.</p>
                <pre className="bg-muted p-3 rounded-xl text-[11px] font-mono overflow-x-auto text-foreground border border-border">
{`fetch('https://api.pixivisual.com/v1/violations', {
  headers: { 'Authorization': 'Bearer pixi_...' }
})
.then(res => res.json())
.then(data => console.log(data));`}
                </pre>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowApiDocs(false)}
                className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
