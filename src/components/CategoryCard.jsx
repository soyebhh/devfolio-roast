import { useEffect, useRef, useState } from 'react';

function getScoreColor(score) {
  if (score >= 8) return 'text-green-400';
  if (score >= 5) return 'text-yellow-400';
  return 'text-red-400';
}

function getBarColor(score) {
  if (score >= 8) return '#4ade80'; // green
  if (score >= 5) return '#facc15'; // yellow
  return '#f87171'; // red
}

export default function CategoryCard({ category, delay = 0 }) {
  const { name, score, good, improve, fix } = category;
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setTimeout(() => setAnimated(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [animated, delay]);

  const barWidth = `${(score / 10) * 100}%`;
  const barColor = getBarColor(score);

  return (
    <div
      ref={cardRef}
      className="
        card-hover bg-card border border-border rounded-2xl p-5
        opacity-0 fade-up
      "
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-white text-base leading-tight">{name}</h3>
        <div className={`text-2xl font-black tabular-nums ${getScoreColor(score)}`}>
          {score}
          <span className="text-white/20 text-base font-normal">/10</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/5 rounded-full mb-5 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-none"
          style={{
            width: animated ? barWidth : '0%',
            backgroundColor: barColor,
            transition: animated ? 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            boxShadow: animated ? `0 0 8px ${barColor}60` : 'none',
          }}
        ></div>
      </div>

      {/* Feedback rows */}
      <div className="space-y-3 text-sm">
        {/* Good */}
        <div className="flex gap-2.5">
          <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
          <div>
            <span className="text-white/40 text-xs uppercase tracking-widest block mb-0.5">Good</span>
            <p className="text-white/75 leading-snug">{good}</p>
          </div>
        </div>

        {/* Improve */}
        <div className="flex gap-2.5">
          <span className="text-yellow-400 flex-shrink-0 mt-0.5">⚠</span>
          <div>
            <span className="text-white/40 text-xs uppercase tracking-widest block mb-0.5">Improve</span>
            <p className="text-white/75 leading-snug">{improve}</p>
          </div>
        </div>

        {/* Fix */}
        <div className="flex gap-2.5">
          <span className="text-blue-400 flex-shrink-0 mt-0.5">→</span>
          <div>
            <span className="text-white/40 text-xs uppercase tracking-widest block mb-0.5">Fix</span>
            <p className="text-white/75 leading-snug">{fix}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
