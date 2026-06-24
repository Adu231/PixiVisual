import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Target, BarChart2, Briefcase, DollarSign, Clock, CheckCircle, AlertCircle, ArrowRight, TrendingUp, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

const sidebarItems = [
  { label: 'Clients', href: '/dashboard/agency/clients', icon: Users },
  { label: 'Campaigns', href: '/dashboard/agency/campaigns', icon: Target },
  { label: 'Projects', href: '/dashboard/agency/projects', icon: Briefcase },
  { label: 'Team', href: '/dashboard/agency/team', icon: Users },
  { label: 'Analytics', href: '/dashboard/agency/analytics', icon: BarChart2 },
  { label: 'Revenue', href: '/dashboard/agency/revenue', icon: DollarSign },
];

const projects = [
  { name: 'Q3 Campaign Assets', client: 'TechFlow Inc.', deadline: 'Jul 15', status: 'in-progress', completion: 75 },
  { name: 'Brand Refresh 2025', client: 'StyleHouse', deadline: 'Jul 28', status: 'review', completion: 90 },
  { name: 'Social Media Kit', client: 'GreenLeaf Foods', deadline: 'Aug 5', status: 'in-progress', completion: 45 },
  { name: 'Product Catalog Design', client: 'BuildRight Co.', deadline: 'Aug 12', status: 'planning', completion: 20 },
];

export default function AgencyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientsList, setClientsList] = useState([
    { name: 'TechFlow Inc.', industry: 'SaaS', projects: 3, status: 'active', value: 12000, avatar: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=40&h=40&fit=crop' },
    { name: 'StyleHouse', industry: 'E-commerce', projects: 2, status: 'active', value: 8500, avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop' },
    { name: 'GreenLeaf Foods', industry: 'Food & Bev', projects: 1, status: 'review', value: 4200, avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop' },
    { name: 'BuildRight Co.', industry: 'Construction', projects: 4, status: 'active', value: 15000, avatar: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=40&h=40&fit=crop' },
  ]);

  const [showNewClient, setShowNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientValue, setNewClientValue] = useState('');
  const [newClientStatus, setNewClientStatus] = useState('active');

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      toast('warning', 'Please enter client name');
      return;
    }

    const valueVal = parseFloat(newClientValue) || 0;
    const defaultAvatars: Record<string, string> = {
      SaaS: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=40&h=40&fit=crop',
      SaaS_alt: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop',
      E_commerce: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop',
      Food_Bev: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop',
      Construction: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=40&h=40&fit=crop',
    };

    const newClient = {
      name: newClientName.trim(),
      industry: newClientIndustry.trim() || 'General Business',
      projects: 0,
      status: newClientStatus,
      value: valueVal,
      avatar: defaultAvatars[newClientIndustry.trim()] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop',
    };

    setClientsList(prev => [...prev, newClient]);
    setShowNewClient(false);
    setNewClientName('');
    setNewClientIndustry('');
    setNewClientValue('');
    setNewClientStatus('active');
    toast('success', `Client "${newClient.name}" added successfully!`);
  };

  const stats = [
    { label: 'Active Clients', value: '12', delta: '+2 this month', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Active Projects', value: '18', delta: '4 due this week', icon: Briefcase, color: 'from-blue-500 to-purple-500' },
    { label: 'Monthly Revenue', value: formatCurrency(39700), delta: '+22%', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Campaigns Delivered', value: '47', delta: '+5 this month', icon: Target, color: 'from-orange-500 to-pink-500' },
  ];

  const statusStyles: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-400',
    review: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    planning: 'bg-muted text-muted-foreground',
    completed: 'bg-green-500/10 text-green-600',
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Agency Command Center" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">{user?.company || 'Agency'} Overview</h2>
            <p className="text-sm text-muted-foreground">Managing 12 clients · 18 active projects</p>
          </div>
          <button onClick={() => setShowNewClient(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>

        {showNewClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={() => setShowNewClient(false)} />
            <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 animate-scale-in">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <h3 className="text-base font-display font-bold text-foreground">Add New Client</h3>
                <button onClick={() => setShowNewClient(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Company Name</label>
                  <input 
                    type="text"
                    required
                    value={newClientName} 
                    onChange={e => setNewClientName(e.target.value)} 
                    placeholder="e.g. TechFlow Inc." 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Industry</label>
                  <input 
                    type="text"
                    required
                    value={newClientIndustry} 
                    onChange={e => setNewClientIndustry(e.target.value)} 
                    placeholder="e.g. SaaS, E-commerce, Food & Bev" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Monthly Contract ($)</label>
                    <input 
                      type="number"
                      required
                      value={newClientValue} 
                      onChange={e => setNewClientValue(e.target.value)} 
                      placeholder="e.g. 5000" 
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                    <select
                      value={newClientStatus}
                      onChange={e => setNewClientStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                    >
                      <option value="active">Active</option>
                      <option value="review">In Review</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-border">
                  <button type="button" onClick={() => setShowNewClient(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Add Client</button>
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
              <div className="text-xs text-green-500 font-medium mt-1">{stat.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Clients */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Client Accounts</h3>
              <button onClick={() => navigate('/dashboard/agency/clients')} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></button>
            </div>
            <div className="divide-y divide-border">
              {clientsList.map(c => (
                <div key={c.name} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => toast('info', `Opening ${c.name}...`)}>
                  <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.industry} · {c.projects} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{formatCurrency(c.value)}</p>
                    <span className={`text-xs font-medium capitalize px-2 py-0.5 rounded-full ${statusStyles[c.status]}`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Active Projects</h3>
              <button onClick={() => navigate('/dashboard/agency/projects')} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">View all <ArrowRight className="w-3 h-3" /></button>
            </div>
            <div className="divide-y divide-border">
              {projects.map(p => (
                <div key={p.name} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => toast('info', `Opening ${p.name}...`)}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.client}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[p.status]}`}>{p.status.replace('-', ' ')}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />{p.deadline}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${p.completion}%` }} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{p.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
