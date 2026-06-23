import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles, Zap, Image as ImageIcon, Download, Share2, Sliders,
  Trash2, Edit, X, Plus, Clock, Star, Play, PlayCircle, Film, Volume2, Sliders as SlidersIcon, Video
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import {
  useCreatorDesignsState,
  addCreatorDesign,
  updateCreatorDesign,
  deleteCreatorDesign,
  CreatorDesign
} from '@/dashboards/creator/creatorStore';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const sidebarItems = [
  { label: 'AI Studio', href: '/dashboard/creator/studio', icon: Sparkles },
  { label: 'My Designs', href: '/dashboard/creator/designs', icon: ImageIcon },
  { label: 'Templates', href: '/dashboard/creator/templates', icon: Sliders },
  { label: 'Social Media', href: '/dashboard/creator/social', icon: Share2 },
  { label: 'Video Studio', href: '/dashboard/creator/video', icon: Video },
  { label: 'Analytics', href: '/dashboard/creator/analytics', icon: Zap },
];

const styles = ['Photorealistic', 'Illustration', 'Anime', '3D Render', 'Oil Painting', 'Minimalist', 'Vintage', 'Neon'];
const ratios = ['1:1', '16:9', '9:16', '4:5', '3:2'];

// AI Inspiration Templates
const aiInspirations = [
  { title: 'Cyberpunk Cat', prompt: 'A futuristic cybernetic cat wearing glowing neon goggles on a rain-slicked Tokyo street, 3D render, high-detail, cyberpunk aesthetic', style: '3D Render', ratio: '1:1', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&fit=crop' },
  { title: 'Retro Sunset', prompt: 'A nostalgic vaporwave landscape with a wireframe wire grid sun setting over digital ocean waves, minimalist synthwave art style', style: 'Neon', ratio: '16:9', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&fit=crop' },
  { title: 'Cute AI Robot', prompt: 'A small adorable mechanical robot watering a single green plant inside a glass dome spaceship window, cozy lighting illustration style', style: 'Illustration', ratio: '4:5', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&fit=crop' },
  { title: 'Magic Forest', prompt: 'An ethereal magical forest path lined with glowing purple mushrooms and floating golden dust particles, fantasy digital oil painting', style: 'Oil Painting', ratio: '3:2', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&fit=crop' }
];

// Color Presets for Create modals
const colorPalettes = [
  { name: 'Sunset Glow', colors: ['#f43f5e', '#f97316', '#eab308'] },
  { name: 'Ocean Breeze', colors: ['#06b6d4', '#3b82f6', '#6366f1'] },
  { name: 'Neon Dreams', colors: ['#ec4899', '#8b5cf6', '#d946ef'] },
  { name: 'Forest Moss', colors: ['#10b981', '#065f46', '#facc15'] },
];

// ──────────────────────────────────────────────────────────────────
// 1. AI STUDIO PAGE
// ──────────────────────────────────────────────────────────────────
export function CreatorAIStudio() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [ratio, setRatio] = useState('1:1');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [designs] = useCreatorDesignsState();

  const generate = async () => {
    if (!prompt.trim()) { toast('warning', 'Enter a prompt first'); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2200));
    setGenerating(false);
    setResults([
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
    ]);
    toast('success', '4 stunning designs generated!');
  };

  const handleUseInspiration = (item: typeof aiInspirations[0]) => {
    setPrompt(item.prompt);
    setStyle(item.style);
    setRatio(item.ratio);
    toast('info', `Loaded preset prompt: "${item.title}"`);
  };

  const handleSaveResult = (src: string, index: number) => {
    addCreatorDesign({
      title: prompt.length > 25 ? `${prompt.substring(0, 25)}...` : prompt || `AI Design #${index + 1}`,
      type: 'AI Generation',
      thumb: src,
      status: 'published',
      style,
      ratio
    });
    toast('success', 'Saved successfully to designs!');
  };

  const handleDownloadResult = (src: string, index: number) => {
    toast('info', 'Downloading generated image...');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = src;
      link.download = `ai_gen_${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'Download complete!');
    }, 800);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="AI Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">AI Design Studio</h2>
          <p className="text-sm text-muted-foreground">Generate stunning visuals from text descriptions</p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border/80 shadow-2xl shadow-primary/5 rounded-3xl p-5 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block uppercase tracking-wider">Describe your design prompt</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={3}
              placeholder="e.g. A vibrant summer sale banner with tropical colors, palm trees, and bold yellow text..."
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 text-foreground text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none transition-all duration-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-2xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Art Style Choice</label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {styles.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      style === s ? 'gradient-primary text-white shadow-glow-purple' : 'border border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-2xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Aspect Ratio Ratio</label>
              <div className="flex flex-wrap gap-1.5">
                {ratios.map(r => (
                  <button key={r} onClick={() => setRatio(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                      ratio === r ? 'gradient-primary text-white shadow-glow-purple' : 'border border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground'
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={generate} disabled={generating}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl gradient-primary text-white font-bold text-sm hover:opacity-95 disabled:opacity-60 transition-all shadow-glow-purple">
            {generating ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating Visual...</>
            ) : (
              <><Sparkles className="w-4 h-4" />Generate AI Canvas</>
            )}
          </button>
        </div>

        {/* Prompt Inspiration Gallery */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" /> Prompt Inspirations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiInspirations.map((item) => (
              <div 
                key={item.title}
                onClick={() => handleUseInspiration(item)}
                className="group bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{item.style}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated output */}
        {results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-4 h-4 text-primary" /> Generated Visuals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {results.map((src, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden border border-border aspect-square bg-card shadow-lg hover:shadow-primary/5 transition-all">
                  <img src={src} alt={`Result ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 p-2">
                    <button onClick={() => handleSaveResult(src, i)} className="opacity-0 group-hover:opacity-100 w-28 py-2 rounded-xl bg-white text-gray-800 text-xs font-bold hover:bg-neutral-100 transition-all shadow">Save to Studio</button>
                    <button onClick={() => handleDownloadResult(src, i)} className="opacity-0 group-hover:opacity-100 w-28 py-2 rounded-xl gradient-primary text-white text-xs font-bold hover:opacity-95 transition-all shadow-glow-purple">Export JPEG</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 2. MY DESIGNS PAGE (WITH CRUD MODALS)
// ──────────────────────────────────────────────────────────────────
export function CreatorDesigns() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [designs] = useCreatorDesignsState();

  // Modal states
  const [selectedDesign, setSelectedDesign] = useState<CreatorDesign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Social Media');
  const [newRatio, setNewRatio] = useState('1:1');
  const [newStyle, setNewStyle] = useState('Photorealistic');
  const [selectedColors, setSelectedColors] = useState<string[]>(colorPalettes[0].colors);

  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('draft');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

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

    toast('success', 'Design created successfully in designs library!');
    setIsCreateOpen(false);
    setNewTitle('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign || !editTitle.trim()) return;

    updateCreatorDesign(selectedDesign.id, {
      title: editTitle,
      type: editType,
      status: editStatus
    });

    toast('success', 'Design settings updated successfully!');
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

  const openPreview = (d: CreatorDesign) => {
    setSelectedDesign(d);
    setIsPreviewOpen(true);
  };

  const openEdit = (d: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setEditTitle(d.title);
    setEditType(d.type);
    setEditStatus(d.status);
    setIsEditOpen(true);
    setIsPreviewOpen(false);
  };

  const openDelete = (d: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDesign(d);
    setIsDeleteOpen(true);
  };

  const handleDownload = (d: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    toast('info', `Downloading "${d.title}"...`);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = d.thumb;
      link.download = `${d.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'Download finished!');
    }, 1000);
  };

  const handleShare = (d: CreatorDesign, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + `/share/${d.id}`);
    toast('success', 'Share link copied to clipboard!');
  };

  // Filter list
  const filteredDesigns = designs.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="My Designs" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Designs</h2>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? `Filtered: ${filteredDesigns.length} of ${designs.length}` : `${designs.length} designs total`}
            </p>
          </div>
          <button
            onClick={() => {
              setNewTitle('');
              setNewType('Social Media');
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> New Design
          </button>
        </div>

        {filteredDesigns.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground shadow-2xl">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p className="text-sm">No designs found. Try building a new one or adjusting your search query!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDesigns.map(d => (
              <div
                key={d.id}
                className="group bg-card border border-border hover:border-primary/30 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer relative flex flex-col justify-between"
                onClick={() => openPreview(d)}
              >
                <div className="relative overflow-hidden aspect-square sm:h-32 sm:w-full">
                  <img src={d.thumb} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-1.5">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity duration-300">
                      <button
                        onClick={(e) => openEdit(d, e)}
                        className="w-8 h-8 rounded-full bg-white/95 text-gray-800 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Edit Settings"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => openDelete(d, e)}
                        className="w-8 h-8 rounded-full bg-white/95 text-red-600 hover:scale-110 hover:bg-white transition-all flex items-center justify-center shadow-lg"
                        title="Remove Design"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                    d.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-white'
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

      {/* CREATE DIALOG */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsCreateOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Create New Design</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Canvas Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Creative Ad Campaign"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  >
                    {['Social Media', 'YouTube', 'Blog', 'Instagram Story', 'LinkedIn', 'Ad Creative'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Aspect Ratio</label>
                  <select
                    value={newRatio}
                    onChange={e => setNewRatio(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary font-mono"
                  >
                    {['1:1', '16:9', '9:16', '4:5', '3:2'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Art Style</label>
                <select
                  value={newStyle}
                  onChange={e => setNewStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                >
                  {styles.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-2xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Color Swatch Palette</label>
                <div className="flex gap-3">
                  {colorPalettes.map(p => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setSelectedColors(p.colors);
                        toast('info', `Selected ${p.name} color swatch`);
                      }}
                      className={`p-1.5 rounded-xl border transition-all flex gap-1 ${
                        selectedColors === p.colors ? 'border-primary bg-primary/5 scale-105 shadow-sm' : 'border-border bg-background'
                      }`}
                      title={p.name}
                    >
                      {p.colors.map(col => (
                        <span key={col} className="w-3.5 h-3.5 rounded-full block border border-black/10" style={{ backgroundColor: col }} />
                      ))}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 shadow-glow-purple transition-all">
                Open Project Workspace
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DIALOG */}
      {isEditOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Edit Design Details</h3>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Category</label>
                  <select
                    value={editType}
                    onChange={e => setEditType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  >
                    {['Social Media', 'YouTube', 'Blog', 'Instagram Story', 'LinkedIn', 'Ad Creative'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Publish Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as 'published' | 'draft')}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-95 shadow-glow-purple transition-all">
                Save Design Settings
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DIALOG */}
      {isDeleteOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-11 h-11 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">Remove Design</h3>
            <p className="text-xs text-muted-foreground mb-6">Are you sure you want to permanently delete "{selectedDesign.title}"? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW DIALOG */}
      {isPreviewOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          <div className="bg-card border border-border rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative z-10 flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors z-20">
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center relative aspect-square md:aspect-auto">
              <img src={selectedDesign.thumb} alt={selectedDesign.title} className="w-full h-full object-contain" />
              <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-semibold ${selectedDesign.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>{selectedDesign.status}</span>
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-card">
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

              <div className="border-t border-border pt-6 mt-6 space-y-2">
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(selectedDesign)} className="flex-1 py-2 rounded-xl gradient-primary text-white font-semibold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-glow-purple">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button onClick={() => handleShare(selectedDesign)} className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={(e) => openEdit(selectedDesign, e)} className="flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <Edit className="w-3.5 h-3.5" /> Edit Settings
                  </button>
                  <button onClick={(e) => openDelete(selectedDesign, e)} className="flex-1 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
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

// ──────────────────────────────────────────────────────────────────
// 3. TEMPLATES PAGE (WITH SEARCH & CATEGORIES)
// ──────────────────────────────────────────────────────────────────
export function CreatorTemplates() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [category, setCategory] = useState('All');

  const templates = [
    { id: '1', title: 'Bold Summer Sale', category: 'Social Media', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', isPremium: false },
    { id: '2', title: 'Corporate Presentation', category: 'Presentation', thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop', isPremium: true },
    { id: '3', title: 'YouTube Thumbnail Pack', category: 'YouTube', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop', isPremium: false },
    { id: '4', title: 'Minimal Brand Kit', category: 'Branding', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', isPremium: true },
    { id: '5', title: 'Event Poster', category: 'Marketing', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop', isPremium: false },
    { id: '6', title: 'E-commerce Promo', category: 'E-commerce', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop', isPremium: false },
  ];

  const handleUseTemplate = (t: typeof templates[0]) => {
    addCreatorDesign({
      title: `${t.title} Copy`,
      type: t.category,
      thumb: t.thumb,
      status: 'draft',
      style: 'Minimalist',
      ratio: t.category === 'YouTube' ? '16:9' : '1:1'
    });
    toast('success', `Created workspace template for: ${t.title}! Redirecting...`);
    setTimeout(() => {
      navigate('/dashboard/creator/designs');
    }, 1200);
  };

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = category === 'All' || t.category === category;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Templates" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Template Library</h2>
          <p className="text-sm text-muted-foreground">10,000+ professional templates ready to customize</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1.5">
          {['All', 'Social Media', 'Presentation', 'YouTube', 'Branding', 'Marketing', 'E-commerce'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                category === cat ? 'gradient-primary text-white border-transparent shadow-sm' : 'border-border bg-card text-muted-foreground hover:border-primary/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center text-muted-foreground shadow-2xl">
            No templates found matching your search and category choices.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredTemplates.map(t => (
              <div key={t.id} className="group bg-card border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="relative aspect-video overflow-hidden">
                  <img src={t.thumb} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {t.isPremium && <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[9px] font-bold tracking-wider shadow">PRO</span>}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{t.category}</p>
                  </div>
                  <button onClick={() => handleUseTemplate(t)} className="mt-3 w-full py-2 rounded-xl gradient-primary text-white text-xs font-bold hover:opacity-95 transition-all shadow-glow-purple">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 4. SOCIAL MEDIA PLATFORMS PAGE (WITH PREMIUM GRAPHICS & DESIGNS)
// ──────────────────────────────────────────────────────────────────
export function CreatorSocial() {
  const navigate = useNavigate();
  const [designs] = useCreatorDesignsState();
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState('');

  // Premium background images for platform cards
  const platforms = [
    { 
      name: 'Instagram Post', 
      size: '1080×1080', 
      bg: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'Social Media' && d.title.toLowerCase().includes('instagram')).length + 12, 
      ratio: '1:1', 
      type: 'Social Media' 
    },
    { 
      name: 'Instagram Story', 
      size: '1080×1920', 
      bg: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'Instagram Story').length + 8, 
      ratio: '9:16', 
      type: 'Instagram Story' 
    },
    { 
      name: 'YouTube Thumbnail', 
      size: '1280×720', 
      bg: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'YouTube').length + 5, 
      ratio: '16:9', 
      type: 'YouTube' 
    },
    { 
      name: 'Twitter/X Card', 
      size: '1200×628', 
      bg: 'https://images.unsplash.com/photo-1611605698335-8b15d27e03f9?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'Social Media' && d.title.toLowerCase().includes('twitter')).length + 3, 
      ratio: '3:2', 
      type: 'Social Media' 
    },
    { 
      name: 'LinkedIn Post', 
      size: '1200×627', 
      bg: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'LinkedIn').length + 4, 
      ratio: '4:5', 
      type: 'LinkedIn' 
    },
    { 
      name: 'Facebook Ad', 
      size: '1200×628', 
      bg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop', 
      count: designs.filter(d => d.type === 'Ad Creative').length + 2, 
      ratio: '16:9', 
      type: 'Ad Creative' 
    },
  ];

  const handleLaunchCreate = (platformName: string) => {
    setActivePlatform(platformName);
    setTitleInput(`${platformName} Design`);
  };

  const handleConfirmCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const plat = platforms.find(p => p.name === activePlatform);
    if (!plat || !titleInput.trim()) return;

    const defaultThumbs: Record<string, string> = {
      'Social Media': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'YouTube': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=225&fit=crop',
      'Instagram Story': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=711&fit=crop',
      'LinkedIn': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=150&fit=crop',
      'Ad Creative': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    };
    const thumb = defaultThumbs[plat.type] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop';

    addCreatorDesign({
      title: titleInput,
      type: plat.type,
      thumb,
      status: 'draft',
      ratio: plat.ratio,
      style: 'Neon'
    });

    toast('success', `Created customized ${plat.name} template workspace!`);
    setActivePlatform(null);
    navigate('/dashboard/creator/designs');
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Social Media" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Social Media Creator</h2>
          <p className="text-sm text-muted-foreground">Platform-optimized designs for every social network</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(p => (
            <div
              key={p.name}
              onClick={() => handleLaunchCreate(p.name)}
              className="group relative rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1.5 cursor-pointer transition-all duration-300 h-44 flex flex-col justify-end p-5 bg-neutral-900"
            >
              {/* Card Background Image with Gradient Overlay */}
              <img src={p.bg} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 backdrop-blur-md px-2 py-0.5 rounded-full uppercase">
                  {p.size} px
                </span>
                <h3 className="text-base font-display font-bold text-white mt-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-xs text-neutral-300 font-medium mt-1">{p.count} Studio Projects</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK PLATFORM DIALOG */}
      {activePlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActivePlatform(null)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setActivePlatform(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-display font-bold text-foreground mb-2">Create {activePlatform}</h3>
            <p className="text-xs text-muted-foreground mb-4">Set up a template specifically sized for {activePlatform}.</p>
            <form onSubmit={handleConfirmCreate} className="space-y-4">
              <div>
                <label className="text-2xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Design Title Name</label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={e => setTitleInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setActivePlatform(null)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-xs font-bold transition-colors">
                  Launch Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 5. VIDEO STUDIO PAGE (WITH PREMIUM GRAPHICS)
// ──────────────────────────────────────────────────────────────────
export function CreatorVideo() {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  // Interactive states
  const [promptInput, setPromptInput] = useState('');
  const [duration, setDuration] = useState('15s');
  const [voiceScript, setVoiceScript] = useState('');
  const [voiceActor, setVoiceActor] = useState('Maya (Warm Accent)');
  const [trimStart, setTrimStart] = useState('0');
  const [trimEnd, setTrimEnd] = useState('15');
  const [videoFilter, setVideoFilter] = useState('Warm');
  const [loadingAction, setLoadingAction] = useState(false);

  // Premium background images for video tools
  const tools = [
    { 
      title: 'AI Video Generator', 
      desc: 'Generate short videos from text prompts', 
      bg: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&fit=crop', 
      action: 'Generate Video' 
    },
    { 
      title: 'Motion Templates', 
      desc: '500+ animated design templates', 
      bg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&fit=crop', 
      action: 'Browse Templates' 
    },
    { 
      title: 'Slideshow Creator', 
      desc: 'Turn photos into beautiful slideshows', 
      bg: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&fit=crop', 
      action: 'Create Slideshow' 
    },
    { 
      title: 'Intro/Outro Maker', 
      desc: 'Professional channel branding videos', 
      bg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&fit=crop', 
      action: 'Create Intro' 
    },
    { 
      title: 'AI Voiceover', 
      desc: 'Add natural AI voices to your videos', 
      bg: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&fit=crop', 
      action: 'Add Voiceover' 
    },
    { 
      title: 'Video Editor', 
      desc: 'Trim, cut, and enhance video clips', 
      bg: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&fit=crop', 
      action: 'Open Editor' 
    },
  ];

  const handleLaunchTool = (title: string) => {
    setActiveTool(title);
    setPromptInput('');
    setVoiceScript('');
    setTrimStart('0');
    setTrimEnd('15');
    setLoadingAction(false);
  };

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoadingAction(false);

    let toastMsg = 'Action completed successfully!';
    let title = 'Custom Video Work';
    let thumb = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=225&fit=crop';

    if (activeTool === 'AI Video Generator') {
      toastMsg = `AI Video "${promptInput.substring(0, 20)}..." has been generated!`;
      title = `Video: ${promptInput}`;
    } else if (activeTool === 'AI Voiceover') {
      toastMsg = `Voiceover track added using voice "${voiceActor}"!`;
      title = `Audio Track: ${voiceActor}`;
    } else if (activeTool === 'Video Editor') {
      toastMsg = `Applied trim (${trimStart}s - ${trimEnd}s) and filter "${videoFilter}" successfully!`;
      title = `Edited: Clip (${videoFilter})`;
    } else if (activeTool === 'Slideshow Creator') {
      toastMsg = `Slideshow compile finished!`;
      title = `Slideshow compile`;
    } else if (activeTool === 'Intro/Outro Maker') {
      toastMsg = `Branded channel intro created!`;
      title = `Branded Channel Intro`;
    } else if (activeTool === 'Motion Templates') {
      toastMsg = `Applied motion templates to project workspace!`;
      title = `Motion Template Project`;
    }

    addCreatorDesign({
      title,
      type: 'Video Studio',
      thumb,
      status: 'draft',
      ratio: '16:9',
      style: 'Neon'
    });

    toast('success', toastMsg);
    setActiveTool(null);
    navigate('/dashboard/creator/designs');
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Video Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Video Studio</h2>
          <p className="text-sm text-muted-foreground">Create compelling video content with AI assistance</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(item => (
            <div 
              key={item.title} 
              className="group relative rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300 h-56 flex flex-col justify-between p-5 bg-neutral-900"
            >
              {/* Background cover image with overlay */}
              <img src={item.bg} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-55 transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-base font-display font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <button 
                onClick={() => handleLaunchTool(item.title)} 
                className="relative z-10 w-full py-2.5 rounded-xl gradient-primary text-white text-xs font-bold hover:opacity-95 shadow-glow-purple transition-all mt-4"
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC VIDEO STUDIO DIALOG */}
      {activeTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveTool(null)} />
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button onClick={() => setActiveTool(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-display font-bold text-foreground mb-2">{activeTool}</h3>
            
            <form onSubmit={handleActionSubmit} className="space-y-4 mt-4">
              
              {activeTool === 'AI Video Generator' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Describe the video scene</label>
                    <textarea
                      value={promptInput}
                      onChange={e => setPromptInput(e.target.value)}
                      placeholder="e.g. Cinematic pan of sunset on Mars with flying spaceships..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Duration</label>
                      <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none">
                        <option value="15s">15 Seconds</option>
                        <option value="30s">30 Seconds</option>
                        <option value="60s">60 Seconds</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Resolution</label>
                      <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none">
                        <option>1080p (FHD)</option>
                        <option>4K (UHD)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'AI Voiceover' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Voiceover Script Text</label>
                    <textarea
                      value={voiceScript}
                      onChange={e => setVoiceScript(e.target.value)}
                      placeholder="Type the exact text the AI voice actor should read..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Voice Actor Profile</label>
                    <select value={voiceActor} onChange={e => setVoiceActor(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none">
                      <option value="Maya (Warm Accent)">Maya (Warm Accent)</option>
                      <option value="Alex (Deep Narration)">Alex (Deep Narration)</option>
                      <option value="Sam (Energetic Ad)">Sam (Energetic Ad)</option>
                      <option value="Marcus (Corporate)">Marcus (Corporate)</option>
                    </select>
                  </div>
                </>
              )}

              {activeTool === 'Video Editor' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Trim Start (s)</label>
                      <input
                        type="number"
                        value={trimStart}
                        onChange={e => setTrimStart(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Trim End (s)</label>
                      <input
                        type="number"
                        value={trimEnd}
                        onChange={e => setTrimEnd(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">LUTS Color Filter</label>
                    <select value={videoFilter} onChange={e => setVideoFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none">
                      <option value="Warm">Warm Cinematic</option>
                      <option value="Cool">Cool Teal & Orange</option>
                      <option value="Vintage">Vintage Film</option>
                      <option value="B&W">B&W Noir</option>
                    </select>
                  </div>
                </>
              )}

              {activeTool === 'Motion Templates' && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Select a pre-built dynamic motion template to overlay:</p>
                  <div className="grid grid-cols-2 gap-2 text-2xs">
                    {['Glitch Intro', 'Smooth Title', 'Neon Slides', 'Minimal Transition'].map(t => (
                      <button type="button" key={t} onClick={() => toast('info', `Previewing template: ${t}`)} className="p-3 border border-border bg-card rounded-xl hover:border-primary transition-all text-left font-semibold">
                        ⭐ {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTool === 'Slideshow Creator' && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Compiles images from your design studio list into an elegant presentation video.</p>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Slide Transition Effect</label>
                    <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none">
                      <option>Fade Smoothly</option>
                      <option>Cross Zoom</option>
                      <option>Slide Left</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTool === 'Intro/Outro Maker' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Branding Channel Title</label>
                    <input type="text" placeholder="e.g. Tech Review Hub" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block uppercase tracking-wider">Subtitle / Catchphrase</label>
                    <input type="text" placeholder="e.g. Weekly tech updates" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs outline-none" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setActiveTool(null)} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loadingAction} className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-xs font-bold hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-glow-purple">
                  {loadingAction ? (
                    <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                  ) : (
                    'Run Studio Process'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// ──────────────────────────────────────────────────────────────────
// 6. ANALYTICS PAGE (WITH THREE INTERACTIVE RECHARTS CHARTS)
// ──────────────────────────────────────────────────────────────────
export function CreatorAnalytics() {
  const platformData = [
    { name: 'Instagram', value: 45, color: '#ec4899' },
    { name: 'YouTube', value: 25, color: '#ef4444' },
    { name: 'LinkedIn', value: 15, color: '#0077b5' },
    { name: 'Twitter/X', value: 10, color: '#1da1f2' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  const viewsData = [
    { name: 'Mon', views: 820, engagement: 240, downloads: 45 },
    { name: 'Tue', views: 1240, engagement: 310, downloads: 88 },
    { name: 'Wed', views: 960, engagement: 290, downloads: 62 },
    { name: 'Thu', views: 1480, engagement: 420, downloads: 110 },
    { name: 'Fri', views: 1120, engagement: 380, downloads: 95 },
    { name: 'Sat', views: 1680, engagement: 510, downloads: 140 },
    { name: 'Sun', views: 1340, engagement: 460, downloads: 125 },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Analytics" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Content Analytics</h2>
          <p className="text-sm text-muted-foreground">Track performance across all your designs</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Views', value: '12.4K', delta: '+18%' },
            { label: 'Designs Published', value: '89', delta: '+5 today' },
            { label: 'Downloads', value: '1,240', delta: '+34%' },
            { label: 'Avg Engagement', value: '4.2%', delta: '+0.8%' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border shadow-sm rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 1. Area Chart: Views last 7 days */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Views Last 7 Days</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily total view progression on shared creator content</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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

          {/* 2. Bar Chart: Downloads & Engagement */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Engagement & Downloads</h3>
              <p className="text-xs text-muted-foreground mb-4">Correlation between user engagement score and exports</p>
            </div>
            <div className="w-full flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: 'hsl(var(--foreground))' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', pt: 10 }} />
                  <Bar dataKey="downloads" name="Downloads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="engagement" name="Engagement" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Pie Chart: Views distribution by platform */}
          <div className="bg-card border border-border shadow-md rounded-2xl p-5 flex flex-col justify-between h-[300px] md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Views Split by Platform</h3>
              <p className="text-xs text-muted-foreground mb-4">Distribution of impressions across connected networks</p>
            </div>
            <div className="w-full flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-around">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 sm:mt-0 text-xs">
                {platformData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
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
