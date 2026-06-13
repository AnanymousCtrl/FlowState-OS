import divyanshu from "../assets/divyanshu.jpeg";
import divya from "../assets/divya.jpg";
import himanshu from "../assets/himanshu.jpg";
import hitanshi from "../assets/hitanshi.jpg";

export default function Team() {
  const people = [
    {
      img: divyanshu,
      name: "Divyanshu Pandey",
      role: "Full Stack Dev",
      bio: "Designs agent pipelines, safety checks and deployment flows.",
    },
    {
      img: divya,
      name: "Divya Gupta",
      role: "Full Stack Dev",
      bio: "Shapes intuitive flows for both docs and code editors.",
    },
    {
      img: himanshu,
      name: "Himanshu Pawar",
      role: "Dev",
      bio: "Builds the live-editing, presence and commenting experience.",
    },
    {
      img: hitanshi,
      name: "Hitanshi Jain",
      role: "Product & UX",
      bio: "Shapes intuitive flows for both docs and code editors.",
    },
  ];

  return (
    <section className="bg-[#08060f] text-white py-16 px-4">
      {/* font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); *{font-family:'Poppins',sans-serif}`}</style>

      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-indigo-300 font-medium">Contact & Team</p>

        <h2 className="text-3xl md:text-4xl font-semibold mt-2">
          Meet the builders powering the platform
        </h2>

        <p className="mx-auto mt-3 text-sm md:text-base text-slate-300 max-w-2xl">
          Engineers, product designers and researchers working on real-time collaboration,
          agent orchestration, and safe deployments — reach out or explore their work.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {people.map((p, i) => (
            <ProfileCard key={i} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ProfileCard - dark themed card with subtle border and purple hover */
function ProfileCard({ person }) {
  return (
    <article className="group w-64 bg-white/3 border border-white/6 rounded-2xl p-6 flex flex-col items-center text-center transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(124,92,255,0.14)]">
      <img
        src={person.img}
        alt={`${person.name} avatar`}
        className="w-24 h-24 rounded-full object-cover ring-1 ring-white/6"
      />

      <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-indigo-100">
        {person.name}
      </h3>

      <p className="mt-1 text-sm text-indigo-300">{person.role}</p>

      <p className="mt-3 text-sm text-slate-300/90">{person.bio}</p>

      <div className="mt-5 flex items-center gap-4">
        {/* social icons use currentColor to pick up the card's color (switch on hover) */}
        <a
          href="#"
          aria-label="LinkedIn"
          className="text-slate-300 hover:text-white transition"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83A1.16 1.16 0 0 0 16 14.839V1.161C16 .541 15.48 0 14.882 0ZM4.744 13.6H2.385V5.987h2.36V13.6ZM3.552 4.929c-.778 0-1.374-.62-1.374-1.368 0-.748.596-1.367 1.374-1.367.778 0 1.374.62 1.374 1.367 0 .748-.596 1.368-1.374 1.368ZM11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
          </svg>
        </a>

        <a
          href="#"
          aria-label="Dribbble"
          className="text-slate-300 hover:text-white transition"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0zm-1.521 6.98A2.85 2.85 0 0 1 9.923 5.703v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
          </svg>
        </a>

        <a
          href="#"
          aria-label="Twitter"
          className="text-slate-300 hover:text-white transition"
        >
          <svg width="20" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </article>
  );
}
