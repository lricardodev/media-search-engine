"use client";

import React, { useState } from "react";
import { Terminal, Check } from "lucide-react";

interface DebugEntry {
  source: string;
  url: string;
  latency: number;
  response: unknown;
}

interface DebugPanelProps {
  entries: DebugEntry[];
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ entries }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  if (!entries || entries.length === 0) return null;

  const handleDebugClick = () => {
    console.group("🔍 Debug Info");
    console.log(`Generated at: ${new Date().toISOString()}`);
    console.table(
      entries.map((e) => ({
        Source: e.source,
        Latency: `${e.latency}ms`,
        URL: e.url,
      }))
    );
    entries.forEach((entry) => {
      console.groupCollapsed(`Details: ${entry.source}`);
      console.log("URL:", entry.url);
      console.log("Latency:", entry.latency);
      console.log("Response:", entry.response);
      console.groupEnd();
    });
    console.groupEnd();

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:flex flex-col items-end gap-2">
      {showFeedback && (
        <div className="bg-green-900/90 text-green-100 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" />
          Debug info logged to console
        </div>
      )}
      <button
        onClick={handleDebugClick}
        className="bg-gray-900 hover:bg-gray-800 text-green-500 border border-green-900 hover:border-green-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group"
        title="Log Debug Info to Console"
      >
        <Terminal className="w-5 h-5" />
      </button>
    </div>
  );
};
