import { useState } from 'react';
import { Users, DollarSign, BarChart2, Shield, Store, FileText, TrendingUp, AlertTriangle, Check, X, ArrowRight, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { MOCK_USERS } from '@/lib/auth';
import { adminSidebarItems } from './pages/AdminPages';

const pendingItems = [
  { type: 'template', title: 'Modern Business Card Set', author: 'designer@pixivisual.com', submittedAt: '2h ago' },
  { type: 'template', title: 'E-commerce Banner Pack', author: 'creator@pixivisual.com', submittedAt: '5h ago' },
  { type: 'report', title: 'Inappropriate content report', author: 'System', submittedAt: '1d ago' },
  { type: 'template', title: 'Social Media Story Kit', author: 'freelancer@pixivisual.com', submittedAt: '1d ago' },
  { type: 'account', title: 'Agency account upgrade request', author: 'agency@pixivisual.com', submittedAt: '2d ago' },
];

export default function AdminDashboard() {
  const users = Object.values(MOCK_USERS);
  const [modItems, setModItems] = useState(pendingItems);

  const handleApprove = (index: number) => {
    toast('success', `${modItems[index].title} approved!`);
    setModItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleReject = (index: number) => {
    toast('error', `${modItems[index].title} rejected.`);
    setModItems(prev => prev.filter((_, i) => i !== index));
  };

  const stats = [
    { label: 'Total Users', value: '2.1M', delta: '+12,340 this week', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Monthly Revenue', value: formatCurrency(842000), delta: '+18%', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Active Subscriptions', value: '184K', delta: '+2,100 this week', icon: TrendingUp, color: 'from-blue-500 to-purple-500' },
    { label: 'Pending Reviews', value: modItems.length.toString(), delta: 'Needs attention', icon: AlertTriangle, color: 'from-orange-500 to-red-500' },
  ];

  const planColors: Record<string, string> = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/10 text-primary',
    business: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    enterprise: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Admin Control Panel" roleLabel="Platform Admin">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Platform Overview</h2>
          <p className="text-sm text-muted-foreground">Real-time platform health and management</p>
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

        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground">Revenue (Last 7 Days)</h3>
            <span className="text-xs text-muted-foreground">Total: {formatCurrency(842000)}/mo</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {[62000, 78000, 71000, 89000, 95000, 82000, 88000].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg gradient-primary opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${(v / 95000) * 100}%` }} title={formatCurrency(v)} />
                <span className="text-xs text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Demo Users</h3>
              <button onClick={() => toast('info', 'Opening full user management...')}
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                Manage <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {users.slice(0, 6).map(u => (
                <div key={u.id} className="p-3.5 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${planColors[u.plan]}`}>{u.plan}</span>
                    <button onClick={() => toast('info', `Viewing ${u.name}'s profile...`)}
                      className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-all">
                      <Eye className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moderation Queue */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-sm font-display font-semibold text-foreground">Moderation Queue</h3>
              {modItems.length > 0 && (
                <span className="text-xs bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                  {modItems.length} pending
                </span>
              )}
            </div>
            {modItems.length === 0 ? (
              <div className="p-8 text-center">
                <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">All caught up! No pending items.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {modItems.map((item, i) => (
                  <div key={i} className="p-3.5">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.type === 'template' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : item.type === 'report' ? 'bg-red-500/10 text-red-600'
                        : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}>
                        {item.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">by {item.author} · {item.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(i)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">
                        <Check className="w-3 h-3" /> Approve
                      </button>
                      <button onClick={() => handleReject(i)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 text-xs font-medium hover:bg-red-500/20 transition-all">
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Subscription Distribution</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { plan: 'Free', count: '1.7M', pct: 82, color: 'bg-muted-foreground' },
              { plan: 'Pro', count: '287K', pct: 14, color: 'bg-primary' },
              { plan: 'Business', count: '82K', pct: 4, color: 'bg-blue-500' },
              { plan: 'Enterprise', count: '12K', pct: 0.6, color: 'bg-purple-500' },
            ].map(s => (
              <div key={s.plan} className="text-center">
                <div className="text-base font-display font-bold text-foreground">{s.count}</div>
                <div className="text-xs text-muted-foreground mb-2">{s.plan}</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${Math.max(s.pct, 5)}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
