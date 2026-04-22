export default function Header() {
  return (
    <header className="relative z-10 text-center pt-16 pb-8 px-4">
      {/* Logo */}
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-xl">
          🔥
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          <span className="gradient-text">DevFolio Roast</span>
          <span className="ml-2">🔥</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-purple-300/80 font-medium mb-3">
        Get your portfolio <span className="text-accent font-semibold">brutally reviewed</span> by AI
      </p>

      {/* Credit */}
      <a
        href="https://soyeb.in"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-accent/70 transition-colors duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 inline-block"></span>
        Built by Soyeb · soyeb.in
        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 inline-block"></span>
      </a>

      {/* Decorative line */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent/40"></div>
      </div>
    </header>
  );
}
