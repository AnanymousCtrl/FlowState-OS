// src/components/HeroSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center text-white text-sm min-h-screen bg-[#08060f]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); * { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Background SVG (kept) */}
      <svg className="absolute -z-10 w-screen -mt-40 md:mt-0 opacity-95" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)" />
        <defs>
          <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
            <stop offset="0" stopColor="#080615" stopOpacity="1" />
            <stop offset="0.5" stopColor="#2e1b70" stopOpacity="1" />
            <stop offset="1" stopColor="#20104a" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 -z-5 bg-black/20 pointer-events-none" />

      <nav className="z-30 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
        <Link to="/" aria-label="home" className="inline-flex items-center">
          {/* logo svg */}
          <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M47.904 28.28C46.8773 28.28 45.9627 28.0653 45.16 27.636C44.3573 27.188 43.7227 26.5813 43.256 25.816C42.808 25.0507 42.584 24.1827 42.584 23.212V19.348C42.584 18.3773 42.8173 17.5093 43.284 16.744C43.7507 15.9787 44.3853 15.3813 45.188 14.952C45.9907 14.504 46.896 14.28 47.904 14.28C49.1173 14.28 50.2093 14.5973 51.18 15.232C52.1693 15.848 52.944 16.688 53.504 17.752C54.0827 18.7973 54.372 19.9827 54.372 21.308C54.372 22.6147 54.0827 23.8 53.504 24.864C52.944 25.9093 52.1693 26.74 51.18 27.356C50.2093 27.972 49.1173 28.28 47.904 28.28Z" fill="#fff"/>
          </svg>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/code" className="hover:text-slate-300 transition">Code</Link>
          {/* Document now navigates to /docs */}
          <Link to="/docs" className="hover:text-slate-300 transition">Document</Link>
          <Link to="/stories" className="hover:text-slate-300 transition">Stories</Link>
          <Link to="/about" className="hover:text-slate-300 transition">About</Link>
          <Link to="/notes" className="hover:text-slate-300 transition">Notes</Link>
        </div>

        <div className="hidden md:block space-x-3">
          <Link to="/get-started">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">Get started</button>
          </Link>
          <Link to="/login">
            <button className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">Login</button>
          </Link>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden active:scale-90 transition" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
          </svg>
        </button>
      </nav>

      {/* Mobile nav overlay (links use <a> anchors so scrolling works for single page sections) */}
      <div className={`fixed inset-0 z-100 bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`} role="dialog" aria-modal="true">
        <a href="#products" onClick={() => setMobileOpen(false)}>Products</a>
        <a href="#resources" onClick={() => setMobileOpen(false)}>Resources</a>
        <a href="#stories" onClick={() => setMobileOpen(false)}>Stories</a>
        <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>

        <button onClick={() => setMobileOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="z-40 flex flex-col items-center text-center mt-32 px-6">
        <div className="flex items-center gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
          <div className="h-2.5 w-2.5 bg-green-500 rounded-full" />
          <span>Code and Document live together</span>
        </div>

        <h1 className="text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl text-white">
          A Place to Code and Document together.
        </h1>

        <p className="text-base max-w-lg mt-2 text-slate-200">
          Our platform helps you build, test, and deliver faster — so you can focus on what matters.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Link to="/code">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
              Code Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Link>

          {/* Document button: SPA navigation to /docs */}
          <Link to="/docs">
            <button className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11 text-slate-100">
              Document
            </button>
          </Link>
        </div>
      </div>

      <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png" className="w-full rounded-[15px] max-w-4xl mt-16 z-40" alt="hero section showcase" />
    </section>
  );
}
