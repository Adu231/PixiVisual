import { BarChart2, TrendingUp, Users, Palette, Eye, Download, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const metrics = [
  { label: 'Total Assets Created', value: '1,172', delta: '+89', up: true, icon: Palette },
  { label: 'Team Productivity', value: '94%', delta: '+3%', up: true, icon: TrendingUp },
  { label: 'Asset Downloads', value: '8,420', delta: '+12%', up: true, icon: Download },
  { label: 'Active Contributors', value: '36', delta: '-2', up: false, icon: Users },
];

const workspacePerf = [
  { name: 'Global HQ', assets: 620, downloads: 3840, consistency: 95 },
  { name: 'EMEA Region', assets: 285, downloads: 2210, consistency: 91 },
  { name: 'APAC Region', assets: 193, downloads: 1640, consistency: 88 },
  { name: 'Product Launch', assets: 74, downloads: 730, consistency: 82 },
];

const monthlyData = [
  { month: 'Jan', assets: 78, downloads: 640 },
  { month: 'Feb', assets: 95, downloads: 820 },
  { month: 'Mar', assets: 112, downloads: 910 },
  { month: 'Apr', assets: 134, downloads: 1040 },
  { month: 'May', assets: 148, downloads: 1180 },
  { month: 'Jun', assets: 89, downloads: 760 },
];

const maxAssets = Math.max(...monthlyData.map(d => d.assets));

export default function TeamAnalytics() {
  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Analytics" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Team Analytics</h2>
            <p className="text-sm text-muted-foreground">Brand performance across all workspaces</p>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-white" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${m.up ? 'text-green-500' : 'text-destructive'}`}>
                  {m.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {m.delta}
                </div>
              </div>
              <div className="text-xl font-display font-bold text-foreground">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Assets Created Chart */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Assets Created per Month</h3>
              <p className="text-xs text-muted-foreground mt-0.5">All workspaces combined</p>
            </div>
            <BarChart2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-primary font-medium">{d.assets}</span>
                <div
                  className="w-full rounded-t-lg gradient-primary hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ height: `${(d.assets / maxAssets) * 100}%` }}
                  title={`${d.month}: ${d.assets} assets`}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Performance Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Workspace Performance</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Workspace</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Assets</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Downloads</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Consistency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workspacePerf.map(ws => (
                <tr key={ws.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{ws.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-foreground">{ws.assets}</td>
                  <td className="px-4 py-3 text-right text-sm text-foreground hidden sm:table-cell">{ws.downloads.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-24">
                        <div className={`h-full rounded-full ${ws.consistency >= 90 ? 'bg-green-500' : ws.consistency >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                          style={{ width: `${ws.consistency}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{ws.consistency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Used Assets */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Top Used Assets This Month</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { name: 'Primary Logo', uses: 1243, type: 'Logo', trend: 'up' },
              { name: 'Icon Library v4', uses: 987, type: 'Icons', trend: 'up' },
              { name: 'Social Media Templates', uses: 654, type: 'Templates', trend: 'stable' },
              { name: 'Brand Color Palette', uses: 543, type: 'Colors', trend: 'up' },
              { name: 'Display Typeface', uses: 421, type: 'Typography', trend: 'down' },
            ].map((asset, i) => (
              <div key={asset.name} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                <span className="text-sm font-bold text-muted-foreground w-5 flex-shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{asset.uses.toLocaleString()}</span>
                  {asset.trend === 'up' ? <ArrowUp className="w-3 h-3 text-green-500" /> :
                   asset.trend === 'down' ? <ArrowDown className="w-3 h-3 text-destructive" /> :
                   <span className="w-3 h-3 text-muted-foreground">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
