// Agency sub-pages
import { useState } from 'react';
import { Users, BarChart2, Briefcase, MessageSquare, Settings, Plus, TrendingUp, DollarSign, Clock, Check, X, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

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
  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Clients" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Client Management</h2>
            <p className="text-sm text-muted-foreground">{clients.filter(c => c.status === 'active').length} active clients</p>
          </div>
          <button onClick={() => toast('info', 'Adding new client...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
        <div className="grid gap-4">
          {clients.map(client => (
            <div key={client.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-4">
                <img src={client.logo} alt={client.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-semibold text-foreground">{client.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[client.status]}`}>{client.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{client.industry} · Contact: {client.contact}</p>
                  <div className="flex gap-6 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{client.projects} projects</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium"><DollarSign className="w-3 h-3" />{formatCurrency(client.revenue)} revenue</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast('info', `Opening ${client.name} details...`)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all">View</button>
                  <button onClick={() => toast('info', `Messaging ${client.contact}...`)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <MessageSquare className="w-3.5 h-3.5" />
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

export function AgencyCampaigns() {
  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Campaigns" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Campaign Management</h2>
            <p className="text-sm text-muted-foreground">{campaigns.filter(c => c.status === 'active').length} active campaigns</p>
          </div>
          <button onClick={() => toast('info', 'Creating new campaign...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
        <div className="grid gap-4">
          {campaigns.map(c => (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[c.status]}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.client} · Ends {c.endDate}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast('info', `Editing ${c.name}...`)} className="text-xs text-primary hover:underline">Edit</button>
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
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${(c.spent / c.budget) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function AgencyProjects() {
  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Projects" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Projects</h2>
            <p className="text-sm text-muted-foreground">{projects.filter(p => p.status !== 'completed').length} active projects</p>
          </div>
          <button onClick={() => toast('info', 'Creating new project...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
        <div className="grid gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[p.status]}`}>{p.status.replace('-', ' ')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.client} · Designer: {p.designer} · Due: {p.dueDate}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast('info', `Opening ${p.name}...`)} className="flex items-center gap-1 text-xs text-primary hover:underline">
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
                  <div className="flex gap-1">
                    <button onClick={() => toast('success', 'Project approved!')} className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors">
                      <Check className="w-3 h-3 text-green-500" />
                    </button>
                    <button onClick={() => toast('info', 'Revision requested')} className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function AgencyTeam() {
  const team = [
    { name: 'Maya Chen', role: 'Senior Designer', projects: 8, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=48&h=48&fit=crop&crop=face', status: 'online' },
    { name: 'Alex Rivera', role: 'Content Creator', projects: 5, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face', status: 'online' },
    { name: 'Sam Torres', role: 'UI/UX Designer', projects: 6, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face', status: 'away' },
  ];

  return (
    <DashboardLayout sidebarItems={agencySidebarItems} title="Team" roleLabel="Marketing Agency">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Agency Team</h2>
            <p className="text-sm text-muted-foreground">{team.length} team members</p>
          </div>
          <button onClick={() => toast('info', 'Inviting team member...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Invite
          </button>
        </div>
        <div className="grid gap-4">
          {team.map(m => (
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
              <button onClick={() => toast('info', `Assigning project to ${m.name}...`)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/30 transition-all">Assign</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

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
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Campaign Performance</h3>
          <div className="flex items-end gap-3 h-32">
            {[680, 820, 560, 940, 780, 1120, 890].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg gradient-primary" style={{ height: `${(h / 1120) * 100}%` }} />
                <span className="text-2xs text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function AgencyRevenue() {
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
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  inv.status === 'paid' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                  inv.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                  'bg-red-500/10 text-red-600'
                }`}>{inv.status}</span>
                <button onClick={() => toast('info', `Opening invoice for ${inv.client}...`)} className="text-xs text-primary hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
