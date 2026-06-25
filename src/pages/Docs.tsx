import { useEffect, useState } from 'react';
import { BookOpen, Code, FileText, Search, Play, HelpCircle, Terminal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const docTopics = [
  {
    category: 'Getting Started',
    links: ['Introduction to PixiVisual', 'Quick Start Guide', 'Supported Formats', 'Account Setups']
  },
  {
    category: 'Core Features',
    links: ['AI Design Studio wizard', 'Brand Kit Customization', 'Workspace Permissions', 'Template Publishing']
  },
  {
    category: 'Developers & SDKs',
    links: ['Authentication Tokens', 'React SDK integration', 'REST APIs endpoints', 'Webhooks & Events']
  }
];

export default function Docs() {
  const [selectedTopic, setSelectedTopic] = useState('Introduction to PixiVisual');
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 border-r border-border/60 pr-4 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search docs..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-card text-foreground text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-6">
                {docTopics.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-wider mb-2">{group.category}</h3>
                    <ul className="space-y-1">
                      {group.links
                        .filter(l => !search || l.toLowerCase().includes(search.toLowerCase()))
                        .map((link) => (
                          <li key={link}>
                            <button
                              onClick={() => setSelectedTopic(link)}
                              className={`w-full text-left text-xs py-1.5 px-3 rounded-lg transition-all ${selectedTopic === link ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-card'}`}
                            >
                              {link}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Doc Content */}
            <main className="lg:col-span-3 space-y-8">
              <div className="border-b border-border pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
                  <BookOpen className="w-4 h-4" /> Documentation / {selectedTopic}
                </div>
                <h1 className="text-3xl font-display font-bold text-foreground">{selectedTopic}</h1>
              </div>

              <div className="space-y-6 leading-relaxed text-sm text-muted-foreground">
                <p>
                  Welcome to the official developer and platform documentation center. This guide covers how to set up, integrate, and maximize creative output using PixiVisual.
                </p>

                <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 text-primary" /> Key Objectives
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Generate print-ready image assets via Stable Diffusion pipeline APIs.</li>
                    <li>Synchronize corporate colors, logos, and fonts across remote client workgroups.</li>
                    <li>Publish and sell customized workspace formats on the Template Marketplace.</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-foreground mt-8">Quick Installation Example</h3>
                <p>To use our Javascript wrapper or configure developer workspaces locally, install our core NPM package:</p>

                <div className="p-4 rounded-xl bg-card border border-border font-mono text-xs text-foreground relative overflow-hidden flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>npm install @pixivisual/sdk</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mt-8">REST API Authentication</h3>
                <p>Authenticate developer requests by providing the bearer key within HTTP request headers:</p>

                <pre className="p-4 rounded-xl bg-card border border-border font-mono text-xs text-foreground overflow-x-auto">
{`curl -X GET "https://api.pixivisual.com/v1/assets" \\
  -H "Authorization: Bearer YOUR_API_SECRET_KEY"`}
                </pre>

                <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-semibold text-foreground text-sm flex items-center justify-center sm:justify-start gap-1">
                      <HelpCircle className="w-4 h-4 text-primary" /> Need additional help?
                    </h4>
                    <p className="text-xs text-muted-foreground">Join our active community channels or browse our FAQ page.</p>
                  </div>
                  <a href="/faq" className="px-4 py-2 rounded-xl gradient-primary text-white font-semibold text-xs hover:opacity-90 transition-all shadow-glow-purple">
                    Visit Help Center
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
