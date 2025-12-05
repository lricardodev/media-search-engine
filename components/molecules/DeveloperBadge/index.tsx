import React from "react";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

export const DeveloperBadge = () => {
  return (
    <div className="fixed bottom-6 left-4 z-50 hidden md:block animate-fade-in-up">
      <div className="bg-white dark:bg-netflix-black border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-4 max-w-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transition-all hover:shadow-xl hover:scale-105">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
            Richard
          </h3>
          <a
            href="https://github.com/lricardodev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1 mt-0.5"
          >
            <Github className="w-3 h-3" />
            @lricardodev
          </a>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
            <Image
              src="/ipn.png"
              alt="IPN Logo"
              width={12}
              height={12}
              className="w-3 h-3 object-contain"
            />
            <span className="text-red-800">IPN University</span>
          </div>
          <a
            href="https://media-search-engine.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 text-xs hover:underline flex items-center gap-1 mt-1"
          >
            <ExternalLink className="w-3 h-3" />
            View Build
          </a>
        </div>
      </div>
    </div>
  );
};
