// Freelancer sub-pages
import { useState } from 'react';
import { Briefcase, Star, DollarSign, Plus, BarChart2, Clock, Check, X, ArrowRight, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

export const freelancerSidebarItems = [
  { label: 'Portfolio', href: '/dashboard/freelancer/portfolio', icon: Star },
  { label: 'Projects', href: '/dashboard/freelancer/projects', icon: Briefcase },
  { label: 'Proposals', href: '/dashboard/freelancer/proposals', icon: Check },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/freelancer/analytics', icon: BarChart2 },
];

const portfolioItems = [
  { id: '1', title: 'Brand Identity for TechCo', category: 'Branding', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop', likes: 124, views: 1840 },
  { id: '2', title: 'E-commerce UI Redesign', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop', likes: 98, views: 1240 },
  { id: '3', title: 'Mobile App Design', category: 'Mobile', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=300&h=200&fit=crop', likes: 156, views: 2100 },
  { id: '4', title: 'Marketing Campaign Assets', category: 'Marketing', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', likes: 87, views: 980 },
  { id: '5', title: 'Logo Design Collection', category: 'Branding', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop', likes: 203, views: 3200 },
  { id: '6', title: 'Social Media Package', category: 'Social', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop', likes: 145, views: 1780 },
];

const activeProjects = [
  { id: '1', title: 'Website Redesign', client: 'StartupX', due: 'Jul 15', budget: 2400, progress: 65, status: 'in-progress' },
  { id: '2', title: 'Brand Refresh', client: 'LocalBiz', due: 'Jul 22', budget: 1800, progress: 30, status: 'in-progress' },
  { id: '3', title: 'Poster Design', client: 'EventCo', due: 'Jul 8', budget: 600, progress: 90, status: 'review' },
];

const proposals = [
  { id: '1', title: 'E-commerce Product Photos', client: 'RetailBrand', budget: '$800-1200', sent: '2d ago', status: 'pending' },
  { id: '2', title: 'App Icon Set', client: 'MobileStart', budget: '$400-600', sent: '4d ago', status: 'accepted' },
  { id: '3', title: 'Annual Report Design', client: 'Corp Inc', budget: '$1500-2000', sent: '1w ago', status: 'rejected' },
];

export function FreelancerPortfolio() {
  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Portfolio" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Portfolio</h2>
            <p className="text-sm text-muted-foreground">{portfolioItems.length} featured works · 8,200+ total views</p>
          </div>
          <button onClick={() => toast('info', 'Adding portfolio piece...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Add Work
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {portfolioItems.map(item => (
            <div key={item.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                  <button onClick={() => toast('info', `Viewing ${item.title}...`)} className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-medium transition-opacity">View</button>
                  <button onClick={() => toast('info', `Editing ${item.title}...`)} className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium transition-opacity">Edit</button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                <p className="text-2xs text-muted-foreground mt-0.5">{item.category}</p>
                <div className="flex items-center gap-3 mt-1.5 text-2xs text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" />{item.views}</span>
                  <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function FreelancerProjects() {
  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Projects" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Active Projects</h2>
            <p className="text-sm text-muted-foreground">{activeProjects.length} projects in progress</p>
          </div>
          <button onClick={() => toast('info', 'Finding new projects...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Find Projects
          </button>
        </div>
        <div className="grid gap-4">
          {activeProjects.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${p.status === 'review' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>{p.status.replace('-', ' ')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.client} · Due {p.due}</p>
                </div>
                <span className="text-sm font-bold text-primary">{formatCurrency(p.budget)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-foreground">{p.progress}%</span>
                <button onClick={() => toast('info', `Opening ${p.title}...`)} className="text-xs text-primary hover:underline flex items-center gap-0.5">Open <ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function FreelancerProposals() {
  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Proposals" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Proposals</h2>
            <p className="text-sm text-muted-foreground">{proposals.length} proposals sent</p>
          </div>
          <button onClick={() => toast('info', 'Browsing available jobs...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Browse Jobs
          </button>
        </div>
        <div className="grid gap-4">
          {proposals.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${p.status === 'accepted' ? 'bg-green-500/10' : p.status === 'rejected' ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}>
                  {p.status === 'accepted' ? <Check className="w-4 h-4 text-green-500" /> : p.status === 'rejected' ? <X className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-yellow-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${p.status === 'accepted' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : p.status === 'rejected' ? 'bg-red-500/10 text-red-600' : 'bg-yellow-500/10 text-yellow-600'}`}>{p.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.client} · {p.budget} · Sent {p.sent}</p>
                </div>
                <button onClick={() => toast('info', `Viewing proposal for ${p.title}...`)} className="text-xs text-primary hover:underline flex-shrink-0">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function FreelancerEarnings() {
  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Earnings" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Earnings</h2>
          <p className="text-sm text-muted-foreground">Track your income and payments</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'This Month', value: formatCurrency(4800), delta: '+$1,200' },
            { label: 'Total Earned', value: formatCurrency(38200), delta: 'All time' },
            { label: 'Pending', value: formatCurrency(3200), delta: '2 invoices' },
            { label: 'Avg per Project', value: formatCurrency(1280), delta: '+18%' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Earnings</h3>
          <div className="flex items-end gap-2 h-32">
            {[2400, 3100, 2800, 3800, 4200, 4800].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg gradient-primary" style={{ height: `${(h / 4800) * 100}%` }} />
                <span className="text-2xs text-muted-foreground">{['J','F','M','A','M','J'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function FreelancerAnalytics() {
  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Analytics" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">Your freelancing performance metrics</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Profile Views', value: '1,840', delta: '+23%' },
            { label: 'Proposal Win Rate', value: '42%', delta: '+8%' },
            { label: 'Client Satisfaction', value: '4.8★', delta: '12 reviews' },
            { label: 'Response Time', value: '< 2h', delta: 'Excellent' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
