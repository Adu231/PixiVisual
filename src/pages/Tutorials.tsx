import { useEffect, useState } from 'react';
import { Play, PlayCircle, Search, Clock, ArrowRight, Video, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const tutorials = [
  { 
    id: '1', 
    title: 'PixiVisual Editor Essentials', 
    category: 'Basics', 
    duration: '4:20', 
    thumb: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=400&fit=crop', 
    desc: 'Master the core layout grid, drag-and-drop actions, and element alignment tools.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-web-design-project-on-screen-41710-large.mp4'
  },
  { 
    id: '2', 
    title: 'Setting Up Your Brand Kit', 
    category: 'Brand Kits', 
    duration: '6:45', 
    thumb: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&fit=crop', 
    desc: 'Add brand color guidelines, configure custom fonts, and lock assets for teammates.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-creative-designer-working-on-a-digital-tablet-40742-large.mp4'
  },
  { 
    id: '3', 
    title: 'Generative AI Prompts Mastery', 
    category: 'AI Studio', 
    duration: '8:15', 
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&fit=crop', 
    desc: 'Tips and tricks to write high-converting AI prompts and use style variations.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-sketchbook-40741-large.mp4'
  },
  { 
    id: '4', 
    title: 'Collaborating in Shared Spaces', 
    category: 'Collaboration', 
    duration: '5:30', 
    thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&fit=crop', 
    desc: 'Set up real-time co-authoring, handle comments, and run approval loops.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-designer-drawing-on-a-tablet-40743-large.mp4'
  },
  { 
    id: '5', 
    title: 'Designing Social Post Templates', 
    category: 'Basics', 
    duration: '7:10', 
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop', 
    desc: 'Step-by-step tutorial to assemble high-fidelity templates for Instagram and LinkedIn.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-web-designer-working-on-his-computer-at-night-41714-large.mp4'
  },
  { 
    id: '6', 
    title: 'Advanced Image Background Removal', 
    category: 'AI Studio', 
    duration: '3:50', 
    thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&fit=crop', 
    desc: 'Leverage our one-click AI background cutout tools for high-res product models.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-working-on-a-website-wireframe-41715-large.mp4'
  }
];

const categories = ['All', 'Basics', 'AI Studio', 'Brand Kits', 'Collaboration'];

export default function Tutorials() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = tutorials.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-slide-up">
              <Video className="w-3 h-3" /> Tutorials & Video Guides
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-slide-up">
              Learn how to design<br />
              <span className="gradient-primary-text">like a professional</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up">
              Browse video walkthroughs and step-by-step guides compiled by our product design specialists.
            </p>
            {/* Search */}
            <div className="relative max-w-md mx-auto animate-slide-up">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tutorials..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-16 bg-surface/50">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-white shadow-glow-purple' : 'border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-card'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tut, i) => (
                <div 
                  key={tut.id} 
                  onClick={() => setActiveVideo(tut.videoUrl)}
                  className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary/20 hover:shadow-card-hover transition-all reveal-up group cursor-pointer" 
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img src={tut.thumb} alt={tut.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/35 opacity-70 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/60 text-[10px] font-semibold text-white">
                      <Clock className="w-3 h-3" /> {tut.duration}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-primary uppercase">{tut.category}</span>
                    <h3 className="font-semibold text-foreground leading-tight hover:text-primary transition-colors">{tut.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tut.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No tutorials found matching your query.</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-primary text-sm font-medium hover:underline mt-2">Clear filters</button>
              </div>
            )}
          </div>
        </section>

        {/* Support */}
        <section className="py-16">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 reveal-up">Looking for specialized training?</h2>
            <p className="text-muted-foreground mb-6 reveal-up stagger-1">
              For enterprise teams seeking custom webinars, workflow integration training, or onboarding sessions, get in touch with our solutions engineers.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:bg-primary/5 transition-all">
              Request Team Training <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
      <Footer />

      {/* Video Playback Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setActiveVideo(null)} />
          <div className="relative z-10 w-full max-w-4xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full bg-black">
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
