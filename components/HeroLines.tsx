/** Four corner brackets that draw themselves on load (CSS only). */
export function HeroLines() {
  return (
    <div className="hero-lines" aria-hidden>
      {["tl", "tr", "bl", "br"].map((c) => (
        <svg key={c} className={`hl-${c}`} viewBox="0 0 56 56" width="56" height="56">
          <path d="M2 54V2h52" pathLength="100" />
        </svg>
      ))}
    </div>
  );
}
