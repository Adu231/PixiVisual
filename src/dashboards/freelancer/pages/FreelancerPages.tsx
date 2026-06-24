import { useState, useEffect } from 'react';
import {
  Briefcase, Star, DollarSign, Plus, BarChart2, Clock, Check, X, ArrowRight, Eye, Search, Trash2, Edit, History, RotateCcw, FileText, Send, Heart, Award
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import {
  useFreelancerPortfolioState,
  useFreelancerProjectsState,
  useFreelancerProposalsState,
  useFreelancerHistoryState,
  addFreelancerPortfolio,
  updateFreelancerPortfolio,
  deleteFreelancerPortfolio,
  addFreelancerProject,
  updateFreelancerProject,
  deleteFreelancerProject,
  addFreelancerProposal,
  updateFreelancerProposal,
  deleteFreelancerProposal,
  restoreFreelancerHistoryItem,
  deleteFreelancerHistoryItem,
  FreelancerPortfolioItem,
  FreelancerProject,
  FreelancerProposal,
  FreelancerDeletedItem
} from '../freelancerStore';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const freelancerSidebarItems = [
  { label: 'Portfolio', href: '/dashboard/freelancer/portfolio', icon: Star },
  { label: 'Projects', href: '/dashboard/freelancer/projects', icon: Briefcase },
  { label: 'Proposals', href: '/dashboard/freelancer/proposals', icon: Check },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/freelancer/analytics', icon: BarChart2 },
  { label: 'History', href: '/dashboard/freelancer/history', icon: History },
];

export const PORTFOLIO_PRESETS = [
  { name: 'Brand Identity for TechCo', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop' },
  { name: 'E-commerce UI Redesign', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
  { name: 'Mobile App Design', url: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400&h=300&fit=crop' },
  { name: 'Marketing Campaign Assets', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
  { name: 'Logo Design Collection', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
  { name: 'Social Media Package', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop' }
];

const MOCK_JOBS = [
  { id: 'job_1', title: 'Brand Identity Design', client: 'AlphaTech', budget: '$1200-1500', category: 'Branding', desc: 'We need a comprehensive brand guidelines book, logo assets, and social media templates for a tech startup.' },
  { id: 'job_2', title: 'Mobile Wallet UI Design', client: 'PaySimple', budget: '$2000-2500', category: 'UI/UX', desc: 'Looking for a UI/UX specialist to craft 12 custom mobile pages for our upcoming finance app. Figma file must be highly structured.' },
  { id: 'job_3', title: 'Product Showcase Banners', client: 'FreshBites', budget: '$500-700', category: 'Marketing', desc: 'Need high-quality web banners to advertise our food delivery app subscription services.' },
  { id: 'job_4', title: 'Vector Illustration Set', client: 'SaaSify', budget: '$800-1000', category: 'Illustration', desc: 'Create 8 bespoke illustrations for our website landing page to explain our core products.' }
];

// ──────────────────────────────────────────────────────────────────
// 1. PORTFOLIO PAGE
// ──────────────────────────────────────────────────────────────────
export function FreelancerPortfolio() {
  const [portfolio] = useFreelancerPortfolioState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FreelancerPortfolioItem | null>(null);
  const [previewItem, setPreviewItem] = useState<FreelancerPortfolioItem | null>(null);

  // Form inputs
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [image, setImage] = useState('');

  const categories = ['All', 'Branding', 'UI/UX', 'Mobile UI', 'Marketing', 'Social Media'];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Branding');
    setImage(PORTFOLIO_PRESETS[0].url);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (item: FreelancerPortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setIsAddEditOpen(true);
  };

  const handleDelete = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFreelancerPortfolio(id);
    toast('success', `"${title}" moved to history trash!`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;

    if (editingItem) {
      updateFreelancerPortfolio(editingItem.id, { title, category, image });
      toast('success', 'Portfolio item updated successfully!');
    } else {
      addFreelancerPortfolio({ title, category, image });
      toast('success', 'Portfolio item added successfully!');
    }
    setIsAddEditOpen(false);
  };

  const filteredItems = portfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Portfolio" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Portfolio</h2>
            <p className="text-sm text-muted-foreground">{portfolio.length} featured works · Stateful & Editable</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> Add Work
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-glow-purple'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search designs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm font-semibold">No portfolio items found</p>
            <p className="text-xs text-muted-foreground mt-1">Try resetting your search query or add a new piece.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlays */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center gap-2">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity duration-300">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPreviewItem(item); }}
                        className="w-9 h-9 rounded-full bg-white/95 text-gray-800 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleOpenEdit(item, e)}
                        className="w-9 h-9 rounded-full bg-white/95 text-primary hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Edit Item"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, item.title, e)}
                        className="w-9 h-9 rounded-full bg-white/95 text-red-600 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.category}</p>
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground border-t border-border/40 pt-2.5">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views} views</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{item.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {isAddEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddEditOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsAddEditOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">
              {editingItem ? 'Edit Portfolio Piece' : 'Add New Portfolio Piece'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Brand Refresh Kit"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Select Preset Design Thumbnail</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {PORTFOLIO_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        image === p.url ? 'border-primary scale-95 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
                <label className="text-2xs font-medium text-muted-foreground mb-1 block">Or enter custom URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setPreviewItem(null)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setPreviewItem(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-video bg-neutral-900">
              <img src={previewItem.image} alt={previewItem.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-6">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider">{previewItem.category}</span>
              <h3 className="text-lg font-display font-bold text-foreground mt-2">{previewItem.title}</h3>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <span>Views: <strong>{previewItem.views}</strong></span>
                <span>Likes: <strong>{previewItem.likes}</strong></span>
                <span>Author: Sam Torres</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 2. PROJECTS PAGE
// ──────────────────────────────────────────────────────────────────
export function FreelancerProjects() {
  const [projects] = useFreelancerProjectsState();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All'); // 'All' | 'Active' | 'Completed'

  // Modals state
  const [selectedProj, setSelectedProj] = useState<FreelancerProject | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newDue, setNewDue] = useState('');
  const [newDesc, setNewDesc] = useState('');

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
      deliverables: ['Initial mockup prototypes', 'Figma presentation specifications', 'Final package delivery']
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
    toast('success', 'Project marked as completed/delivered!');
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

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusTab === 'Active') {
      return matchesSearch && p.status !== 'completed';
    } else if (statusTab === 'Completed') {
      return matchesSearch && p.status === 'completed';
    }
    return matchesSearch;
  });

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Projects" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Active Projects</h2>
            <p className="text-sm text-muted-foreground">{projects.filter(p => p.status !== 'completed').length} active contracts, {projects.filter(p => p.status === 'completed').length} completed</p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-muted p-1 rounded-xl w-fit">
            {['All', 'Active', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search contracts/clients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Project List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm font-semibold">No projects found</p>
            <p className="text-xs text-muted-foreground mt-1">Try changing status filters or create a new custom project.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map(p => (
              <div
                key={p.id}
                onClick={() => { setSelectedProj(p); setIsDetailOpen(true); }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider capitalize ${statusStyles[p.status]}`}>
                        {p.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.client} · Due <strong>{p.due}</strong></p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-sm font-extrabold text-primary">{formatCurrency(p.budget)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground w-8 text-right">{p.progress}%</span>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40 text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProj(p); setIsDetailOpen(true); }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border font-semibold text-foreground hover:border-primary/30 hover:bg-muted/40 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                    {p.status !== 'completed' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMarkDelivered(p.id, e); }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500/20 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" /> Complete
                      </button>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteProj(p.id, e); }}
                    className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Landing Page Overhaul"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Client Name</label>
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
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Budget ($)</label>
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
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Due Date</label>
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
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Description</label>
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
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    selectedProj.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                  }`}>{selectedProj.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{selectedProj.client} · Budget {formatCurrency(selectedProj.budget)}</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Scope / Description</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedProj.desc || 'No description provided.'}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Project Progress & Deliverables</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${selectedProj.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{selectedProj.progress}%</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {(selectedProj.deliverables || ['Initial concept mockups', 'Client presentation specifications', 'Final delivery hand-off']).map((d, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedProj.progress === 100 || (selectedProj.progress === 90 && index < 2) || (selectedProj.progress === 65 && index < 1)
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Check className="w-3 h-3" />
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

              <div className="flex gap-2.5 pt-4 border-t border-border/40">
                {selectedProj.status !== 'completed' && (
                  <button
                    onClick={() => handleMarkDelivered(selectedProj.id)}
                    className="flex-1 py-2.5 rounded-xl gradient-primary text-white font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1.5 transition-all shadow-glow-purple"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark Delivered
                  </button>
                )}
                <button
                  onClick={() => handleDeleteProj(selectedProj.id)}
                  className="flex-1 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
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

// ──────────────────────────────────────────────────────────────────
// 3. PROPOSALS PAGE
// ──────────────────────────────────────────────────────────────────
export function FreelancerProposals() {
  const [proposals] = useFreelancerProposalsState();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All'); // 'All' | 'Pending' | 'Accepted' | 'Rejected'

  // Modals state
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof MOCK_JOBS[0] | null>(null);
  const [proposalBudget, setProposalBudget] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [selectedProposal, setSelectedProposal] = useState<FreelancerProposal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenApply = (job: typeof MOCK_JOBS[0]) => {
    setSelectedJob(job);
    setProposalBudget(job.budget);
    setCoverLetter('Hello! I would love to help you design this asset pack. I have a detailed portfolio of high-quality items and fast turnaround speeds. Let me know when we can align.');
    setIsApplyOpen(true);
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !proposalBudget.trim()) return;

    addFreelancerProposal({
      title: selectedJob.title,
      client: selectedJob.client,
      budget: proposalBudget,
      coverLetter: coverLetter
    });

    toast('success', `Proposal sent to ${selectedJob.client}!`);
    setIsApplyOpen(false);
    setSelectedJob(null);
  };

  const handleDeleteProp = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFreelancerProposal(id);
    toast('success', `Proposal "${title}" moved to history trash!`);
    setIsDetailOpen(false);
    setSelectedProposal(null);
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusTab === 'All') return matchesSearch;
    return matchesSearch && p.status === statusTab.toLowerCase();
  });

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Proposals" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Proposals</h2>
            <p className="text-sm text-muted-foreground">{proposals.filter(p => p.status === 'pending').length} pending feedback, {proposals.filter(p => p.status === 'accepted').length} accepted</p>
          </div>
        </div>

        {/* Available Jobs / Apply Board */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" /> Available Projects to Apply
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOCK_JOBS.map(job => (
              <div key={job.id} className="border border-border/80 rounded-xl p-4 bg-muted/20 flex flex-col justify-between hover:border-primary/25 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase tracking-wider">{job.category}</span>
                    <span className="text-xs font-bold text-foreground">{job.budget}</span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">{job.title}</h4>
                  <p className="text-2xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{job.desc}</p>
                </div>
                <button
                  onClick={() => handleOpenApply(job)}
                  className="w-full py-1.5 rounded-lg bg-primary text-white text-2xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1"
                >
                  Apply For Job <Send className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sent proposals list */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground pl-1">Submitted Proposals</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex bg-muted p-1 rounded-xl w-fit">
              {['All', 'Pending', 'Accepted', 'Rejected'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusTab(tab)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    statusTab === tab
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search proposals..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {filteredProposals.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
              <Clock className="w-10 h-10 mx-auto mb-2 opacity-30 animate-pulse" />
              <p className="text-xs font-semibold">No submitted proposals found</p>
            </div>
          ) : (
            <div className="grid gap-3.5">
              {filteredProposals.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProposal(p); setIsDetailOpen(true); }}
                  className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      p.status === 'accepted'
                        ? 'bg-green-500/10 text-green-500'
                        : p.status === 'rejected'
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {p.status === 'accepted' ? <Check className="w-4 h-4" /> : p.status === 'rejected' ? <X className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-foreground truncate">{p.title}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          p.status === 'accepted'
                            ? 'bg-green-500/10 text-green-500'
                            : p.status === 'rejected'
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>{p.status}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.client} · Budget: <strong>{p.budget}</strong> · Sent {p.sent}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProposal(p); setIsDetailOpen(true); }}
                      className="text-xs text-primary hover:underline font-bold px-2 py-1"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => handleDeleteProp(p.id, p.title, e)}
                      className="p-1.5 rounded-lg border border-red-500/15 text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Proposal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* APPLY FORM MODAL */}
      {isApplyOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsApplyOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsApplyOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Apply for Job</h3>
            <p className="text-xs text-muted-foreground mb-4">Submit proposal to <strong>{selectedJob.client}</strong> for "{selectedJob.title}"</p>
            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Your Proposed Budget</label>
                <input
                  type="text"
                  value={proposalBudget}
                  onChange={e => setProposalBudget(e.target.value)}
                  placeholder="e.g. $1200"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself and explain why you're a great fit..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all min-h-[120px] leading-relaxed"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2 flex items-center justify-center gap-1.5">
                Send Proposal <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {isDetailOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/65 backdrop-blur-md" onClick={() => { setIsDetailOpen(false); setSelectedProposal(null); }} />
          <div className="bg-card border border-border rounded-3xl w-full max-w-md shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => { setIsDetailOpen(false); setSelectedProposal(null); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <div className="p-6 space-y-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider capitalize ${
                  selectedProposal.status === 'accepted' ? 'bg-green-500/10 text-green-500' : selectedProposal.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>{selectedProposal.status}</span>
                <h3 className="text-lg font-display font-bold text-foreground mt-2 leading-snug">{selectedProposal.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedProposal.client} · Proposed Bid: <strong>{selectedProposal.budget}</strong> · Sent {selectedProposal.sent}</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Submitted Cover Letter</h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/40 italic">
                  "{selectedProposal.coverLetter || 'No cover letter was included.'}"
                </p>
              </div>

              <div className="flex gap-2.5 pt-3 border-t border-border/40">
                <button
                  onClick={(e) => handleDeleteProp(selectedProposal.id, selectedProposal.title, e)}
                  className="flex-1 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 4. EARNINGS PAGE
// ──────────────────────────────────────────────────────────────────
export function FreelancerEarnings() {
  const [projects] = useFreelancerProjectsState();

  const completedProjects = projects.filter(p => p.status === 'completed');
  const activeProjects = projects.filter(p => p.status !== 'completed');

  // Compute live numeric values
  const monthlyEarningsVal = completedProjects.reduce((acc, p) => acc + p.budget, 0) + 4450;
  const pendingInvoices = activeProjects.reduce((acc, p) => acc + p.budget, 0);
  const totalEarningsAllTime = monthlyEarningsVal + 38200 - 4450;
  const avgProjectVal = projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.budget, 0) / projects.length) : 1280;

  // Earnings dataset
  const earningsData = [
    { month: 'Jan', earned: 2400 },
    { month: 'Feb', earned: 3100 },
    { month: 'Mar', earned: 2800 },
    { month: 'Apr', earned: 3800 },
    { month: 'May', earned: 4200 },
    { month: 'Jun', earned: monthlyEarningsVal },
  ];

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Earnings" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Earnings Center</h2>
          <p className="text-sm text-muted-foreground">Track your billings, paid invoices, and projected milestones</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'This Month', value: formatCurrency(monthlyEarningsVal), delta: '+$1,200 vs May', color: 'text-green-500' },
            { label: 'Total Earned', value: formatCurrency(totalEarningsAllTime), delta: 'Cumulative', color: 'text-primary' },
            { label: 'Pending Contracts', value: formatCurrency(pendingInvoices), delta: `${activeProjects.length} projects active`, color: 'text-yellow-500' },
            { label: 'Avg contract size', value: formatCurrency(avgProjectVal), delta: 'Steady growth', color: 'text-blue-500' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border shadow-sm rounded-2xl p-4">
              <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className="text-lg font-display font-bold text-foreground">{s.value}</div>
              <div className={`text-2xs font-semibold mt-1.5 ${s.color}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Charts block */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Earnings BarChart */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[320px] md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Monthly Earnings Breakdown</h3>
              <p className="text-xs text-muted-foreground mb-4">Paid payouts received by system over last 6 months</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.25} />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '11px', color: 'hsl(var(--foreground))' }} />
                  <Bar dataKey="earned" name="Earned Amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cumulative Cashflow Growth (AreaChart) */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[320px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Cumulative Growth</h3>
              <p className="text-xs text-muted-foreground mb-4">Overall balance progress trajectory</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: 'Jan', balance: 2400 },
                    { month: 'Feb', balance: 5500 },
                    { month: 'Mar', balance: 8300 },
                    { month: 'Apr', balance: 12100 },
                    { month: 'May', balance: 16300 },
                    { month: 'Jun', balance: 16300 + monthlyEarningsVal },
                  ]}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={9} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '10px' }} />
                  <Area type="monotone" dataKey="balance" name="Total Balance" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 5. ANALYTICS PAGE
// ──────────────────────────────────────────────────────────────────
export function FreelancerAnalytics() {
  const [projects] = useFreelancerProjectsState();
  const [proposals] = useFreelancerProposalsState();

  const totalProjects = projects.length;
  const proposalWinRate = proposals.length > 0
    ? Math.round((proposals.filter(p => p.status === 'accepted').length / proposals.length) * 100)
    : 42;

  // Chart datasets
  const viewsTrend = [
    { name: 'Mon', views: 120, conversions: 4 },
    { name: 'Tue', views: 230, conversions: 8 },
    { name: 'Wed', views: 180, conversions: 5 },
    { name: 'Thu', views: 290, conversions: 11 },
    { name: 'Fri', views: 340, conversions: 15 },
    { name: 'Sat', views: 420, conversions: 19 },
    { name: 'Sun', views: 260, conversions: 10 },
  ];

  const proposalDistribution = [
    { name: 'Accepted', value: proposals.filter(p => p.status === 'accepted').length || 2, color: '#10b981' },
    { name: 'Rejected', value: proposals.filter(p => p.status === 'rejected').length || 1, color: '#ef4444' },
    { name: 'Pending', value: proposals.filter(p => p.status === 'pending').length || 1, color: '#eab308' },
  ];

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="Analytics" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">Detailed metrics covering portfolio engagement and proposal win metrics</p>
        </div>

        {/* Metric panels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Profile Views', value: '1,840', delta: '+23% views' },
            { label: 'Proposal Win Rate', value: `${proposalWinRate}%`, delta: 'Accepted/Sent ratio' },
            { label: 'Avg Client Rating', value: '4.9★', delta: '48 client reviews' },
            { label: 'Job Lead Inquiries', value: proposals.length.toString(), delta: 'Applications submitted' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border shadow-sm rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-[10px] text-green-500 font-semibold mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Views Trend Area Chart */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Portfolio Traffic & Leads</h3>
              <p className="text-xs text-muted-foreground mb-4">Views and conversion inquiries over last week</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViewsFreelancer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="views" name="Views" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorViewsFreelancer)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proposal status pie chart */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Proposal Win Distribution</h3>
              <p className="text-xs text-muted-foreground mb-4">Acceptance status splits across all job applications</p>
            </div>
            <div className="w-full flex-1 min-h-0 flex items-center justify-around flex-col sm:flex-row">
              <div className="w-[150px] h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={proposalDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {proposalDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground mt-4 sm:mt-0">
                {proposalDistribution.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}:</span>
                    <span className="font-bold text-foreground">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 6. HISTORY PAGE (DELETED HISTORY)
// ──────────────────────────────────────────────────────────────────
export function FreelancerHistory() {
  const [history, setHistory] = useFreelancerHistoryState();
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleRestore = (id: string, title: string) => {
    const success = restoreFreelancerHistoryItem(id);
    if (success) {
      toast('success', `Successfully restored "${title}"!`);
    } else {
      toast('error', 'Failed to restore item.');
    }
  };

  const handlePermanentDelete = (id: string, title: string) => {
    deleteFreelancerHistoryItem(id);
    toast('success', `Permanently deleted "${title}" from history.`);
    setItemToDelete(null);
  };

  const handleClearAll = () => {
    localStorage.removeItem('pixivisual_freelancer_deleted_history');
    window.dispatchEvent(new Event('freelancer_history_changed'));
    toast('success', 'Deleted history trash cleared completely.');
    setIsClearConfirmOpen(false);
  };

  // Group by date formatted string
  const groupedHistory = history.reduce<Record<string, typeof history>>((acc, item) => {
    const dateStr = new Date(item.deletedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(item);
    return acc;
  }, {});

  const hasItems = history.length > 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'portfolio': return Star;
      case 'project': return Briefcase;
      case 'proposal': return FileText;
      default: return History;
    }
  };

  return (
    <DashboardLayout sidebarItems={freelancerSidebarItems} title="History" roleLabel="Freelancer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Deleted History</h2>
            <p className="text-sm text-muted-foreground">Manage and restore recently deleted items from your Freelancer workspace</p>
          </div>
          {hasItems && (
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              className="px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-all"
            >
              Clear Trash
            </button>
          )}
        </div>

        {!hasItems ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm font-semibold">History is empty</p>
            <p className="text-xs text-muted-foreground mt-1">Deleted items from portfolio, projects, and proposals will appear here for restoration.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([dateStr, items]) => (
              <div key={dateStr} className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">{dateStr}</h3>
                <div className="grid gap-3">
                  {items.map(item => {
                    const IconComp = getTypeIcon(item.originalType);
                    return (
                      <div
                        key={item.id}
                        className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-primary/15 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-neutral-900 border border-border/40" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                              <IconComp className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-foreground truncate">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground flex-wrap">
                              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider text-[8px]">{item.originalType}</span>
                              <span>· {item.category}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.deletedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleRestore(item.id, item.title)}
                            className="p-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-bold"
                            title="Restore Item"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Restore</span>
                          </button>
                          <button
                            onClick={() => setItemToDelete(item.id)}
                            className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLEAR ALL CONFIRMATION MODAL */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsClearConfirmOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Clear Deleted History</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to clear all history? This will permanently delete all logs and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsClearConfirmOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleClearAll} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL PERMANENT DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setItemToDelete(null)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Delete Permanently</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to delete this item permanently? This action is irreversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  const target = history.find(h => h.id === itemToDelete);
                  if (target) handlePermanentDelete(target.id, target.title);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
