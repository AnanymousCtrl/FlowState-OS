import React from "react";

export default function Example() {
  return (
    <section className="relative py-16 px-4 md:px-8 bg-[#08060f] text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }`}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">What our platform enables</h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Build intelligent workflows and ship production-ready AI agents — collaborative, safe, and developer-first.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Image (must remain unchanged) */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="max-w-sm w-full rounded-xl shadow-2xl"
              src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
              alt="showcase screenshot"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-semibold">Realtime doc + code collaboration</h3>
            <p className="mt-3 text-slate-300">
              Combine a powerful document editor and a code editor in one workspace. Collaborate in real time, review changes,
              and deploy agent logic with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              <Feature
                title="Agent Templates & Pipelines"
                desc="Start from production-ready templates for common agent types — automations, assistants, data pipelines — and customize logic without reinventing the wheel."
                emojiUrl="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
              />
              <Feature
                title="Live Collaboration"
                desc="Multiple users edit code and docs simultaneously with presence indicators, change history and commenting."
                emojiUrl="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
              />
              <Feature
                title="Easy Integration & Deployment"
                desc="Connect to your APIs, test in sandbox, and push to production with one-click deploys and environment management."
                emojiUrl="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* small presentational sub-component inside same file for clarity */
function Feature({ title, desc, emojiUrl }) {
  return (
    <div className="flex items-start gap-4">
      <div className="min-w-[52px] h-12 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
        <img src={emojiUrl} alt="" className="w-7 h-7" />
      </div>
      <div>
        <h4 className="text-base font-medium text-white">{title}</h4>
        <p className="text-sm text-slate-300 mt-1 max-w-xl">{desc}</p>
      </div>
    </div>
  );
}
