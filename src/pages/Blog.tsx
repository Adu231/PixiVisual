import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/constants';
import { formatDate } from '@/lib/utils';

const categories = ['All', 'AI Design', 'Social Media', 'Branding', 'Marketing', 'Video', 'Design Basics'];

export default function Blog() {
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

  const filtered = BLOG_POSTS.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = BLOG_POSTS[0];
  const rest = filtered.filter(p => p.id !== featured.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mb-10">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 animate-slide-up">
                The <span className="gradient-primary-text">PixiVisual</span> Blog
              </h1>
              <p className="text-xl text-muted-foreground animate-slide-up">
                Design tips, AI tutorials, industry insights, and creative inspiration for modern creators.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            <Link to={`/blog/${featured.id}`} className="group block mb-10 reveal-up">
              <div className="grid lg:grid-cols-2 gap-0 rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all">
                <div className="relative overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-72 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold">Featured</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-primary mb-2">{featured.category}</span>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:gradient-primary-text transition-all">{featured.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img src={featured.authorAvatar} alt={featured.author} className="w-7 h-7 rounded-full" />
                      <span className="text-sm font-medium text-foreground">{featured.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{featured.readTime} min</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <Link key={post.id} to={`/blog/${post.id}`} className={`group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all reveal-up`} style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary">{post.category}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{post.readTime} min</span>
                    </div>
                    <h3 className="text-base font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                      <span className="text-xs font-medium text-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0,2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-3">No articles found for your search.</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-primary text-sm font-medium hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
