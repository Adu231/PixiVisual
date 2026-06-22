import { useState } from 'react';
import { Briefcase, DollarSign, Star, Clock, Plus, Check, Eye, TrendingUp, Image, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

const sidebarItems = [
  { label: 'Portfolio', href: '/dashboard/freelancer/portfolio', icon: Image },
  { label: 'Projects', href: '/dashboard/freelancer/projects', icon: Briefcase },
  { label: 'Proposals', href: '/dashboard/freelancer/proposals', icon: Check },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/freelancer/analytics', icon: TrendingUp },
];

const projects = [
  { client: 'Startup X', title: 'Brand Identity Package', budget: 1200, deadline: 'Jul 20', status: 'in-progress', completion: 65 },
  { client: 'Local Restaurant', title: 'Menu & Marketing Materials', budget: 800, deadline: 'Jul 25', status: 'review', completion: 90 },
  { client: 'Tech Blogger', title: 'Blog & Social Media Kit', budget: 450, deadline: 'Aug 1', status: 'in-progress', completion: 35 },
  { client: 'Fashion Brand', title: 'Lookbook Design', budget: 2000, deadline: 'Aug 15', status: 'new', completion: 0 },
];

const reviews = [
  { client: 'Startup X', rating: 5, comment: 'Absolutely amazing work! Sam delivered beyond expectations.', date: '3 days ago' },
  { client: 'TechFlow', rating: 5, comment: 'Fast turnaround and exceptional quality. Will definitely hire again!', date: '1 week ago' },
  { client: 'GrowthHQ', rating: 4, comment: 'Great communication and solid design skills.', date: '2 weeks ago' },
];

export default function FreelancerDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '4', delta: '+1 this week', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'Monthly Earnings', value: formatCurrency(4450), delta: '+18%', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Avg Rating', value: '4.9★', delta: '48 reviews', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Unread Messages', value: '3', delta: 'Reply needed', icon: MessageSquare, color: 'from-blue-500 to-purple-500' },
  ];

  const statusStyles: Record<string, string> = {
    'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    review: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    new: 'bg-green-500/10 text-green-600 dark:text-green-400',
    completed: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Freelancer Hub" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Your Freelance Hub</h2>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <button onClick={() => toast('info', 'Opening new project form...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Project
          </button>
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

        {/* Active Projects */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Active Projects</h3>
          </div>
          <div className="divide-y divide-border">
            {projects.map(p => (
              <div key={p.title} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.client}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary">{formatCurrency(p.budget)}</p>
                    <div className="flex items-center gap-1 justify-end text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />{p.deadline}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${p.completion}%` }} />
                  </div>
                  <span className="text-xs font-medium text-foreground w-8 text-right">{p.completion}%</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[p.status]}`}>{p.status.replace('-', ' ')}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toast('info', `Opening ${p.title}...`)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all">
                    <Eye className="w-3 h-3" /> View
                  </button>
                  {p.status === 'review' && (
                    <button onClick={() => toast('success', 'Project marked as delivered!')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">
                      <Check className="w-3 h-3" /> Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Reviews</h3>
          </div>
          <div className="divide-y divide-border">
            {reviews.map(r => (
              <div key={r.client} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{r.client}</span>
                  <div className="flex items-center gap-1">
                    {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">{r.date}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'This Month', value: formatCurrency(4450), delta: '+18%', color: 'text-green-500' },
            { label: 'Last Month', value: formatCurrency(3770), delta: 'Paid', color: 'text-muted-foreground' },
            { label: 'All Time', value: formatCurrency(28900), delta: '2 years', color: 'text-primary' },
          ].map(e => (
            <div key={e.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{e.label}</p>
              <p className="text-xl font-display font-bold text-foreground">{e.value}</p>
              <p className={`text-xs font-medium mt-1 ${e.color}`}>{e.delta}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
