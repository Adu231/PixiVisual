import { Globe, Check, Plus, Settings, Zap, RefreshCw } from 'lucide-react';
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

const categories = ['All', 'Communication', 'Storage', 'Marketing', 'Design', 'E-commerce', 'Automation'];

export default function TeamIntegrations() {
  const connected = integrations.filter(i => i.connected).length;

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Integrations" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Integrations</h2>
            <p className="text-sm text-muted-foreground">{connected} of {integrations.length} integrations connected</p>
          </div>
          <button onClick={() => toast('info', 'Opening integration browser...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Browse All
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => toast('info', `Filtering by ${cat}...`)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${cat === 'All' ? 'gradient-primary text-white' : 'border border-border bg-card text-muted-foreground hover:border-primary/30'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Connected Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Connected', value: connected, color: 'text-green-500' },
            { label: 'Available', value: integrations.length - connected, color: 'text-muted-foreground' },
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
          {integrations.map(intg => (
            <div key={intg.name} className={`bg-card border rounded-2xl p-5 transition-all ${intg.connected ? 'border-primary/20' : 'border-border hover:border-primary/10'}`}>
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
                    <button onClick={() => toast('info', `Syncing ${intg.name}...`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all">
                      <RefreshCw className="w-3 h-3" /> Sync Now
                    </button>
                    <button onClick={() => toast('info', `Opening ${intg.name} settings...`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:border-primary/30 transition-all">
                      <Settings className="w-3 h-3" /> Settings
                    </button>
                  </>
                ) : (
                  <button onClick={() => toast('success', `Connecting ${intg.name}...`)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all">
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
          <button onClick={() => toast('info', 'Opening API documentation...')} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0">
            View API Docs
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
