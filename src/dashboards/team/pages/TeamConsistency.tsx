import { useState } from 'react';
import { Check, AlertTriangle, X, BarChart2, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const checks = [
  { id: '1', label: 'Color palette compliance', score: 95, status: 'excellent', workspace: 'Global HQ', issues: 3, trend: 'up' },
  { id: '2', label: 'Logo usage standards', score: 98, status: 'excellent', workspace: 'EMEA Region', issues: 1, trend: 'up' },
  { id: '3', label: 'Typography consistency', score: 88, status: 'good', workspace: 'APAC Region', issues: 7, trend: 'down' },
  { id: '4', label: 'Image style guidelines', score: 82, status: 'good', workspace: 'Product Launch', issues: 12, trend: 'stable' },
  { id: '5', label: 'Spacing & layout rules', score: 91, status: 'excellent', workspace: 'Agency Partners', issues: 4, trend: 'up' },
  { id: '6', label: 'Brand voice & tone', score: 76, status: 'warning', workspace: 'All Workspaces', issues: 19, trend: 'down' },
];

const violations = [
  { type: 'Color', desc: 'Off-brand purple used in EMEA campaign banner', workspace: 'EMEA Region', severity: 'low', time: '2h ago' },
  { type: 'Typography', desc: 'Incorrect font weight in APAC social post', workspace: 'APAC Region', severity: 'medium', time: '5h ago' },
  { type: 'Logo', desc: 'Logo placed on busy background in partner material', workspace: 'Agency Partners', severity: 'high', time: '1d ago' },
  { type: 'Tone', desc: 'Informal language used in product announcement', workspace: 'Product Launch', severity: 'medium', time: '1d ago' },
];

const statusColors: Record<string, string> = {
  excellent: 'text-green-600 dark:text-green-400',
  good: 'text-blue-600 dark:text-blue-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
};
const severityColors: Record<string, string> = {
  low: 'bg-green-500/10 text-green-600 dark:text-green-400',
  medium: 'bg-yellow-500/10 text-yellow-600',
  high: 'bg-red-500/10 text-red-600',
};

export default function TeamConsistency() {
  const [running, setRunning] = useState(false);
  const overallScore = Math.round(checks.reduce((sum, c) => sum + c.score, 0) / checks.length);

  const runCheck = async () => {
    setRunning(true);
    await new Promise(r => setTimeout(r, 2000));
    setRunning(false);
    toast('success', 'Brand consistency check complete!');
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Consistency Check" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Consistency Check</h2>
            <p className="text-sm text-muted-foreground">Last checked: 2 hours ago · Monitoring 4 workspaces</p>
          </div>
          <button onClick={runCheck} disabled={running}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple">
            <RefreshCw className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
            {running ? 'Checking...' : 'Run Check'}
          </button>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-primary/5 to-pink-500/5 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-muted/30" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="url(#scoreGrad)" strokeWidth="8" fill="none"
                  strokeDasharray={`${2.51 * overallScore} ${251 - 2.51 * overallScore}`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold gradient-primary-text">{overallScore}%</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Overall Brand Score</h3>
              <p className="text-sm text-muted-foreground mb-3">Your brand consistency is <strong className="text-foreground">Good</strong>. Focus on typography and brand voice to reach Excellent.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Excellent (90–100%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Good (75–89%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">Needs Work (&lt;75%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Check Results */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Check Results by Category</h3>
          </div>
          <div className="divide-y divide-border">
            {checks.map(check => (
              <div key={check.id} className="p-4 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  check.status === 'excellent' ? 'bg-green-500/10' : check.status === 'good' ? 'bg-blue-500/10' : 'bg-yellow-500/10'
                }`}>
                  {check.status === 'excellent' ? <Check className="w-4 h-4 text-green-500" /> :
                   check.status === 'good' ? <BarChart2 className="w-4 h-4 text-blue-500" /> :
                   <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium text-foreground">{check.label}</span>
                    <span className={`text-xs font-medium capitalize ${statusColors[check.status]}`}>{check.status}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      check.score >= 90 ? 'bg-green-500' : check.score >= 75 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} style={{ width: `${check.score}%` }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center justify-end gap-1 mb-0.5">
                    <span className="text-sm font-bold text-foreground">{check.score}%</span>
                    {check.trend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500" /> :
                     check.trend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500" /> : null}
                  </div>
                  <p className="text-xs text-muted-foreground">{check.issues} issues</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Violations */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Violations</h3>
            <span className="text-xs text-destructive font-medium">{violations.length} active</span>
          </div>
          <div className="divide-y divide-border">
            {violations.map((v, i) => (
              <div key={i} className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">{v.type}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${severityColors[v.severity]}`}>{v.severity}</span>
                  </div>
                  <p className="text-sm text-foreground">{v.desc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.workspace} · {v.time}</p>
                </div>
                <button onClick={() => toast('info', 'Opening violation details...')} className="text-xs text-primary hover:underline flex items-center gap-0.5 flex-shrink-0">
                  Fix <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
