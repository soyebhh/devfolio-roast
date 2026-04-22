import { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import LoadingState from './components/LoadingState';
import ResultsSection from './components/ResultsSection';
import { roastPortfolio } from './utils/gemini';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [roastedUrl, setRoastedUrl] = useState('');

  const handleSubmit = async (url) => {
    setError('');
    setResult(null);
    setRoastedUrl(url);
    setLoading(true);

    try {
      const data = await roastPortfolio(url);
      setResult(data);
      // Scroll to results smoothly
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.message || 'AI took a break, try again 😅');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg overflow-x-hidden">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <InputSection onSubmit={handleSubmit} loading={loading} />

        {/* Error */}
        {error && (
          <div className="relative z-10 max-w-2xl mx-auto px-4 mb-8 fade-up">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
              <p className="text-red-400 font-medium">⚠️ {error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Results */}
        {result && !loading && (
          <div id="results">
            <ResultsSection data={result} url={roastedUrl} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-white/20 text-sm">
          Made with 🔥 by{' '}
          <a
            href="https://soyeb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/50 hover:text-accent transition-colors duration-300"
          >
            Soyeb Khan · soyeb.in
          </a>
        </p>
      </footer>
    </div>
  );
}
