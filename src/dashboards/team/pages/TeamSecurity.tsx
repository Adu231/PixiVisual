import { useState } from 'react';
import { Shield, Check, AlertTriangle, Lock, Key, Users, Eye, RefreshCw, X, Search, Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const securityChecks = [
  { id: 'sso', label: 'SSO (Single Sign-On)', status: 'enabled', desc: 'Azure AD connected', icon: Key },
  { id: 'mfa', label: 'Multi-Factor Authentication', status: 'enabled', desc: '44 of 44 members enrolled', icon: Shield },
  { id: 'soc2', label: 'SOC 2 Type II', status: 'certified', desc: 'Last audited: March 2025', icon: Check },
  { id: 'gdpr', label: 'GDPR Compliance', status: 'compliant', desc: 'EU data processing agreement active', icon: Lock },
  { id: 'ip', label: 'IP Allowlisting', status: 'partial', desc: '3 of 4 workspaces configured', icon: Eye },
  { id: 'session', label: 'Session Timeout', status: 'enabled', desc: 'Auto-logout after 8 hours', icon: RefreshCw },
];

const accessLog = [
  { user: 'Sara Kim', action: 'Logged in via SSO', time: '10m ago', ip: '203.0.113.42', location: 'Seoul, KR', status: 'Success' },
  { user: 'David Park', action: 'Downloaded 5 brand assets', time: '1h ago', ip: '198.51.100.12', location: 'Austin, TX', status: 'Success' },
  { user: 'Aisha Patel', action: 'Shared workspace with Agency', time: '3h ago', ip: '192.0.2.87', location: 'London, UK', status: 'Success' },
  { user: 'Unknown', action: 'Failed login attempt (blocked)', time: '6h ago', ip: '45.33.32.156', location: 'Unknown', status: 'Blocked', warning: true },
  { user: 'Tom Walsh', action: 'Changed access permissions', time: '8h ago', ip: '198.51.100.66', location: 'Chicago, IL', status: 'Success' },
];

const fullLogs = [
  { user: 'Sara Kim', action: 'Logged in via SSO', time: '10m ago', ip: '203.0.113.42', location: 'Seoul, KR', status: 'Success' },
  { user: 'David Park', action: 'Downloaded 5 brand assets', time: '1h ago', ip: '198.51.100.12', location: 'Austin, TX', status: 'Success' },
  { user: 'Aisha Patel', action: 'Shared workspace with Agency', time: '3h ago', ip: '192.0.2.87', location: 'London, UK', status: 'Success' },
  { user: 'Unknown', action: 'Failed login attempt (blocked)', time: '6h ago', ip: '45.33.32.156', location: 'Unknown', status: 'Blocked', warning: true },
  { user: 'Tom Walsh', action: 'Changed access permissions', time: '8h ago', ip: '198.51.100.66', location: 'Chicago, IL', status: 'Success' },
  { user: 'Sara Kim', action: 'Uploaded brand assets v3', time: '12h ago', ip: '203.0.113.42', location: 'Seoul, KR', status: 'Success' },
  { user: 'David Park', action: 'Created APAC Workspace', time: '1d ago', ip: '198.51.100.12', location: 'Austin, TX', status: 'Success' },
  { user: 'System Alert', action: 'Auto-backed up assets repository', time: '1d ago', ip: 'N/A', location: 'Cloud Server', status: 'Success' },
  { user: 'Aisha Patel', action: 'Revoked invitation for designer@pixi.com', time: '2d ago', ip: '192.0.2.87', location: 'London, UK', status: 'Success' },
];

export default function TeamSecurity() {
  const [checksList, setChecksList] = useState(securityChecks);
  const [securityScore, setSecurityScore] = useState(96);
  const [showIPConfig, setShowIPConfig] = useState(false);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [ipRanges, setIpRanges] = useState('192.168.1.1/32, 203.0.113.0/24');
  const [searchQuery, setSearchQuery] = useState('');

  const handleConfigureIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipRanges.trim()) {
      toast('warning', 'Please enter at least one valid IP range');
      return;
    }
    setChecksList(prev => prev.map(c => {
      if (c.id === 'ip') {
        return { ...c, status: 'enabled', desc: 'All workspaces configured (HQ IP restricted)' };
      }
      return c;
    }));
    setSecurityScore(100);
    setShowIPConfig(false);
    toast('success', 'IP Allowlisting enabled. Workspace score raised to 100%!');
  };

  const filteredLogs = fullLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Security" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Security & Compliance</h2>
            <p className="text-sm text-muted-foreground">Enterprise-grade security across all workspaces</p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
            <Check className="w-3 h-3" /> Security Status: {securityScore === 100 ? 'Fully Secure' : 'Secure'}
          </span>
        </div>

        {/* Security Score */}
        <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-display font-bold text-foreground">Security Score: {securityScore}/100</h3>
                <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                  {securityScore === 100 ? 'Compliant' : 'Excellent'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {securityScore === 100 
                  ? 'Your workspace is fully compliant with all company security checks.' 
                  : 'Your workspace meets enterprise security standards. Enable IP allowlisting on all workspaces to reach 100/100.'}
              </p>
            </div>
          </div>
        </div>

        {/* Security Checks */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Security Controls</h3>
          </div>
          <div className="divide-y divide-border">
            {checksList.map(check => (
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
                  <button onClick={() => setShowIPConfig(true)}
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
            <button onClick={() => setShowAuditLogs(true)} className="text-xs text-primary hover:underline">View Full Log</button>
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

      {/* IP Allowlist Modal */}
      {showIPConfig && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowIPConfig(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              IP Allowlisting Setup
            </h3>
            <p className="text-xs text-muted-foreground">Restrict workspace access to secure company network nodes</p>

            <form onSubmit={handleConfigureIP} className="space-y-4 my-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">IP Range / CIDR Blocks</label>
                <textarea
                  value={ipRanges}
                  onChange={(e) => setIpRanges(e.target.value)}
                  className="w-full h-24 px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all font-mono"
                  placeholder="Enter IP ranges (comma-separated)"
                  required
                />
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  Example: `192.168.1.1/32` (Single host) or `203.0.113.0/24` (Network block).
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowIPConfig(false)}
                  className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-colors flex items-center gap-1.5 shadow-glow-purple"
                >
                  <Save className="w-4 h-4" /> Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Log Viewer Modal */}
      {showAuditLogs && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setShowAuditLogs(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Audit Log
              </h3>
              <p className="text-xs text-muted-foreground">Comprehensive access and transaction records for all team members</p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search audit logs by user, action, IP, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-foreground"
              />
            </div>

            {/* Logs Table */}
            <div className="flex-1 overflow-auto border border-border rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground">
                    <th className="p-3">User</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs text-foreground">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No logs match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log, idx) => (
                      <tr key={idx} className={`hover:bg-muted/20 transition-colors ${log.warning ? 'bg-destructive/5' : ''}`}>
                        <td className="p-3 font-semibold">{log.user}</td>
                        <td className="p-3">{log.action}</td>
                        <td className="p-3 font-mono text-[10px]">{log.ip}</td>
                        <td className="p-3">{log.location}</td>
                        <td className="p-3 text-muted-foreground">{log.time}</td>
                        <td className="p-3">
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowAuditLogs(false)}
                className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-xl text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
