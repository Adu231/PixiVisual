import { useState } from 'react';
import { Users, Palette, Layers, BarChart2, Shield, Globe, Settings, Plus, TrendingUp, Check, ArrowRight, FileText, Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';

export const teamSidebarItems = [
  { label: 'Workspaces', href: '/dashboard/team/workspaces', icon: Layers },
  { label: 'Brand Assets', href: '/dashboard/team/assets', icon: Palette },
  { label: 'Collaborate', href: '/dashboard/team/collaborate', icon: Users },
  { label: 'Brand Guidelines', href: '/dashboard/team/guidelines', icon: FileText },
  { label: 'Consistency Check', href: '/dashboard/team/consistency', icon: Check },
  { label: 'Analytics', href: '/dashboard/team/analytics', icon: BarChart2 },
  { label: 'Integrations', href: '/dashboard/team/integrations', icon: Globe },
  { label: 'Security', href: '/dashboard/team/security', icon: Shield },
];

const teamMembers = [
  { name: 'Sara Kim', role: 'Brand Designer', dept: 'Design', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
  { name: 'David Park', role: 'Content Lead', dept: 'Marketing', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
  { name: 'Aisha Patel', role: 'UX Designer', dept: 'Product', status: 'away', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
  { name: 'Tom Walsh', role: 'Campaign Manager', dept: 'Marketing', status: 'offline', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
];

const workspaces = [
  { name: 'Global HQ', members: 18, assets: 620, status: 'active', color: 'from-purple-500 to-pink-500' },
  { name: 'EMEA Region', members: 11, assets: 285, status: 'active', color: 'from-blue-500 to-purple-500' },
  { name: 'APAC Region', members: 9, assets: 193, status: 'active', color: 'from-green-500 to-blue-500' },
  { name: 'Product Launch', members: 6, assets: 74, status: 'restricted', color: 'from-orange-500 to-pink-500' },
];

const recentActivity = [
  { user: 'Sara Kim', action: 'uploaded 12 brand assets', time: '10m ago', icon: Palette },
  { user: 'David Park', action: 'updated brand guidelines v3.2', time: '1h ago', icon: FileText },
  { user: 'Aisha Patel', action: 'approved 5 design reviews', time: '2h ago', icon: Check },
  { user: 'Tom Walsh', action: 'shared workspace with Agency Partners', time: '4h ago', icon: Globe },
];

export default function TeamDashboard() {
  const { user } = useAuth();
  const [teamList, setTeamList] = useState(teamMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteDept, setInviteDept] = useState('Design');

  const [messagingMember, setMessagingMember] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');

  const stats = [
    { label: 'Team Members', value: teamList.length.toString(), delta: '+4 this month', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Brand Assets', value: '1,172', delta: '+89 this week', icon: Palette, color: 'from-blue-500 to-purple-500' },
    { label: 'Active Workspaces', value: '4', delta: '3 regions', icon: Layers, color: 'from-green-500 to-blue-500' },
    { label: 'Brand Score', value: '91%', delta: '+3 this month', icon: TrendingUp, color: 'from-orange-500 to-pink-500' },
  ];

  const statusDot: Record<string, string> = { online: 'bg-green-500', away: 'bg-yellow-500', offline: 'bg-muted' };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) {
      toast('warning', 'Please enter a name');
      return;
    }
    const newMember = {
      name: inviteName.trim(),
      role: inviteRole.trim() || 'Brand Designer',
      dept: inviteDept,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=40&h=40&fit=crop&crop=face'
    };
    setTeamList(prev => [...prev, newMember]);
    setShowInvite(false);
    setInviteName('');
    setInviteRole('');
    setInviteDept('Design');
    toast('success', `Member "${newMember.name}" invited successfully!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast('warning', 'Please enter a message');
      return;
    }
    toast('success', `Message sent successfully to ${messagingMember.name}!`);
    setMessagingMember(null);
    setMessageText('');
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Enterprise Team Hub" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {user?.company || 'GlobalBrand Corp'} · Enterprise Team · 4 active workspaces
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/dashboard/team/workspaces"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 transition-all"
            >
              <Layers className="w-4 h-4" /> Workspaces
            </Link>
            <button
              onClick={() => setShowInvite(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple"
            >
              <Plus className="w-4 h-4" /> Invite Member
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

        {/* Brand Consistency Score */}
        <div className="bg-gradient-to-br from-primary/5 to-pink-500/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Brand Consistency Score</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Across all workspaces and regions</p>
            </div>
            <span className="text-3xl font-display font-bold gradient-primary-text">91%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-4">
            <div className="h-full gradient-primary rounded-full" style={{ width: '91%' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Color Usage', value: '95%' },
              { label: 'Typography', value: '88%' },
              { label: 'Logo Compliance', value: '98%' },
              { label: 'Asset Quality', value: '92%' },
            ].map(m => (
              <div key={m.label} className="bg-background/50 rounded-xl p-3 text-center">
                <p className="text-base font-bold gradient-primary-text">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Last checked: 2 hours ago</p>
            <Link to="/dashboard/team/consistency" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View Full Report <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Workspaces */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Active Workspaces</h3>
              <Link to="/dashboard/team/workspaces" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                Manage <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {workspaces.map(w => (
                <div key={w.name} className="p-4 flex items-center gap-3 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => toast('info', `Opening ${w.name} workspace...`)}>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${w.color} flex items-center justify-center flex-shrink-0`}>
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{w.name}</p>
                    <p className="text-xs text-muted-foreground">{w.members} members · {w.assets} assets</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                    w.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600'
                  }`}>{w.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Team Members</h3>
              <Link to="/dashboard/team/collaborate" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {teamList.map(m => (
                <div key={m.name} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                  <div className="relative flex-shrink-0">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusDot[m.status]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role} · {m.dept}</p>
                  </div>
                  <button onClick={() => { setMessagingMember(m); setMessageText(''); }} className="text-xs text-primary hover:underline font-medium">Message</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Activity</h3>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Upload Asset', icon: Palette, href: '/dashboard/team/assets' },
            { label: 'Check Consistency', icon: Check, href: '/dashboard/team/consistency' },
            { label: 'View Guidelines', icon: FileText, href: '/dashboard/team/guidelines' },
            { label: 'Team Settings', icon: Settings, href: '/settings' },
          ].map(action => (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:bg-primary/5 transition-all text-center"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowInvite(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Invite Team Member</h3>
              <button onClick={() => setShowInvite(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
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
                  placeholder="e.g. Sara Kim" 
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
                  placeholder="e.g. Brand Designer" 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Department</label>
                <select
                  value={inviteDept}
                  onChange={e => setInviteDept(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product">Product</option>
                  <option value="Strategy">Strategy</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowInvite(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {messagingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setMessagingMember(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Send Message</h3>
              <button onClick={() => setMessagingMember(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">To</label>
                <div className="px-3 py-2 bg-muted/40 border border-border rounded-xl text-xs font-medium text-foreground">
                  {messagingMember.name} ({messagingMember.role})
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={messageText} 
                  onChange={e => setMessageText(e.target.value)} 
                  placeholder={`Write your message to ${messagingMember.name}...`} 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" 
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setMessagingMember(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
