// Agency sub-pages
import { useState } from 'react';
import { Users, BarChart2, Briefcase, MessageSquare, Settings, Plus, TrendingUp, DollarSign, Clock, Check, X, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const agencySidebarItems = [
  { label: 'Clients', href: '/dashboard/agency/clients', icon: Users },
  { label: 'Campaigns', href: '/dashboard/agency/campaigns', icon: TrendingUp },
  { label: 'Projects', href: '/dashboard/agency/projects', icon: Briefcase },
  { label: 'Team', href: '/dashboard/agency/team', icon: Users },
  { label: 'Analytics', href: '/dashboard/agency/analytics', icon: BarChart2 },
  { label: 'Revenue', href: '/dashboard/agency/revenue', icon: DollarSign },
];

const clients = [
  { id: '1', name: 'TechFlow Inc.', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=48&h=48&fit=crop', industry: 'Technology', status: 'active', projects: 4, revenue: 12400, contact: 'Sarah Chen' },
  { id: '2', name: 'StyleHouse', logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=48&h=48&fit=crop', industry: 'E-commerce', status: 'active', projects: 7, revenue: 18900, contact: 'James Rodriguez' },
  { id: '3', name: 'GrowthLabs', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=48&h=48&fit=crop', industry: 'SaaS', status: 'active', projects: 2, revenue: 6800, contact: 'Priya Sharma' },
  { id: '4', name: 'LaunchPad Brands', logo: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=48&h=48&fit=crop', industry: 'Startup', status: 'inactive', projects: 1, revenue: 3200, contact: 'Jordan Lee' },
];

const campaigns = [
  { id: '1', name: 'Summer Sale 2025', client: 'TechFlow Inc.', status: 'active', budget: 5000, spent: 3200, endDate: 'Jul 31', impressions: 284000 },
  { id: '2', name: 'Product Launch', client: 'StyleHouse', status: 'active', budget: 8000, spent: 5400, endDate: 'Aug 15', impressions: 512000 },
  { id: '3', name: 'Brand Awareness Q3', client: 'GrowthLabs', status: 'paused', budget: 3500, spent: 1800, endDate: 'Sep 30', impressions: 98000 },
  { id: '4', name: 'Holiday Campaign', client: 'LaunchPad Brands', status: 'draft', budget: 2000, spent: 0, endDate: 'Dec 25', impressions: 0 },
];

const projects = [
  { id: '1', name: 'Rebrand Identity', client: 'TechFlow Inc.', status: 'in-progress', dueDate: 'Jul 15', progress: 70, designer: 'Maya Chen' },
  { id: '2', name: 'Social Media Kit', client: 'StyleHouse', status: 'review', dueDate: 'Jul 8', progress: 95, designer: 'Alex Rivera' },
  { id: '3', name: 'Landing Page Design', client: 'GrowthLabs', status: 'in-progress', dueDate: 'Jul 22', progress: 45, designer: 'Sam Torres' },
  { id: '4', name: 'Email Templates', client: 'TechFlow Inc.', status: 'completed', dueDate: 'Jun 30', progress: 100, designer: 'Maya Chen' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400',
  inactive: 'bg-gray-500/10 text-gray-500',
  paused: 'bg-yellow-500/10 text-yellow-600',
  draft: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  review: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400',
};

export function AgencyClients() {
  const [clientsList, setClientsList] = useState(clients);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientRevenue, setNewClientRevenue] = useState('');
  const [newClientStatus, setNewClientStatus] = useState('active');
  const [newClientContact, setNewClientContact] = useState('');

  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [messagingClient, setMessagingClient] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) {
      toast('warning', 'Please enter client name');
      return;
    }

    const revenueVal = parseFloat(newClientRevenue) || 0;
    const newClient = {
      id: (clientsList.length + 1).toString(),
      name: newClientName.trim(),
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=48&h=48&fit=crop',
      industry: newClientIndustry.trim() || 'General Business',
      status: newClientStatus,
      projects: 0,
      revenue: revenueVal,
      contact: newClientContact.trim() || 'No Contact Person',
    };

    setClientsList(prev => [...prev, newClient]);
    setShowAddClient(false);
    setNewClientName('');
    setNewClientIndustry('');
    setNewClientRevenue('');
    setNewClientStatus('active');
    setNewClientContact('');
    toast('success', `Client "${newClient.name}" added successfully!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast('warning', 'Please enter a message');
      return;
    }
    toast('success', `Message sent successfully to ${messagingClient.contact}!`);
    setMessagingClient(null);
    setMessageText('');
  };

  // Get associated projects for selected client
  const clientProjects = selectedClient
    ? projects.filter(p => p.client.toLowerCase() === selectedClient.name.toLowerCase())
    : [];

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Clients" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Client Management</h2>
            <p className="text-sm text-muted-foreground">{clientsList.filter(c => c.status === 'active').length} active clients</p>
          </div>
          <button onClick={() => setShowAddClient(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>

        <div className="grid gap-4">
          {clientsList.map(client => (
            <div key={client.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-4">
                <img src={client.logo} alt={client.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-semibold text-foreground">{client.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[client.status] || 'bg-muted text-muted-foreground'}`}>{client.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{client.industry} · Contact: {client.contact}</p>
                  <div className="flex gap-6 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{client.projects} projects</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium"><DollarSign className="w-3 h-3" />{formatCurrency(client.revenue)} revenue</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedClient(client)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all">View</button>
                  <button onClick={() => { setMessagingClient(client); setMessageText(''); }} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAddClient(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Add New Client</h3>
              <button onClick={() => setShowAddClient(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
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
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Contact Person</label>
                <input
                  type="text"
                  required
                  value={newClientContact}
                  onChange={e => setNewClientContact(e.target.value)}
                  placeholder="e.g. Sarah Chen"
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
                    value={newClientRevenue}
                    onChange={e => setNewClientRevenue(e.target.value)}
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
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAddClient(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Add Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedClient(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Client Details</h3>
              <button onClick={() => setSelectedClient(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={selectedClient.logo} alt={selectedClient.name} className="w-16 h-16 rounded-2xl object-cover border border-border" />
                <div>
                  <h4 className="text-lg font-bold text-foreground">{selectedClient.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedClient.industry}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium capitalize mt-1.5 ${statusColors[selectedClient.status] || 'bg-muted text-muted-foreground'}`}>{selectedClient.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
                <div>
                  <p className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Primary Contact</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedClient.contact}</p>
                </div>
                <div>
                  <p className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Value</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-0.5">{formatCurrency(selectedClient.revenue)}</p>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider">Associated Projects ({clientProjects.length})</h5>
                {clientProjects.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {clientProjects.map(proj => (
                      <div key={proj.id} className="p-3 bg-background border border-border rounded-xl flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{proj.name}</p>
                          <p className="text-3xs text-muted-foreground mt-0.5">Due: {proj.dueDate} · Designer: {proj.designer}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-3xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[proj.status] || 'bg-muted'}`}>
                            {proj.status.replace('-', ' ')}
                          </span>
                          <span className="text-2xs font-bold text-foreground">{proj.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-muted-foreground">No projects found for this client</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-6">
              <button onClick={() => setSelectedClient(null)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Message Client Modal */}
      {messagingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setMessagingClient(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Send Message</h3>
              <button onClick={() => setMessagingClient(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">To</label>
                <div className="px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground">
                  {messagingClient.contact} ({messagingClient.name})
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder={`Write your message to ${messagingClient.contact}...`}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setMessagingClient(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function AgencyCampaigns() {
  const [campaignsList, setCampaignsList] = useState(campaigns);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any | null>(null);

  // New campaign form states
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newSpent, setNewSpent] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newStatus, setNewStatus] = useState('active');

  // Edit campaign form states
  const [editName, setEditName] = useState('');
  const [editClient, setEditClient] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editSpent, setEditSpent] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editStatus, setEditStatus] = useState('active');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast('warning', 'Please enter campaign name');
      return;
    }
    const newCamp = {
      id: (campaignsList.length + 1).toString(),
      name: newName.trim(),
      client: newClient.trim() || 'General Client',
      budget: parseFloat(newBudget) || 0,
      spent: parseFloat(newSpent) || 0,
      endDate: newEndDate || 'N/A',
      status: newStatus,
      impressions: 0
    };
    setCampaignsList(prev => [...prev, newCamp]);
    setShowAddCampaign(false);
    setNewName('');
    setNewClient('');
    setNewBudget('');
    setNewSpent('');
    setNewEndDate('');
    setNewStatus('active');
    toast('success', `Campaign "${newCamp.name}" created!`);
  };

  const handleStartEdit = (camp: any) => {
    setEditingCampaign(camp);
    setEditName(camp.name);
    setEditClient(camp.client);
    setEditBudget(camp.budget.toString());
    setEditSpent(camp.spent.toString());
    setEditEndDate(camp.endDate);
    setEditStatus(camp.status);
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast('warning', 'Please enter campaign name');
      return;
    }
    setCampaignsList(prev => prev.map(c => c.id === editingCampaign.id ? {
      ...c,
      name: editName.trim(),
      client: editClient.trim(),
      budget: parseFloat(editBudget) || 0,
      spent: parseFloat(editSpent) || 0,
      endDate: editEndDate,
      status: editStatus
    } : c));
    setEditingCampaign(null);
    toast('success', `Campaign "${editName}" updated successfully!`);
  };

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Campaigns" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Campaign Management</h2>
            <p className="text-sm text-muted-foreground">{campaignsList.filter(c => c.status === 'active').length} active campaigns</p>
          </div>
          <button onClick={() => setShowAddCampaign(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
        <div className="grid gap-4">
          {campaignsList.map(c => (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[c.status] || 'bg-muted text-muted-foreground'}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.client} · Ends {c.endDate}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleStartEdit(c)} className="text-xs text-primary hover:underline font-medium">Edit</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(c.budget)}</p>
                  <p className="text-2xs text-muted-foreground">Budget</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(c.spent)}</p>
                  <p className="text-2xs text-muted-foreground">Spent</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-sm font-bold text-foreground">{c.impressions > 0 ? `${(c.impressions / 1000).toFixed(0)}K` : '—'}</p>
                  <p className="text-2xs text-muted-foreground">Impressions</p>
                </div>
              </div>
              {c.budget > 0 && (
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Budget used</span>
                    <span>{Math.round((c.spent / c.budget) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${Math.min((c.spent / c.budget) * 100, 100)}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Campaign Modal */}
      {showAddCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAddCampaign(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Create New Campaign</h3>
              <button onClick={() => setShowAddCampaign(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Summer Sale 2025"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Client Name</label>
                <input
                  type="text"
                  required
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  placeholder="e.g. TechFlow Inc."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={newBudget}
                    onChange={e => setNewBudget(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Spent ($)</label>
                  <input
                    type="number"
                    required
                    value={newSpent}
                    onChange={e => setNewSpent(e.target.value)}
                    placeholder="e.g. 1000"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End Date</label>
                  <input
                    type="text"
                    required
                    value={newEndDate}
                    onChange={e => setNewEndDate(e.target.value)}
                    placeholder="e.g. Jul 31"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAddCampaign(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setEditingCampaign(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Edit Campaign</h3>
              <button onClick={() => setEditingCampaign(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Client Name</label>
                <input
                  type="text"
                  required
                  value={editClient}
                  onChange={e => setEditClient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={editBudget}
                    onChange={e => setEditBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Spent ($)</label>
                  <input
                    type="number"
                    required
                    value={editSpent}
                    onChange={e => setEditSpent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End Date</label>
                  <input
                    type="text"
                    required
                    value={editEndDate}
                    onChange={e => setEditEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setEditingCampaign(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function AgencyProjects() {
  const [projectsList, setProjectsList] = useState(projects);
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // New project state fields
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDesigner, setNewDesigner] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newProgress, setNewProgress] = useState('0');
  const [newStatus, setNewStatus] = useState('in-progress');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast('warning', 'Please enter project name');
      return;
    }
    const newProj = {
      id: (projectsList.length + 1).toString(),
      name: newName.trim(),
      client: newClient.trim() || 'TechFlow Inc.',
      designer: newDesigner.trim() || 'Maya Chen',
      dueDate: newDueDate || 'Jul 15',
      progress: parseInt(newProgress) || 0,
      status: newStatus,
    };
    setProjectsList(prev => [...prev, newProj]);
    setShowAddProject(false);
    setNewName('');
    setNewClient('');
    setNewDesigner('');
    setNewDueDate('');
    setNewProgress('0');
    setNewStatus('in-progress');
    toast('success', `Project "${newProj.name}" created!`);
  };

  const handleApproveProject = (projId: string) => {
    setProjectsList(prev => prev.map(p => p.id === projId ? { ...p, status: 'completed', progress: 100 } : p));
    toast('success', 'Project approved and completed!');
  };

  const handleRejectProject = (projId: string) => {
    setProjectsList(prev => prev.map(p => p.id === projId ? { ...p, status: 'in-progress', progress: 80 } : p));
    toast('info', 'Revision requested: status reset to in-progress');
  };

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Projects" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Projects</h2>
            <p className="text-sm text-muted-foreground">{projectsList.filter(p => p.status !== 'completed').length} active projects</p>
          </div>
          <button onClick={() => setShowAddProject(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
        <div className="grid gap-4">
          {projectsList.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[p.status] || 'bg-muted text-muted-foreground'}`}>{p.status.replace('-', ' ')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.client} · Designer: {p.designer} · Due: {p.dueDate}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedProject(p)} className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
                    Open <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.progress === 100 ? 'bg-green-500' : 'gradient-primary'}`} style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-foreground w-8 text-right">{p.progress}%</span>
                {p.status === 'review' && (
                  <div className="flex gap-1.5 ml-2">
                    <button onClick={() => handleApproveProject(p.id)} className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors" title="Approve Project">
                      <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                    </button>
                    <button onClick={() => handleRejectProject(p.id)} className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors" title="Request Revision">
                      <X className="w-3 h-3 text-red-500" strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAddProject(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Add New Project</h3>
              <button onClick={() => setShowAddProject(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Rebrand Identity"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Client Name</label>
                <input
                  type="text"
                  required
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  placeholder="e.g. TechFlow Inc."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Assigned Designer</label>
                <input
                  type="text"
                  required
                  value={newDesigner}
                  onChange={e => setNewDesigner(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Due Date</label>
                  <input
                    type="text"
                    required
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    placeholder="e.g. Jul 15"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Progress (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={e => setNewProgress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="in-progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAddProject(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Add Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Open Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Project Details</h3>
              <button onClick={() => setSelectedProject(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider">Project Name</p>
                <p className="text-base font-bold text-foreground mt-0.5">{selectedProject.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider">Client Name</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{selectedProject.client}</p>
                </div>
                <div>
                  <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider">Assigned Designer</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{selectedProject.designer}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{selectedProject.dueDate}</p>
                </div>
                <div>
                  <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium capitalize mt-1 ${statusColors[selectedProject.status] || 'bg-muted text-muted-foreground'}`}>{selectedProject.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div>
                <p className="text-3xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Project Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${selectedProject.progress === 100 ? 'bg-green-500' : 'gradient-primary'}`} style={{ width: `${selectedProject.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-foreground">{selectedProject.progress}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-6">
              <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function AgencyTeam() {
  const [teamList, setTeamList] = useState([
    { name: 'Maya Chen', role: 'Senior Designer', projects: 8, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face', status: 'online' },
    { name: 'Alex Rivera', role: 'Content Creator', projects: 5, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face', status: 'online' },
    { name: 'Sam Torres', role: 'UI/UX Designer', projects: 6, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face', status: 'away' },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const [assigningMember, setAssigningMember] = useState<any | null>(null);
  const [assignProjectName, setAssignProjectName] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) {
      toast('warning', 'Please enter name');
      return;
    }
    const newMember = {
      name: inviteName.trim(),
      role: inviteRole.trim() || 'Designer',
      projects: 0,
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face',
      status: 'online'
    };
    setTeamList(prev => [...prev, newMember]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteRole('');
    setInviteEmail('');
    toast('success', `Invitation sent to ${newMember.name}!`);
  };

  const handleAssignProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignProjectName.trim()) {
      toast('warning', 'Please select or enter project name');
      return;
    }
    setTeamList(prev => prev.map(m => m.name === assigningMember.name ? { ...m, projects: m.projects + 1 } : m));
    toast('success', `Project "${assignProjectName}" assigned to ${assigningMember.name}!`);
    setAssigningMember(null);
    setAssignProjectName('');
  };

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Team" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Agency Team</h2>
            <p className="text-sm text-muted-foreground">{teamList.length} team members</p>
          </div>
          <button onClick={() => setShowInviteModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Invite
          </button>
        </div>
        <div className="grid gap-4">
          {teamList.map(m => (
            <div key={m.name} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary/20 transition-all">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=7c3aed&color=fff`;
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-muted-foreground">{m.role} · {m.projects} active projects</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold gradient-primary-text">{m.rating}★</p>
                <p className="text-xs text-muted-foreground capitalize">{m.status}</p>
              </div>
              <button onClick={() => { setAssigningMember(m); setAssignProjectName(''); }} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/30 transition-all text-foreground">Assign</button>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowInviteModal(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Role</label>
                <input
                  type="text"
                  required
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  placeholder="e.g. Senior Designer"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="e.g. designer@agency.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Project Modal */}
      {assigningMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setAssigningMember(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Assign Project</h3>
              <button onClick={() => setAssigningMember(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAssignProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Assign To</label>
                <div className="px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground">
                  {assigningMember.name} ({assigningMember.role})
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Project Name</label>
                <select
                  value={assignProjectName}
                  onChange={e => setAssignProjectName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="">Select a Project...</option>
                  <option value="Rebrand Identity">Rebrand Identity</option>
                  <option value="Social Media Kit">Social Media Kit</option>
                  <option value="Landing Page Design">Landing Page Design</option>
                  <option value="Email Templates">Email Templates</option>
                  <option value="Q3 Campaign Assets">Q3 Campaign Assets</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setAssigningMember(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

const campaignPerformanceData = [
  { name: 'Mon', impressions: 68000, clicks: 3200, conversions: 240 },
  { name: 'Tue', impressions: 82000, clicks: 4100, conversions: 310 },
  { name: 'Wed', impressions: 56000, clicks: 2800, conversions: 190 },
  { name: 'Thu', impressions: 94000, clicks: 4800, conversions: 380 },
  { name: 'Fri', impressions: 78000, clicks: 3900, conversions: 290 },
  { name: 'Sat', impressions: 112000, clicks: 5900, conversions: 450 },
  { name: 'Sun', impressions: 89000, clicks: 4400, conversions: 330 },
];

const revenueTrendData = [
  { name: 'Jan', revenue: 18000, campaigns: 3 },
  { name: 'Feb', revenue: 24000, campaigns: 4 },
  { name: 'Mar', revenue: 22000, campaigns: 5 },
  { name: 'Apr', revenue: 31000, campaigns: 6 },
  { name: 'May', revenue: 41300, campaigns: 8 },
  { name: 'Jun', revenue: 38000, campaigns: 9 },
];

export function AgencyAnalytics() {
  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Analytics" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Agency Analytics</h2>
          <p className="text-sm text-muted-foreground">Performance overview across all campaigns</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Impressions', value: '894K', delta: '+22%' },
            { label: 'Campaign ROI', value: '340%', delta: '+45%' },
            { label: 'Active Projects', value: '12', delta: '+3' },
            { label: 'Client Satisfaction', value: '4.8/5', delta: '+0.2' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <h3 className="text-sm font-semibold text-foreground mb-4">Campaign Performance</h3>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Bar dataKey="impressions" name="Impressions" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="clicks" name="Clicks" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <h3 className="text-sm font-semibold text-foreground mb-4">Revenue & Performance Trend</h3>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenue-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#revenue-grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function AgencyRevenue() {
  const handleDownloadInvoice = (inv: any) => {
    const invoiceNum = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const content = `
PIXIVISUAL AGENCY INVOICE
---------------------------------------
Invoice Number : ${invoiceNum}
Billing Date   : ${inv.date}, 2026
Client Name    : ${inv.client}
Status         : ${inv.status.toUpperCase()}
---------------------------------------
Item Description          | Amount
---------------------------------------
Agency Campaign Services  | ${formatCurrency(inv.amount)}
---------------------------------------
Total Due                 | ${formatCurrency(inv.amount)}
---------------------------------------
Thank you for your business!
PixiVisual Marketing Agency Panel.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoiceNum}_${inv.client.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast('success', `Invoice ${invoiceNum} downloaded successfully!`);
  };

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Revenue" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Revenue Overview</h2>
          <p className="text-sm text-muted-foreground">Financial performance and billing</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Monthly Revenue', value: formatCurrency(41300), delta: '+18%' },
            { label: 'Annual Run Rate', value: formatCurrency(495600), delta: '+22%' },
            { label: 'Avg Project Value', value: formatCurrency(3440), delta: '+8%' },
            { label: 'Outstanding', value: formatCurrency(8200), delta: '3 invoices' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Recent Invoices</h3></div>
          <div className="divide-y divide-border">
            {[
              { client: 'TechFlow Inc.', amount: 4200, status: 'paid', date: 'Jun 30' },
              { client: 'StyleHouse', amount: 6800, status: 'paid', date: 'Jun 25' },
              { client: 'GrowthLabs', amount: 2400, status: 'pending', date: 'Jul 1' },
              { client: 'LaunchPad Brands', amount: 1800, status: 'overdue', date: 'Jun 15' },
            ].map((inv, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{inv.client}</p>
                  <p className="text-xs text-muted-foreground">Due {inv.date}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatCurrency(inv.amount)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${inv.status === 'paid' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                    inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-red-500/10 text-red-600'
                  }`}>{inv.status}</span>
                <button onClick={() => handleDownloadInvoice(inv)} className="text-xs text-primary hover:underline font-medium">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
