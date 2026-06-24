import { useState } from 'react';
import { Plus, Globe, Users, Palette, Settings, Search, ArrowRight, Layers, Lock, Unlock, X } from 'lucide-react';
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
  const [workspacesList, setWorkspacesList] = useState(workspaces);
  const [search, setSearch] = useState('');
  
  // Modals state
  const [showAdd, setShowAdd] = useState(false);
  const [selectedWs, setSelectedWs] = useState<any | null>(null);
  const [editingWs, setEditingWs] = useState<any | null>(null);

  // New Workspace form states
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRegion, setNewRegion] = useState('Global');
  const [newRestricted, setNewRestricted] = useState(false);

  // Edit Workspace form states
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editRestricted, setEditRestricted] = useState(false);

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast('warning', 'Please enter workspace name');
      return;
    }
    const colorOptions = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-purple-500',
      'from-green-500 to-blue-500',
      'from-orange-500 to-pink-500',
      'from-teal-500 to-green-500',
    ];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const newWs = {
      id: (workspacesList.length + 1).toString(),
      name: newName.trim(),
      description: newDesc.trim() || 'No description provided.',
      members: 1,
      assets: 0,
      status: newRestricted ? 'restricted' : 'active',
      restricted: newRestricted,
      color: randomColor,
      region: newRegion,
      lastActive: 'Just now'
    };
    setWorkspacesList(prev => [...prev, newWs]);
    setShowAdd(false);
    setNewName('');
    setNewDesc('');
    setNewRegion('Global');
    setNewRestricted(false);
    toast('success', `Workspace "${newWs.name}" created successfully!`);
  };

  const handleStartEdit = (ws: any) => {
    setEditingWs(ws);
    setEditName(ws.name);
    setEditDesc(ws.description);
    setEditRegion(ws.region);
    setEditRestricted(ws.restricted);
  };

  const handleUpdateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast('warning', 'Please enter workspace name');
      return;
    }
    setWorkspacesList(prev => prev.map(w => w.id === editingWs.id ? {
      ...w,
      name: editName.trim(),
      description: editDesc.trim(),
      region: editRegion,
      restricted: editRestricted,
      status: editRestricted ? 'restricted' : 'active'
    } : w));
    setEditingWs(null);
    toast('success', `Workspace "${editName}" updated successfully!`);
  };

  const filtered = workspacesList.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Workspaces" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Workspaces</h2>
            <p className="text-sm text-muted-foreground">Manage your team workspaces and access levels</p>
          </div>
          <button onClick={() => setShowAdd(true)}
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
                  <button onClick={() => setSelectedWs(ws)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all">
                    Open <ArrowRight className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleStartEdit(ws)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Workspace Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAdd(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Create New Workspace</h3>
              <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateWorkspace} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Workspace Name</label>
                <input 
                  type="text"
                  required
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  placeholder="e.g. LATAM Region" 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
                <textarea 
                  value={newDesc} 
                  onChange={e => setNewDesc(e.target.value)} 
                  placeholder="Describe the purpose of this workspace..." 
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Region/Scope</label>
                  <select
                    value={newRegion}
                    onChange={e => setNewRegion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="Global">Global</option>
                    <option value="EMEA">EMEA</option>
                    <option value="APAC">APAC</option>
                    <option value="LATAM">LATAM</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={newRestricted} 
                      onChange={e => setNewRestricted(e.target.checked)} 
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">Restricted Access</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Open Workspace Details Modal */}
      {selectedWs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedWs(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Workspace Hub</h3>
              <button onClick={() => setSelectedWs(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedWs.color} flex items-center justify-center`}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">{selectedWs.name}</h4>
                  <span className="text-xs text-muted-foreground">Region: {selectedWs.region}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-xl border border-border/50">{selectedWs.description}</p>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 border border-border rounded-xl bg-muted/20">
                  <p className="text-sm font-bold text-foreground">{selectedWs.members}</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-0.5">Members</p>
                </div>
                <div className="p-2.5 border border-border rounded-xl bg-muted/20">
                  <p className="text-sm font-bold text-foreground">{selectedWs.assets}</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-0.5">Assets</p>
                </div>
                <div className="p-2.5 border border-border rounded-xl bg-muted/20">
                  <p className="text-xs font-bold text-foreground leading-5">{selectedWs.restricted ? 'Restricted' : 'Open'}</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-0.5">Access</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-6">
              <button onClick={() => setSelectedWs(null)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Workspace Settings Modal */}
      {editingWs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setEditingWs(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Workspace Settings</h3>
              <button onClick={() => setEditingWs(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateWorkspace} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Workspace Name</label>
                <input 
                  type="text"
                  required
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
                <textarea 
                  value={editDesc} 
                  onChange={e => setEditDesc(e.target.value)} 
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Region/Scope</label>
                  <select
                    value={editRegion}
                    onChange={e => setEditRegion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="Global">Global</option>
                    <option value="EMEA">EMEA</option>
                    <option value="APAC">APAC</option>
                    <option value="LATAM">LATAM</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={editRestricted} 
                      onChange={e => setEditRestricted(e.target.checked)} 
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">Restricted Access</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setEditingWs(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
