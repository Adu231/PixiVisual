// Designer sub-pages
import { useState } from 'react';
import { Image, Palette, Store, Briefcase, DollarSign, TrendingUp, Plus, Download, Star, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

export const designerSidebarItems = [
  { label: 'My Designs', href: '/dashboard/designer/designs', icon: Image },
  { label: 'Portfolio', href: '/dashboard/designer/portfolio', icon: Palette },
  { label: 'Marketplace', href: '/dashboard/designer/marketplace', icon: Store },
  { label: 'Client Projects', href: '/dashboard/designer/clients', icon: Briefcase },
  { label: 'Earnings', href: '/dashboard/designer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/designer/analytics', icon: TrendingUp },
];

export function DesignerDesigns() {
  const designs = [
    { id: '1', title: 'Minimal Business Card', type: 'Branding', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=160&fit=crop', updated: '1h ago', status: 'published' },
    { id: '2', title: 'Bold Social Media Kit', type: 'Social Media', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=160&fit=crop', updated: '5h ago', status: 'published' },
    { id: '3', title: 'Corporate Presentation', type: 'Presentation', thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=160&fit=crop', updated: '1d ago', status: 'draft' },
    { id: '4', title: 'E-commerce Promo Set', type: 'Marketing', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=160&fit=crop', updated: '2d ago', status: 'published' },
    { id: '5', title: 'App UI Concept', type: 'UI/UX', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=160&fit=crop', updated: '3d ago', status: 'draft' },
    { id: '6', title: 'Poster Collection', type: 'Print', thumb: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=160&fit=crop', updated: '5d ago', status: 'published' },
  ];

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="My Designs" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Designs</h2>
            <p className="text-sm text-muted-foreground">{designs.length} designs</p>
          </div>
          <button onClick={() => toast('info', 'Opening design editor...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Design
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {designs.map(d => (
            <div key={d.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer" onClick={() => toast('info', `Opening ${d.title}...`)}>
              <div className="relative">
                <img src={d.thumb} alt={d.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${d.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>{d.status}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground truncate">{d.title}</p>
                <p className="text-2xs text-muted-foreground mt-0.5">{d.type} · {d.updated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function DesignerPortfolio() {
  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Portfolio" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Portfolio</h2>
            <p className="text-sm text-muted-foreground">8,200+ profile views this month</p>
          </div>
          <button onClick={() => toast('info', 'Editing portfolio settings...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Edit Portfolio
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { title: 'Brand Identity System', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop', likes: 234, views: 3400 },
            { title: 'UI Design Kit', thumb: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop', likes: 189, views: 2800 },
            { title: 'Motion Graphics', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', likes: 142, views: 1900 },
          ].map(p => (
            <div key={p.title} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
              <div className="relative">
                <img src={p.thumb} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{p.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function DesignerMarketplace() {
  const templates = [
    { title: 'Minimal Business Card', category: 'Branding', sales: 234, revenue: 702, rating: 4.8, preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop', price: 3 },
    { title: 'Bold Social Media Kit', category: 'Social Media', sales: 189, revenue: 945, rating: 4.9, preview: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=150&fit=crop', price: 5 },
    { title: 'Corporate Presentation', category: 'Presentation', sales: 142, revenue: 1136, rating: 4.7, preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop', price: 8 },
  ];

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Marketplace" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Templates</h2>
            <p className="text-sm text-muted-foreground">663 total sales · {formatCurrency(3763)} earned</p>
          </div>
          <button onClick={() => toast('info', 'Opening template uploader...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Upload Template
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.title} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
              <img src={t.preview} alt={t.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h4 className="text-sm font-semibold text-foreground mb-0.5">{t.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{t.category} · ${t.price}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" />{t.sales}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating}</span>
                  <span className="text-green-500 font-medium ml-auto">{formatCurrency(t.revenue)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast('info', `Editing ${t.title}...`)} className="flex-1 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/30 transition-all">Edit</button>
                  <button onClick={() => toast('info', `Viewing stats...`)} className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">Stats</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function DesignerClients() {
  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Client Projects" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Client Projects</h2>
          <p className="text-sm text-muted-foreground">Active client commissions</p>
        </div>
        <div className="grid gap-4">
          {[
            { client: 'RetailBrand Co.', project: 'Brand Identity Redesign', due: 'Jul 20', budget: 4500, progress: 60 },
            { client: 'TechStartup X', project: 'App UI Design System', due: 'Aug 5', budget: 6800, progress: 35 },
            { client: 'EventAgency', project: 'Event Poster Collection', due: 'Jul 10', budget: 1200, progress: 90 },
          ].map(p => (
            <div key={p.project} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{p.project}</h3>
                  <p className="text-xs text-muted-foreground">{p.client} · Due {p.due}</p>
                </div>
                <span className="text-sm font-bold text-primary">{formatCurrency(p.budget)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-foreground">{p.progress}%</span>
                <button onClick={() => toast('info', `Opening ${p.project}...`)} className="text-xs text-primary hover:underline">Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function DesignerEarnings() {
  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Earnings" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Earnings</h2>
          <p className="text-sm text-muted-foreground">Template sales + client projects</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Template Sales', value: formatCurrency(3763), delta: '+$420 this month' },
            { label: 'Client Revenue', value: formatCurrency(12500), delta: '+$2,100 this month' },
            { label: 'Total Earned', value: formatCurrency(16263), delta: 'All time' },
            { label: 'Pending Payout', value: formatCurrency(1240), delta: 'Next: Jul 15' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
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

export function DesignerAnalytics() {
  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Analytics" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Designer Analytics</h2>
          <p className="text-sm text-muted-foreground">Performance metrics across all your work</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Portfolio Views', value: '8.2K', delta: '+15%' },
            { label: 'Template Downloads', value: '663', delta: '+23 this month' },
            { label: 'Avg Rating', value: '4.8★', delta: '12 reviews' },
            { label: 'Repeat Clients', value: '68%', delta: '+5%' },
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
