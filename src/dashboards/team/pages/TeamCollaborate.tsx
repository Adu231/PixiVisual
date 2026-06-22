import { useState } from 'react';
import { Users, Plus, MessageSquare, Check, Clock, Search, Mail, Shield, Edit } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const members = [
  { id: '1', name: 'Sara Kim', role: 'Brand Designer', dept: 'Design', email: 'sara@globalbrand.com', status: 'online', access: 'Editor', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=48&h=48&fit=crop&crop=face', projects: 14, joined: 'Jan 2024' },
  { id: '2', name: 'David Park', role: 'Content Lead', dept: 'Marketing', email: 'david@globalbrand.com', status: 'online', access: 'Editor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face', projects: 22, joined: 'Feb 2024' },
  { id: '3', name: 'Aisha Patel', role: 'UX Designer', dept: 'Product', email: 'aisha@globalbrand.com', status: 'away', access: 'Viewer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face', projects: 8, joined: 'Mar 2024' },
  { id: '4', name: 'Tom Walsh', role: 'Campaign Manager', dept: 'Marketing', email: 'tom@globalbrand.com', status: 'offline', access: 'Editor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face', projects: 18, joined: 'Jan 2024' },
  { id: '5', name: 'Lisa Chen', role: 'Brand Strategist', dept: 'Strategy', email: 'lisa@globalbrand.com', status: 'online', access: 'Admin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face', projects: 31, joined: 'Nov 2023' },
  { id: '6', name: 'Ryan Scott', role: 'Motion Designer', dept: 'Design', email: 'ryan@globalbrand.com', status: 'away', access: 'Editor', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face', projects: 11, joined: 'Apr 2024' },
];

const statusDot: Record<string, string> = { online: 'bg-green-500', away: 'bg-yellow-500', offline: 'bg-muted-foreground' };
const accessColors: Record<string, string> = {
  Admin: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Editor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Viewer: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
};

const pendingInvites = [
  { email: 'john@partner.com', role: 'Viewer', sent: '2d ago' },
  { email: 'maria@agency.com', role: 'Editor', sent: '1w ago' },
];

export default function TeamCollaborate() {
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = () => {
    if (!inviteEmail.trim()) { toast('warning', 'Please enter an email'); return; }
    toast('success', `Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInvite(false);
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Team Collaboration" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Team Collaboration</h2>
            <p className="text-sm text-muted-foreground">{members.length} members · {members.filter(m => m.status === 'online').length} online now</p>
          </div>
          <button onClick={() => setShowInvite(!showInvite)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> Invite Member
          </button>
        </div>

        {showInvite && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Invite Team Member</h3>
            <div className="flex gap-3">
              <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@company.com"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-all" />
              <select className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none">
                <option>Editor</option><option>Viewer</option><option>Admin</option>
              </select>
              <button onClick={handleInvite} className="px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-all">
                Send Invite
              </button>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Members', value: members.length, icon: Users },
            { label: 'Online Now', value: members.filter(m => m.status === 'online').length, icon: Check },
            { label: 'Pending Invites', value: pendingInvites.length, icon: Mail },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-2">
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members by name, role, or department..." className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none" />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Member</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Access</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${statusDot[m.status]}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{m.dept}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />{m.joined}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${accessColors[m.access]}`}>
                      <Shield className="w-2.5 h-2.5" />{m.access}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toast('info', `Messaging ${m.name}...`)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                        <MessageSquare className="w-3 h-3" />
                      </button>
                      <button onClick={() => toast('info', `Editing ${m.name}'s role...`)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                        <Edit className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pendingInvites.length > 0 && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Pending Invitations</h3>
            </div>
            <div className="divide-y divide-border">
              {pendingInvites.map((inv, i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{inv.email}</p>
                    <p className="text-xs text-muted-foreground">{inv.role} · Sent {inv.sent}</p>
                  </div>
                  <button onClick={() => toast('info', `Resending invite to ${inv.email}...`)} className="text-xs text-primary hover:underline">Resend</button>
                  <button onClick={() => toast('info', `Revoking invite...`)} className="text-xs text-destructive hover:underline">Revoke</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
