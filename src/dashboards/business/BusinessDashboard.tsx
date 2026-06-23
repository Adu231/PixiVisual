import { useState } from 'react';
import { Plus, TrendingUp, Users, DollarSign, Target, BarChart2, Palette, Layers, Share2, ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const [campaignsList, setCampaignsList] = useState([
    { name: 'Summer Sale 2025', status: 'active', budget: 5000, spent: 3200, impressions: 142000, clicks: 8400, conversions: 342 },
    { name: 'Product Launch Q3', status: 'draft', budget: 8000, spent: 0, impressions: 0, clicks: 0, conversions: 0 },
    { name: 'Brand Awareness', status: 'active', budget: 3000, spent: 1800, impressions: 89000, clicks: 4200, conversions: 187 },
    { name: 'Holiday Campaign', status: 'paused', budget: 12000, spent: 2100, impressions: 31000, clicks: 1900, conversions: 56 },
  ]);

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignBudget, setNewCampaignBudget] = useState('5000');
  const [newCampaignStatus, setNewCampaignStatus] = useState('draft');
  const [newCampaignChannel, setNewCampaignChannel] = useState('Social Media');
  const [newCampaignEndDate, setNewCampaignEndDate] = useState('Aug 31, 2025');

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
            <button onClick={() => toast('info', 'Opening campaigns page...')} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
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
                        <button onClick={() => toast('info', `Editing ${c.name}...`)} className="px-2.5 py-1 rounded-lg border border-border text-xs text-foreground hover:border-primary/30 hover:text-primary transition-all">Edit</button>
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
              <button onClick={() => toast('info', 'Opening brand kit...')} className="text-xs text-primary hover:underline">Edit</button>
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
                <button key={item} onClick={() => toast('info', `Creating ${item}...`)} className="py-2 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
