import { useState } from 'react';
import { Plus, Globe, Users, Palette, Settings, Search, ArrowRight, Layers, Lock, Unlock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const workspaces = [
  { id: '1', name: 'Global HQ', description: 'Primary workspace for global brand strategy and core assets', members: 18, assets: 620, status: 'active', restricted: false, color: 'from-purple-500 to-pink-500', region: 'Global', lastActive: '5m ago' },
  { id: '2', name: 'EMEA Region', description: 'European, Middle East & Africa marketing and design workspace', members: 11, assets: 285, status: 'active', restricted: false, color: 'from-blue-500 to-purple-500', region: 'EMEA', lastActive: '1h ago' },
  { id: '3', name: 'APAC Region', description: 'Asia-Pacific campaign assets and regional brand adaptations', members: 9, assets: 193, status: 'active', restricted: false, color: 'from-green-500 to-blue-500', region: 'APAC', lastActive: '3h ago' },
  { id: '4', name: 'Product Launch', description: 'Restricted workspace for upcoming product launch materials', members: 6, assets: 74, status: 'restricted', restricted: true, color: 'from-orange-500 to-pink-500', region: 'Internal', lastActive: '2h ago' },
  { id: '5', name: 'Agency Partners', description: 'External agency collaboration workspace with limited access', members: 4, assets: 43, status: 'active', restricted: true, color: 'from-teal-500 to-green-500', region: 'External', lastActive: '1d ago' },
];

export default function TeamWorkspaces() {
  const [search, setSearch] = useState('');
  const filtered = workspaces.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Workspaces" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Workspaces</h2>
            <p className="text-sm text-muted-foreground">Manage your team workspaces and access levels</p>
          </div>
          <button onClick={() => toast('info', 'Opening workspace creator...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Workspace
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workspaces..." className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none" />
        </div>

        <div className="grid gap-4">
          {filtered.map(ws => (
            <div key={ws.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-card-hover transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ws.color} flex items-center justify-center flex-shrink-0`}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-display font-bold text-foreground">{ws.name}</h3>
                    {ws.restricted ? (
                      <span className="flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">
                        <Lock className="w-2.5 h-2.5" /> Restricted
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                        <Unlock className="w-2.5 h-2.5" /> Open
                      </span>
                    )}
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{ws.region}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{ws.description}</p>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ws.members} members</span>
                    <span className="flex items-center gap-1"><Palette className="w-3 h-3" />{ws.assets} assets</span>
                    <span className="flex items-center gap-1"><Layers className="w-3 h-3" />Active {ws.lastActive}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toast('info', `Opening ${ws.name}...`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all">
                    Open <ArrowRight className="w-3 h-3" />
                  </button>
                  <button onClick={() => toast('info', `Opening ${ws.name} settings...`)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
