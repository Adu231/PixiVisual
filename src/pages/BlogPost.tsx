import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/constants';
import { formatDate } from '@/lib/utils';
import { toast } from '@/components/ui/Toast';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('success', 'Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{post.readTime} min read</span>
              <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-5 leading-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Staff Writer at PixiVisual</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground mr-1">Share:</span>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')} className="w-8 h-8 rounded-lg border border-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"><Twitter className="w-3.5 h-3.5" /></button>
                <button onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')} className="w-8 h-8 rounded-lg border border-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"><Linkedin className="w-3.5 h-3.5" /></button>
                <button onClick={handleCopyLink} className="w-8 h-8 rounded-lg border border-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"><Copy className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>

          {/* Cover */}
          <div className="rounded-2xl overflow-hidden mb-10 border border-border">
            <img src={post.image} alt={post.title} className="w-full h-64 lg:h-96 object-cover" />
          </div>

          {/* Content */}
          <article className="prose prose-sm lg:prose-base max-w-none mb-10 space-y-5">
            {[
              `${post.excerpt} This comprehensive guide will walk you through everything you need to know.`,
              `The landscape of ${post.category.toLowerCase()} has evolved dramatically in recent years. Professionals across industries are finding new ways to leverage cutting-edge tools to achieve results that were previously impossible without large teams and significant budgets.`,
              `Understanding the fundamentals is crucial before diving into advanced techniques. When we break down the core principles, we can see patterns that apply across all creative workflows and organizational contexts.`,
              `Practical application is where theory meets reality. The most successful creators and brands we've interviewed share a common trait: they experiment constantly, measure results rigorously, and iterate based on data rather than assumptions.`,
              `Looking ahead, the trends we're seeing in this space suggest that the gap between professional and amateur work will continue to narrow — but only for those who embrace new tools and methodologies. The creators who thrive will be those who combine human creativity with AI capabilities.`,
              `To summarize: the key takeaways from this analysis are clear. Start with your audience, understand your platform, build a consistent visual language, and use AI tools to accelerate your workflow without sacrificing authenticity or brand integrity.`,
            ].map((para, i) => (
              <p key={i} className="text-foreground leading-relaxed text-base">{para}</p>
            ))}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="p-6 rounded-2xl gradient-primary text-white text-center mb-12">
            <p className="text-sm font-medium mb-1 text-white/80">Ready to put this into practice?</p>
            <h3 className="text-lg font-display font-bold mb-4">Start creating stunning visuals with PixiVisual</h3>
            <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all">
              Get Started Free <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-5">Related Articles</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(p => (
                  <Link key={p.id} to={`/blog/${p.id}`} className="group block rounded-2xl border border-border overflow-hidden hover:border-primary/20 transition-all">
                    <img src={p.image} alt={p.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-4">
                      <p className="text-xs text-primary font-semibold mb-1">{p.category}</p>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{p.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
