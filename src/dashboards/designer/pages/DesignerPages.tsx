import { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon, Palette, Store, Briefcase, DollarSign,
  TrendingUp, Plus, Download, Star, Eye, X, Edit, Trash2, Search, Check, Clock, ShieldCheck, Share2, Heart, Award, FileText, Send, History, RotateCcw
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import {
  useDesignerDesignsState,
  addDesignerDesign,
  updateDesignerDesign,
  deleteDesignerDesign,
  DesignerDesign,
  useDeletedHistoryState,
  deleteDeletedHistoryItem,
  restoreDeletedHistoryItem
} from '@/dashboards/designer/designerStore';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const designerSidebarItems = [
  { label: 'My Designs', href: '/dashboard/designer/designs', icon: ImageIcon },
  { label: 'Portfolio', href: '/dashboard/designer/portfolio', icon: Palette },
  { label: 'Marketplace', href: '/dashboard/designer/marketplace', icon: Store },
  { label: 'Client Projects', href: '/dashboard/designer/clients', icon: Briefcase },
  { label: 'Earnings', href: '/dashboard/designer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/designer/analytics', icon: TrendingUp },
  { label: 'History', href: '/dashboard/designer/history', icon: History },
];

const styles = ['Minimalist', 'Neon', 'Photorealistic', 'Illustration', '3D Render', 'Vintage'];

export const IMAGE_PRESETS = [
  { name: 'Branding Guide', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop' },
  { name: 'Mobile App UI', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop' },
  { name: 'Pitch Deck Slides', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
  { name: 'Social Media Kit', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop' },
  { name: 'Creative Stationery', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop' },
  { name: 'Web Dashboard', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop' }
];

// ──────────────────────────────────────────────────────────────────
// 1. DESIGNS PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerDesigns() {
  const [designs] = useDesignerDesignsState();

  // Modal states
  const [selectedDesign, setSelectedDesign] = useState<DesignerDesign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Branding');
  const [newStatus, setNewStatus] = useState<'published' | 'draft'>('published');
  const [newThumb, setNewThumb] = useState(IMAGE_PRESETS[0].url);

  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('draft');
  const [editThumb, setEditThumb] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addDesignerDesign({
      title: newTitle,
      type: newType,
      thumb: newThumb,
      status: newStatus,
      price: 0,
      sales: 0,
      revenue: 0,
      views: 0,
      downloads: 0,
      rating: 0
    });

    toast('success', 'Design created successfully!');
    setIsCreateOpen(false);
    setNewTitle('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign || !editTitle.trim()) return;

    updateDesignerDesign(selectedDesign.id, {
      title: editTitle,
      type: editType,
      status: editStatus,
      thumb: editThumb
    });

    toast('success', 'Design settings updated successfully!');
    setIsEditOpen(false);
    setSelectedDesign(null);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDesign) return;
    deleteDesignerDesign(selectedDesign.id);
    toast('success', 'Design deleted successfully!');
    setIsDeleteOpen(false);
    setSelectedDesign(null);
  };

  const openPreview = (d: DesignerDesign) => {
    setSelectedDesign(d);
    setIsPreviewOpen(true);
  };

  const openEdit = (d: DesignerDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setEditTitle(d.title);
    setEditType(d.type);
    setEditStatus(d.status);
    setEditThumb(d.thumb || IMAGE_PRESETS[0].url);
    setIsEditOpen(true);
  };

  const openDelete = (d: DesignerDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setIsDeleteOpen(true);
  };

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="My Designs" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Designs</h2>
            <p className="text-sm text-muted-foreground">{designs.length} designs in your library</p>
          </div>
          <button
            onClick={() => {
              setNewTitle('');
              setNewType('UI/UX');
              setNewStatus('published');
              setNewThumb(IMAGE_PRESETS[0].url);
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> New Design
          </button>
        </div>

        {designs.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground shadow-sm">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm">No designs found. Create a new design to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {designs.map(d => (
              <div
                key={d.id}
                className="group bg-card border border-border hover:border-primary/30 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
                onClick={() => openPreview(d)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={d.thumb} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-1.5">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity duration-300">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEdit(d, e); }}
                        className="w-8 h-8 rounded-full bg-white/95 text-gray-800 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openDelete(d, e); }}
                        className="w-8 h-8 rounded-full bg-white/95 text-red-600 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${d.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-white'
                    }`}>{d.status}</span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground truncate">{d.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex justify-between items-center">
                    <span>{d.type}</span>
                    <span className="font-mono text-[9px] opacity-75">{d.updated}</span>
                  </p>
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
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Create New Design</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="App Mockup Concept"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    {['Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX', 'Print'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as 'published' | 'draft')}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Cover Presets */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Cover Thumbnail Preset</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setNewThumb(preset.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${newThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newThumb}
                  onChange={e => setNewThumb(e.target.value)}
                  placeholder="Or enter custom image URL..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                Create Design
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Edit Design Details</h3>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Design Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={editType}
                    onChange={e => setEditType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    {['Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX', 'Print'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as 'published' | 'draft')}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Cover Presets Edit */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Cover Thumbnail Preset</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setEditThumb(preset.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${editThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editThumb}
                  onChange={e => setEditThumb(e.target.value)}
                  placeholder="Or enter custom image URL..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Delete Design</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to delete "{selectedDesign.title}"? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {isPreviewOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <img src={selectedDesign.thumb} alt={selectedDesign.title} className="w-full h-64 object-cover bg-neutral-900" />
            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{selectedDesign.type}</span>
                <h3 className="text-base font-display font-bold text-foreground mt-0.5">{selectedDesign.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Updated {selectedDesign.updated}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => { setIsPreviewOpen(false); openEdit(selectedDesign, e); }}
                  className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={(e) => { setIsPreviewOpen(false); openDelete(selectedDesign, e); }}
                  className="flex-1 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
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
// 2. PORTFOLIO PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState([
    { title: 'Brand Identity System', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', likes: 234, views: 3400, desc: 'Complete brand identity book including typography, corporate design system, and custom SVG grid components.', tags: ['Branding', 'Identity', 'Typography'] },
    { title: 'UI Design Kit', thumb: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', likes: 189, views: 2800, desc: 'A rich responsive component set featuring layout items, cards, charts, and dark theme support.', tags: ['UI/UX', 'Figma', 'Components'] },
    { title: 'Motion Graphics Concept', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', likes: 142, views: 1900, desc: 'Engaging vector animations and visual loops rendered using modern web standards and smooth curves.', tags: ['Motion', 'Animation', 'Illustration'] },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newThumb, setNewThumb] = useState('https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop');

  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setPortfolioItems([
      { title: newTitle, thumb: newThumb, likes: 0, views: 0, desc: 'Custom creative design asset added to public showcase.', tags: ['Design', 'Creative'] },
      ...portfolioItems
    ]);
    toast('success', 'Project added to your public portfolio!');
    setIsAddOpen(false);
    setNewTitle('');
  };

  const handleLike = (title: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPortfolioItems(prev => prev.map(item => item.title === title ? { ...item, likes: item.likes + 1 } : item));
    if (selectedItem && selectedItem.title === title) {
      setSelectedItem(p => p ? { ...p, likes: p.likes + 1 } : null);
    }
    toast('success', 'Liked project!');
  };

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Portfolio" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Portfolio</h2>
            <p className="text-sm text-muted-foreground">Manage your public showcase projects</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> Add Showcase
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {portfolioItems.map(p => (
            <div
              key={p.title}
              onClick={() => { setSelectedItem(p); setIsDetailOpen(true); }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer"
            >
              <div className="relative aspect-video">
                <img src={p.thumb} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <p className="text-sm font-semibold text-foreground truncate">{p.title}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{p.views} views</span>
                  <button onClick={(e) => { e.stopPropagation(); handleLike(p.title, e); }} className="flex items-center gap-1 text-pink-500 hover:scale-105 transition-transform">
                    <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />{p.likes} likes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO DETAILS MODAL */}
      {isDetailOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsDetailOpen(false)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsDetailOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <img src={selectedItem.thumb} alt={selectedItem.title} className="w-full h-64 object-cover bg-neutral-900" />
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold text-foreground leading-snug">{selectedItem.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{selectedItem.views} views</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />{selectedItem.likes} likes</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedItem.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-semibold">{t}</span>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => handleLike(selectedItem.title, e)}
                  className="flex-1 py-2 rounded-xl gradient-primary text-white font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1.5 transition-all shadow-glow-purple"
                >
                  <Star className="w-3.5 h-3.5 fill-white text-white" /> Like Showcase
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + `/portfolio/showcase`);
                    toast('success', 'Showcase link copied to clipboard!');
                  }}
                  className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD SHOWCASE MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsAddOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Add Project to Showcase</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Modern Brand Book"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Image Template Preset</label>
                <select
                  value={newThumb}
                  onChange={e => setNewThumb(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                >
                  <option value="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop">Gradient Wave</option>
                  <option value="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop">Minimal Canvas</option>
                  <option value="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop">Social Banner</option>
                  <option value="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop">Bold Typeface</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                Add Showcase Project
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 3. MARKETPLACE PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerMarketplace() {
  const [designs] = useDesignerDesignsState();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Modals state
  const [selectedDesign, setSelectedDesign] = useState<DesignerDesign | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [upTitle, setUpTitle] = useState('');
  const [upType, setUpType] = useState('Branding');
  const [upPrice, setUpPrice] = useState('5');
  const [upThumb, setUpThumb] = useState(IMAGE_PRESETS[0].url);

  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('published');
  const [editThumb, setEditThumb] = useState('');

  const templates = designs.filter(d => d.price && d.price > 0);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle.trim()) return;

    addDesignerDesign({
      title: upTitle,
      type: upType,
      thumb: upThumb,
      status: 'published',
      price: parseFloat(upPrice),
      sales: 0,
      revenue: 0,
      views: 0,
      downloads: 0,
      rating: 5.0
    });

    toast('success', 'Template uploaded to marketplace successfully!');
    setIsUploadOpen(false);
    setUpTitle('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign || !editTitle.trim()) return;

    updateDesignerDesign(selectedDesign.id, {
      title: editTitle,
      type: editType,
      price: parseFloat(editPrice),
      status: editStatus,
      thumb: editThumb
    });

    toast('success', 'Marketplace template updated successfully!');
    setIsEditOpen(false);
    setSelectedDesign(null);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDesign) return;
    deleteDesignerDesign(selectedDesign.id);
    toast('success', 'Marketplace listing deleted successfully!');
    setIsDeleteOpen(false);
    setSelectedDesign(null);
  };

  const openEdit = (d: DesignerDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setEditTitle(d.title);
    setEditType(d.type);
    setEditPrice(d.price?.toString() || '5');
    setEditStatus(d.status);
    setEditThumb(d.thumb || IMAGE_PRESETS[0].url);
    setIsEditOpen(true);
  };

  const openPreview = (d: DesignerDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setIsPreviewOpen(true);
  };

  const filtered = templates.filter(t => {
    const matchesCat = activeCategory === 'All' || t.type === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Marketplace" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Templates</h2>
            <p className="text-sm text-muted-foreground">{templates.length} templates listed on public storefront</p>
          </div>
          <button
            onClick={() => {
              setUpTitle('');
              setUpType('Branding');
              setUpPrice('5');
              setUpThumb(IMAGE_PRESETS[0].url);
              setIsUploadOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Upload Template
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            onClick={(e) => { e.currentTarget.querySelector('input')?.focus(); }}
            className="flex-1 bg-card border border-border rounded-xl px-3 py-2 flex items-center gap-2 cursor-text"
          >
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none text-foreground placeholder-muted-foreground w-full"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX'].map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeCategory === c ? 'gradient-primary text-white' : 'border border-border bg-card text-muted-foreground hover:border-primary/20'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground shadow-sm">
            No templates found matching your search.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => (
              <div
                key={t.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div
                  className="cursor-pointer"
                  onClick={(e) => openPreview(t, e)}
                >
                  <img src={t.thumb} alt={t.title} className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-foreground truncate">{t.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{t.type} · ${t.price}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{t.sales} sales</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />{t.rating}</span>
                      <span className="text-green-500 font-semibold ml-auto">{formatCurrency((t.price ?? 0) * (t.sales ?? 0))}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-border/40 flex gap-2">
                  <button
                    onClick={(e) => openEdit(t, e)}
                    className="flex-1 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:border-primary/30 transition-all flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" /> Edit Product
                  </button>
                  <button
                    onClick={(e) => openPreview(t, e)}
                    className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all flex items-center justify-center gap-1"
                  >
                    <Award className="w-3 h-3" /> Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsUploadOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsUploadOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Upload Marketplace Template</h3>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Template Title</label>
                <input
                  type="text"
                  value={upTitle}
                  onChange={e => setUpTitle(e.target.value)}
                  placeholder="e.g. Modern Pitch Deck"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={upType}
                    onChange={e => setUpType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    {['Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Price ($)</label>
                  <input
                    type="number"
                    value={upPrice}
                    onChange={e => setUpPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Cover Presets */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Cover Thumbnail Preset</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setUpThumb(preset.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${upThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={upThumb}
                  onChange={e => setUpThumb(e.target.value)}
                  placeholder="Or enter custom image URL..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                List Template for Sale
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEMPLATE MODAL */}
      {isEditOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Edit Product Listing</h3>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={editType}
                    onChange={e => setEditType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    {['Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Price ($)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as 'published' | 'draft')}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Cover Presets Edit */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Cover Thumbnail Preset</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setEditThumb(preset.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${editThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editThumb}
                  onChange={e => setEditThumb(e.target.value)}
                  placeholder="Or enter custom image URL..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsEditOpen(false); setIsDeleteOpen(true); }}
                  className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete Listing
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE TEMPLATE MODAL */}
      {isDeleteOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Delete Template Listing</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to delete the template listing "{selectedDesign.title}"? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL PREVIEW MODAL */}
      {isPreviewOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            <img src={selectedDesign.thumb} alt={selectedDesign.title} className="w-full h-64 object-cover bg-neutral-900" />
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{selectedDesign.type}</span>
                <h3 className="text-lg font-display font-bold text-foreground mt-0.5 leading-snug">{selectedDesign.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Updated {selectedDesign.updated}</p>
              </div>

              <div className="border-t border-border pt-4 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Price</span>
                  <span className="font-semibold text-foreground mt-0.5 block">${selectedDesign.price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Sales</span>
                  <span className="font-semibold text-foreground mt-0.5 block">{selectedDesign.sales}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Total Revenue</span>
                  <span className="font-semibold text-green-500 mt-0.5 block">{formatCurrency((selectedDesign.price ?? 0) * (selectedDesign.sales ?? 0))}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => { setIsPreviewOpen(false); openEdit(selectedDesign, e); }}
                  className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit Product
                </button>
                <button
                  onClick={() => {
                    toast('success', `Starting download for template asset: ${selectedDesign.title}...`);
                  }}
                  className="flex-1 py-2 rounded-xl gradient-primary text-white font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-glow-purple"
                >
                  <Download className="w-3.5 h-3.5" /> Download File
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
// 4. CLIENT PROJECTS PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerClients() {
  const [projects, setProjects] = useState([
    { id: 1, client: 'RetailBrand Co.', project: 'Brand Identity Redesign', due: 'Jul 20', budget: 4500, progress: 60, status: 'Active', desc: 'Comprehensive revamp of corporate brand assets, styleguides, and visual layout systems.', deliverables: ['Initial wireframes & layouts', 'Logo guidelines book', 'Marketing presentation mockup', 'Social media layouts handoff'] },
    { id: 2, client: 'TechStartup X', project: 'App UI Design System', due: 'Aug 5', budget: 6800, progress: 35, status: 'Active', desc: 'Design system built in Figma containing buttons, forms, nested widgets, and dark mode screens.', deliverables: ['Color palettes & typography', 'Component library & tokens', 'Mockup layout screens'] },
    { id: 3, client: 'EventAgency', project: 'Event Poster Collection', due: 'Jul 10', budget: 1200, progress: 90, status: 'Active', desc: 'High-quality printable posters and graphic templates for print media advertising campaigns.', deliverables: ['Concept sketch options', 'Final graphic illustrations layout', 'Print-ready PDF formats'] },
  ]);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [chatMessages, setChatMessages] = useState<Record<number, { sender: 'designer' | 'client'; text: string; time: string }[]>>({
    1: [
      { sender: 'client', text: 'Hi Maya, how is the brand guidelines document shaping up?', time: '2h ago' },
      { sender: 'designer', text: 'Hi! I have completed the final typography selection and grid system rules. Just finalizing the logo mockup layouts now.', time: '1h ago' },
      { sender: 'client', text: 'Excellent! That sounds perfect. Can we make sure we get a dark background logo option in the brand book?', time: '45m ago' },
      { sender: 'designer', text: 'Absolutely. I will include light, dark, and transparent logo guides in the brand book.', time: '30m ago' },
    ],
    2: [
      { sender: 'client', text: 'Hi Maya, can we make sure the button layouts are accessible under AA standards?', time: '1d ago' },
      { sender: 'designer', text: 'Yes, the styling matches contrast ratio guidelines (above 4.5:1) for both primary and hover states.', time: '18h ago' },
      { sender: 'client', text: 'Perfect, let me know when the tokens list is ready in Figma.', time: '4h ago' },
    ],
    3: [
      { sender: 'designer', text: 'Hi, I have updated the concept sketch posters under Option 2 based on your feedback.', time: '1d ago' },
      { sender: 'client', text: 'These look incredibly gorgeous! Love the color gradients. Let us proceed with this choice.', time: '12h ago' },
      { sender: 'designer', text: 'Great, starting clean vector rendering now.', time: '10h ago' },
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevChatActive = useRef(false);

  useEffect(() => {
    if (isChatActive && selectedProject) {
      const behavior = prevChatActive.current ? 'smooth' : 'auto';
      messagesEndRef.current?.scrollIntoView({ behavior });
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior });
      }, 50);
      prevChatActive.current = true;
      return () => clearTimeout(timer);
    } else {
      prevChatActive.current = false;
    }
  }, [isChatActive, selectedProject, chatMessages, isTyping]);

  const handleComplete = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setProjects(prev => prev.map(p => p.id === id ? { ...p, progress: 100, status: 'Completed' } : p));
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(p => p ? { ...p, progress: 100, status: 'Completed' } : null);
    }
    toast('success', 'Project marked as 100% complete!');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedProject) return;

    const projectId = selectedProject.id;
    const userMsg = typedMessage.trim();

    // Add user message
    setChatMessages(prev => ({
      ...prev,
      [projectId]: [
        ...(prev[projectId] || []),
        { sender: 'designer', text: userMsg, time: 'Just now' }
      ]
    }));

    setTypedMessage('');
    setIsTyping(true);

    // Simulate client response
    setTimeout(() => {
      const clientReplies = [
        "Thanks for the update, Maya! I will review this with the team.",
        "Perfect! Keep me updated on the progress.",
        "Sounds good. Let's connect once you finish the next deliverable.",
        "Aesthetic looks great! Thanks for handling that.",
        "Received, thank you! I'll look over it shortly."
      ];
      const randomReply = clientReplies[Math.floor(Math.random() * clientReplies.length)];

      setChatMessages(prev => ({
        ...prev,
        [projectId]: [
          ...(prev[projectId] || []),
          { sender: 'client', text: randomReply, time: 'Just now' }
        ]
      }));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Client Projects" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Client Projects</h2>
          <p className="text-sm text-muted-foreground">Active client commissions and status tracker</p>
        </div>

        <div className="grid gap-4">
          {projects.map(p => (
            <div
              key={p.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div
                className="cursor-pointer"
                onClick={() => { setSelectedProject(p); setIsWorkspaceOpen(true); }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors">{p.project}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${p.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                        }`}>{p.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.client} · Due {p.due}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatCurrency(p.budget)}</span>
                </div>
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{p.progress}%</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2 border-t border-border/40">
                {p.progress < 100 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleComplete(p.id, e); }}
                    className="px-3.5 py-1.5 rounded-xl border border-primary/20 text-primary hover:bg-primary/10 text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark Complete
                  </button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(p); setIsWorkspaceOpen(true); }}
                  className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted text-xs font-semibold transition-all"
                >
                  Open Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLIENT WORKSPACE DETAILS MODAL */}
      {isWorkspaceOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => { setIsWorkspaceOpen(false); setIsChatActive(false); }} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-200">
            <button onClick={() => { setIsWorkspaceOpen(false); setIsChatActive(false); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>

            {!isChatActive ? (
              <div className="p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-display font-bold text-foreground leading-snug">{selectedProject.project}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${selectedProject.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                      }`}>{selectedProject.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{selectedProject.client} · Budget {formatCurrency(selectedProject.budget)}</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Project Description</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedProject.desc}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Project Progress & Deliverables</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{selectedProject.progress}%</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {selectedProject.deliverables.map((d, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${selectedProject.progress === 100 || (selectedProject.progress === 90 && index < 2) || (selectedProject.progress === 60 && index < 1)
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-muted text-muted-foreground'
                          }`}>
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className={
                          selectedProject.progress === 100 || (selectedProject.progress === 90 && index < 2) || (selectedProject.progress === 60 && index < 1)
                            ? 'line-through opacity-70'
                            : ''
                        }>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {selectedProject.progress < 100 && (
                    <button
                      onClick={(e) => handleComplete(selectedProject.id, e)}
                      className="flex-1 py-2 rounded-xl gradient-primary text-white font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1.5 transition-all shadow-glow-purple"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Project Complete
                    </button>
                  )}
                  <button
                    onClick={() => setIsChatActive(true)}
                    className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Client Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsChatActive(false)}
                      className="px-2.5 py-1 rounded-xl border border-border bg-card text-foreground hover:bg-muted text-2xs font-semibold flex items-center gap-1"
                    >
                      &larr; Specs
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-none">{selectedProject.client}</h4>
                      <span className="text-[9px] text-green-500 font-semibold mt-0.5 inline-block">● client online</span>
                    </div>
                  </div>
                  <span className="text-3xs text-muted-foreground font-mono text-[10px] truncate max-w-[150px]">{selectedProject.project}</span>
                </div>

                {/* Chat Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/5">
                  {(chatMessages[selectedProject.id] || []).map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[75%] ${msg.sender === 'designer' ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-normal ${msg.sender === 'designer'
                        ? 'gradient-primary text-white rounded-tr-none'
                        : 'bg-card border border-border text-foreground rounded-tl-none'
                        }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-1 font-mono">{msg.time}</span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground italic mr-auto pl-1 animate-pulse">
                      <span>{selectedProject.client} is typing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card flex gap-2">
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={e => setTypedMessage(e.target.value)}
                    placeholder="Type message to client..."
                    className="flex-1 px-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl gradient-primary text-white hover:opacity-90 transition-all flex items-center justify-center flex-shrink-0 shadow-glow-purple"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 5. EARNINGS PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerEarnings() {
  const [designs] = useDesignerDesignsState();

  const [payoutMethod, setPayoutMethod] = useState('Stripe Direct Deposit');
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [tempPayout, setTempPayout] = useState('Stripe Direct Deposit');

  const totalTemplateSales = designs.reduce((acc, d) => acc + (d.sales ?? 0), 0);
  const totalTemplateRevenue = designs.reduce((acc, d) => acc + (d.revenue ?? 0), 0);
  const clientRevenue = 12500;
  const totalRevenue = totalTemplateRevenue + clientRevenue;

  const stats = [
    { label: 'Template Sales Revenue', value: formatCurrency(totalTemplateRevenue), delta: `${totalTemplateSales} templates sold` },
    { label: 'Client Project Revenue', value: formatCurrency(clientRevenue), delta: 'Active contract budgets' },
    { label: 'Total Earnings', value: formatCurrency(totalRevenue), delta: 'Template sales + commissions' },
    { label: 'Pending Payout', value: formatCurrency(1240), delta: 'Next payout: Jul 15' },
  ];

  const handlePayoutSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutMethod(tempPayout);
    toast('success', 'Payout method updated successfully!');
    setIsPayoutModalOpen(false);
  };

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Earnings" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Earnings</h2>
          <p className="text-sm text-muted-foreground">Detailed revenue metrics and payout schedules</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-semibold mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        <div
          onClick={() => { setTempPayout(payoutMethod); setIsPayoutModalOpen(true); }}
          className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all cursor-pointer"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Payout Information
          </h3>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between py-2 border-b border-border/40 hover:text-primary transition-colors">
              <span>Payout Method</span>
              <span className="font-semibold text-foreground flex items-center gap-1">{payoutMethod} <Edit className="w-3 h-3 text-primary" /></span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/40">
              <span>Minimum Payout Threshold</span>
              <span className="font-semibold text-foreground">$50.00 (Met)</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Next Payout Cycle</span>
              <span className="font-semibold text-foreground">15th of next month</span>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PAYOUT MODAL */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPayoutModalOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsPayoutModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Edit Payout Destination</h3>
            <form onSubmit={handlePayoutSave} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Method</label>
                <select
                  value={tempPayout}
                  onChange={e => setTempPayout(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                >
                  <option value="Stripe Direct Deposit">Stripe Direct Deposit</option>
                  <option value="PayPal Account Transfer">PayPal Account Transfer</option>
                  <option value="Bank Direct Wire (USD)">Bank Direct Wire (USD)</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 transition-all shadow-glow-purple mt-2">
                Update Payout Method
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 6. ANALYTICS PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerAnalytics() {
  const [designs] = useDesignerDesignsState();

  const totalTemplateSales = designs.reduce((acc, d) => acc + (d.sales ?? 0), 0);
  const totalTemplateViews = designs.reduce((acc, d) => acc + (d.views ?? 0), 0);

  const designsWithRating = designs.filter(d => (d.rating ?? 0) > 0);
  const avgRating = designsWithRating.length > 0
    ? (designsWithRating.reduce((acc, d) => acc + (d.rating ?? 0), 0) / designsWithRating.length).toFixed(1)
    : '5.0';

  // Multi-chart datasets
  const performanceData = [
    { name: 'Mon', views: 340, downloads: 42, sales: 8 },
    { name: 'Tue', views: 420, downloads: 68, sales: 12 },
    { name: 'Wed', views: 310, downloads: 35, sales: 5 },
    { name: 'Thu', views: 580, downloads: 90, sales: 22 },
    { name: 'Fri', views: 490, downloads: 75, sales: 15 },
    { name: 'Sat', views: 680, downloads: 110, sales: 29 },
    { name: 'Sun', views: 520, downloads: 82, sales: 19 },
  ];

  const sourceSplitData = [
    { name: 'Marketplace Templates', value: 45, color: '#3b82f6' },
    { name: 'Client Commissions', value: 40, color: '#ec4899' },
    { name: 'Custom Design Services', value: 15, color: '#10b981' },
  ];

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="Analytics" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Designer Analytics</h2>
          <p className="text-sm text-muted-foreground">Performance and sales visualization metrics</p>
        </div>

        {/* Numeric stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Portfolio Views', value: `${(totalTemplateViews / 1000).toFixed(1)}K`, delta: '+15%' },
            { label: 'Total Downloads', value: totalTemplateSales, delta: '+23 this month' },
            { label: 'Avg Rating', value: `${avgRating}★`, delta: `${designsWithRating.length} reviews` },
            { label: 'Repeat Client Rate', value: '68%', delta: '+5% growth' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border shadow-sm rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-semibold mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Charts block */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chart 1: AreaChart Views */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Portfolio Views Last 7 Days</h3>
              <p className="text-xs text-muted-foreground mb-4">Views overview generated on showcase designs</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c084fc" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                  <Area type="monotone" dataKey="views" name="Views" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: BarChart Downloads */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Downloads vs Template Sales</h3>
              <p className="text-xs text-muted-foreground mb-4">Correlation between file downloads and paid sales purchases</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Bar dataKey="downloads" name="Downloads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sales" name="Sales" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: PieChart Distribution */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-auto min-h-[300px] pb-6 sm:pb-5 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Earnings Distribution Split</h3>
              <p className="text-xs text-muted-foreground mb-4">Revenue breakdown divided by marketplace listing type</p>
            </div>
            <div className="w-full flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-around">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceSplitData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {sourceSplitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 gap-y-2 mt-4 sm:mt-0 text-xs">
                {sourceSplitData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-muted-foreground">{entry.name}:</span>
                    <span className="font-semibold text-foreground">{entry.value}%</span>
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
// 7. DELETED HISTORY PAGE
// ──────────────────────────────────────────────────────────────────
export function DesignerHistory() {
  const [history, setHistory] = useDeletedHistoryState();
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleRestore = (id: string, title: string) => {
    restoreDeletedHistoryItem(id);
    toast('success', `Restored "${title}" to your designs library!`);
  };

  const handlePermanentDelete = (id: string, title: string) => {
    deleteDeletedHistoryItem(id);
    toast('success', `Permanently deleted "${title}" from history.`);
    setItemToDelete(null);
  };

  const handleClearAll = () => {
    localStorage.removeItem('pixivisual_designer_deleted_history');
    window.dispatchEvent(new Event('designer_history_changed'));
    toast('success', 'Cleared all deleted history.');
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

  return (
    <DashboardLayout sidebarItems={designerSidebarItems} title="History" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Deleted History</h2>
            <p className="text-sm text-muted-foreground">Manage and restore recently deleted items</p>
          </div>
          {hasItems && (
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              className="px-3.5 py-1.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-all"
            >
              Clear History
            </button>
          )}
        </div>

        {!hasItems ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground shadow-sm">
            <History className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm font-semibold">History is empty</p>
            <p className="text-xs text-muted-foreground mt-1">Deleted items from designs and marketplace will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([dateStr, items]) => (
              <div key={dateStr} className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">{dateStr}</h3>
                <div className="grid gap-3">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-primary/15 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={item.thumb} alt={item.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-neutral-900 border border-border/40" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground flex-wrap">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">{item.type}</span>
                            {item.price !== undefined && item.price > 0 && (
                              <span>· Marketplace Item (${item.price})</span>
                            )}
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.deletedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleRestore(item.id, item.title)}
                          className="p-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-semibold"
                          title="Restore Design"
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
                  ))}
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
            <h3 className="text-base font-bold text-foreground mb-2">Permanently Delete Item</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to permanently delete this item from history? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetItem = history.find(item => item.id === itemToDelete);
                  if (targetItem) handlePermanentDelete(itemToDelete, targetItem.title);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
