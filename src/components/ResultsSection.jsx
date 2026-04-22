import { useEffect, useRef, useState } from 'react';
import CategoryCard from './CategoryCard';

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (target == null) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

function getOverallScoreColor(score) {
  if (score >= 8) return { text: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10', glow: '0 0 40px rgba(74,222,128,0.3)' };
  if (score >= 5) return { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', glow: '0 0 40px rgba(250,204,21,0.3)' };
  return { text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', glow: '0 0 40px rgba(248,113,113,0.3)' };
}

function getScoreLabel(score) {
  if (score >= 9) return 'Outstanding 🏆';
  if (score >= 8) return 'Great Work! ✨';
  if (score >= 7) return 'Pretty Good 👍';
  if (score >= 5) return 'Needs Work 🔧';
  if (score >= 3) return 'Oof... 😬';
  return 'Burn It Down 🔥';
}

export default function ResultsSection({ data, url }) {
  const animatedScore = useCountUp(data?.overall_score);
  const colors = getOverallScoreColor(data?.overall_score ?? 0);

  const handleShare = async () => {
    const text = `My portfolio got roasted by AI 😭\nScore: ${data.overall_score}/10\n\nGet yours roasted → devfolioroast.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'DevFolio Roast', text, url: 'https://devfolioroast.vercel.app' });
      } catch (_) { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard! 📋');
    }
  };

  if (!data) return null;

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 pb-20">

      {/* URL badge */}
      <div className="flex justify-center mb-10 fade-up">
        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 text-sm text-white/50">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Reviewed: <span className="text-accent/80 font-mono">{url}</span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="flex flex-col items-center mb-10">
        <div
          className={`
            relative w-44 h-44 rounded-full border-2 ${colors.border} ${colors.bg}
            flex flex-col items-center justify-center mb-4 fade-up
          `}
          style={{ boxShadow: colors.glow }}
        >
          <span className={`text-6xl font-black tabular-nums ${colors.text} count-up`}>
            {animatedScore.toFixed(1)}
          </span>
          <span className="text-white/30 text-base font-medium">/ 10</span>
        </div>
        <div className={`text-xl font-bold ${colors.text} fade-up`} style={{ animationDelay: '100ms' }}>
          {getScoreLabel(data.overall_score)}
        </div>
        <p className="text-white/30 text-sm mt-1 fade-up" style={{ animationDelay: '200ms' }}>Overall Score</p>
      </div>

      {/* Roast Box */}
      <div
        className="
          pulse-glow bg-accent/10 border border-accent/30 rounded-2xl
          p-6 mb-10 text-center fade-up
        "
        style={{ animationDelay: '150ms' }}
      >
        <div className="text-3xl mb-3">🔥</div>
        <p className="text-accent-light text-xl md:text-2xl font-medium italic leading-relaxed">
          "{data.roast}"
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-white/60 uppercase tracking-widest mb-5 text-center">
          Category Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              delay={i * 100}
            />
          ))}
        </div>
      </div>

      {/* Top 3 Fixes */}
      <div
        className="bg-surface border border-border rounded-2xl p-6 mb-8 fade-up"
        style={{ animationDelay: '300ms' }}
      >
        <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <span className="text-accent">→</span>
          Fix These First
        </h2>
        <div className="space-y-3">
          {data.top_fixes.map((fix, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="
                w-7 h-7 rounded-lg bg-accent/15 border border-accent/30
                flex items-center justify-center flex-shrink-0
                text-accent font-bold text-sm
              ">
                {i + 1}
              </div>
              <p className="text-white/70 leading-snug pt-0.5">{fix}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <div className="flex justify-center fade-up" style={{ animationDelay: '400ms' }}>
        <button
          onClick={handleShare}
          className="
            btn-glow border border-accent/40 bg-accent/10 hover:bg-accent/20
            text-accent font-semibold text-base
            px-8 py-4 rounded-2xl
            flex items-center gap-2.5 transition-colors duration-300
          "
        >
          <span>📤</span>
          Share Your Roast
        </button>
      </div>
    </section>
  );
}
