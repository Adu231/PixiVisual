import { useState } from 'react';
import { Briefcase, DollarSign, Star, Clock, Plus, Check, Eye, TrendingUp, Image, ArrowRight, MessageSquare, History, X, Trash2, Edit } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import {
  useFreelancerProjectsState,
  addFreelancerProject,
  updateFreelancerProject,
  deleteFreelancerProject,
  FreelancerProject
} from './freelancerStore';

const sidebarItems = [
  { label: 'Portfolio', href: '/dashboard/freelancer/portfolio', icon: Image },
  { label: 'Projects', href: '/dashboard/freelancer/projects', icon: Briefcase },
  { label: 'Proposals', href: '/dashboard/freelancer/proposals', icon: Check },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/freelancer/analytics', icon: TrendingUp },
  { label: 'History', href: '/dashboard/freelancer/history', icon: History },
];

const reviews = [
  { client: 'Startup X', rating: 5, comment: 'Absolutely amazing work! Sam delivered beyond expectations.', date: '3 days ago' },
  { client: 'TechFlow', rating: 5, comment: 'Fast turnaround and exceptional quality. Will definitely hire again!', date: '1 week ago' },
  { client: 'GrowthHQ', rating: 4, comment: 'Great communication and solid design skills.', date: '2 weeks ago' },
];

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const [projects] = useFreelancerProjectsState();

  // Modal States
  const [selectedProj, setSelectedProj] = useState<FreelancerProject | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newDue, setNewDue] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const activeProjectsList = projects.filter(p => p.status !== 'completed');
  const monthlyEarningsVal = projects.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.budget, 0) + 4450;

  const stats = [
    { label: 'Active Projects', value: activeProjectsList.length.toString(), delta: '+1 this week', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'Monthly Earnings', value: formatCurrency(monthlyEarningsVal), delta: '+18%', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Avg Rating', value: '4.9★', delta: '48 reviews', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Unread Messages', value: '3', delta: 'Reply needed', icon: MessageSquare, color: 'from-blue-500 to-purple-500' },
  ];

  const statusStyles: Record<string, string> = {
    'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    review: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    new: 'bg-green-500/10 text-green-600 dark:text-green-400',
    completed: 'bg-muted text-muted-foreground',
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim() || !newBudget.trim()) return;

    addFreelancerProject({
      title: newTitle,
      client: newClient,
      due: newDue || 'TBD',
      budget: parseFloat(newBudget),
      status: 'new',
      desc: newDesc || 'No description provided.',
      deliverables: ['Initial concept drafts', 'Design specification sync', 'Final assets delivery']
    });

    toast('success', 'Project created successfully!');
    setIsCreateOpen(false);
    // Reset Form
    setNewTitle('');
    setNewClient('');
    setNewBudget('');
    setNewDue('');
    setNewDesc('');
  };

  const handleMarkDelivered = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    updateFreelancerProject(id, { status: 'completed', progress: 100 });
    toast('success', 'Project marked as delivered!');
    if (selectedProj && selectedProj.id === id) {
      setSelectedProj(prev => prev ? { ...prev, status: 'completed', progress: 100 } : null);
    }
  };

  const handleDeleteProj = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    deleteFreelancerProject(id);
    toast('success', 'Project moved to history trash!');
    setIsDetailOpen(false);
    setSelectedProj(null);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Freelancer Hub" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Your Freelance Hub</h2>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
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

        {/* Active Projects */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Active Projects</h3>
          </div>
          <div className="divide-y divide-border">
            {activeProjectsList.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-xs">
                No active projects found. Click "New Project" to start.
              </div>
            ) : (
              activeProjectsList.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => { setSelectedProj(p); setIsDetailOpen(true); }}
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.client}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary">{formatCurrency(p.budget)}</p>
                      <div className="flex items-center gap-1 justify-end text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />{p.due}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8 text-right">{p.progress}%</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[p.status]}`}>{p.status.replace('-', ' ')}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProj(p); setIsDetailOpen(true); }} 
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/30 transition-all"
                    >
                      <Eye className="w-3 h-3" /> View Details
                    </button>
                    {p.status === 'review' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMarkDelivered(p.id, e); }} 
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all"
                      >
                        <Check className="w-3 h-3" /> Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-display font-semibold text-foreground">Recent Reviews</h3>
          </div>
          <div className="divide-y divide-border">
            {reviews.map(r => (
              <div key={r.client} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{r.client}</span>
                  <div className="flex items-center gap-1">
                    {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">{r.date}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'This Month', value: formatCurrency(monthlyEarningsVal), delta: '+18%', color: 'text-green-500' },
            { label: 'Last Month', value: formatCurrency(3770), delta: 'Paid', color: 'text-muted-foreground' },
            { label: 'All Time', value: formatCurrency(monthlyEarningsVal + 28900 - 4450), delta: '2 years', color: 'text-primary' },
          ].map(e => (
            <div key={e.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{e.label}</p>
              <p className="text-xl font-display font-bold text-foreground">{e.value}</p>
              <p className={`text-xs font-medium mt-1 ${e.color}`}>{e.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Website Overhaul"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Client Name</label>
                <input
                  type="text"
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Budget ($)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={e => setNewBudget(e.target.value)}
                    placeholder="1500"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Due Date</label>
                  <input
                    type="text"
                    value={newDue}
                    onChange={e => setNewDue(e.target.value)}
                    placeholder="e.g. Jul 30"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Describe the scope of work..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all min-h-[80px]"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {isDetailOpen && selectedProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => { setIsDetailOpen(false); setSelectedProj(null); }} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => { setIsDetailOpen(false); setSelectedProj(null); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-display font-bold text-foreground leading-snug">{selectedProj.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                    selectedProj.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                  }`}>{selectedProj.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{selectedProj.client} · Budget {formatCurrency(selectedProj.budget)}</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Scope / Description</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedProj.desc || 'No description provided.'}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Project Progress & Deliverables</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${selectedProj.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{selectedProj.progress}%</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(selectedProj.deliverables || ['Initial mockup templates', 'Figma specifications handoff', 'Production asset bundle']).map((d, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedProj.progress === 100 || (selectedProj.progress === 90 && index < 2) || (selectedProj.progress === 65 && index < 1)
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={
                        selectedProj.progress === 100 || (selectedProj.progress === 90 && index < 2) || (selectedProj.progress === 65 && index < 1)
                          ? 'line-through opacity-70'
                          : ''
                      }>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border/40">
                {selectedProj.status !== 'completed' && (
                  <button
                    onClick={() => handleMarkDelivered(selectedProj.id)}
                    className="flex-1 py-2 rounded-xl gradient-primary text-white font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1.5 transition-all shadow-glow-purple"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark Delivered
                  </button>
                )}
                <button
                  onClick={() => handleDeleteProj(selectedProj.id)}
                  className="flex-1 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

