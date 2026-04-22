import { useState, useRef, useEffect } from 'react';

const FUNNY_MESSAGES = [
  'Analysing your life choices... 😐',
  'Checking if you used Bootstrap again... 🫣',
  'Consulting the design gods... 🏛️',
  'Judging your color palette... 🎨',
  'Crying at your mobile layout... 📱',
  'Counting the number of "lorem ipsum"s... 📝',
  'Calculating cringe per pixel... 🔬',
  'Asking ChatGPT if it made this site... 🤖',
];

function isValidUrl(str) {
  try {
    const url = new URL(str.startsWith('http') ? str : `https://${str}`);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

export default function InputSection({ onSubmit, loading }) {
  const [url, setUrl] = useState('');
  const [shake, setShake] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  // Rotate loading messages
  useEffect(() => {
    if (loading) {
      setMsgIndex(0);
      intervalRef.current = setInterval(() => {
        setMsgIndex((i) => (i + 1) % FUNNY_MESSAGES.length);
      }, 1500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      triggerShake();
      return;
    }
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    if (!isValidUrl(normalized)) {
      triggerShake();
      return;
    }
    onSubmit(normalized);
  };

  const triggerShake = () => {
    setShake(true);
    inputRef.current?.focus();
    setTimeout(() => setShake(false), 500);
  };

  return (
    <section className="relative z-10 max-w-2xl mx-auto px-4 mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="text-accent/50 text-sm font-mono">https://</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourportfolio.com"
            disabled={loading}
            className={`
              w-full bg-surface border border-border rounded-2xl
              pl-20 pr-4 py-4 text-white placeholder-white/20
              focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20
              transition-all duration-300 text-base md:text-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              ${shake ? 'shake border-red-500/60' : ''}
            `}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            btn-glow bg-accent hover:bg-accent-light
            text-white font-bold text-base md:text-lg
            px-7 py-4 rounded-2xl
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            whitespace-nowrap flex items-center gap-2
            transition-colors duration-300
          "
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5 flex-shrink-0"></div>
              <span>Roasting...</span>
            </>
          ) : (
            <>
              <span>Roast It</span>
              <span>🔥</span>
            </>
          )}
        </button>
      </form>

      {/* Validation hint */}
      {shake && (
        <p className="text-red-400/80 text-sm mt-2 pl-1 fade-up">
          That doesn't look like a URL bhai 👀
        </p>
      )}

      {/* Loading message ticker */}
      {loading && (
        <div className="mt-4 text-center fade-up">
          <p
            key={msgIndex}
            className="text-accent/80 text-sm font-medium fade-up"
          >
            {FUNNY_MESSAGES[msgIndex]}
          </p>
        </div>
      )}
    </section>
  );
}
