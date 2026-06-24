import { useState } from 'react';
import { Plus, Search, Download, Eye, Filter, Palette, Image, Type, Layers, X, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const categories = ['All', 'Logos', 'Colors', 'Typography', 'Images', 'Icons', 'Templates'];

const assets = [
  { id: '1', name: 'Primary Logo', category: 'Logos', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=160&fit=crop', format: 'SVG, PNG', usage: '1,243 uses', updated: '2d ago', size: '48 KB' },
  { id: '2', name: 'Dark Logo Variant', category: 'Logos', preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=160&fit=crop', format: 'SVG, PNG', usage: '876 uses', updated: '2d ago', size: '52 KB' },
  { id: '3', name: 'Brand Color Palette', category: 'Colors', preview: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=160&fit=crop', format: 'ASE, JSON', usage: '2,109 uses', updated: '1w ago', size: '4 KB' },
  { id: '4', name: 'Hero Banner Set', category: 'Images', preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=160&fit=crop', format: 'JPG, WebP', usage: '487 uses', updated: '3d ago', size: '2.4 MB' },
  { id: '5', name: 'Icon Library v4', category: 'Icons', preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=160&fit=crop', format: 'SVG', usage: '3,421 uses', updated: '1w ago', size: '820 KB' },
  { id: '6', name: 'Display Typeface', category: 'Typography', preview: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=160&fit=crop', format: 'OTF, WOFF2', usage: '1,876 uses', updated: '2w ago', size: '1.2 MB' },
  { id: '7', name: 'Social Media Templates', category: 'Templates', preview: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=160&fit=crop', format: 'PSD, Figma', usage: '654 uses', updated: '5d ago', size: '18 MB' },
  { id: '8', name: 'Product Photo Set', category: 'Images', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=160&fit=crop', format: 'JPG, PNG', usage: '321 uses', updated: '1w ago', size: '45 MB' },
];

const catIcons: Record<string, React.ComponentType<{className?: string}>> = { Logos: Image, Colors: Palette, Typography: Type, Images: Image, Icons: Layers, Templates: Layers };

export default function TeamAssets() {
  const [assetsList, setAssetsList] = useState(assets);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Modals state
  const [showUpload, setShowUpload] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<any | null>(null);

  // Upload Form states
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Logos');
  const [uploadSize, setUploadSize] = useState('100 KB');
  const [uploadFormat, setUploadFormat] = useState('PNG');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');

  // Filter states
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterSize, setFilterSize] = useState('All');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadName(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PNG';
      setUploadFormat(ext);
      const sizeInKB = Math.round(file.size / 1024);
      const sizeStr = sizeInKB > 1024 ? `${(sizeInKB / 1024).toFixed(1)} MB` : `${sizeInKB} KB`;
      setUploadSize(sizeStr);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview('');
      }
    }
  };

  const closeUploadModal = () => {
    setShowUpload(false);
    setUploadName('');
    setUploadCategory('Logos');
    setUploadSize('100 KB');
    setUploadFormat('PNG');
    setSelectedFile(null);
    setFilePreview('');
  };

  const handleUploadAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) {
      toast('warning', 'Please enter asset name');
      return;
    }
    const newAsset = {
      id: (assetsList.length + 1).toString(),
      name: uploadName.trim(),
      category: uploadCategory,
      preview: filePreview || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=160&fit=crop',
      format: uploadFormat,
      usage: '0 uses',
      updated: 'Just now',
      size: uploadSize
    };
    setAssetsList(prev => [newAsset, ...prev]);
    closeUploadModal();
    toast('success', `Asset "${newAsset.name}" uploaded successfully!`);
  };

  const handleDownloadAsset = (asset: any) => {
    const content = `PIXIVISUAL BRAND ASSET FILE\n\nName: ${asset.name}\nCategory: ${asset.category}\nFormat: ${asset.format}\nSize: ${asset.size}\nUsage: ${asset.usage}\nUpdated: ${asset.updated}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${asset.name.replace(/\s+/g, '_')}_spec.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast('success', `Asset "${asset.name}" downloaded!`);
  };

  const filtered = assetsList.filter(a => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesFormat = filterFormat === 'All' || a.format.toLowerCase().includes(filterFormat.toLowerCase());
    
    let matchesSize = true;
    if (filterSize === 'Under 1MB') {
      matchesSize = a.size.includes('KB') || parseFloat(a.size) < 1;
    } else if (filterSize === 'Over 1MB') {
      matchesSize = a.size.includes('MB') && parseFloat(a.size) >= 1;
    }

    return matchesCat && matchesSearch && matchesFormat && matchesSize;
  });

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Brand Assets" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Assets</h2>
            <p className="text-sm text-muted-foreground">{assetsList.length} assets across all workspaces</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilter(true)} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-foreground text-sm hover:border-primary/30 transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
              <Plus className="w-4 h-4" /> Upload Asset
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assets..." className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeCategory === cat ? 'gradient-primary text-white shadow-glow-purple' : 'border border-border bg-card text-muted-foreground hover:border-primary/30'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(asset => {
            const Icon = catIcons[asset.category] || Layers;
            return (
              <div key={asset.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all">
                <div className="relative">
                  <img src={asset.preview} alt={asset.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                    <button onClick={() => setPreviewAsset(asset)} className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-opacity hover:scale-110">
                      <Eye className="w-3.5 h-3.5 text-gray-800" />
                    </button>
                    <button onClick={() => handleDownloadAsset(asset)} className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-opacity hover:scale-110">
                      <Download className="w-3.5 h-3.5 text-gray-800" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-2xs font-medium">
                      <Icon className="w-2.5 h-2.5" />{asset.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground truncate mb-1">{asset.name}</p>
                  <div className="flex items-center justify-between text-2xs text-muted-foreground">
                    <span>{asset.format}</span>
                    <span>{asset.size}</span>
                  </div>
                  <div className="text-2xs text-muted-foreground mt-0.5">{asset.usage} · {asset.updated}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Asset Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={closeUploadModal} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Upload Brand Asset</h3>
              <button onClick={closeUploadModal} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUploadAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Asset File</label>
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-4 bg-muted/20 cursor-pointer transition-all">
                  <input 
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1.5" />
                    <span className="text-xs text-foreground font-semibold block">
                      {selectedFile ? selectedFile.name : 'Choose file or drag & drop'}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">
                      {selectedFile ? 'Parsed details automatically' : 'Supports PNG, SVG, JPG, JSON, OTF'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Asset Name</label>
                <input 
                  type="text"
                  required
                  value={uploadName} 
                  onChange={e => setUploadName(e.target.value)} 
                  placeholder="e.g. Corporate Colors v2" 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
                <select
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="Logos">Logos</option>
                  <option value="Colors">Colors</option>
                  <option value="Typography">Typography</option>
                  <option value="Images">Images</option>
                  <option value="Icons">Icons</option>
                  <option value="Templates">Templates</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Size Label</label>
                  <input 
                    type="text"
                    required
                    value={uploadSize} 
                    onChange={e => setUploadSize(e.target.value)} 
                    placeholder="e.g. 1.2 MB or 45 KB" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Format</label>
                  <input 
                    type="text"
                    required
                    value={uploadFormat} 
                    onChange={e => setUploadFormat(e.target.value)} 
                    placeholder="e.g. SVG, PNG" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={closeUploadModal} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowFilter(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Filter Assets</h3>
              <button onClick={() => setShowFilter(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Format</label>
                <select
                  value={filterFormat}
                  onChange={e => setFilterFormat(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="All">All Formats</option>
                  <option value="PNG">PNG</option>
                  <option value="SVG">SVG</option>
                  <option value="JPG">JPG</option>
                  <option value="JSON">JSON</option>
                  <option value="OTF">OTF</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Asset Size</label>
                <select
                  value={filterSize}
                  onChange={e => setFilterSize(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                >
                  <option value="All">All Sizes</option>
                  <option value="Under 1MB">Under 1 MB</option>
                  <option value="Over 1MB">Over 1 MB</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-5 border-t border-border mt-6">
              <button onClick={() => { setFilterFormat('All'); setFilterSize('All'); setShowFilter(false); }} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Reset</button>
              <button onClick={() => setShowFilter(false)} className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Asset Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setPreviewAsset(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-4 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
              <h3 className="text-base font-display font-bold text-foreground">{previewAsset.name}</h3>
              <button onClick={() => setPreviewAsset(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="w-full h-64 rounded-xl overflow-hidden border border-border bg-background flex items-center justify-center">
                <img src={previewAsset.preview} alt={previewAsset.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground p-1 bg-muted/20 rounded-xl border border-border/50">
                <div className="p-2">
                  <span className="font-semibold text-foreground">Category:</span> {previewAsset.category}
                </div>
                <div className="p-2">
                  <span className="font-semibold text-foreground">File Format:</span> {previewAsset.format}
                </div>
                <div className="p-2">
                  <span className="font-semibold text-foreground">File Size:</span> {previewAsset.size}
                </div>
                <div className="p-2">
                  <span className="font-semibold text-foreground">Last Updated:</span> {previewAsset.updated}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-border">
              <button onClick={() => setPreviewAsset(null)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
              <button onClick={() => { handleDownloadAsset(previewAsset); setPreviewAsset(null); }} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
