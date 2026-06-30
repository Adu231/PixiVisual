import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp, Users, DollarSign, Target, BarChart2, Palette, Layers, Share2, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

const sidebarItems = [
  { label: 'Brand Kit', href: '/dashboard/business/brand', icon: Palette },
  { label: 'Marketing Assets', href: '/dashboard/business/marketing', icon: Share2 },
  { label: 'Campaigns', href: '/dashboard/business/campaigns', icon: Target },
  { label: 'Analytics', href: '/dashboard/business/analytics', icon: BarChart2 },
  { label: 'Billing', href: '/dashboard/business/billing', icon: Layers },
];

export default function BusinessDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [campaignsList, setCampaignsList] = useState([
    { name: 'Summer Sale 2025', status: 'active', budget: 5000, spent: 3200, impressions: 142000, clicks: 8400, conversions: 342 },
    { name: 'Product Launch Q3', status: 'draft', budget: 8000, spent: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Brand Awareness', status: 'active', budget: 3000, spent: 1800, impressions: 89000, clicks: 4200, conversions: 187 },
    { name: 'Holiday Campaign', status: 'paused', budget: 12000, spent: 2100, impressions: 31000, clicks: 1900, conversions: 56 },
  ]);

  const [editingCampaign, setEditingCampaign] = useState<typeof campaignsList[0] | null>(null);
  const [editName, setEditName] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editStatus, setEditStatus] = useState('draft');

  const startEditingCampaign = (c: typeof campaignsList[0]) => {
    setEditingCampaign(c);
    setEditName(c.name);
    setEditBudget(c.budget.toString());
    setEditStatus(c.status);
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast('warning', 'Campaign name cannot be empty');
      return;
    }
    const budgetVal = parseFloat(editBudget) || 0;
    setCampaignsList(prev => prev.map(item => 
      item.name === editingCampaign?.name ? {
        ...item,
        name: editName.trim(),
        budget: budgetVal,
        status: editStatus
      } : item
    ));
    setEditingCampaign(null);
    toast('success', `Campaign "${editName}" updated successfully!`);
  };

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignBudget, setNewCampaignBudget] = useState('5000');
  const [newCampaignStatus, setNewCampaignStatus] = useState('draft');
  const [newCampaignChannel, setNewCampaignChannel] = useState('Social Media');
  const [newCampaignEndDate, setNewCampaignEndDate] = useState('Aug 31, 2025');

  const [quickCreateType, setQuickCreateType] = useState<string | null>(null);
  const [quickPrompt, setQuickPrompt] = useState('');
  const [quickText, setQuickText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<{ title: string; image: string; type: string } | null>(null);

  const startQuickCreate = (item: string) => {
    setQuickCreateType(item);
    setQuickPrompt('');
    setQuickText('');
    setGeneratedAsset(null);
    setIsGenerating(false);
  };

  const handleGenerateQuickAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) {
      toast('warning', 'Please enter a prompt describing the asset');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const defaultImages: Record<string, string> = {
        'Ad Creative': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'Social Post': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
        'Email Header': 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop',
        'Product Mock': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      };
      setGeneratedAsset({
        title: quickPrompt.trim(),
        image: defaultImages[quickCreateType || 'Social Post'] || defaultImages['Social Post'],
        type: quickCreateType || 'Social Post'
      });
      setIsGenerating(false);
      toast('success', 'Asset generated successfully!');
    }, 1200);
  };

  const handleDownloadQuickAsset = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast('success', `Downloaded: ${filename}`);
    } catch (err) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCreateCampaign = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCampaignName.trim()) { toast('warning', 'Enter a campaign name'); return; }
    
    const budgetVal = parseFloat(newCampaignBudget) || 0;
    const newCampaignItem = {
      name: `${newCampaignName.trim()} (${newCampaignChannel})`,
      status: newCampaignStatus,
      budget: budgetVal,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0
    };

    setCampaignsList(prev => [newCampaignItem, ...prev]);
    toast('success', `Campaign "${newCampaignName}" created successfully!`);
    setNewCampaignName('');
    setNewCampaignBudget('5000');
    setNewCampaignStatus('draft');
    setNewCampaignChannel('Social Media');
    setNewCampaignEndDate('Aug 31, 2025');
    setShowNewCampaign(false);
  };

  const stats = [
    { label: 'Active Campaigns', value: '3', delta: '+1', trend: 'up', icon: Target, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Impressions', value: '231K', delta: '+18%', trend: 'up', icon: TrendingUp, color: 'from-blue-500 to-purple-500' },
    { label: 'Campaign Spend', value: formatCurrency(7100), delta: '+12%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Conversions', value: '585', delta: '+8%', trend: 'up', icon: Users, color: 'from-orange-500 to-pink-500' },
  ];

  const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-400',
    draft: 'bg-muted text-muted-foreground',
    paused: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    completed: 'bg-blue-500/10 text-blue-600',
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Business Dashboard" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Business Overview</h2>
            <p className="text-sm text-muted-foreground">{user?.company || 'Your Company'} · {user?.plan} plan</p>
          </div>
          <button onClick={() => setShowNewCampaign(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>

        {/* New Campaign Modal */}
        {showNewCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={() => setShowNewCampaign(false)} />
            <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <h3 className="text-base font-display font-bold text-foreground">Create Campaign</h3>
                <button onClick={() => setShowNewCampaign(false)} className="text-muted-foreground hover:text-foreground text-sm font-bold">×</button>
              </div>
              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                  <input 
                    type="text"
                    required
                    value={newCampaignName} 
                    onChange={e => setNewCampaignName(e.target.value)} 
                    placeholder="e.g. Summer Clearance Sale" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Target Channel</label>
                    <select
                      value={newCampaignChannel}
                      onChange={e => setNewCampaignChannel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="Social Media">Social Media</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Email Newsletter">Email Newsletter</option>
                      <option value="Video Display">Video Display</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                    <input 
                      type="number"
                      required
                      value={newCampaignBudget} 
                      onChange={e => setNewCampaignBudget(e.target.value)} 
                      placeholder="5000" 
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                    <select
                      value={newCampaignStatus}
                      onChange={e => setNewCampaignStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Target End Date</label>
                    <input 
                      type="text"
                      required
                      value={newCampaignEndDate} 
                      onChange={e => setNewCampaignEndDate(e.target.value)} 
                      placeholder="Aug 31, 2025" 
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-border">
                  <button type="button" onClick={() => setShowNewCampaign(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-500">
                <ArrowUpRight className="w-3 h-3" />{stat.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Campaigns Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Active Campaigns</h3>
            <button onClick={() => navigate('/dashboard/business/campaigns')} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left px-4 py-3 font-medium">Campaign</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Budget</th>
                  <th className="text-right px-4 py-3 font-medium">Impressions</th>
                  <th className="text-right px-4 py-3 font-medium">Clicks</th>
                  <th className="text-right px-4 py-3 font-medium">Conv.</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaignsList.map(c => (
                  <tr key={c.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(c.spent)} spent</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{formatCurrency(c.budget)}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{c.impressions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{c.clicks.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{c.conversions}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEditingCampaign(c)} className="px-2.5 py-1 rounded-lg border border-border text-xs text-foreground hover:border-primary/30 hover:text-primary transition-all">Edit</button>
                        <button 
                          onClick={() => {
                            setCampaignsList(prev => prev.filter(item => item.name !== c.name));
                            toast('success', `Deleted campaign: ${c.name}`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-semibold transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand Kit Quick Access */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">Brand Kit</h4>
              <button onClick={() => navigate('/dashboard/business/brand')} className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="flex gap-2 mb-3">
              {['#7C3AED', '#EC4899', '#2563EB', '#10B981', '#F59E0B'].map(color => (
                <div key={color} className="w-8 h-8 rounded-lg border border-border cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">5 brand colors · 2 fonts · 3 logos</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">Quick Create</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Ad Creative', 'Social Post', 'Email Header', 'Product Mock'].map(item => (
                <button key={item} onClick={() => startQuickCreate(item)} className="py-2 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Edit Campaign: {editingCampaign.name}</h3>
              <button 
                onClick={() => { setEditingCampaign(null); }}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateCampaign}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                  <input 
                    type="text" 
                    required
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="Campaign Name"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                  <input 
                    type="number" 
                    required
                    value={editBudget}
                    onChange={e => setEditBudget(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <select 
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-border flex justify-end gap-3 bg-secondary/20">
                <button 
                  type="button"
                  onClick={() => { setEditingCampaign(null); }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-foreground hover:bg-accent transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl gradient-primary text-white hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Quick Create AI Generator Modal */}
      {quickCreateType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">AI Quick Creator: {quickCreateType}</h3>
              <button 
                onClick={() => setQuickCreateType(null)}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {!generatedAsset && !isGenerating && (
                <form onSubmit={handleGenerateQuickAsset} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Generation Prompt</label>
                    <textarea 
                      required
                      rows={3}
                      value={quickPrompt}
                      onChange={e => setQuickPrompt(e.target.value)}
                      placeholder={`Describe the visual style or content for this ${quickCreateType.toLowerCase()}...`}
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all resize-none animate-in fade-in duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Text Overlay (Optional)</label>
                    <input 
                      type="text"
                      value={quickText}
                      onChange={e => setQuickText(e.target.value)}
                      placeholder="e.g. 50% Off All Summer Gear!"
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                  >
                    Generate AI Asset
                  </button>
                </form>
              )}

              {isGenerating && (
                <div className="py-10 flex flex-col items-center justify-center space-y-3 text-center animate-in fade-in duration-200">
                  <div className="w-10 h-10 border-4 border-t-primary border-r-primary border-b-border border-l-border rounded-full animate-spin" />
                  <p className="text-sm font-medium text-foreground">AI Generator is running...</p>
                  <p className="text-xs text-muted-foreground">Crafting templates and rendering textures</p>
                </div>
              )}

              {generatedAsset && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-black/20 group/preview flex items-center justify-center">
                    <img 
                      src={generatedAsset.image} 
                      alt="AI Generated" 
                      className="absolute inset-0 w-full h-full object-cover opacity-80" 
                    />
                    {quickText && (
                      <div className="relative z-10 px-4 py-2 bg-black/60 backdrop-blur-xs text-white text-center rounded-lg border border-white/20 max-w-[80%] shadow-lg">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-0.5">
                          {generatedAsset.type}
                        </p>
                        <p className="text-sm font-bold font-display leading-tight">{quickText}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Prompt:</strong> "{generatedAsset.title}"
                  </p>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleDownloadQuickAsset(generatedAsset.image, `${generatedAsset.type.toLowerCase().replace(/\s+/g, '_')}_asset.png`)}
                      className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                    >
                      Download PNG
                    </button>
                    <button 
                      onClick={() => setQuickCreateType(null)}
                      className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all"
                    >
                      Save & Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
