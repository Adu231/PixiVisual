import { useState } from 'react';
import { Plus, Star, DollarSign, Eye, Download, Heart, Store, Palette, Image, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

const sidebarItems = [
  { label: 'My Designs', href: '/dashboard/designer/designs', icon: Image },
  { label: 'Portfolio', href: '/dashboard/designer/portfolio', icon: Palette },
  { label: 'Marketplace', href: '/dashboard/designer/marketplace', icon: Store },
  { label: 'Client Projects', href: '/dashboard/designer/clients', icon: Briefcase },
  { label: 'Earnings', href: '/dashboard/designer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/designer/analytics', icon: TrendingUp },
];

const templates = [
  { title: 'Minimal Business Card', category: 'Branding', sales: 234, revenue: 702, rating: 4.8, preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop', price: 3, downloads: 234 },
  { title: 'Bold Social Media Kit', category: 'Social Media', sales: 189, revenue: 945, rating: 4.9, preview: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=150&fit=crop', price: 5, downloads: 189 },
  { title: 'Corporate Presentation', category: 'Presentation', sales: 142, revenue: 1136, rating: 4.7, preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop', price: 8, downloads: 142 },
  { title: 'E-commerce Promo Set', category: 'Marketing', sales: 98, revenue: 980, rating: 4.6, preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=150&fit=crop', price: 10, downloads: 98 },
];

export default function DesignerDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Templates Sold', value: '663', delta: '+23 this month', icon: Store, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Earnings', value: formatCurrency(3763), delta: '+$420 this month', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Portfolio Views', value: '8.2K', delta: '+15%', icon: Eye, color: 'from-blue-500 to-purple-500' },
    { label: 'Avg Rating', value: '4.8★', delta: '12 reviews', icon: Star, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Designer Studio" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Designer Dashboard</h2>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast('info', 'Opening template uploader...')} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 transition-all">
              <Download className="w-4 h-4" /> Upload Template
            </button>
            <button onClick={() => toast('info', 'Opening design editor...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              <Plus className="w-4 h-4" /> New Design
            </button>
          </div>
        </div>

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

        {/* Revenue chart placeholder */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground">Monthly Earnings</h3>
            <span className="text-xs text-primary font-medium">{formatCurrency(3763)} total</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[320, 480, 350, 620, 550, 720, 420].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg gradient-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer" style={{ height: `${(h / 720) * 100}%` }} title={formatCurrency(h)} />
                <span className="text-2xs text-muted-foreground">{['J','F','M','A','M','J','J'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-display font-semibold text-foreground">Your Templates</h3>
            <button onClick={() => toast('info', 'Opening marketplace...')} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View marketplace <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map(t => (
              <div key={t.title} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all">
                <img src={t.preview} alt={t.title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{t.title}</h4>
                      <span className="text-xs text-muted-foreground">{t.category}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">${t.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{t.downloads}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating}</span>
                    <span className="text-green-500 font-medium ml-auto">{formatCurrency(t.revenue)} earned</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => toast('info', `Editing ${t.title}...`)} className="flex-1 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all">Edit</button>
                    <button onClick={() => toast('info', `Viewing stats for ${t.title}...`)} className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">Stats</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
          <Heart className="w-8 h-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-0.5">Your portfolio is getting attention!</h4>
            <p className="text-xs text-muted-foreground">8,200+ designers have viewed your work this month. Add more templates to increase earnings.</p>
          </div>
          <button onClick={() => toast('info', 'Opening portfolio...')} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0">
            View Portfolio
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
