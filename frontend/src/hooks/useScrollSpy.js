import { useEffect } from "react";

export default function useScrollSpy(sectionIds) {
  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id));

    function handleScroll() {
      let current = null;

      sections.forEach(sec => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = sec.id;
        }
      });

      if (current) {
        window.history.replaceState(null, "", `/#${current}`);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);
}
