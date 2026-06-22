import { FileText, Download, Eye, Edit, Plus, Palette, Type, Image, Layout, ArrowRight } from 'lucide-react';
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
  return (
    <DashboardLayout sidebarItems={teamSidebarItems} title="Brand Guidelines" roleLabel="Enterprise Team">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Brand Guidelines</h2>
            <p className="text-sm text-muted-foreground">Official brand documentation and style guides</p>
          </div>
          <button onClick={() => toast('info', 'Creating new guideline document...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Document
          </button>
        </div>

        {/* Documents */}
        <div className="grid gap-4">
          {guidelines.map(doc => (
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
                  <button onClick={() => toast('info', `Viewing ${doc.title}...`)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => toast('info', `Editing ${doc.title}...`)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => toast('success', `Downloading ${doc.title}...`)} className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-all">
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
            <button onClick={() => toast('info', 'Opening palette editor...')} className="text-xs text-primary hover:underline flex items-center gap-1">
              Edit Palette <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {colorPalette.map(color => (
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
            <button onClick={() => toast('info', 'Opening full typography guide...')} className="text-xs text-primary hover:underline flex items-center gap-1">
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
          <button onClick={() => toast('info', 'Opening brand guideline generator...')} className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-all flex-shrink-0">
            Auto-Generate
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
