import { Shield, Check, AlertTriangle, Lock, Key, Users, Eye, RefreshCw } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const securityChecks = [
  { label: 'SSO (Single Sign-On)', status: 'enabled', desc: 'Azure AD connected', icon: Key },
  { label: 'Multi-Factor Authentication', status: 'enabled', desc: '44 of 44 members enrolled', icon: Shield },
  { label: 'SOC 2 Type II', status: 'certified', desc: 'Last audited: March 2025', icon: Check },
  { label: 'GDPR Compliance', status: 'compliant', desc: 'EU data processing agreement active', icon: Lock },
  { label: 'IP Allowlisting', status: 'partial', desc: '3 of 4 workspaces configured', icon: Eye },
  { label: 'Session Timeout', status: 'enabled', desc: 'Auto-logout after 8 hours', icon: RefreshCw },
];

const accessLog = [
  { user: 'Sara Kim', action: 'Logged in via SSO', time: '10m ago', ip: '203.0.113.42', location: 'Seoul, KR' },
  { user: 'David Park', action: 'Downloaded 5 brand assets', time: '1h ago', ip: '198.51.100.12', location: 'Austin, TX' },
  { user: 'Aisha Patel', action: 'Shared workspace with Agency', time: '3h ago', ip: '192.0.2.87', location: 'London, UK' },
  { user: 'Unknown', action: 'Failed login attempt (blocked)', time: '6h ago', ip: '45.33.32.156', location: 'Unknown', warning: true },
  { user: 'Tom Walsh', action: 'Changed access permissions', time: '8h ago', ip: '198.51.100.66', location: 'Chicago, IL' },
];

export default function TeamSecurity() {
  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Security" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Security & Compliance</h2>
            <p className="text-sm text-muted-foreground">Enterprise-grade security across all workspaces</p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
            <Check className="w-3 h-3" /> Security Status: Secure
          </span>
        </div>

        {/* Security Score */}
        <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-display font-bold text-foreground">Security Score: 96/100</h3>
                <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">Excellent</span>
              </div>
              <p className="text-sm text-muted-foreground">Your workspace meets enterprise security standards. Enable IP allowlisting on all workspaces to reach 100/100.</p>
            </div>
          </div>
        </div>

        {/* Security Checks */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Security Controls</h3>
          </div>
          <div className="divide-y divide-border">
            {securityChecks.map(check => (
              <div key={check.label} className="p-4 flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  check.status === 'partial' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                }`}>
                  <check.icon className={`w-4 h-4 ${check.status === 'partial' ? 'text-yellow-500' : 'text-green-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground">{check.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium capitalize ${
                      check.status === 'partial' ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-green-500/10 text-green-600 dark:text-green-400'
                    }`}>{check.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{check.desc}</p>
                </div>
                {check.status === 'partial' && (
                  <button onClick={() => toast('info', `Configuring ${check.label}...`)}
                    className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all flex-shrink-0">
                    Configure
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Permission Management */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Access Permission Levels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { level: 'Admin', count: 3, perms: ['Full platform access', 'User management', 'Security settings', 'Billing control'] },
              { level: 'Editor', count: 28, perms: ['Create & edit assets', 'Upload files', 'Workspace access', 'Export designs'] },
              { level: 'Viewer', count: 13, perms: ['View assets', 'Download approved files', 'Comment on designs'] },
            ].map(perm => (
              <div key={perm.level} className="p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{perm.level}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{perm.count} members</span>
                </div>
                <div className="space-y-1.5">
                  {perm.perms.map(p => (
                    <div key={p} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check className="w-2.5 h-2.5 text-green-500 flex-shrink-0" />{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Log */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Access Log</h3>
            <button onClick={() => toast('info', 'Opening full audit log...')} className="text-xs text-primary hover:underline">View Full Log</button>
          </div>
          <div className="divide-y divide-border">
            {accessLog.map((log, i) => (
              <div key={i} className={`p-4 flex items-start gap-3 ${log.warning ? 'bg-destructive/5' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${log.warning ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                  {log.warning ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <Shield className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className={`font-semibold ${log.warning ? 'text-destructive' : ''}`}>{log.user}</span>
                    {' '}{log.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.ip} · {log.location} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
