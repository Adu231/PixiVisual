import { useEffect, useState } from 'react';
import { 
  BookOpen, Search, Play, HelpCircle, Terminal, Check, Copy, 
  Sparkles, Palette, Layout, Shield, Store, ArrowRight, Code2, Cpu
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/components/ui/Toast';

const docCategories = [
  {
    id: 'ai-wizard',
    title: 'AI Generator Studio',
    icon: Sparkles,
    description: 'Instruct our AI models using natural language. Customize aspect ratios, styles, filters, and rendering weights.',
    gradient: 'from-purple-500 to-indigo-500 shadow-purple-500/10',
    tags: ['Stable Diffusion', 'Style Filters', 'Variations'],
    guide: {
      overview: 'Our generative AI pipelines analyze prompts to formulate visual content compositions. To get optimal results, use description variables, styling keywords, and aspect ratio overrides.',
      steps: [
        'Use specific descriptions rather than generic phrases (e.g. "matte glassmorphic card on neon dark grid" instead of "cool box").',
        'Leverage style keywords like "cyberpunk", "photorealistic", "corporate-pastel", or "glassmorphism".',
        'Configure seed parameters to locked generation nodes for version compliance.'
      ]
    }
  },
  {
    id: 'brand-kit',
    title: 'Brand Kit Integrator',
    icon: Palette,
    description: 'Lock in brand colors, vector logos, font styles, and guidelines. Enforce consistency automatically across teams.',
    gradient: 'from-pink-500 to-rose-500 shadow-pink-500/10',
    tags: ['Hex Gradients', 'Fonts', 'Exclusion Zones'],
    guide: {
      overview: 'The centralized Brand Kit protects visual layout compliance. Designers and workspace members can apply logo guides, brand colors, and typography rules in one click.',
      steps: [
        'Upload vector SVGs of brand logotypes and specify exclusion padding zones.',
        'Configure hex color gradient arrays (primary, secondary, accent, neutral).',
        'Upload corporate display and body typography packages (OTF, TTF formats).'
      ]
    }
  },
  {
    id: 'canvas-sdk',
    title: 'Canvas Editor SDK',
    icon: Layout,
    description: 'Embed our fully-featured canvas layer designer directly into your React, Next.js, or HTML apps.',
    gradient: 'from-blue-500 to-cyan-500 shadow-blue-500/10',
    tags: ['React Component', 'Save Callback', 'Custom CSS'],
    guide: {
      overview: 'Embed a modular design workshop inside your custom dashboards. Our high-level React components wrapper loads templates, layers, and interactive assets dynamically.',
      steps: [
        'Install the SDK module using package managers (e.g. npm install @pixivisual/react-sdk).',
        'Mount the PixiCanvas component inside layout frameworks.',
        'Attach onSave callbacks to persist client graphics directly to cloud buckets.'
      ]
    }
  },
  {
    id: 'rbac-permissions',
    title: 'Workspace Permissions',
    icon: Shield,
    description: 'Configure Role-Based Access Control (RBAC). Manage client directories, approve drafts, and audit edits.',
    gradient: 'from-emerald-500 to-teal-500 shadow-emerald-500/10',
    tags: ['RBAC Roles', 'Freelancers', 'Audit Logs'],
    guide: {
      overview: 'Maintain client directory isolation and template protections. Enforce approval pathways before assets are compiled to production nodes.',
      steps: [
        'Establish Creator, Editor, Approver, and Admin workspaces levels.',
        'Lock primary template designs behind strict publish permissions.',
        'Audit agency modifications using permission change streams.'
      ]
    }
  },
  {
    id: 'rest-api',
    title: 'REST API Channels',
    icon: Terminal,
    description: 'Trigger visual render pipelines, upload raw vectors, and poll generation progress from server applications.',
    gradient: 'from-amber-500 to-orange-500 shadow-amber-500/10',
    tags: ['cURL', 'POST Endpoints', 'JSON payload'],
    guide: {
      overview: 'Run asset rendering in background worker systems. Our REST APIs support webhook dispatch rules to notify databases asynchronously when exports complete.',
      steps: [
        'Generate long-lived live API secret tokens inside workspace keys panels.',
        'POST prompts payloads to generator endpoints (https://api.pixivisual.com/v1/generator).',
        'Verify requests using SHA-256 webhook signatures.'
      ]
    }
  },
  {
    id: 'marketplace',
    title: 'Marketplace Publishing',
    icon: Store,
    description: 'Share design canvases inside private folders or monetize them as templates on the global storefront.',
    gradient: 'from-cyan-500 to-teal-500 shadow-cyan-500/10',
    tags: ['Templates', 'Revenue Sharing', 'Pricing Rules'],
    guide: {
      overview: 'Create templates grids and share layouts internally, or publish templates on the public marketplace to generate creative revenue streams.',
      steps: [
        'Define editable content layers (allowing clients to swap text/images but lock logos).',
        'Attach tags, aspect descriptions, price tags, and category classification tags.',
        'Review analytics statistics to monitor commissions, downloads, and conversions.'
      ]
    }
  }
];

const playgroundTabs = {
  react: {
    label: 'React SDK Component',
    language: 'typescript',
    filename: 'EditorSandbox.tsx',
    code: `import { PixiCanvas } from '@pixivisual/react-sdk';
import '@pixivisual/react-sdk/dist/index.css';

export default function CreativeStudio() {
  return (
    <PixiCanvas
      workspaceId="wk_9842"
      templateId="saas_dark_grid"
      theme="dark"
      onSave={(design) => {
        console.log("Saved layout design:", design.id);
      }}
    />
  );
}`,
    logs: [
      '[Core Engine] Loading WebGL modules and layers...',
      '[Core Engine] Fetching layout templates (saas_dark_grid)...',
      '[Canvas] Editor mounted. Canvas size locked at 1080x1350px.',
      '[BrandKit] Enforcing corporate color palette (Hex: #7C3AED).',
      '[Sandbox] Listening for local file updates and save triggers...'
    ]
  },
  api: {
    label: 'REST API cURL',
    language: 'bash',
    filename: 'generate.sh',
    code: `curl -X POST "https://api.pixivisual.com/v1/generator" \\
  -H "Authorization: Bearer pixi_live_f89324e9a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Glassmorphic cybercity dashboard banner",
    "style": "photo-realistic",
    "resolution": "1080x1080"
  }'`,
    logs: [
      'Authenticating Bearer token credential header...',
      'HTTP 202 Accepted - Asset pipeline rendering queued.',
      '{"status": "rendering", "progress": 30, "taskId": "task_2415"}',
      '{"status": "rendering", "progress": 85, "taskId": "task_2415"}',
      '{"status": "completed", "url": "https://cdn.pixivisual.com/renders/task_2415.png"}'
    ]
  },
  webhooks: {
    label: 'Webhook Dispatcher',
    language: 'json',
    filename: 'webhook.json',
    code: `{
  "event": "design.completed",
  "timestamp": 1719494212,
  "data": {
    "designId": "design_8842",
    "url": "https://cdn.pixivisual.com/renders/design_8842.png",
    "metadata": {
      "prompt": "Minimalist corporate grid layout",
      "model": "stable-diffusion-xl"
    }
  }
}`,
    logs: [
      '[Server] Listening for webhook signals on port 3000...',
      '[Server] Received dispatch POST signal from PixiVisual API.',
      '[Server] Webhook SHA-256 signature verified successfully.',
      '[Server] Event "design.completed" matched. Dispatching Slack notification...',
      '[Server] Notification delivered. Output synced to AWS S3 bucket.'
    ]
  }
};

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'react' | 'api' | 'webhooks'>('react');
  const [activeGuide, setActiveGuide] = useState<typeof docCategories[number] | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = docCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeTabData = playgroundTabs[selectedTab];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeTabData.code);
    setCopiedCode(true);
    toast('success', 'Code block copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runCodeSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulatedLogs([]);
    toast('info', 'Compiling simulation program...');
    
    // Print logs progressively
    activeTabData.logs.forEach((log, index) => {
      setTimeout(() => {
        setSimulatedLogs(prev => [...prev, log]);
        if (index === activeTabData.logs.length - 1) {
          setSimulating(false);
          toast('success', 'Simulation compiled and completed successfully!');
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Search Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px] pointer-events-none animate-pulse-slow" />
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <BookOpen className="w-3 h-3 animate-float" /> Developer & Creator Portal
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Developer <span className="gradient-primary-text">Documentation</span>
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto mb-8">
            Build beautiful design automated workflows. Embed dynamic builders, lock in corporate guidelines, and hook up rendering engines in minutes.
          </p>

          <div className="relative max-w-lg mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search features, SDK integrations, API endpoints..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-card"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-2xs text-muted-foreground">
            <span>Try searching:</span>
            {['Stable Diffusion', 'React SDK', 'Webhooks', 'RBAC'].map(kw => (
              <button 
                key={kw} 
                onClick={() => setSearchQuery(kw)} 
                className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground transition-all"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Docs Grid */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveGuide(cat)}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-card-hover cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg mb-4 text-white`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors flex items-center gap-1.5 mb-2">
                    {cat.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{cat.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                  {cat.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-xs">No matching guides found. Try typing another keyword or clear the search query.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-primary text-xs font-semibold hover:underline"
              >
                Clear Search Query
              </button>
            </div>
          )}
        </div>
      </section>

      
      {/* Guide Details Drawer/Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-scale-in">
            <button 
              onClick={() => setActiveGuide(null)} 
              className="absolute top-4 right-4 text-xs font-bold text-muted-foreground hover:text-foreground border border-border rounded-lg px-2 py-1 bg-muted/40 hover:bg-muted/80 transition-all"
            >
              Close
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white shadow-glow-purple">
                <activeGuide.icon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-foreground text-base">{activeGuide.title}</h3>
            </div>
            
            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p className="text-foreground/80 font-medium bg-muted/40 p-3.5 rounded-xl border border-border/50">
                {activeGuide.guide.overview}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Play className="w-3.5 h-3.5 text-primary" /> Key Setup Steps:
                </h4>
                <ol className="list-decimal list-inside space-y-2 pl-1.5 text-foreground/80">
                  {activeGuide.guide.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="ml-1.5 text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveGuide(null)}
                className="px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-xs hover:opacity-90 transition-all shadow-glow-purple"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
