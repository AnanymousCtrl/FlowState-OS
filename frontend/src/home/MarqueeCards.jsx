import React from "react";

/**
 * MarqueeCards
 * - Matches the project's dark theme (bg #08060f)
 * - Keeps the same images but updates colors, copy and gradients to fit the hero background
 * - Self-contained: includes font import + marquee keyframes
 *
 * Drop this component into your project and it will follow the theme used in the hero.
 */

export default function MarqueeCards() {
  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@briar_ai",
      blurb: "Built the observability pipeline for real-time agent telemetry."
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@avery_dev",
      blurb: "Designed collaborative code + doc flows used by cross-functional teams."
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordan_ops",
      blurb: "Automated CI/CD for agent deployments with safety gates."
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Kai Rivera",
      handle: "@kai_prod",
      blurb: "Led UX for realtime presence indicators and comments."
    }
  ];

  function Card({ card }) {
    return (
      <div className="p-4 rounded-xl mx-4 w-72 shrink-0 transition-shadow duration-200 bg-white/3 border border-white/6 hover:shadow-lg">
        <div className="flex gap-3 items-start">
          <img
            src={card.image}
            alt={`${card.name} avatar`}
            className="w-14 h-14 rounded-full object-cover ring-1 ring-white/10"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white">{card.name}</p>
              <svg
                className="mt-0.5"
                width="14"
                height="14"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  fill="#7C5CFF"
                  d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56z"
                />
                <path fill="#fff" d="M4.634 5.727l1.302 1.302 3.033-3.033a.49.49 0 0 0-.692-.69L5.936 6.3l-.302-.302a.49.49 0 0 0-.69.69z" />
              </svg>
            </div>
            <span className="text-xs text-slate-300">{card.handle}</span>
          </div>
        </div>

        <p className="text-sm mt-4 text-slate-300">{card.blurb}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * { font-family: 'Poppins', sans-serif; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 28s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <section className="bg-[#08060f] text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">People building on our platform</h3>
              <p className="text-sm text-slate-300 mt-1 max-w-lg">
                Teams shipping AI agents — from experimentation to production — using collaborative docs and live coding.
              </p>
            </div>
          </div>

          {/* Top marquee */}
          <div className="marquee-row w-full mx-auto max-w-full overflow-hidden relative rounded-xl">
            {/* left gradient (fade into background color) */}
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #08060f, rgba(8,6,15,0))" }} />
            <div className="marquee-inner flex transform-gpu min-w-[200%] gap-2 py-6">
              {[...cardsData, ...cardsData].map((card, i) => (
                <Card key={`t-${i}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #08060f, rgba(8,6,15,0))" }} />
          </div>

          {/* Bottom marquee (reverse) */}
          <div className="marquee-row w-full mx-auto max-w-full overflow-hidden relative mt-6 rounded-xl">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #08060f, rgba(8,6,15,0))" }} />
            <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-2 py-6">
              {[...cardsData, ...cardsData].map((card, i) => (
                <Card key={`b-${i}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #08060f, rgba(8,6,15,0))" }} />
          </div>
        </div>
      </section>
    </>
  );
}

/* small Card helper used inside the component */
function Card({ card }) {
  return (
    <div className="p-4 rounded-xl mx-4 w-72 shrink-0 transition-shadow duration-200 bg-white/3 border border-white/6 hover:shadow-lg">
      <div className="flex gap-3 items-start">
        <img
          src={card.image}
          alt={`${card.name} avatar`}
          className="w-14 h-14 rounded-full object-cover ring-1 ring-white/10"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">{card.name}</p>
            <svg
              className="mt-0.5"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="#7C5CFF"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56z"
              />
              <path fill="#fff" d="M4.634 5.727l1.302 1.302 3.033-3.033a.49.49 0 0 0-.692-.69L5.936 6.3l-.302-.302a.49.49 0 0 0-.69.69z" />
            </svg>
          </div>
          <span className="text-xs text-slate-300">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm mt-4 text-slate-300">{card.blurb}</p>
    </div>
  );
}
