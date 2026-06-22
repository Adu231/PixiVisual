import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FAQ_ITEMS } from '@/constants';

const categories = ['All', 'General', 'Features', 'Billing', 'Security', 'Integrations', 'Legal'];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = FAQ_ITEMS.filter(item => {
    const matchSearch = !search || item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <section className="py-16 lg:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 animate-slide-up">
                Frequently Asked <span className="gradient-primary-text">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
                Find answers to common questions about PixiVisual.
              </p>
              {/* Search */}
              <div className="relative max-w-lg mx-auto animate-slide-up">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
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

            {/* Items */}
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  className={`border rounded-2xl transition-all duration-300 reveal-up ${openItem === item.id ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}
                  style={{ transitionDelay: `${i * 0.04}s` }}
                >
                  <button
                    onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 text-xs font-bold text-primary/50 mt-0.5">{item.category}</span>
                      <span className="text-sm font-semibold text-foreground pr-4">{item.question}</span>
                    </div>
                    {openItem === item.id ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openItem === item.id && (
                    <div className="px-5 pb-5 animate-slide-up">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-2">No questions found matching your search.</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-primary text-sm font-medium hover:underline">Clear search</button>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center reveal-up">
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">Our support team is ready to help you get the most out of PixiVisual.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
