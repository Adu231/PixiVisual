import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Zap } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px]" />
      <div className="relative z-10 text-center max-w-lg">
        <Link to="/" className="flex items-center gap-2 justify-center mb-12">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl gradient-primary-text">PixiVisual</span>
        </Link>
        <div className="text-8xl lg:text-9xl font-display font-black gradient-primary-text mb-4 animate-scale-in">404</div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow-purple hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
