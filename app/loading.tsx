import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="flex flex-col items-center gap-6">
        {/* Editorial Brand Name */}
        <h1 className="font-baskervville text-4xl sm:text-6xl tracking-tight animate-pulse font-bold">
          Loading...
        </h1>

        {/* Minimalist Spinner & Tagline */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
          <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Hopefully this won't take forever :)
          </span>
        </div>
      </div>
    </div>
  );
}
