// Business sub-pages
import { useState } from 'react';
import { TrendingUp, Palette, BarChart2, DollarSign, Share2, Plus, Target, Layers, X, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';

export const businessSidebarItems = [
  { label: 'Brand Kit', href: '/dashboard/business/brand', icon: Palette },
  { label: 'Marketing Assets', href: '/dashboard/business/marketing', icon: Share2 },
  { label: 'Campaigns', href: '/dashboard/business/campaigns', icon: TrendingUp },
  { label: 'Analytics', href: '/dashboard/business/analytics', icon: BarChart2 },
  { label: 'Billing', href: '/dashboard/business/billing', icon: DollarSign },
];

export function BusinessBrand() {
  const [colorsList, setColorsList] = useState(['#7C3AED', '#EC4899', '#2563EB', '#10B981', '#F59E0B', '#EF4444']);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#6366F1');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  const [fonts, setFonts] = useState([
    { id: 'heading', role: 'Heading Font', font: 'Plus Jakarta Sans', weight: '700' },
    { id: 'body', role: 'Body Font', font: 'Inter', weight: '400' },
  ]);
  const [editingFontId, setEditingFontId] = useState<string | null>(null);

  const [traits, setTraits] = useState([
    { name: 'Professional', checked: true },
    { name: 'Innovative', checked: true },
    { name: 'Trustworthy', checked: true },
    { name: 'Approachable', checked: true }
  ]);
  const [newTraitInput, setNewTraitInput] = useState('');

  const toggleTrait = (idx: number) => {
    setTraits(prev => prev.map((t, i) => i === idx ? { ...t, checked: !t.checked } : t));
  };

  const handleAddTrait = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTraitInput.trim()) return;
    if (traits.some(t => t.name.toLowerCase() === newTraitInput.trim().toLowerCase())) {
      toast('error', 'Trait already exists!');
      return;
    }
    setTraits([...traits, { name: newTraitInput.trim(), checked: true }]);
    setNewTraitInput('');
    toast('success', `Added trait: ${newTraitInput}`);
  };

  return (
    <DashboardLayout sidebarItems={businessSidebarItems} title="Brand Kit" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Kit</h2>
            <p className="text-sm text-muted-foreground">Manage your brand identity and guidelines</p>
          </div>
          <button onClick={() => toast('success', 'Brand kit saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            Save Changes
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Brand Colors */}
          <div className="bg-card border border-border rounded-2xl p-5 relative">
            <h3 className="text-sm font-semibold text-foreground mb-4">Brand Colors</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {colorsList.map(c => (
                <div key={c} className="relative group">
                  <button 
                    onClick={() => { navigator.clipboard?.writeText(c); toast('success', `Copied ${c}`); }}
                    className="w-12 h-12 rounded-xl border-2 border-transparent hover:border-primary transition-all hover:scale-110"
                    style={{ backgroundColor: c }} title={`Copy Hex: ${c}`} 
                  />
                  <button 
                    onClick={() => {
                      setColorsList(prev => prev.filter(col => col !== c));
                      toast('success', `Removed color ${c}`);
                    }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-destructive text-white rounded-full flex items-center justify-center text-[9px] opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="relative">
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)} 
                  className="w-12 h-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 transition-all text-lg"
                >
                  +
                </button>
                {showColorPicker && (
                  <>
                    <div className="fixed inset-0 z-35" onClick={() => setShowColorPicker(false)} />
                    <div className="absolute left-0 mt-2 p-3 bg-card border border-border rounded-xl shadow-lg flex gap-2 items-center z-40">
                      <input 
                        type="color" 
                        value={newColor} 
                        onChange={e => setNewColor(e.target.value)} 
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 flex-shrink-0" 
                      />
                      <input 
                        type="text" 
                        value={newColor} 
                        onChange={e => setNewColor(e.target.value)} 
                        className="w-20 bg-secondary/50 border border-border rounded px-2 py-1 text-xs text-foreground uppercase outline-none focus:border-primary/30" 
                      />
                      <button 
                        onClick={() => {
                          if (!colorsList.includes(newColor)) {
                            setColorsList([...colorsList, newColor]);
                            toast('success', `Added color ${newColor}`);
                          }
                          setShowColorPicker(false);
                        }}
                        className="px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Click any color to copy hex code. Hover to delete.</p>
          </div>

          {/* Logo */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Logo</h3>
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-all cursor-pointer block relative">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setLogoUrl(reader.result as string);
                      toast('success', 'Logo uploaded successfully!');
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
              />
              {logoUrl ? (
                <div className="flex flex-col items-center justify-center min-h-24">
                  <img src={logoUrl} alt="Brand Logo" className="max-h-16 object-contain mb-2" />
                  <p className="text-xs text-muted-foreground">Click to upload a new logo</p>
                </div>
              ) : (
                <>
                  <div className="text-3xl mb-2">🎨</div>
                  <p className="text-sm text-muted-foreground">Drop logo here or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG recommended</p>
                </>
              )}
            </label>
          </div>

          {/* Brand Fonts */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Brand Fonts</h3>
            <div className="space-y-3">
              {fonts.map(f => (
                <div key={f.role} className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">{f.role}</p>
                    <p className="text-sm font-semibold text-foreground" style={{ fontFamily: f.font }}>{f.font}</p>
                  </div>
                  <button onClick={() => setEditingFontId(f.id)} className="text-xs text-primary hover:underline font-medium">Change</button>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Voice */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Brand Voice</h3>
            <div className="space-y-3">
              {traits.map((trait, i) => (
                <div 
                  key={trait.name} 
                  onClick={() => toggleTrait(i)}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${trait.checked ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      {trait.checked && <div className="w-2 h-2 rounded-sm gradient-primary" />}
                    </div>
                    <span className={`text-sm text-foreground transition-all ${trait.checked ? 'font-medium' : 'text-muted-foreground'}`}>{trait.name}</span>
                  </div>
                  {/* Allow deleting custom traits (index >= 4) */}
                  {i >= 4 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setTraits(prev => prev.filter((_, idx) => idx !== i));
                        toast('success', `Removed trait: ${trait.name}`);
                      }}
                      className="text-muted-foreground hover:text-destructive text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              <form onSubmit={handleAddTrait} className="flex gap-2 mt-4 pt-3 border-t border-border/40">
                <input 
                  type="text" 
                  value={newTraitInput} 
                  onChange={e => setNewTraitInput(e.target.value)} 
                  placeholder="Add custom trait..." 
                  className="flex-1 bg-secondary/50 border border-border rounded-xl px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <button 
                  type="submit" 
                  className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all flex-shrink-0"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Font Selector Modal */}
      {editingFontId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border flex justify-between items-center bg-primary/5">
              <span className="text-sm font-bold text-foreground">Select Brand Font</span>
              <button onClick={() => setEditingFontId(null)} className="text-muted-foreground hover:text-foreground text-sm font-bold">×</button>
            </div>
            <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
              {['Plus Jakarta Sans', 'Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Lora', 'Georgia', 'Poppins'].map(f => (
                <button 
                  key={f}
                  onClick={() => {
                    setFonts(prev => prev.map(item => item.id === editingFontId ? { ...item, font: f } : item));
                    toast('success', `Font changed to ${f}`);
                    setEditingFontId(null);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-muted text-sm text-foreground transition-colors font-medium"
                  style={{ fontFamily: f }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function BusinessMarketing() {
  const [assetsList, setAssetsList] = useState([
    { title: 'Summer Sale Banner', type: 'Banner', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop', updated: '2d ago' },
    { title: 'Product Launch Post', type: 'Social', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop', updated: '3d ago' },
    { title: 'Email Header', type: 'Email', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=150&fit=crop', updated: '1w ago' },
    { title: 'Ad Creative Set', type: 'Ad', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop', updated: '1w ago' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [typeInput, setTypeInput] = useState('Banner');
  const [assetImage, setAssetImage] = useState<string | null>(null);
  const [activeAsset, setActiveAsset] = useState<typeof assetsList[0] | null>(null);

  const getHighResUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      return url.replace('w=200&h=150', 'w=800&h=600');
    }
    return url;
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast('success', `Downloaded: ${filename}`);
    } catch (err) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadPDF = (asset: typeof assetsList[0]) => {
    const content = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << >> /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 51 >>\nstream\nBT\n/F1 12 Tf\n70 700 Td\n(PixiVisual Marketing Asset: ${asset.title}) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000111 00000 n\n0000000212 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n312\n%%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${asset.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    toast('success', `PDF Downloaded for "${asset.title}"`);
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) {
      toast('error', 'Please enter an asset title.');
      return;
    }

    const defaultImages: Record<string, string> = {
      Banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop',
      Social: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop',
      Email: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=150&fit=crop',
      Ad: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
    };

    const newAsset = {
      title: titleInput.trim(),
      type: typeInput,
      thumb: assetImage || defaultImages[typeInput] || defaultImages.Banner,
      updated: 'Just now'
    };

    setAssetsList(prev => [newAsset, ...prev]);
    setIsModalOpen(false);
    setTitleInput('');
    setAssetImage(null);
    toast('success', `Marketing asset "${newAsset.title}" created successfully!`);
  };

  return (
    <DashboardLayout sidebarItems={businessSidebarItems} title="Marketing Assets" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Marketing Assets</h2>
            <p className="text-sm text-muted-foreground">Create and manage marketing materials</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> Create Asset
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {assetsList.map(a => (
            <div 
              key={a.title} 
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer relative" 
              onClick={() => setActiveAsset(a)}
            >
              <img src={a.thumb} alt={a.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground truncate">{a.title}</p>
                <p className="text-2xs text-muted-foreground mt-0.5">{a.type} · {a.updated}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAssetsList(prev => prev.filter(item => item.title !== a.title));
                  toast('success', `Deleted asset: ${a.title}`);
                }}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/60 hover:bg-destructive text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-sm"
                title="Delete asset"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Create Marketing Asset</h3>
              <button 
                onClick={() => { setIsModalOpen(false); setAssetImage(null); }}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleCreateAsset}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Asset Title</label>
                  <input 
                    type="text" 
                    required
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)}
                    placeholder="e.g., Summer End Promo"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Asset Type</label>
                  <select 
                    value={typeInput}
                    onChange={e => setTypeInput(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="Banner">Banner Graphic</option>
                    <option value="Social">Social Media Post</option>
                    <option value="Email">Email Header / Banner</option>
                    <option value="Ad">Ad Creative Set</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Thumbnail Image</label>
                  <label className="border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-all cursor-pointer block relative bg-secondary/35">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setAssetImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    {assetImage ? (
                      <div className="flex items-center gap-3">
                        <img src={assetImage} alt="Preview" className="w-14 h-10 object-cover rounded-lg border border-border" />
                        <span className="text-xs text-muted-foreground">Click to replace thumbnail</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Upload image or use a default stock image</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-border flex justify-end gap-3 bg-secondary/20">
                <button 
                  type="button"
                  onClick={() => { setIsModalOpen(false); setAssetImage(null); }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-foreground hover:bg-accent transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl gradient-primary text-white hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Create Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Asset Details Modal */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">
            {/* Left side: Image preview */}
            <div className="w-full md:w-1/2 bg-secondary/30 p-5 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
              <div className="relative group/preview w-full aspect-video md:aspect-square rounded-xl overflow-hidden border border-border bg-card">
                <img 
                  src={getHighResUrl(activeAsset.thumb)} 
                  alt={activeAsset.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/preview:scale-105" 
                />
              </div>
            </div>

            {/* Right side: Asset info & downloads */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-2">
                      {activeAsset.type}
                    </span>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{activeAsset.title}</h3>
                  </div>
                  <button 
                    onClick={() => setActiveAsset(null)}
                    className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                    <p className="text-2xs text-muted-foreground uppercase font-semibold">Resolution</p>
                    <p className="font-bold text-foreground mt-0.5">
                      {activeAsset.type === 'Banner' ? '1200 × 630 px' :
                       activeAsset.type === 'Social' ? '1080 × 1080 px' :
                       activeAsset.type === 'Email' ? '600 × 300 px' : '1080 × 1350 px'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                    <p className="text-2xs text-muted-foreground uppercase font-semibold">File Size</p>
                    <p className="font-bold text-foreground mt-0.5">
                      {activeAsset.title.length % 2 === 0 ? '1.4 MB' : '820 KB'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                    <p className="text-2xs text-muted-foreground uppercase font-semibold">Format</p>
                    <p className="font-bold text-foreground mt-0.5">PNG Image</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                    <p className="text-2xs text-muted-foreground uppercase font-semibold">Last Activity</p>
                    <p className="font-bold text-foreground mt-0.5">{activeAsset.updated}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  This {activeAsset.type.toLowerCase()} asset is fully generated and ready for use. It is formatted to the optimal dimensions and aspect ratio for standard publishing platforms.
                </p>
              </div>

              {/* Download actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    const filename = `${activeAsset.title.toLowerCase().replace(/\s+/g, '_')}.png`;
                    handleDownload(activeAsset.thumb, filename);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </button>
                <button 
                  onClick={() => downloadPDF(activeAsset)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:bg-accent text-foreground text-sm font-semibold transition-all"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function BusinessCampaigns() {
  const [campaignsList, setCampaignsList] = useState([
    { name: 'Summer Promo', status: 'active', budget: 3000, spent: 1800, roi: '240%', endDate: 'Jul 31' },
    { name: 'Product Launch', status: 'draft', budget: 5000, spent: 0, roi: '—', endDate: 'Aug 15' },
    { name: 'Brand Awareness', status: 'completed', budget: 2000, spent: 1960, roi: '180%', endDate: 'Jun 30' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [budgetInput, setBudgetInput] = useState('');
  const [statusInput, setStatusInput] = useState('draft');
  const [endDateInput, setEndDateInput] = useState('');

  const [editingCampaign, setEditingCampaign] = useState<typeof campaignsList[0] | null>(null);
  const [editName, setEditName] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editSpent, setEditSpent] = useState('');
  const [editStatus, setEditStatus] = useState('draft');
  const [editEndDate, setEditEndDate] = useState('');

  const startEditing = (c: typeof campaignsList[0]) => {
    setEditingCampaign(c);
    setEditName(c.name);
    setEditBudget(c.budget.toString());
    setEditSpent(c.spent.toString());
    setEditStatus(c.status);
    setEditEndDate(c.endDate);
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast('error', 'Campaign name cannot be empty.');
      return;
    }
    const budget = parseFloat(editBudget) || 0;
    const spent = parseFloat(editSpent) || 0;
    
    let roi = '—';
    if (spent > 0) {
      const roiValue = Math.round((budget / (spent || 1)) * 150);
      roi = `${roiValue}%`;
    }

    setCampaignsList(prev => prev.map(item => 
      item.name === editingCampaign?.name ? {
        name: editName.trim(),
        status: editStatus,
        budget: budget,
        spent: spent,
        roi: roi,
        endDate: editEndDate.trim() || 'TBD'
      } : item
    ));

    setEditingCampaign(null);
    toast('success', `Campaign "${editName}" updated successfully!`);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast('error', 'Please enter a campaign name.');
      return;
    }
    const budget = parseFloat(budgetInput) || 0;
    const newCampaign = {
      name: nameInput.trim(),
      status: statusInput,
      budget: budget,
      spent: 0,
      roi: '—',
      endDate: endDateInput.trim() || 'TBD'
    };

    setCampaignsList(prev => [newCampaign, ...prev]);
    setIsModalOpen(false);
    setNameInput('');
    setBudgetInput('');
    setStatusInput('draft');
    setEndDateInput('');
    toast('success', `Campaign "${newCampaign.name}" created successfully!`);
  };

  return (
    <DashboardLayout sidebarItems={businessSidebarItems} title="Campaigns" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Campaigns</h2>
            <p className="text-sm text-muted-foreground">Track your marketing campaigns</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple"
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
        <div className="grid gap-4">
          {campaignsList.map(c => (
            <div key={c.name} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all relative group">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      c.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 
                      c.status === 'completed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 
                      'bg-gray-500/10 text-gray-500'
                    }`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Budget: {formatCurrency(c.budget)} · ROI: {c.roi} · Ends {c.endDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEditing(c)} className="text-xs text-primary hover:underline">Manage</button>
                  <button 
                    onClick={() => {
                      setCampaignsList(prev => prev.filter(item => item.name !== c.name));
                      toast('success', `Deleted campaign: ${c.name}`);
                    }}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors ml-2 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {c.budget > 0 && (
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${(c.spent / c.budget) * 100}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Create New Campaign</h3>
              <button 
                onClick={() => { setIsModalOpen(false); }}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleCreateCampaign}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                  <input 
                    type="text" 
                    required
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="e.g., Summer Clearance Sale"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                  <input 
                    type="number" 
                    required
                    value={budgetInput}
                    onChange={e => setBudgetInput(e.target.value)}
                    placeholder="e.g., 2500"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Initial Status</label>
                  <select 
                    value={statusInput}
                    onChange={e => setStatusInput(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End Date</label>
                  <input 
                    type="text" 
                    required
                    value={endDateInput}
                    onChange={e => setEndDateInput(e.target.value)}
                    placeholder="e.g., Aug 31 or Jul 15"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-border flex justify-end gap-3 bg-secondary/20">
                <button 
                  type="button"
                  onClick={() => { setIsModalOpen(false); }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-foreground hover:bg-accent transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl gradient-primary text-white hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Manage Campaign: {editingCampaign.name}</h3>
              <button 
                onClick={() => { setEditingCampaign(null); }}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleUpdateCampaign}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Name</label>
                  <input 
                    type="text" 
                    required
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="e.g., Summer Clearance Sale"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Budget ($)</label>
                    <input 
                      type="number" 
                      required
                      value={editBudget}
                      onChange={e => setEditBudget(e.target.value)}
                      placeholder="e.g., 2500"
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Spent ($)</label>
                    <input 
                      type="number" 
                      required
                      value={editSpent}
                      onChange={e => setEditSpent(e.target.value)}
                      placeholder="e.g., 1000"
                      className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Campaign Status</label>
                  <select 
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End Date</label>
                  <input 
                    type="text" 
                    required
                    value={editEndDate}
                    onChange={e => setEditEndDate(e.target.value)}
                    placeholder="e.g., Aug 31 or Jul 15"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-border flex justify-end gap-3 bg-secondary/20">
                <button 
                  type="button"
                  onClick={() => { setEditingCampaign(null); }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-foreground hover:bg-accent transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl gradient-primary text-white hover:opacity-90 transition-all shadow-glow-purple"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export function BusinessAnalytics() {
  const [activeMetric, setActiveMetric] = useState<'reach' | 'conversions'>('reach');

  const chartData = {
    reach: [
      { label: 'Week 1', value: 45000, display: '45K' },
      { label: 'Week 2', value: 58000, display: '58K' },
      { label: 'Week 3', value: 52000, display: '52K' },
      { label: 'Week 4', value: 69000, display: '69K' },
      { label: 'Week 5', value: 84000, display: '84K' },
      { label: 'Week 6', value: 92000, display: '92K' },
    ],
    conversions: [
      { label: 'Week 1', value: 180, display: '180' },
      { label: 'Week 2', value: 240, display: '240' },
      { label: 'Week 3', value: 210, display: '210' },
      { label: 'Week 4', value: 310, display: '310' },
      { label: 'Week 5', value: 380, display: '380' },
      { label: 'Week 6', value: 420, display: '420' },
    ]
  };

  const currentData = chartData[activeMetric];
  const maxValue = Math.max(...currentData.map(d => d.value));

  return (
    <DashboardLayout sidebarItems={businessSidebarItems} title="Analytics" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Business Analytics</h2>
            <p className="text-sm text-muted-foreground">Performance insights across campaigns</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveMetric('reach')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === 'reach' ? 'gradient-primary text-white shadow-sm' : 'border border-border text-muted-foreground hover:border-primary/30 bg-secondary/35'
              }`}
            >
              Reach
            </button>
            <button 
              onClick={() => setActiveMetric('conversions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === 'conversions' ? 'gradient-primary text-white shadow-sm' : 'border border-border text-muted-foreground hover:border-primary/30 bg-secondary/35'
              }`}
            >
              Conversions
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Reach', value: '284K', delta: '+34%' },
            { label: 'Conversions', value: '1,240', delta: '+18%' },
            { label: 'Revenue Generated', value: formatCurrency(28400), delta: '+22%' },
            { label: 'Avg CTR', value: '3.8%', delta: '+0.5%' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary/20 transition-all">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Graphical Performance Chart */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground">Campaign Performance Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Showing {activeMetric === 'reach' ? 'Impressions / Reach' : 'Conversion Sales'} over the last 6 weeks</p>
            </div>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>

          <div className="flex items-end gap-3 sm:gap-6 h-48 pt-6">
            {currentData.map(d => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Value tooltip on hover */}
                <span className="text-2xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-secondary border border-border px-2 py-0.5 rounded-md mb-1 shadow-sm">
                  {d.display}
                </span>
                
                {/* Bar */}
                <div 
                  className="w-full rounded-t-xl gradient-primary opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer shadow-glow-purple/10"
                  style={{ height: `${(d.value / maxValue) * 75}%` }}
                  title={`${d.label}: ${d.display}`}
                />
                
                {/* Label */}
                <span className="text-xs text-muted-foreground font-medium mt-1">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function BusinessBilling() {
  return (
    <DashboardLayout sidebarItems={businessSidebarItems} title="Billing" roleLabel="Business Owner">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Billing & Subscription</h2>
          <p className="text-sm text-muted-foreground">Manage your plan and payment methods</p>
        </div>
        <div className="bg-gradient-to-br from-primary/5 to-pink-500/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-bold text-foreground">Business Plan</h3>
              <p className="text-sm text-muted-foreground">$49/month · Renews Aug 1, 2025</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">Active</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => toast('info', 'Opening plan upgrade...')} className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-all">Upgrade to Enterprise</button>
            <button onClick={() => toast('info', 'Opening billing settings...')} className="px-4 py-2 rounded-xl border border-border text-foreground text-sm font-medium hover:border-primary/30 transition-all">Manage Billing</button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Payment History</h3></div>
          <div className="divide-y divide-border">
            {[
              { date: 'Jul 1, 2025', amount: '$49.00', status: 'paid', plan: 'Business Monthly' },
              { date: 'Jun 1, 2025', amount: '$49.00', status: 'paid', plan: 'Business Monthly' },
              { date: 'May 1, 2025', amount: '$49.00', status: 'paid', plan: 'Business Monthly' },
            ].map((inv, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{inv.plan}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{inv.amount}</span>
                <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">{inv.status}</span>
                <button onClick={() => toast('info', 'Downloading invoice...')} className="text-xs text-primary hover:underline">Invoice</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
