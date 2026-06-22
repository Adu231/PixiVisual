import { useState } from 'react';
import { Plus, Search, Download, Eye, Filter, Palette, Image, Type, Layers } from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = assets.filter(a =>
    (activeCategory === 'All' || a.category === activeCategory) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Brand Assets" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Assets</h2>
            <p className="text-sm text-muted-foreground">1,172 assets across all workspaces</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast('info', 'Opening asset filters...')} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-foreground text-sm hover:border-primary/30 transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button onClick={() => toast('info', 'Opening asset uploader...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2">
                    <button onClick={() => toast('info', `Previewing ${asset.name}...`)} className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-opacity">
                      <Eye className="w-3.5 h-3.5 text-gray-800" />
                    </button>
                    <button onClick={() => toast('success', `Downloading ${asset.name}...`)} className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-opacity">
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
    </DashboardLayout>
  );
}
