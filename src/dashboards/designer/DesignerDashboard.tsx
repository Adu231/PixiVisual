import { useState } from 'react';
import {
  Plus, Star, DollarSign, Eye, Download, Heart, Store, Palette,
  Image as ImageIcon, Briefcase, TrendingUp, ArrowRight, X, Trash2, Edit, History
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import {
  useDesignerDesignsState,
  addDesignerDesign,
  updateDesignerDesign,
  deleteDesignerDesign,
  DesignerDesign
} from '@/dashboards/designer/designerStore';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { IMAGE_PRESETS } from './pages/DesignerPages';

const sidebarItems = [
  { label: 'My Designs', href: '/dashboard/designer/designs', icon: ImageIcon },
  { label: 'Portfolio', href: '/dashboard/designer/portfolio', icon: Palette },
  { label: 'Marketplace', href: '/dashboard/designer/marketplace', icon: Store },
  { label: 'Client Projects', href: '/dashboard/designer/clients', icon: Briefcase },
  { label: 'Earnings', href: '/dashboard/designer/earnings', icon: DollarSign },
  { label: 'Analytics', href: '/dashboard/designer/analytics', icon: TrendingUp },
  { label: 'History', href: '/dashboard/designer/history', icon: History },
];

const earningsData = [
  { name: 'Jan', earnings: 320 },
  { name: 'Feb', earnings: 480 },
  { name: 'Mar', earnings: 350 },
  { name: 'Apr', earnings: 620 },
  { name: 'May', earnings: 550 },
  { name: 'Jun', earnings: 720 },
  { name: 'Jul', earnings: 420 },
];

export default function DesignerDashboard() {
  const { user } = useAuth();
  const [designs] = useDesignerDesignsState();

  // Modals state
  const [selectedDesign, setSelectedDesign] = useState<DesignerDesign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form fields
  const [modalType, setModalType] = useState<'design' | 'template'>('design');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Branding');
  const [newPrice, setNewPrice] = useState('5');
  const [newStatus, setNewStatus] = useState<'published' | 'draft'>('published');
  const [newThumb, setNewThumb] = useState(IMAGE_PRESETS[0].url);

  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('draft');
  const [editThumb, setEditThumb] = useState('');

  // Stats computation
  const totalSales = designs.reduce((acc, d) => acc + (d.sales ?? 0), 0);
  const totalEarnings = designs.reduce((acc, d) => acc + (d.revenue ?? 0), 0);
  const totalViews = designs.reduce((acc, d) => acc + (d.views ?? 0), 0);
  
  const designsWithRating = designs.filter(d => (d.rating ?? 0) > 0);
  const avgRating = designsWithRating.length > 0
    ? (designsWithRating.reduce((acc, d) => acc + (d.rating ?? 0), 0) / designsWithRating.length).toFixed(1)
    : '5.0';

  const stats = [
    { label: 'Templates Sold', value: totalSales, delta: '+23 this month', icon: Store, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Earnings', value: formatCurrency(totalEarnings), delta: '+$420 this month', icon: DollarSign, color: 'from-green-500 to-blue-500' },
    { label: 'Portfolio Views', value: `${(totalViews / 1000).toFixed(1)}K`, delta: '+15%', icon: Eye, color: 'from-blue-500 to-purple-500' },
    { label: 'Avg Rating', value: `${avgRating}★`, delta: `${designsWithRating.length} reviews`, icon: Star, color: 'from-orange-500 to-yellow-500' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const price = modalType === 'template' ? parseFloat(newPrice) : 0;

    addDesignerDesign({
      title: newTitle,
      type: newType,
      thumb: newThumb || IMAGE_PRESETS[0].url,
      status: newStatus,
      price,
      sales: modalType === 'template' ? Math.floor(Math.random() * 10) : 0,
      revenue: 0,
      views: Math.floor(Math.random() * 100) + 10,
      downloads: 0,
      rating: modalType === 'template' ? 5.0 : 0
    });

    toast('success', `${modalType === 'template' ? 'Template uploaded' : 'Design created'} successfully!`);
    setIsCreateOpen(false);
    setNewTitle('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign || !editTitle.trim()) return;

    updateDesignerDesign(selectedDesign.id, {
      title: editTitle,
      type: editType,
      price: selectedDesign.price && selectedDesign.price > 0 ? parseFloat(editPrice) : 0,
      status: editStatus,
      thumb: editThumb
    });

    toast('success', 'Design updated successfully!');
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

  const openEdit = (d: DesignerDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setEditTitle(d.title);
    setEditType(d.type);
    setEditPrice(d.price?.toString() || '0');
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
    <DashboardLayout sidebarItems={sidebarItems} title="Designer Studio" roleLabel="Designer">
      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Welcome Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Designer Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => {
                setModalType('template');
                setNewTitle('');
                setNewType('Branding');
                setNewPrice('5');
                setNewStatus('published');
                setNewThumb(IMAGE_PRESETS[0].url);
                setIsCreateOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <Download className="w-4 h-4" /> Upload Template
            </button>
            <button
              onClick={() => {
                setModalType('design');
                setNewTitle('');
                setNewType('UI/UX');
                setNewPrice('0');
                setNewStatus('draft');
                setNewThumb(IMAGE_PRESETS[0].url);
                setIsCreateOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple"
            >
              <Plus className="w-4 h-4" /> New Design
            </button>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* Earnings chart using Recharts */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col h-[280px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground">Monthly Earnings</h3>
            <span className="text-xs text-primary font-semibold">{formatCurrency(totalEarnings)} total</span>
          </div>
          <div className="w-full flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                <Area type="monotone" dataKey="earnings" name="Earnings" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-display font-semibold text-foreground">Your Templates</h3>
            <a href="/dashboard/designer/marketplace" className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
              View marketplace <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          {designs.filter(d => d.price && d.price > 0).length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
              No templates uploaded yet. Click "Upload Template" to start selling.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designs.filter(d => d.price && d.price > 0).map(t => (
                <div key={t.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all flex flex-col justify-between">
                  <div>
                    <img src={t.thumb} alt={t.title} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground truncate max-w-[200px]">{t.title}</h4>
                          <span className="text-xs text-muted-foreground">{t.type}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">${t.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{t.downloads}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating}</span>
                        <span className="text-green-500 font-semibold ml-auto">{formatCurrency((t.price ?? 0) * (t.downloads ?? 0))} earned</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEdit(t, e); }}
                      className="flex-1 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:border-primary/30 hover:bg-muted transition-all flex items-center justify-center gap-1"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openDelete(t, e); }}
                      className="py-1.5 px-3 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
                      title="Delete Template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Heart className="w-8 h-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-0.5">Your portfolio is getting attention!</h4>
            <p className="text-xs text-muted-foreground">Maya, {totalViews} designers and clients have viewed your work this month. Keep adding creations.</p>
          </div>
          <a href="/dashboard/designer/portfolio" className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0 shadow-glow-purple">
            View Portfolio
          </a>
        </div>
      </div>

      {/* CREATE / UPLOAD MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">
              {modalType === 'template' ? 'Upload New Template' : 'Create New Design Project'}
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder={modalType === 'template' ? 'e.g. Clean Identity Set' : 'e.g. Mobile Layout Mockup'}
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
                {modalType === 'template' ? (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Price ($)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                      min="1"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Initial Status</label>
                    <select
                      value={newStatus}
                      onChange={e => setNewStatus(e.target.value as 'published' | 'draft')}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                )}
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
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        newThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
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
                {modalType === 'template' ? 'Upload and Sell' : 'Create Project'}
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
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Edit Details</h3>
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
                    {['Branding', 'Social Media', 'Presentation', 'Marketing', 'UI/UX', 'Print'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {selectedDesign.price && selectedDesign.price > 0 ? (
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
                ) : (
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
                )}
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
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        editThumb === preset.url ? 'border-primary scale-[1.03] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
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
            <h3 className="text-base font-bold text-foreground mb-2">Delete confirmation</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to delete "{selectedDesign.title}"? This action cannot be undone.</p>
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
    </DashboardLayout>
  );
}
