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
  const users = Object.values(MOCK_USERS);
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
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

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="User Management" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">User Management</h2>
            <p className="text-sm text-muted-foreground">2.1M registered users · {users.length} demo accounts</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast('info', 'Opening user export...')} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 transition-all">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={() => toast('info', 'Opening invite modal...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
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
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
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
                        <button onClick={() => toast('info', `Viewing ${u.name}'s profile...`)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-all">
                          <Eye className="w-3 h-3 text-muted-foreground" />
                        </button>
                        <button onClick={() => toast('info', `More options for ${u.name}...`)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-all">
                          <MoreVertical className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ─── Revenue ─────────────────────────────────────────────────── */
export function AdminRevenue() {
  const monthly = [62000, 78000, 71000, 89000, 95000, 82000, 88000, 104000, 98000, 112000, 108000, 121000];
  const maxVal = Math.max(...monthly);
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Revenue" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Revenue Overview</h2>
            <p className="text-sm text-muted-foreground">Platform revenue and subscription metrics</p>
          </div>
          <button onClick={() => toast('info', 'Downloading revenue report...')} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 transition-all">
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
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg gradient-primary opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${(v / maxVal) * 100}%` }} title={`${monthLabels[i]}: ${formatCurrency(v)}`} />
                <span className="text-xs text-muted-foreground">{monthLabels[i].slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Plan</h3>
            <div className="space-y-3">
              {[
                { plan: 'Enterprise', revenue: formatCurrency(421000), pct: 50, color: 'bg-purple-500' },
                { plan: 'Business', revenue: formatCurrency(253000), pct: 30, color: 'bg-blue-500' },
                { plan: 'Pro', revenue: formatCurrency(126000), pct: 15, color: 'bg-primary' },
                { plan: 'Free (Ads)', revenue: formatCurrency(42000), pct: 5, color: 'bg-muted-foreground' },
              ].map(r => (
                <div key={r.plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{r.plan}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{r.pct}%</span>
                      <span className="text-xs font-semibold text-foreground">{r.revenue}</span>
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
              {[
                { user: 'Agency Corp', plan: 'Enterprise', amount: '$299', date: '2h ago', status: 'success' },
                { user: 'StyleHouse', plan: 'Business', amount: '$49', date: '4h ago', status: 'success' },
                { user: 'Alex Rivera', plan: 'Pro', amount: '$19', date: '6h ago', status: 'success' },
                { user: 'Demo Co', plan: 'Pro', amount: '$19', date: '1d ago', status: 'refunded' },
                { user: 'TechStart', plan: 'Business', amount: '$49', date: '1d ago', status: 'success' },
              ].map((t, i) => (
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
  const templates = [
    { title: 'Minimal Business Card', author: 'Maya Chen', category: 'Branding', sales: 234, price: '$3', status: 'active', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=90&fit=crop' },
    { title: 'Bold Social Media Kit', author: 'Alex Rivera', category: 'Social Media', sales: 189, price: '$5', status: 'active', preview: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=90&fit=crop' },
    { title: 'Corporate Presentation', author: 'Sam Torres', category: 'Presentation', sales: 142, price: '$8', status: 'active', preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=90&fit=crop' },
    { title: 'Modern Logo Pack', author: 'Jordan Lee', category: 'Branding', sales: 98, price: '$12', status: 'pending', preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=120&h=90&fit=crop' },
    { title: 'E-commerce Banner Set', author: 'Marcus Williams', category: 'Marketing', sales: 76, price: '$6', status: 'pending', preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=90&fit=crop' },
  ];

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Marketplace" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Marketplace Management</h2>
            <p className="text-sm text-muted-foreground">Moderate and manage template listings</p>
          </div>
          <button onClick={() => toast('info', 'Opening marketplace settings...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
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
              <button onClick={() => toast('info', 'Filtering listings...')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:border-primary/30 transition-all">
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {templates.map((t, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <img src={t.preview} alt={t.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-foreground truncate">{t.title}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${t.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600'}`}>{t.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">by {t.author} · {t.category} · {t.sales} sales · {t.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.status === 'pending' ? (
                    <>
                      <button onClick={() => toast('success', `${t.title} approved!`)} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">Approve</button>
                      <button onClick={() => toast('error', `${t.title} rejected.`)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 text-xs font-medium hover:bg-red-500/20 transition-all">Reject</button>
                    </>
                  ) : (
                    <button onClick={() => toast('info', `Viewing ${t.title}...`)} className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:border-primary/30 transition-all">Manage</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ─── Analytics ─────────────────────────────────────────────── */
export function AdminAnalytics() {
  const weeklySignups = [840, 1020, 980, 1240, 1180, 890, 1340];
  const maxSignups = Math.max(...weeklySignups);

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Analytics" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Platform Analytics</h2>
            <p className="text-sm text-muted-foreground">Platform-wide metrics and growth insights</p>
          </div>
          <div className="flex gap-2">
            {['7D', '30D', '90D'].map(p => (
              <button key={p} onClick={() => toast('info', `Switching to ${p} view...`)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${p === '30D' ? 'gradient-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Daily Active Users', value: '184K', delta: '+8%', up: true },
            { label: 'Designs Created Today', value: '62K', delta: '+12%', up: true },
            { label: 'New Signups (7d)', value: '8,490', delta: '+340', up: true },
            { label: 'Churn Rate', value: '2.1%', delta: '-0.3%', up: false },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${s.up ? 'text-green-500' : 'text-green-500'}`}>
                <ArrowUp className="w-3 h-3" />{s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-5">Daily Signups (Last 7 Days)</h3>
          <div className="flex items-end gap-3 h-40">
            {weeklySignups.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-primary font-medium">{v}</span>
                <div className="w-full rounded-t-lg gradient-primary hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ height: `${(v / maxSignups) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Features Used</h3>
            <div className="space-y-3">
              {[
                { feature: 'AI Image Generation', usage: 89, users: '164K' },
                { feature: 'Social Media Posts', usage: 76, users: '140K' },
                { feature: 'Logo Generator', usage: 64, users: '118K' },
                { feature: 'Template Editor', usage: 58, users: '107K' },
                { feature: 'Brand Kit', usage: 43, users: '79K' },
              ].map(f => (
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
              {[
                { region: 'North America', pct: 38, users: '798K' },
                { region: 'Europe', pct: 28, users: '588K' },
                { region: 'Asia Pacific', pct: 22, users: '462K' },
                { region: 'Latin America', pct: 8, users: '168K' },
                { region: 'Rest of World', pct: 4, users: '84K' },
              ].map(r => (
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

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Content Moderation" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Content Moderation</h2>
            <p className="text-sm text-muted-foreground">{items.length} items pending review</p>
          </div>
          <button onClick={() => toast('info', 'Refreshing queue...')} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary/30 transition-all">
            <RefreshCw className="w-4 h-4" /> Refresh
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
