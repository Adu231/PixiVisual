// Admin sub-pages — each sidebar route gets its own component
import { useState } from 'react';
import {
  Users, DollarSign, Store, BarChart2, Shield, FileText,
  Search, Eye, Check, X, TrendingUp, ArrowUp, ArrowDown,
  MoreVertical, Download, RefreshCw, AlertTriangle, Filter
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { MOCK_USERS } from '@/lib/auth';

export const adminSidebarItems = [
  { label: 'Users', href: '/dashboard/admin/users', icon: Users },
  { label: 'Revenue', href: '/dashboard/admin/revenue', icon: DollarSign },
  { label: 'Marketplace', href: '/dashboard/admin/marketplace', icon: Store },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart2 },
  { label: 'Content Moderation', href: '/dashboard/admin/moderation', icon: Shield, badge: 5 },
  { label: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
];

/* ─── Users ─────────────────────────────────────────────────── */
export function AdminUsers() {
  const [usersList, setUsersList] = useState(() => Object.values(MOCK_USERS));
  const [search, setSearch] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('designer');
  const [invitePlan, setInvitePlan] = useState('pro');

  const [viewUser, setViewUser] = useState<any | null>(null);
  const [activeActionsUserId, setActiveActionsUserId] = useState<string | null>(null);

  const filtered = usersList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const planColors: Record<string, string> = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/10 text-primary',
    business: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    enterprise: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  const roleLabel: Record<string, string> = {
    'content-creator': 'Creator',
    'business-owner': 'Business',
    designer: 'Designer',
    'marketing-agency': 'Agency',
    freelancer: 'Freelancer',
    'enterprise-team': 'Enterprise',
    admin: 'Admin',
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) {
      toast('warning', 'Please enter a name');
      return;
    }
    if (!inviteEmail.trim()) {
      toast('warning', 'Please enter an email address');
      return;
    }
    if (!inviteEmail.includes('@')) {
      toast('warning', 'Please enter a valid email address');
      return;
    }

    const AVATARS = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    ];
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];

    const newUser = {
      id: `user_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      avatar: randomAvatar,
      role: inviteRole,
      plan: invitePlan,
      createdAt: new Date().toISOString().split('T')[0],
      bio: `Platform user invited on ${new Date().toLocaleDateString()}`,
      company: 'Invited User',
      location: 'Remote',
      status: 'active',
    };

    setUsersList(prev => [newUser, ...prev]);
    toast('success', `Successfully invited ${inviteName} (${inviteEmail})`);

    // Reset and close
    setInviteName('');
    setInviteEmail('');
    setInviteRole('designer');
    setInvitePlan('pro');
    setIsInviteOpen(false);
  };

  const handleToggleSuspend = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const isCurrentlySuspended = u.status === 'suspended';
        const newStatus = isCurrentlySuspended ? 'active' : 'suspended';
        toast(isCurrentlySuspended ? 'success' : 'warning', `User ${u.name} has been ${newStatus === 'suspended' ? 'suspended' : 'reactivated'}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string) => {
    const userToDelete = usersList.find(u => u.id === id);
    if (userToDelete) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      toast('error', `User ${userToDelete.name} has been deleted`);
    }
  };

  const handleExportUsers = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Plan', 'Joined Date', 'Company', 'Location', 'Status'];
    const rows = usersList.map(u => [
      u.id,
      u.name,
      u.email,
      u.role,
      u.plan,
      u.createdAt || '',
      u.company || '',
      u.location || '',
      u.status || 'active'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pixivisual_users_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast('success', `Exported ${usersList.length} users successfully to CSV`);
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="User Management" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">User Management</h2>
            <p className="text-sm text-muted-foreground">2.1M registered users · {usersList.length} demo accounts</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportUsers} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 transition-all">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={() => setIsInviteOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
              + Invite User
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name or email..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Users', value: '2.1M', delta: '+12K this week', up: true },
            { label: 'Pro+ Subscribers', value: '381K', delta: '+2.3K this week', up: true },
            { label: 'Churned (30d)', value: '1,240', delta: '-320 vs last month', up: false },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${s.up ? 'text-green-500' : 'text-destructive'}`}>
                {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Demo Accounts</h3>
            <span className="text-xs text-muted-foreground">{filtered.length} users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Plan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Joined</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(u => (
                  <tr key={u.id} className={`hover:bg-muted/30 transition-colors ${u.status === 'suspended' ? 'opacity-65 bg-destructive/[0.02]' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className={`w-8 h-8 rounded-full object-cover flex-shrink-0 ${u.status === 'suspended' ? 'grayscale opacity-70' : ''}`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
                            {u.status === 'suspended' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-500/10 text-red-500 capitalize flex-shrink-0">Suspended</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground">{roleLabel[u.role] || u.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${planColors[u.plan]}`}>{u.plan}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{u.createdAt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewUser(u)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-all" title="View Profile">
                          <Eye className="w-3 h-3 text-muted-foreground" />
                        </button>
                        <div className="relative">
                          <button onClick={() => setActiveActionsUserId(activeActionsUserId === u.id ? null : u.id)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-all" title="More Options">
                            <MoreVertical className="w-3 h-3 text-muted-foreground" />
                          </button>
                          {activeActionsUserId === u.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveActionsUserId(null)} />
                              <div className="absolute right-0 mt-1 w-36 rounded-xl border border-border bg-card shadow-lg z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-100 text-left">
                                <button 
                                  onClick={() => { handleToggleSuspend(u.id); setActiveActionsUserId(null); }} 
                                  className="w-full text-left px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
                                >
                                  {u.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                </button>
                                <div className="h-px bg-border my-1" />
                                <button 
                                  onClick={() => { handleDeleteUser(u.id); setActiveActionsUserId(null); }} 
                                  className="w-full text-left px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors font-medium flex items-center gap-1.5"
                                >
                                  Delete User
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal Overlay */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-glow-purple relative animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-foreground">Invite New User</h3>
              <button 
                onClick={() => setIsInviteOpen(false)} 
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={inviteName} 
                  onChange={e => setInviteName(e.target.value)} 
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={inviteEmail} 
                  onChange={e => setInviteEmail(e.target.value)} 
                  placeholder="e.g. sarah@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Role</label>
                  <select 
                    value={inviteRole} 
                    onChange={e => setInviteRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="content-creator">Creator</option>
                    <option value="business-owner">Business</option>
                    <option value="designer">Designer</option>
                    <option value="marketing-agency">Agency</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="enterprise-team">Enterprise</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Subscription Plan</label>
                  <select 
                    value={invitePlan} 
                    onChange={e => setInvitePlan(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="business">Business</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Profile Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-glow-purple relative animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button 
              onClick={() => setViewUser(null)} 
              className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Content */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img 
                  src={viewUser.avatar} 
                  alt={viewUser.name} 
                  className={`w-24 h-24 rounded-full object-cover border-2 border-primary/20 ${viewUser.status === 'suspended' ? 'grayscale opacity-70' : ''}`}
                />
                {viewUser.status === 'suspended' && (
                  <span className="absolute bottom-0 right-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white uppercase shadow-lg">
                    Suspended
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  {viewUser.name}
                </h3>
                <p className="text-sm text-muted-foreground">{viewUser.email}</p>
              </div>

              <div className="flex gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${planColors[viewUser.plan] || 'bg-muted'}`}>
                  {viewUser.plan} Plan
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {roleLabel[viewUser.role] || viewUser.role}
                </span>
              </div>

              {/* Bio & Details */}
              <div className="w-full text-left space-y-3 pt-4 border-t border-border">
                {viewUser.bio && (
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Bio</span>
                    <p className="text-sm text-foreground">{viewUser.bio}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {viewUser.company && (
                    <div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Company</span>
                      <p className="text-sm font-medium text-foreground">{viewUser.company}</p>
                    </div>
                  )}
                  {viewUser.location && (
                    <div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Location</span>
                      <p className="text-sm font-medium text-foreground">{viewUser.location}</p>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Joined Date</span>
                  <p className="text-sm font-medium text-foreground">{viewUser.createdAt || 'N/A'}</p>
                </div>
              </div>

              <div className="pt-4 w-full">
                <button 
                  onClick={() => setViewUser(null)}
                  className="w-full px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ─── Revenue ─────────────────────────────────────────────────── */
export function AdminRevenue() {
  const monthly = [62000, 78000, 71000, 89000, 95000, 82000, 88000, 104000, 98000, 112000, 108000, 121000];
  const maxVal = Math.max(...monthly);
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const revenueByPlan = [
    { plan: 'Enterprise', revenue: 421000, pct: 50, color: 'bg-purple-500' },
    { plan: 'Business', revenue: 253000, pct: 30, color: 'bg-blue-500' },
    { plan: 'Pro', revenue: 126000, pct: 15, color: 'bg-primary' },
    { plan: 'Free (Ads)', revenue: 42000, pct: 5, color: 'bg-muted-foreground' },
  ];

  const recentTransactions = [
    { user: 'Agency Corp', plan: 'Enterprise', amount: '$299', date: '2h ago', status: 'success' },
    { user: 'StyleHouse', plan: 'Business', amount: '$49', date: '4h ago', status: 'success' },
    { user: 'Alex Rivera', plan: 'Pro', amount: '$19', date: '6h ago', status: 'success' },
    { user: 'Demo Co', plan: 'Pro', amount: '$19', date: '1d ago', status: 'refunded' },
    { user: 'TechStart', plan: 'Business', amount: '$49', date: '1d ago', status: 'success' },
  ];

  const handleExportRevenue = () => {
    let csvContent = '';

    // Section 1: Monthly Revenue
    csvContent += '--- MONTHLY REVENUE (LAST 12 MONTHS) ---\n';
    csvContent += 'Month,Revenue (USD)\n';
    monthLabels.forEach((label, index) => {
      csvContent += `${label},${monthly[index]}\n`;
    });
    csvContent += '\n';

    // Section 2: Revenue by Plan
    csvContent += '--- REVENUE BY SUBSCRIPTION PLAN ---\n';
    csvContent += 'Plan,Revenue (USD),Percentage (%)\n';
    revenueByPlan.forEach(p => {
      csvContent += `${p.plan},${p.revenue},${p.pct}\n`;
    });
    csvContent += '\n';

    // Section 3: Recent Transactions
    csvContent += '--- RECENT TRANSACTIONS ---\n';
    csvContent += 'User,Plan,Amount,Date,Status\n';
    recentTransactions.forEach(t => {
      csvContent += `"${t.user.replace(/"/g, '""')}",${t.plan},${t.amount.replace('$', '')},${t.date},${t.status}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pixivisual_revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast('success', 'Revenue report downloaded successfully to CSV');
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Revenue" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Revenue Overview</h2>
            <p className="text-sm text-muted-foreground">Platform revenue and subscription metrics</p>
          </div>
          <button onClick={handleExportRevenue} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Monthly Revenue', value: formatCurrency(842000), delta: '+18%', up: true },
            { label: 'Annual Run Rate', value: '$10.1M', delta: '+22%', up: true },
            { label: 'Avg Revenue/User', value: '$2.20', delta: '+$0.15', up: true },
            { label: 'Refunds (30d)', value: formatCurrency(4200), delta: '-12%', up: false },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${s.up ? 'text-green-500' : 'text-destructive'}`}>
                {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-foreground">Monthly Revenue (Last 12 Months)</h3>
            <span className="text-xs text-muted-foreground">Total: {formatCurrency(monthly.reduce((a, b) => a + b, 0))}</span>
          </div>
          <div className="flex items-end gap-2 h-44">
            {monthly.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col gap-2 h-full">
                {/* Bar Container */}
                <div className="flex-1 flex items-end justify-center">
                  <div 
                    className="w-full rounded-t-lg gradient-primary opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
                    style={{ height: `${(v / maxVal) * 100}%` }} 
                    title={`${monthLabels[i]}: ${formatCurrency(v)}`} 
                  />
                </div>
                {/* Label */}
                <span className="text-xs text-muted-foreground text-center">{monthLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Plan</h3>
            <div className="space-y-3">
              {revenueByPlan.map(r => (
                <div key={r.plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{r.plan}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{r.pct}%</span>
                      <span className="text-xs font-semibold text-foreground">{formatCurrency(r.revenue)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${t.status === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {t.status === 'success' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{t.user}</p>
                    <p className="text-xs text-muted-foreground">{t.plan} · {t.date}</p>
                  </div>
                  <span className={`text-xs font-bold ${t.status === 'refunded' ? 'text-destructive line-through' : 'text-foreground'}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ─── Marketplace ─────────────────────────────────────────────── */
export function AdminMarketplace() {
  const [templateList, setTemplateList] = useState(() => [
    { title: 'Minimal Business Card', author: 'Maya Chen', category: 'Branding', sales: 234, price: '$3', status: 'active', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=90&fit=crop' },
    { title: 'Bold Social Media Kit', author: 'Alex Rivera', category: 'Social Media', sales: 189, price: '$5', status: 'active', preview: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=90&fit=crop' },
    { title: 'Corporate Presentation', author: 'Sam Torres', category: 'Presentation', sales: 142, price: '$8', status: 'active', preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=90&fit=crop' },
    { title: 'Modern Logo Pack', author: 'Jordan Lee', category: 'Branding', sales: 98, price: '$12', status: 'pending', preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=90&fit=crop' },
    { title: 'E-commerce Banner Set', author: 'Marcus Williams', category: 'Marketing', sales: 76, price: '$6', status: 'pending', preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=90&fit=crop' },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [commissionRate, setCommissionRate] = useState(20);
  const [moderationRequired, setModerationRequired] = useState(true);
  const [allowUploads, setAllowUploads] = useState(true);
  const [maxFileSize, setMaxFileSize] = useState(50);

  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [manageTemplate, setManageTemplate] = useState<any | null>(null);

  const handleApproveTemplate = (title: string) => {
    toast('success', `Approved: "${title}"`);
    setTemplateList(prev => prev.map(item => item.title === title ? { ...item, status: 'active' } : item));
  };

  const handleRejectTemplate = (title: string) => {
    toast('error', `Rejected: "${title}"`);
    setTemplateList(prev => prev.filter(item => item.title !== title));
  };

  const handleSaveManagedTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageTemplate.title.trim()) {
      toast('warning', 'Title cannot be empty');
      return;
    }

    setTemplateList(prev => prev.map(item => {
      if (item.title === manageTemplate.originalTitle) {
        return {
          ...item,
          title: manageTemplate.title,
          price: manageTemplate.price.startsWith('$') ? manageTemplate.price : `$${manageTemplate.price}`,
          featured: manageTemplate.featured
        };
      }
      return item;
    }));

    toast('success', `Template "${manageTemplate.title}" updated successfully`);
    setManageTemplate(null);
  };

  const filteredTemplates = templateList.filter(t => {
    const categoryMatch = filterCategory === 'all' || t.category.toLowerCase() === filterCategory.toLowerCase();
    const statusMatch = filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase();
    return categoryMatch && statusMatch;
  });

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Marketplace" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Marketplace Management</h2>
            <p className="text-sm text-muted-foreground">Moderate and manage template listings</p>
          </div>
          <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Marketplace Settings
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Listings', value: '14,820', delta: '+234 this week' },
            { label: 'Total Sales', value: '89,420', delta: '+1,240 this month' },
            { label: 'Pending Review', value: '23', delta: 'Needs action' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Template Listings</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${showFilters ? 'bg-primary/10 border-primary text-primary font-medium' : 'border-border text-muted-foreground hover:border-primary/30'}`}
              >
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap gap-4 items-center animate-in slide-in-from-top-1 duration-200">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Category:</span>
                <select 
                  value={filterCategory} 
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="branding">Branding</option>
                  <option value="social media">Social Media</option>
                  <option value="presentation">Presentation</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Status:</span>
                <select 
                  value={filterStatus} 
                  onChange={e => setFilterStatus(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {(filterCategory !== 'all' || filterStatus !== 'all') && (
                <button 
                  onClick={() => { setFilterCategory('all'); setFilterStatus('all'); }}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          <div className="divide-y divide-border">
            {filteredTemplates.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No templates match the selected filter criteria.
              </div>
            ) : (
              filteredTemplates.map((t, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4 animate-in fade-in duration-200">
                  <img src={t.preview} alt={t.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">{t.title}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${t.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600'}`}>{t.status}</span>
                      {t.featured && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary capitalize flex-shrink-0">Featured</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">by {t.author} · {t.category} · {t.sales} sales · {t.price}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {t.status === 'pending' ? (
                      <>
                        <button onClick={() => handleApproveTemplate(t.title)} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">Approve</button>
                        <button onClick={() => handleRejectTemplate(t.title)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 text-xs font-medium hover:bg-red-500/20 transition-all">Reject</button>
                      </>
                    ) : (
                      <button onClick={() => setManageTemplate({ ...t, originalTitle: t.title })} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">Manage</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Marketplace Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-glow-purple relative animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-foreground">Marketplace Settings</h3>
              <button 
                onClick={() => setShowSettings(false)} 
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              toast('success', 'Marketplace settings saved successfully');
              setShowSettings(false);
            }} className="space-y-4">
              
              {/* Allow Uploads toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <label className="text-sm font-semibold text-foreground block">Allow New Listings</label>
                  <span className="text-xs text-muted-foreground">Let creators upload templates</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={allowUploads} 
                  onChange={e => setAllowUploads(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary bg-background focus:ring-primary transition-all cursor-pointer"
                />
              </div>

              {/* Moderation required toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <label className="text-sm font-semibold text-foreground block">Require Admin Moderation</label>
                  <span className="text-xs text-muted-foreground">Review templates before publishing</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={moderationRequired} 
                  onChange={e => setModerationRequired(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary bg-background focus:ring-primary transition-all cursor-pointer"
                />
              </div>

              {/* Commission Rate */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Platform Commission (%)</label>
                <input 
                  type="number" 
                  value={commissionRate} 
                  onChange={e => setCommissionRate(Number(e.target.value))} 
                  min="0"
                  max="100"
                  placeholder="20"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              {/* Max File Size */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Max Template Size (MB)</label>
                <input 
                  type="number" 
                  value={maxFileSize} 
                  onChange={e => setMaxFileSize(Number(e.target.value))} 
                  min="1"
                  max="1000"
                  placeholder="50"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Template Modal */}
      {manageTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-glow-purple relative animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-foreground">Manage Template</h3>
              <button 
                onClick={() => setManageTemplate(null)} 
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template Card Preview */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 border border-border/50 mb-6">
              <img src={manageTemplate.preview} alt={manageTemplate.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{manageTemplate.title}</p>
                <p className="text-xs text-muted-foreground">by {manageTemplate.author} · {manageTemplate.sales} sales</p>
                <span className="text-xs font-bold text-primary">{manageTemplate.price}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveManagedTemplate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Template Title</label>
                <input 
                  type="text" 
                  value={manageTemplate.title} 
                  onChange={e => setManageTemplate({ ...manageTemplate, title: e.target.value })} 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Price (USD)</label>
                  <input 
                    type="text" 
                    value={manageTemplate.price} 
                    onChange={e => setManageTemplate({ ...manageTemplate, price: e.target.value })} 
                    placeholder="$3"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider block">Featured Listing</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={manageTemplate.featured || false} 
                      onChange={e => setManageTemplate({ ...manageTemplate, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-primary bg-background focus:ring-primary transition-all cursor-pointer"
                    />
                    <span className="text-sm text-foreground">Feature on Store</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-border mt-6">
                <button 
                  type="button" 
                  onClick={() => {
                    toast('error', `Template "${manageTemplate.title}" deleted successfully`);
                    setTemplateList(prev => prev.filter(item => item.title !== manageTemplate.originalTitle));
                    setManageTemplate(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-all"
                >
                  Delete Listing
                </button>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setManageTemplate(null)}
                    className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ─── Analytics ─────────────────────────────────────────────── */
export function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D'>('7D');

  const statsData = {
    '7D': [
      { label: 'Daily Active Users', value: '184K', delta: '+8%', up: true },
      { label: 'Designs Created Today', value: '62K', delta: '+12%', up: true },
      { label: 'New Signups (7d)', value: '8,490', delta: '+340', up: true },
      { label: 'Churn Rate', value: '2.1%', delta: '-0.3%', up: false },
    ],
    '30D': [
      { label: 'Daily Active Users', value: '198K', delta: '+14%', up: true },
      { label: 'Designs Created (30d)', value: '1.9M', delta: '+18%', up: true },
      { label: 'New Signups (30d)', value: '38,240', delta: '+2,450', up: true },
      { label: 'Churn Rate', value: '1.8%', delta: '-0.5%', up: false },
    ],
    '90D': [
      { label: 'Daily Active Users', value: '215K', delta: '+22%', up: true },
      { label: 'Designs Created (90d)', value: '5.8M', delta: '+25%', up: true },
      { label: 'New Signups (90d)', value: '118.5K', delta: '+12.4K', up: true },
      { label: 'Churn Rate', value: '1.6%', delta: '-0.8%', up: false },
    ],
  };

  const chartData = {
    '7D': {
      values: [840, 1020, 980, 1240, 1180, 890, 1340],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      title: 'Daily Signups (Last 7 Days)',
    },
    '30D': {
      values: [6200, 7100, 8500, 9200, 10800],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      title: 'Weekly Signups (Last 30 Days)',
    },
    '90D': {
      values: [34800, 38600, 42100],
      labels: ['Month 1', 'Month 2', 'Month 3'],
      title: 'Monthly Signups (Last 90 Days)',
    },
  };

  const featuresData = {
    '7D': [
      { feature: 'AI Image Generation', usage: 89, users: '164K' },
      { feature: 'Social Media Posts', usage: 76, users: '140K' },
      { feature: 'Logo Generator', usage: 64, users: '118K' },
      { feature: 'Template Editor', usage: 58, users: '107K' },
      { feature: 'Brand Kit', usage: 43, users: '79K' },
    ],
    '30D': [
      { feature: 'AI Image Generation', usage: 92, users: '172K' },
      { feature: 'Social Media Posts', usage: 78, users: '146K' },
      { feature: 'Logo Generator', usage: 62, users: '116K' },
      { feature: 'Template Editor', usage: 59, users: '110K' },
      { feature: 'Brand Kit', usage: 45, users: '84K' },
    ],
    '90D': [
      { feature: 'AI Image Generation', usage: 95, users: '204K' },
      { feature: 'Social Media Posts', usage: 82, users: '176K' },
      { feature: 'Logo Generator', usage: 60, users: '129K' },
      { feature: 'Template Editor', usage: 55, users: '118K' },
      { feature: 'Brand Kit', usage: 48, users: '103K' },
    ],
  };

  const geographyData = {
    '7D': [
      { region: 'North America', pct: 38, users: '798K' },
      { region: 'Europe', pct: 28, users: '588K' },
      { region: 'Asia Pacific', pct: 22, users: '462K' },
      { region: 'Latin America', pct: 8, users: '168K' },
      { region: 'Rest of World', pct: 4, users: '84K' },
    ],
    '30D': [
      { region: 'North America', pct: 40, users: '840K' },
      { region: 'Europe', pct: 26, users: '546K' },
      { region: 'Asia Pacific', pct: 24, users: '504K' },
      { region: 'Latin America', pct: 7, users: '147K' },
      { region: 'Rest of World', pct: 3, users: '63K' },
    ],
    '90D': [
      { region: 'North America', pct: 42, users: '903K' },
      { region: 'Europe', pct: 25, users: '537K' },
      { region: 'Asia Pacific', pct: 25, users: '537K' },
      { region: 'Latin America', pct: 6, users: '129K' },
      { region: 'Rest of World', pct: 2, users: '43K' },
    ],
  };

  const currentStats = statsData[timeframe];
  const currentChart = chartData[timeframe];
  const currentFeatures = featuresData[timeframe];
  const currentGeography = geographyData[timeframe];

  const maxSignups = Math.max(...currentChart.values);

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Analytics" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Platform Analytics</h2>
            <p className="text-sm text-muted-foreground">Platform-wide metrics and growth insights</p>
          </div>
          <div className="flex gap-2">
            {(['7D', '30D', '90D'] as const).map(p => (
              <button key={p} onClick={() => setTimeframe(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${timeframe === p ? 'gradient-primary text-white font-semibold' : 'border border-border text-muted-foreground hover:border-primary/30'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currentStats.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${s.up ? 'text-green-500' : 'text-destructive'}`}>
                {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-5">{currentChart.title}</h3>
          <div className="flex items-end gap-3 h-40">
            {currentChart.values.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col gap-2 h-full">
                {/* Bar Container */}
                <div className="flex-1 flex flex-col justify-end items-center">
                  <span className="text-[10px] sm:text-xs text-primary font-medium mb-1">{v}</span>
                  <div 
                    className="w-full rounded-t-lg gradient-primary hover:opacity-90 transition-all duration-300 cursor-pointer"
                    style={{ height: `${(v / maxSignups) * 80}%` }}
                    title={`${currentChart.labels[i]}: ${v} signups`}
                  />
                </div>
                {/* Label */}
                <span className="text-xs text-muted-foreground text-center">{currentChart.labels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Features Used</h3>
            <div className="space-y-3">
              {currentFeatures.map(f => (
                <div key={f.feature}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{f.feature}</span>
                    <span className="text-xs text-muted-foreground">{f.users} users</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${f.usage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Geographic Distribution</h3>
            <div className="space-y-3">
              {currentGeography.map(r => (
                <div key={r.region} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{r.region}</span>
                      <span className="text-xs text-muted-foreground">{r.users}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-foreground w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ─── Content Moderation ─────────────────────────────────────── */
export function AdminModeration() {
  const [items, setItems] = useState([
    { type: 'template', title: 'Modern Business Card Set', author: 'designer@pixivisual.com', submittedAt: '2h ago', reason: 'New submission' },
    { type: 'template', title: 'E-commerce Banner Pack', author: 'creator@pixivisual.com', submittedAt: '5h ago', reason: 'New submission' },
    { type: 'report', title: 'Inappropriate content report', author: 'System', submittedAt: '1d ago', reason: 'User report' },
    { type: 'template', title: 'Social Media Story Kit', author: 'freelancer@pixivisual.com', submittedAt: '1d ago', reason: 'New submission' },
    { type: 'account', title: 'Agency account upgrade request', author: 'agency@pixivisual.com', submittedAt: '2d ago', reason: 'Plan upgrade' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const typeColors: Record<string, string> = {
    template: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    report: 'bg-red-500/10 text-red-600',
    account: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  const approve = (i: number) => {
    toast('success', `${items[i].title} approved!`);
    setItems(p => p.filter((_, idx) => idx !== i));
  };
  const reject = (i: number) => {
    toast('error', `${items[i].title} rejected.`);
    setItems(p => p.filter((_, idx) => idx !== i));
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    toast('info', 'Refreshing moderation queue...');
    setTimeout(() => {
      const pool = [
        { type: 'template', title: 'Modern Business Card Set', author: 'designer@pixivisual.com', submittedAt: '2h ago', reason: 'New submission' },
        { type: 'template', title: 'E-commerce Banner Pack', author: 'creator@pixivisual.com', submittedAt: '5h ago', reason: 'New submission' },
        { type: 'report', title: 'Inappropriate content report', author: 'System', submittedAt: '1d ago', reason: 'User report' },
        { type: 'template', title: 'Social Media Story Kit', author: 'freelancer@pixivisual.com', submittedAt: '1d ago', reason: 'New submission' },
        { type: 'account', title: 'Agency account upgrade request', author: 'agency@pixivisual.com', submittedAt: '2d ago', reason: 'Plan upgrade' },
        { type: 'template', title: 'Minimalist Portfolio Page', author: 'artistic@pixivisual.com', submittedAt: '1h ago', reason: 'New submission' },
        { type: 'report', title: 'Copyright infringement claim', author: 'Copyright Bot', submittedAt: '3h ago', reason: 'IP owner report' },
        { type: 'account', title: 'Enterprise plan request', author: 'enterprise@corporate.com', submittedAt: '4h ago', reason: 'Plan upgrade' },
      ];
      // Randomly select 4 to 6 items from the pool to make it feel alive
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 3) + 4; // 4 to 6 items
      setItems(shuffled.slice(0, count));
      setIsRefreshing(false);
      toast('success', 'Moderation queue updated!');
    }, 800);
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Content Moderation" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Content Moderation</h2>
            <p className="text-sm text-muted-foreground">{items.length} items pending review</p>
          </div>
          <button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 disabled:opacity-55 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Check className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-1">Queue is clear!</h3>
            <p className="text-sm text-muted-foreground">All items have been reviewed.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Pending Items</h3>
              <span className="text-xs bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold">{items.length} pending</span>
            </div>
            <div className="divide-y divide-border">
              {items.map((item, i) => (
                <div key={i} className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>{item.type}</span>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">by {item.author} · {item.submittedAt} · {item.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-7">
                    <button onClick={() => approve(i)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => reject(i)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 text-xs font-medium hover:bg-red-500/20 transition-all">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button onClick={() => toast('info', `Reviewing ${item.title}...`)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-muted-foreground text-xs font-medium hover:border-primary/30 transition-all">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ─── Reports ────────────────────────────────────────────────── */
export function AdminReports() {
  const reports = [
    { title: 'Monthly Revenue Report', type: 'Financial', generated: 'Jul 1, 2025', size: '2.4 MB', status: 'ready' },
    { title: 'User Growth Analysis', type: 'Growth', generated: 'Jul 1, 2025', size: '1.8 MB', status: 'ready' },
    { title: 'Content Moderation Summary', type: 'Moderation', generated: 'Jun 30, 2025', size: '840 KB', status: 'ready' },
    { title: 'Marketplace Performance Q2', type: 'Marketplace', generated: 'Jun 30, 2025', size: '3.2 MB', status: 'ready' },
    { title: 'Churn & Retention Report', type: 'Retention', generated: 'Generating...', size: '—', status: 'generating' },
  ];

  const typeColors: Record<string, string> = {
    Financial: 'bg-green-500/10 text-green-600 dark:text-green-400',
    Growth: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    Moderation: 'bg-orange-500/10 text-orange-600',
    Marketplace: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    Retention: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Reports" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Platform Reports</h2>
            <p className="text-sm text-muted-foreground">Generate and download platform reports</p>
          </div>
          <button onClick={() => toast('success', 'Custom report queued for generation...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Generate Report
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Available Reports</h3>
          </div>
          <div className="divide-y divide-border">
            {reports.map((r, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-foreground truncate">{r.title}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${typeColors[r.type]}`}>{r.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.generated} · {r.size}</p>
                </div>
                {r.status === 'generating' ? (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
                  </div>
                ) : (
                  <button onClick={() => toast('success', `Downloading ${r.title}...`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Reports Generated', value: '284', delta: 'This month' },
            { label: 'Scheduled Reports', value: '12', delta: 'Auto-generated' },
            { label: 'Data Coverage', value: '99.9%', delta: 'Uptime' },
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
