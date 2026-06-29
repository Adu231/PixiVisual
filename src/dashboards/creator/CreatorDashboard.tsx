import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Image, Video, Share2, TrendingUp, Plus, Play,
  BarChart2, Clock, Star, ArrowRight, Zap, Layers, Trash2, Edit, X, Download,
  Instagram, Youtube, Twitter, Linkedin, Smartphone, BookOpen
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toast';
import { useCreatorDesignsState, addCreatorDesign, updateCreatorDesign, deleteCreatorDesign, CreatorDesign } from '@/dashboards/creator/creatorStore';

const sidebarItems = [
  { label: 'AI Studio', href: '/dashboard/creator/studio', icon: Sparkles },
  { label: 'My Designs', href: '/dashboard/creator/designs', icon: Image },
  { label: 'Templates', href: '/dashboard/creator/templates', icon: Layers },
  { label: 'Social Media', href: '/dashboard/creator/social', icon: Share2 },
  { label: 'Video Studio', href: '/dashboard/creator/video', icon: Video },
  { label: 'Analytics', href: '/dashboard/creator/analytics', icon: BarChart2 },
];

export default function CreatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [designs] = useCreatorDesignsState();

  useEffect(() => {
    const handleSearch = () => {
      setSearchQuery(new URLSearchParams(window.location.search).get('q') || '');
    };
    window.addEventListener('creator_search_changed', handleSearch);
    window.addEventListener('popstate', handleSearch);
    return () => {
      window.removeEventListener('creator_search_changed', handleSearch);
      window.removeEventListener('popstate', handleSearch);
    };
  }, []);

  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  // Modal States
  const [selectedDesign, setSelectedDesign] = useState<CreatorDesign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form Fields
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Social Media');
  const [newRatio, setNewRatio] = useState('1:1');
  const [newStyle, setNewStyle] = useState('Photorealistic');

  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('draft');

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) { toast('warning', 'Please enter a prompt first'); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);

    // Random Unsplash image for thumbnail simulation
    const typeImages: Record<string, string> = {
      'Instagram post': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'YouTube thumbnail': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=225&fit=crop',
      'Twitter graphic': 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=209&fit=crop',
      'LinkedIn banner': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=150&fit=crop',
    };
    const key = Object.keys(typeImages).find(k => aiPrompt.toLowerCase().includes(k)) || 'Instagram post';
    const thumb = typeImages[key] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop';

    addCreatorDesign({
      title: aiPrompt,
      type: aiPrompt.includes('thumbnail') ? 'YouTube' : 'Social Media',
      thumb,
      status: 'published',
      style: 'Neon',
      ratio: aiPrompt.includes('thumbnail') ? '16:9' : '1:1'
    });

    toast('success', 'Design generated successfully! Check your designs.');
    setAiPrompt('');
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) { toast('warning', 'Please enter a design title'); return; }

    const defaultThumbs: Record<string, string> = {
      'Social Media': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'YouTube': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=225&fit=crop',
      'Blog': 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=267&fit=crop',
      'Instagram Story': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=711&fit=crop',
      'LinkedIn': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=150&fit=crop',
      'Ad Creative': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    };
    const thumb = defaultThumbs[newType] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop';

    addCreatorDesign({
      title: newTitle,
      type: newType,
      thumb,
      status: 'draft',
      style: newStyle,
      ratio: newRatio
    });

    toast('success', 'Design created successfully!');
    setIsCreateOpen(false);
    setNewTitle('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign) return;
    if (!editTitle.trim()) { toast('warning', 'Please enter a design title'); return; }

    updateCreatorDesign(selectedDesign.id, {
      title: editTitle,
      type: editType,
      status: editStatus
    });

    toast('success', 'Design updated successfully!');
    setIsEditOpen(false);
    setSelectedDesign(null);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDesign) return;
    deleteCreatorDesign(selectedDesign.id);
    toast('success', 'Design deleted successfully!');
    setIsDeleteOpen(false);
    setIsPreviewOpen(false);
    setSelectedDesign(null);
  };

  const openPreview = (design: CreatorDesign) => {
    setSelectedDesign(design);
    setIsPreviewOpen(true);
  };

  const openEdit = (design: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(design);
    setEditTitle(design.title);
    setEditType(design.type);
    setEditStatus(design.status);
    setIsEditOpen(true);
    setIsPreviewOpen(false);
  };

  const openDelete = (design: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(design);
    setIsDeleteOpen(true);
  };

  const handleDownload = (design: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    toast('info', `Starting download for "${design.title}"...`);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = design.thumb;
      link.download = `${design.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'Download completed!');
    }, 1000);
  };

  const handleShare = (design: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + `/share/${design.id}`);
    toast('success', 'Share link copied to clipboard!');
  };

  const openQuickActionCreate = (type: string) => {
    const ratioMap: Record<string, string> = {
      'Instagram Post': '1:1',
      'YouTube Thumb': '16:9',
      'Twitter Card': '1.91:1',
      'LinkedIn Post': '4:5',
      'Story': '9:16',
      'Blog Cover': '3:2'
    };
    const mappedType: Record<string, string> = {
      'Instagram Post': 'Social Media',
      'YouTube Thumb': 'YouTube',
      'Twitter Card': 'Social Media',
      'LinkedIn Post': 'LinkedIn',
      'Story': 'Instagram Story',
      'Blog Cover': 'Blog'
    };
    setNewType(mappedType[type] || 'Social Media');
    setNewRatio(ratioMap[type] || '1:1');
    setIsCreateOpen(true);
  };

  // Filter recent designs if searchQuery exists
  const filteredRecent = designs.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayDesigns = filteredRecent.slice(0, 4);

  const stats = [
    { label: 'Designs Created', value: designs.length, delta: `+${designs.filter(d => d.updated === 'Just now').length} added`, icon: Image, color: 'from-purple-500 to-pink-500' },
    { label: 'AI Generations Left', value: `${100 - designs.filter(d => d.type === 'AI Generation').length}/100`, delta: 'Pro plan', icon: Sparkles, color: 'from-blue-500 to-purple-500' },
    { label: 'Published Posts', value: designs.filter(d => d.status === 'published').length, delta: 'Live status', icon: Share2, color: 'from-pink-500 to-rose-500' },
    { label: 'Total Views', value: '12.4K', delta: '+18% this month', icon: TrendingUp, color: 'from-green-500 to-blue-500' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Content Creator Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Ready to create something amazing today?</p>
          </div>
          <button
            onClick={() => {
              setNewTitle('');
              setNewType('Social Media');
              setNewRatio('1:1');
              setNewStyle('Photorealistic');
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> New Design
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

        {/* AI Quick Generator */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-pink-500/10 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <h3 className="text-sm font-display font-semibold text-foreground">Quick AI Generate</h3>
          </div>
          <div className="flex gap-3">
            <input
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              placeholder="Describe your design (e.g., 'vibrant summer sale Instagram post with tropical colors')..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all flex-shrink-0"
            >
              {generating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Zap className="w-4 h-4" /> Generate</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Instagram post', 'YouTube thumbnail', 'Twitter graphic', 'LinkedIn banner'].map(s => (
              <button key={s} onClick={() => setAiPrompt(s)} className="px-2.5 py-1 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">{s}</button>
            ))}
          </div>
        </div>

        {/* Recent Designs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-semibold text-foreground">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Recent Designs'}
              </h3>
            </div>
            <button onClick={() => navigate('/dashboard/creator/designs')} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          {displayDesigns.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
              No designs found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {displayDesigns.map(design => (
                <div 
                  key={design.id} 
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer relative"
                  onClick={() => openPreview(design)}
                >
                  <div className="relative overflow-hidden aspect-square sm:h-28 sm:w-full">
                    <img src={design.thumb} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    
                    {/* Dark overlay & buttons on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity">
                        <button 
                          onClick={(e) => openEdit(design, e)}
                          className="w-8 h-8 rounded-full bg-white/95 text-gray-800 hover:bg-white hover:scale-105 transition-all flex items-center justify-center shadow"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => openDelete(design, e)}
                          className="w-8 h-8 rounded-full bg-white/95 text-red-600 hover:bg-white hover:scale-105 transition-all flex items-center justify-center shadow"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${design.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>
                      {design.status}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate">{design.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-muted-foreground">{design.type}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" />{design.updated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-display font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Instagram Post', icon: Instagram, color: 'text-pink-500 bg-pink-500/10' },
              { label: 'YouTube Thumb', icon: Youtube, color: 'text-red-500 bg-red-500/10' },
              { label: 'Twitter Card', icon: Twitter, color: 'text-blue-400 bg-blue-400/10' },
              { label: 'LinkedIn Post', icon: Linkedin, color: 'text-blue-700 bg-blue-700/10' },
              { label: 'Story', icon: Smartphone, color: 'text-purple-500 bg-purple-500/10' },
              { label: 'Blog Cover', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/10' },
            ].map(action => (
              <button key={action.label} onClick={() => openQuickActionCreate(action.label)} className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 hover:bg-primary/5 transition-all text-center group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">AI Usage This Month</h4>
              <span className="text-xs text-primary font-medium">{designs.filter(d => d.type === 'AI Generation').length}/100</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
              <div className="h-full gradient-primary rounded-full" style={{ width: `${Math.min(100, (designs.filter(d => d.type === 'AI Generation').length / 100) * 100)}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">{100 - designs.filter(d => d.type === 'AI Generation').length} generations remaining</p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Top Performing Design</h4>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            {designs.length > 0 ? (
              <div className="flex items-center gap-3">
                <img src={designs[0].thumb} className="w-12 h-12 rounded-xl object-cover" alt="top design" />
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{designs[0].title}</p>
                  <p className="text-xs text-muted-foreground">2.4K views · 340 likes</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No designs available yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────── */}

      {/* 1. Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Create New Design</h3>
            <form onSubmit={handleCreateNew} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Design Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g. Summer Promo Sale"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Platform Type</label>
                  <select 
                    value={newType} 
                    onChange={e => setNewType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                  >
                    {['Social Media', 'YouTube', 'Blog', 'Instagram Story', 'LinkedIn', 'Ad Creative'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Aspect Ratio</label>
                  <select 
                    value={newRatio} 
                    onChange={e => setNewRatio(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all text-mono"
                  >
                    {['1:1', '16:9', '9:16', '4:5', '3:2'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Art Style Preset</label>
                <select 
                  value={newStyle} 
                  onChange={e => setNewStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition-all"
                >
                  {['Photorealistic', 'Illustration', 'Anime', '3D Render', 'Minimalist', 'Vintage', 'Neon'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple mt-2">
                Create Design
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Modal */}
      {isEditOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
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
                    {['Social Media', 'YouTube', 'Blog', 'Instagram Story', 'LinkedIn', 'Ad Creative'].map(t => (
                      <option key={t} value={t}>{t}</option>
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
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Delete Confirmation Modal */}
      {isDeleteOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Delete Design?</h3>
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

      {/* 4. Preview Modal */}
      {isPreviewOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 bg-neutral-900 flex items-center justify-center relative aspect-square md:aspect-auto">
              <img src={selectedDesign.thumb} alt={selectedDesign.title} className="w-full h-full object-contain" />
              <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-semibold ${selectedDesign.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>
                {selectedDesign.status}
              </span>
            </div>

            {/* Right Details Section */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{selectedDesign.type}</span>
                  <h3 className="text-lg font-display font-bold text-foreground mt-1 leading-snug">{selectedDesign.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {selectedDesign.updated}</p>
                </div>

                <div className="border-t border-border pt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Aspect Ratio</span>
                    <span className="font-semibold text-foreground font-mono mt-0.5 block">{selectedDesign.ratio || '1:1'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Art Style</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{selectedDesign.style || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="border-t border-border pt-6 mt-6 space-y-2">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(selectedDesign)}
                    className="flex-1 py-2 rounded-xl gradient-primary text-white font-semibold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-glow-purple"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button 
                    onClick={() => handleShare(selectedDesign)}
                    className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => openEdit(selectedDesign, e)}
                    className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button 
                    onClick={(e) => openDelete(selectedDesign, e)}
                    className="flex-1 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
