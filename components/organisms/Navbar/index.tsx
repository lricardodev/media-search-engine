"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-netflix-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl font-black tracking-tighter flex items-center">
                  <span
                    className={`${
                      scrolled ? "text-gray-900 dark:text-white" : "text-white"
                    } group-hover:text-brand-accent transition-colors duration-300`}
                  >
                    search
                  </span>
                  <span className="text-brand-accent mx-0.5 animate-[pulse_1.5s_ease-in-out_infinite]">
                    -
                  </span>
                  <span
                    className={`text-brand-accent ${
                      scrolled
                        ? "group-hover:text-gray-900 dark:group-hover:text-white"
                        : "group-hover:text-white"
                    } transition-colors duration-300`}
                  >
                    movie
                  </span>
                </div>
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-brand-accent to-green-500 px-2 py-1 rounded-full transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.4)] border border-white/10 tracking-widest">
                  (HACKATHON)
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-brand-accent"
                  : "text-gray-300 hover:text-brand-accent"
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Inicio
            </Link>
            <Link
              href="/favorites"
              className={`${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-brand-accent"
                  : "text-gray-300 hover:text-brand-accent"
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Favoritos
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-brand-accent"
                  : "text-gray-300 hover:text-brand-accent"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
