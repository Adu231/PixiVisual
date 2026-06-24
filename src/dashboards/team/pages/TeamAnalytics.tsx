import { useState } from 'react';
import { BarChart2, TrendingUp, Users, Palette, Eye, Download, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

// Datasets for 30D (Default)
const metrics30D = [
  { label: 'Total Assets Created', value: '1,172', delta: '+89', up: true, icon: Palette },
  { label: 'Team Productivity', value: '94%', delta: '+3%', up: true, icon: TrendingUp },
  { label: 'Asset Downloads', value: '8,420', delta: '+12%', up: true, icon: Download },
  { label: 'Active Contributors', value: '36', delta: '-2', up: false, icon: Users },
];

const workspacePerf30D = [
  { name: 'Global HQ', assets: 620, downloads: 3840, consistency: 95 },
  { name: 'EMEA Region', assets: 285, downloads: 2210, consistency: 91 },
  { name: 'APAC Region', assets: 193, downloads: 1640, consistency: 88 },
  { name: 'Product Launch', assets: 74, downloads: 730, consistency: 82 },
];

const monthlyData30D = [
  { month: 'Jan', assets: 78, downloads: 640 },
  { month: 'Feb', assets: 95, downloads: 820 },
  { month: 'Mar', assets: 112, downloads: 910 },
  { month: 'Apr', assets: 134, downloads: 1040 },
  { month: 'May', assets: 148, downloads: 1180 },
  { month: 'Jun', assets: 89, downloads: 760 },
];

// Datasets for 7D
const metrics7D = [
  { label: 'Total Assets Created', value: '243', delta: '+14', up: true, icon: Palette },
  { label: 'Team Productivity', value: '96%', delta: '+1%', up: true, icon: TrendingUp },
  { label: 'Asset Downloads', value: '1,420', delta: '+4%', up: true, icon: Download },
  { label: 'Active Contributors', value: '28', delta: '+3', up: true, icon: Users },
];

const workspacePerf7D = [
  { name: 'Global HQ', assets: 98, downloads: 540, consistency: 96 },
  { name: 'EMEA Region', assets: 64, downloads: 380, consistency: 92 },
  { name: 'APAC Region', assets: 48, downloads: 290, consistency: 89 },
  { name: 'Product Launch', assets: 33, downloads: 210, consistency: 85 },
];

const monthlyData7D = [
  { month: 'Mon', assets: 12, downloads: 90 },
  { month: 'Tue', assets: 18, downloads: 140 },
  { month: 'Wed', assets: 25, downloads: 180 },
  { month: 'Thu', assets: 32, downloads: 220 },
  { month: 'Fri', assets: 28, downloads: 200 },
  { month: 'Sat', assets: 8, downloads: 70 },
  { month: 'Sun', assets: 14, downloads: 95 },
];

// Datasets for 90D
const metrics90D = [
  { label: 'Total Assets Created', value: '3,842', delta: '+284', up: true, icon: Palette },
  { label: 'Team Productivity', value: '92%', delta: '-1%', up: false, icon: TrendingUp },
  { label: 'Asset Downloads', value: '24,820', delta: '+18%', up: true, icon: Download },
  { label: 'Active Contributors', value: '42', delta: '+8', up: true, icon: Users },
];

const workspacePerf90D = [
  { name: 'Global HQ', assets: 1890, downloads: 11240, consistency: 94 },
  { name: 'EMEA Region', assets: 980, downloads: 6840, consistency: 90 },
  { name: 'APAC Region', assets: 680, downloads: 4910, consistency: 87 },
  { name: 'Product Launch', assets: 292, downloads: 1830, consistency: 80 },
];

const monthlyData90D = [
  { month: 'Apr', assets: 340, downloads: 2840 },
  { month: 'May', assets: 410, downloads: 3210 },
  { month: 'Jun', assets: 480, downloads: 3910 },
];

export default function TeamAnalytics() {
  const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('30D');

  const activeMetrics = period === '7D' ? metrics7D : period === '90D' ? metrics90D : metrics30D;
  const activeWorkspacePerf = period === '7D' ? workspacePerf7D : period === '90D' ? workspacePerf90D : workspacePerf30D;
  const activeMonthlyData = period === '7D' ? monthlyData7D : period === '90D' ? monthlyData90D : monthlyData30D;

  const maxAssets = Math.max(...activeMonthlyData.map(d => d.assets));

  const handlePeriodChange = (p: '7D' | '30D' | '90D') => {
    setPeriod(p);
    toast('success', `Analytics data updated for ${p} range.`);
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Analytics" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Team Analytics</h2>
            <p className="text-sm text-muted-foreground">Brand performance across all workspaces</p>
          </div>
          <div className="flex gap-2">
            {(['7D', '30D', '90D'] as const).map(p => (
              <button key={p} onClick={() => handlePeriodChange(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  period === p ? 'gradient-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30'
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {activeMetrics.map(m => (
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
              <h3 className="text-sm font-display font-semibold text-foreground">
                {period === '7D' ? 'Assets Created per Day' : 'Assets Created per Month'}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">All workspaces combined</p>
            </div>
            <BarChart2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-3 h-48 pt-4 pb-2 px-2">
            {activeMonthlyData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] text-primary font-bold">{d.assets}</span>
                {/* Fixed height container for percentage scaling of the bar */}
                <div className="w-full h-32 flex items-end">
                  <div
                    className="w-full rounded-t-lg gradient-primary hover:opacity-90 transition-all cursor-pointer shadow-sm shadow-purple-500/20"
                    style={{ height: `${(d.assets / maxAssets) * 100}%` }}
                    title={`${d.month}: ${d.assets} assets`}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{d.month}</span>
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
              {activeWorkspacePerf.map(ws => (
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
