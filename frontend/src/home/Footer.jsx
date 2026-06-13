import React from "react";


export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-b from-[#0b0710] via-[#120a2a] to-[#20104a] text-white">
      {/* font parity with other components */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); *{font-family:'Poppins',sans-serif}`}</style>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                </div>

                <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-slate-300">
                    Powering teams to build, test, and deploy intelligent AI agents — with real-time collaboration and
                    seamless workflows.
                </p>
            </div>
      </div>
      
            <div className="border-t border-white">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-slate-300">
                    <a href="https://prebuiltui.com" className="hover:text-white">prebuiltui</a> ©2025. All rights reserved.
                </div>
            </div>
      
    </footer>
  );
}
