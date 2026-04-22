export default function LoadingState() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-20 fade-up">
      {/* Outer glow ring */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-accent/10 absolute inset-0 animate-ping"></div>
        <div className="w-20 h-20 rounded-full border-2 border-accent/20 absolute inset-0 animate-pulse"></div>
        {/* Spinner */}
        <div className="spinner w-20 h-20"></div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🔥
        </div>
      </div>

      <p className="text-white/40 text-sm mt-8 font-mono tracking-widest uppercase">
        AI is working...
      </p>
    </div>
  );
}
