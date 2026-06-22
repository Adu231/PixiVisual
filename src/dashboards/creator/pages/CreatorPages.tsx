// Creator sub-pages
import { useState } from 'react';
import { Sparkles, Zap, Image as ImageIcon, Download, Share2, Sliders } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from '@/components/ui/Toast';

const sidebarItems = [
  { label: 'AI Studio', href: '/dashboard/creator/studio', icon: Sparkles },
  { label: 'My Designs', href: '/dashboard/creator/designs', icon: ImageIcon },
  { label: 'Templates', href: '/dashboard/creator/templates', icon: Sliders },
  { label: 'Social Media', href: '/dashboard/creator/social', icon: Share2 },
  { label: 'Video Studio', href: '/dashboard/creator/video', icon: Download },
  { label: 'Analytics', href: '/dashboard/creator/analytics', icon: Zap },
];

const styles = ['Photorealistic', 'Illustration', 'Anime', '3D Render', 'Oil Painting', 'Minimalist', 'Vintage', 'Neon'];
const ratios = ['1:1', '16:9', '9:16', '4:5', '3:2'];

export function CreatorAIStudio() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [ratio, setRatio] = useState('1:1');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const generate = async () => {
    if (!prompt.trim()) { toast('warning', 'Enter a prompt first'); return; }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setGenerating(false);
    setResults([
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    ]);
    toast('success', '4 designs generated!');
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="AI Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">AI Design Studio</h2>
          <p className="text-sm text-muted-foreground">Generate stunning visuals from text descriptions</p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-pink-500/5 border border-primary/20 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Describe your design</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={3}
              placeholder="e.g. A vibrant summer sale banner with tropical colors, palm trees, and bold yellow text..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Art Style</label>
              <div className="flex flex-wrap gap-2">
                {styles.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${style === s ? 'gradient-primary text-white' : 'border border-border bg-card text-muted-foreground hover:border-primary/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {ratios.map(r => (
                  <button key={r} onClick={() => setRatio(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${ratio === r ? 'gradient-primary text-white' : 'border border-border bg-card text-muted-foreground hover:border-primary/30'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={generate} disabled={generating}
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-glow-purple">
            {generating ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate Designs</>}
          </button>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Generated Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {results.map((src, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden border border-border">
                  <img src={src} alt={`Result ${i + 1}`} className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                    <button onClick={() => toast('success', 'Saved to designs!')} className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-medium transition-opacity">Save</button>
                    <button onClick={() => toast('success', 'Downloading...')} className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium transition-opacity">Export</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Enter a prompt above to generate your first AI design</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export function CreatorDesigns() {
  const designs = [
    { id: '1', title: 'Summer Instagram Post', type: 'Social Media', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', updated: '2h ago', status: 'published' },
    { id: '2', title: 'YouTube Thumbnail', type: 'YouTube', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop', updated: '5h ago', status: 'draft' },
    { id: '3', title: 'Blog Cover Image', type: 'Blog', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop', updated: '1d ago', status: 'published' },
    { id: '4', title: 'Story Template', type: 'Instagram Story', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', updated: '2d ago', status: 'published' },
    { id: '5', title: 'LinkedIn Banner', type: 'LinkedIn', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop', updated: '3d ago', status: 'published' },
    { id: '6', title: 'Product Ad', type: 'Ad Creative', thumb: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop', updated: '4d ago', status: 'draft' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="My Designs" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">My Designs</h2>
            <p className="text-sm text-muted-foreground">{designs.length} designs total</p>
          </div>
          <button onClick={() => toast('info', 'Opening design editor...')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-glow-purple">
            <Zap className="w-4 h-4" /> New Design
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map(d => (
            <div key={d.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all cursor-pointer" onClick={() => toast('info', `Opening ${d.title}...`)}>
              <div className="relative">
                <img src={d.thumb} alt={d.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${d.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>{d.status}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground truncate">{d.title}</p>
                <p className="text-2xs text-muted-foreground mt-0.5">{d.type} · {d.updated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CreatorTemplates() {
  const templates = [
    { id: '1', title: 'Bold Summer Sale', category: 'Social Media', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', isPremium: false },
    { id: '2', title: 'Corporate Presentation', category: 'Presentation', thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop', isPremium: true },
    { id: '3', title: 'YouTube Thumbnail Pack', category: 'YouTube', thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop', isPremium: false },
    { id: '4', title: 'Minimal Brand Kit', category: 'Branding', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', isPremium: true },
    { id: '5', title: 'Event Poster', category: 'Marketing', thumb: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop', isPremium: false },
    { id: '6', title: 'E-commerce Promo', category: 'E-commerce', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop', isPremium: false },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Templates" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Template Library</h2>
          <p className="text-sm text-muted-foreground">10,000+ professional templates ready to customize</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['All', 'Social Media', 'Presentation', 'YouTube', 'Branding', 'Marketing', 'E-commerce'].map(cat => (
            <button key={cat} onClick={() => toast('info', `Filtering by ${cat}`)} className="px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-medium text-muted-foreground hover:border-primary/30 whitespace-nowrap flex-shrink-0 transition-all">{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all">
              <div className="relative">
                <img src={t.thumb} alt={t.title} className="w-full h-36 object-cover" />
                {t.isPremium && <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">PRO</span>}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground">{t.title}</p>
                <p className="text-2xs text-muted-foreground mt-0.5">{t.category}</p>
                <button onClick={() => toast('info', `Using template: ${t.title}`)} className="mt-2 w-full py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all">Use Template</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CreatorSocial() {
  const platforms = [
    { name: 'Instagram Post', size: '1080×1080', icon: '📸', count: 42 },
    { name: 'Instagram Story', size: '1080×1920', icon: '📱', count: 28 },
    { name: 'YouTube Thumbnail', size: '1280×720', icon: '▶️', count: 15 },
    { name: 'Twitter/X Card', size: '1200×628', icon: '🐦', count: 23 },
    { name: 'LinkedIn Post', size: '1200×627', icon: '💼', count: 18 },
    { name: 'Facebook Ad', size: '1200×628', icon: '📘', count: 11 },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Social Media" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Social Media Creator</h2>
          <p className="text-sm text-muted-foreground">Platform-optimized designs for every social network</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platforms.map(p => (
            <div key={p.name} onClick={() => toast('info', `Creating ${p.name}...`)} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{p.size}px</p>
              <p className="text-xs text-primary font-medium mt-1">{p.count} designs</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CreatorVideo() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Video Studio" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Video Studio</h2>
          <p className="text-sm text-muted-foreground">Create compelling video content with AI assistance</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'AI Video Generator', desc: 'Generate short videos from prompts', icon: '🎬', action: 'Generate Video' },
            { title: 'Motion Templates', desc: '500+ animated design templates', icon: '✨', action: 'Browse Templates' },
            { title: 'Slideshow Creator', desc: 'Turn photos into beautiful slideshows', icon: '📷', action: 'Create Slideshow' },
            { title: 'Intro/Outro Maker', desc: 'Professional channel branding videos', icon: '🎯', action: 'Create Intro' },
            { title: 'AI Voiceover', desc: 'Add natural AI voices to your videos', icon: '🎙️', action: 'Add Voiceover' },
            { title: 'Video Editor', desc: 'Trim, cut, and enhance video clips', icon: '✂️', action: 'Open Editor' },
          ].map(item => (
            <div key={item.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-display font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{item.desc}</p>
              <button onClick={() => toast('info', `Opening ${item.title}...`)} className="w-full py-2 rounded-xl gradient-primary text-white text-xs font-medium hover:opacity-90 transition-all">{item.action}</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CreatorAnalytics() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Analytics" roleLabel="Content Creator">
      <div className="p-4 lg:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Content Analytics</h2>
          <p className="text-sm text-muted-foreground">Track performance across all your designs</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Views', value: '12.4K', delta: '+18%' },
            { label: 'Designs Published', value: '89', delta: '+5 today' },
            { label: 'Downloads', value: '1,240', delta: '+34%' },
            { label: 'Avg Engagement', value: '4.2%', delta: '+0.8%' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-xl font-display font-bold gradient-primary-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-green-500 font-medium mt-1">{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Views Last 7 Days</h3>
          <div className="flex items-end gap-2 h-32">
            {[820, 1240, 960, 1480, 1120, 1680, 1340].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg gradient-primary" style={{ height: `${(h / 1680) * 100}%` }} />
                <span className="text-2xs text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
