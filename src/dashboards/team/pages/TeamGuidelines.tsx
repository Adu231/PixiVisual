import { useState } from 'react';
import { FileText, Download, Eye, Edit, Plus, Palette, Type, Image, Layout, ArrowRight, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teamSidebarItems } from '../TeamDashboard';
import { toast } from '@/components/ui/Toast';

const guidelines = [
  { id: '1', title: 'Master Brand Guidelines', version: 'v3.2', updated: 'Jun 2025', pages: 84, status: 'published', category: 'Brand Identity', icon: Palette, color: 'from-purple-500 to-pink-500' },
  { id: '2', title: 'Digital Design Standards', version: 'v2.1', updated: 'May 2025', pages: 42, status: 'published', category: 'Digital', icon: Layout, color: 'from-blue-500 to-purple-500' },
  { id: '3', title: 'Typography System', version: 'v1.8', updated: 'Apr 2025', pages: 28, status: 'published', category: 'Typography', icon: Type, color: 'from-green-500 to-blue-500' },
  { id: '4', title: 'Photography Style Guide', version: 'v1.3', updated: 'Mar 2025', pages: 36, status: 'published', category: 'Photography', icon: Image, color: 'from-orange-500 to-pink-500' },
  { id: '5', title: 'Social Media Playbook', version: 'v2.0 Draft', updated: 'Jun 2025', pages: 19, status: 'draft', category: 'Social', icon: Layout, color: 'from-teal-500 to-green-500' },
];

const colorPalette = [
  { name: 'Primary Purple', hex: '#7C3AED', usage: 'Primary CTAs, headings, brand marks' },
  { name: 'Brand Pink', hex: '#EC4899', usage: 'Accents, gradients, secondary elements' },
  { name: 'Accent Blue', hex: '#2563EB', usage: 'Links, informational content, icons' },
  { name: 'Deep Dark', hex: '#0F0F0F', usage: 'Dark backgrounds, premium sections' },
  { name: 'Off White', hex: '#FAFAFA', usage: 'Page backgrounds, card surfaces' },
  { name: 'Muted Gray', hex: '#6B7280', usage: 'Secondary text, borders, dividers' },
];

export default function TeamGuidelines() {
  const [guidelinesList, setGuidelinesList] = useState(guidelines);
  const [paletteList, setPaletteList] = useState(colorPalette);

  // Modals state
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [viewDoc, setViewDoc] = useState<any | null>(null);
  const [editDoc, setEditDoc] = useState<any | null>(null);
  const [showPaletteEditor, setShowPaletteEditor] = useState(false);
  const [showTypoGuide, setShowTypoGuide] = useState(false);
  const [generating, setGenerating] = useState(false);

  // New Doc Form
  const [newName, setNewName] = useState('');
  const [newVersion, setNewVersion] = useState('v1.0');
  const [newCategory, setNewCategory] = useState('Brand Identity');
  const [newPages, setNewPages] = useState('10');
  const [newStatus, setNewStatus] = useState('published');

  // Edit Doc Form
  const [editTitle, setEditTitle] = useState('');
  const [editVer, setEditVer] = useState('');
  const [editCat, setEditCat] = useState('');
  const [editPages, setEditPages] = useState('');
  const [editStatus, setEditStatus] = useState('published');

  // Auto Generate Form
  const [showAutoGenerate, setShowAutoGenerate] = useState(false);
  const [genName, setGenName] = useState('');
  const [genCategory, setGenCategory] = useState('Brand Identity');

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast('warning', 'Please enter document name');
      return;
    }
    const colorOptions = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-purple-500',
      'from-green-500 to-blue-500',
      'from-orange-500 to-pink-500',
      'from-teal-500 to-green-500'
    ];
    const categoryIcons: Record<string, any> = {
      'Brand Identity': Palette,
      'Digital': Layout,
      'Typography': Type,
      'Photography': Image,
      'Social': Layout
    };
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const newDoc = {
      id: (guidelinesList.length + 1).toString(),
      title: newName.trim(),
      version: newVersion,
      updated: 'Jun 2025',
      pages: parseInt(newPages) || 10,
      status: newStatus,
      category: newCategory,
      icon: categoryIcons[newCategory] || Palette,
      color: randomColor
    };
    setGuidelinesList(prev => [...prev, newDoc]);
    setShowAddDoc(false);
    setNewName('');
    setNewVersion('v1.0');
    setNewPages('10');
    setNewStatus('published');
    toast('success', `Guideline Document "${newDoc.title}" created successfully!`);
  };

  const handleStartEdit = (doc: any) => {
    setEditDoc(doc);
    setEditTitle(doc.title);
    setEditVer(doc.version);
    setEditCat(doc.category);
    setEditPages(doc.pages.toString());
    setEditStatus(doc.status);
  };

  const handleUpdateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      toast('warning', 'Please enter document title');
      return;
    }
    const categoryIcons: Record<string, any> = {
      'Brand Identity': Palette,
      'Digital': Layout,
      'Typography': Type,
      'Photography': Image,
      'Social': Layout
    };
    setGuidelinesList(prev => prev.map(d => d.id === editDoc.id ? {
      ...d,
      title: editTitle.trim(),
      version: editVer,
      category: editCat,
      pages: parseInt(editPages) || 10,
      status: editStatus,
      icon: categoryIcons[editCat] || Palette
    } : d));
    setEditDoc(null);
    toast('success', `Document "${editTitle}" updated!`);
  };

  const handleDownloadGuideline = (doc: any) => {
    const content = `PIXIVISUAL BRAND GUIDELINES\n\nTitle: ${doc.title}\nCategory: ${doc.category}\nVersion: ${doc.version}\nStatus: ${doc.status.toUpperCase()}\nPages: ${doc.pages}\nLast Updated: ${doc.updated}\n\n-- CONFIDENTIAL BRAND STANDARDS --\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/\s+/g, '_')}_guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast('success', `Guideline downloaded for ${doc.title}`);
  };

  const handleSavePalette = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', 'Color Palette updated successfully!');
    setShowPaletteEditor(false);
  };

  const handleAutoGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genName.trim()) {
      toast('warning', 'Please enter document name');
      return;
    }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1500));
    setGenerating(false);

    const newDoc = {
      id: (guidelinesList.length + 1).toString(),
      title: genName.trim(),
      version: 'v1.0 (Auto)',
      updated: 'Jun 2025',
      pages: Math.floor(15 + Math.random() * 30),
      status: 'draft',
      category: genCategory,
      icon: genCategory === 'Typography' ? Type : genCategory === 'Photography' ? Image : Layout,
      color: 'from-teal-500 to-green-500'
    };

    setGuidelinesList(prev => [...prev, newDoc]);
    setShowAutoGenerate(false);
    setGenName('');
    toast('success', `Auto-generated Brand Guideline for "${newDoc.title}"!`);
  };

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Brand Guidelines" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Guidelines</h2>
            <p className="text-sm text-muted-foreground">Official brand documentation and style guides</p>
          </div>
          <button onClick={() => setShowAddDoc(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Document
          </button>
        </div>

        {/* Documents */}
        <div className="grid gap-4">
          {guidelinesList.map(doc => (
            <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center flex-shrink-0`}>
                  <doc.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-display font-semibold text-foreground">{doc.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground">{doc.version}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.status === 'published' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600'}`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{doc.category} · {doc.pages} pages · Updated {doc.updated}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setViewDoc(doc)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleStartEdit(doc)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDownloadGuideline(doc)} className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-all">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Color Palette */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-display font-semibold text-foreground">Official Color Palette</h3>
            <button onClick={() => setShowPaletteEditor(true)} className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
              Edit Palette <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {paletteList.map(color => (
              <div key={color.name} className="space-y-2">
                <div
                  className="w-full h-14 rounded-xl border border-border cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => { navigator.clipboard?.writeText(color.hex); toast('success', `Copied ${color.hex}`); }}
                  title={`Click to copy ${color.hex}`}
                />
                <div>
                  <p className="text-xs font-semibold text-foreground truncate">{color.name}</p>
                  <p className="text-2xs font-mono text-muted-foreground">{color.hex}</p>
                  <p className="text-2xs text-muted-foreground mt-0.5 line-clamp-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Quick Ref */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground">Typography Reference</h3>
            <button onClick={() => setShowTypoGuide(true)} className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
              Full Guide <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Display', sample: 'The quick brown fox', font: 'Plus Jakarta Sans', weight: '700', size: '32–64px' },
              { name: 'Heading', sample: 'Section heading text', font: 'Plus Jakarta Sans', weight: '600', size: '24–36px' },
              { name: 'Body', sample: 'Regular paragraph body copy for reading.', font: 'Inter', weight: '400', size: '16–18px' },
              { name: 'Caption', sample: 'Small metadata and captions', font: 'Inter', weight: '400', size: '12–14px' },
            ].map(t => (
              <div key={t.name} className="flex items-center gap-4 p-3 rounded-xl border border-border">
                <div className="w-16 flex-shrink-0">
                  <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate" style={{ fontFamily: t.font, fontWeight: t.weight }}>{t.sample}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">{t.font}</p>
                  <p className="text-2xs text-muted-foreground">{t.size} · {t.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground flex-1">Need a custom brand guideline document?</p>
          <button onClick={() => setShowAutoGenerate(true)} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0">
            Auto-Generate
          </button>
        </div>
      </div>

      {/* New Document Modal */}
      {showAddDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAddDoc(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Add Guideline Document</h3>
              <button onClick={() => setShowAddDoc(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Document Title</label>
                <input 
                  type="text"
                  required
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  placeholder="e.g. Video Production Standards" 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Version</label>
                  <input 
                    type="text"
                    required
                    value={newVersion} 
                    onChange={e => setNewVersion(e.target.value)} 
                    placeholder="e.g. v1.0" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Count</label>
                  <input 
                    type="number"
                    required
                    value={newPages} 
                    onChange={e => setNewPages(e.target.value)} 
                    placeholder="e.g. 24" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital">Digital</option>
                    <option value="Typography">Typography</option>
                    <option value="Photography">Photography</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAddDoc(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setViewDoc(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">View Document</h3>
              <button onClick={() => setViewDoc(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${viewDoc.color} flex items-center justify-center text-white`}>
                  <viewDoc.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">{viewDoc.title}</h4>
                  <span className="text-xs text-muted-foreground">{viewDoc.category}</span>
                </div>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border/50 space-y-2 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">Version:</span> {viewDoc.version}</p>
                <p><span className="font-semibold text-foreground">Total Pages:</span> {viewDoc.pages} pages</p>
                <p><span className="font-semibold text-foreground">Status:</span> <span className="capitalize text-foreground font-semibold">{viewDoc.status}</span></p>
                <p><span className="font-semibold text-foreground">Last Updated:</span> {viewDoc.updated}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border mt-6">
              <button onClick={() => setViewDoc(null)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
              <button onClick={() => { handleDownloadGuideline(viewDoc); setViewDoc(null); }} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-glow-purple">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {editDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setEditDoc(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Edit Guideline Document</h3>
              <button onClick={() => setEditDoc(null)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Document Title</label>
                <input 
                  type="text"
                  required
                  value={editTitle} 
                  onChange={e => setEditTitle(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Version</label>
                  <input 
                    type="text"
                    required
                    value={editVer} 
                    onChange={e => setEditVer(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Count</label>
                  <input 
                    type="number"
                    required
                    value={editPages} 
                    onChange={e => setEditPages(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
                  <select
                    value={editCat}
                    onChange={e => setEditCat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital">Digital</option>
                    <option value="Typography">Typography</option>
                    <option value="Photography">Photography</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setEditDoc(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Color Palette Editor Modal */}
      {showPaletteEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowPaletteEditor(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Edit Brand Palette</h3>
              <button onClick={() => setShowPaletteEditor(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSavePalette} className="space-y-4">
              <div className="max-h-60 overflow-y-auto pr-1 space-y-3">
                {paletteList.map((color, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg border border-border shrink-0" style={{ backgroundColor: color.hex }} />
                    <input 
                      type="text"
                      required
                      value={color.name} 
                      onChange={e => {
                        const val = e.target.value;
                        setPaletteList(prev => prev.map((item, i) => i === idx ? { ...item, name: val } : item));
                      }} 
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary" 
                    />
                    <input 
                      type="text"
                      required
                      value={color.hex} 
                      onChange={e => {
                        const val = e.target.value;
                        setPaletteList(prev => prev.map((item, i) => i === idx ? { ...item, hex: val } : item));
                      }} 
                      className="w-24 px-3 py-1.5 rounded-lg border border-border bg-background font-mono text-foreground text-xs outline-none focus:border-primary" 
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-3 border-t border-border mt-4">
                <button type="button" onClick={() => { setPaletteList(colorPalette); setShowPaletteEditor(false); }} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">Reset</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">Save Palette</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Typography Full Guide Modal */}
      {showTypoGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowTypoGuide(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Full Typography Guide</h3>
              <button onClick={() => setShowTypoGuide(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                <h4 className="text-xs font-bold text-foreground mb-1">Font Stack Definitions</h4>
                <p className="text-2xs text-muted-foreground">Primary Brand Font: <strong>Plus Jakarta Sans</strong> (Headings & Titles)</p>
                <p className="text-2xs text-muted-foreground mt-0.5">Secondary Brand Font: <strong>Inter</strong> (Body Copy, Metadata, Paragraphs)</p>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-semibold text-foreground mb-1">Display Styles (Banner CTA / Numbers)</h5>
                  <p className="p-2 border border-border rounded-lg text-lg font-bold text-foreground truncate" style={{ fontFamily: 'Plus Jakarta Sans' }}>Plus Jakarta Sans - Bold 64px</p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-foreground mb-1">Headings (Section Title / Sidebar labels)</h5>
                  <p className="p-2 border border-border rounded-lg text-sm font-semibold text-foreground truncate" style={{ fontFamily: 'Plus Jakarta Sans' }}>Plus Jakarta Sans - SemiBold 24px</p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-foreground mb-1">Body Copy (Paragraphs)</h5>
                  <p className="p-2 border border-border rounded-lg text-xs text-muted-foreground" style={{ fontFamily: 'Inter' }}>Inter - Regular 16px. Used for main descriptive elements, messages, lists, and layout cards.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-6">
              <button onClick={() => setShowTypoGuide(false)} className="px-4 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-muted transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Generate Document Modal */}
      {showAutoGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowAutoGenerate(false)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
              <h3 className="text-base font-display font-bold text-foreground">Auto-Generate Guidelines</h3>
              <button onClick={() => setShowAutoGenerate(false)} className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAutoGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Guideline Name</label>
                <input 
                  type="text"
                  required
                  value={genName} 
                  onChange={e => setGenName(e.target.value)} 
                  placeholder="e.g. Email Layout Standards" 
                  disabled={generating}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category Area</label>
                <select
                  value={genCategory}
                  onChange={e => setGenCategory(e.target.value)}
                  disabled={generating}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium disabled:opacity-60"
                >
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="Digital">Digital</option>
                  <option value="Typography">Typography</option>
                  <option value="Photography">Photography</option>
                  <option value="Social">Social</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-border mt-4">
                <button type="button" onClick={() => setShowAutoGenerate(false)} disabled={generating} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all disabled:opacity-60">Cancel</button>
                <button type="submit" disabled={generating} className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple flex items-center justify-center disabled:opacity-60">
                  {generating ? 'Generating Document...' : 'Generate Guideline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
