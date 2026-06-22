import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Image, Video, Share2, TrendingUp, Plus, Play,
  BarChart2, Clock, Star, ArrowRight, Zap, Layers
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';

const sidebarItems = [
  { label: 'AI Studio', href: '/dashboard/creator/studio', icon: Sparkles },
  { label: 'My Designs', href: '/dashboard/creator/designs', icon: Image },
  { label: 'Templates', href: '/dashboard/creator/templates', icon: Layers },
  { label: 'Social Media', href: '/dashboard/creator/social', icon: Share2 },
  { label: 'Video Studio', href: '/dashboard/creator/video', icon: Video },
  { label: 'Analytics', href: '/dashboard/creator/analytics', icon: BarChart2 },
];

const recentDesigns = [
  { id: '1', title: 'Summer Instagram Post', type: 'Social Media', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', updated: '2h ago', status: 'published' },
  { id: '2', title: 'YouTube Thumbnail', type: 'YouTube', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop', updated: '5h ago', status: 'draft' },
  { id: '3', title: 'Blog Cover Image', type: 'Blog', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop', updated: '1d ago', status: 'published' },
  { id: '4', title: 'Story Template', type: 'Instagram Story', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', updated: '2d ago', status: 'published' },
];

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) { toast('warning', 'Please enter a prompt first'); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    toast('success', 'Design generated successfully! Check your designs.');
    setAiPrompt('');
  };

  const stats = [
    { label: 'Designs Created', value: '147', delta: '+12 this week', icon: Image, color: 'from-purple-500 to-pink-500' },
    { label: 'AI Generations Left', value: '83/100', delta: 'Pro plan', icon: Sparkles, color: 'from-blue-500 to-purple-500' },
    { label: 'Published Posts', value: '89', delta: '+5 today', icon: Share2, color: 'from-pink-500 to-rose-500' },
    { label: 'Total Views', value: '12.4K', delta: '+18% this month', icon: TrendingUp, color: 'from-green-500 to-blue-500' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Content Creator Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Ready to create something amazing today?</p>
          </div>
          <button
            onClick={() => toast('info', 'Design editor opening...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> New Design
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

        {/* AI Quick Generator */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-pink-500/10 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <h3 className="text-sm font-display font-semibold text-foreground">Quick AI Generate</h3>
          </div>
          <div className="flex gap-3">
            <input
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              placeholder="Describe your design (e.g., 'vibrant summer sale Instagram post with tropical colors')..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all flex-shrink-0"
            >
              {generating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Zap className="w-4 h-4" /> Generate</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Instagram post', 'YouTube thumbnail', 'Twitter graphic', 'LinkedIn banner'].map(s => (
              <button key={s} onClick={() => setAiPrompt(s)} className="px-2.5 py-1 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">{s}</button>
            ))}
          </div>
        </div>

        {/* Recent Designs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-display font-semibold text-foreground">Recent Designs</h3>
            <button onClick={() => toast('info', 'Opening all designs...')} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentDesigns.map(design => (
              <div key={design.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer" onClick={() => toast('info', `Opening ${design.title}...`)}>
                <div className="relative overflow-hidden">
                  <img src={design.thumb} alt={design.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-4 h-4 text-primary ml-0.5" /></div>
                    </div>
                  </div>
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${design.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>{design.status}</span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground truncate">{design.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground">{design.type}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground"><Clock className="w-2.5 h-2.5" />{design.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-display font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Instagram Post', icon: '📸' }, { label: 'YouTube Thumb', icon: '▶️' },
              { label: 'Twitter Card', icon: '🐦' }, { label: 'LinkedIn Post', icon: '💼' },
              { label: 'Story', icon: '📱' }, { label: 'Blog Cover', icon: '✍️' },
            ].map(action => (
              <button key={action.label} onClick={() => toast('info', `Creating ${action.label}...`)} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:bg-primary/5 transition-all text-center">
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">AI Usage This Month</h4>
              <span className="text-xs text-primary font-medium">83/100</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
              <div className="h-full gradient-primary rounded-full" style={{ width: '83%' }} />
            </div>
            <p className="text-xs text-muted-foreground">17 generations remaining</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Top Performing Design</h4>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=48&h=48&fit=crop" className="w-12 h-12 rounded-xl object-cover" alt="top design" />
              <div>
                <p className="text-sm font-medium text-foreground">Summer Instagram Post</p>
                <p className="text-xs text-muted-foreground">2.4K views · 340 likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
