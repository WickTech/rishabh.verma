"use client";

/**
 * Dark/light theme toggle. Persists to localStorage under "rv-theme"
 * (read pre-paint by the inline script in layout.tsx) and fires a
 * "themechange" event so the network canvas re-tints.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const light = root.getAttribute("data-theme") !== "light";
    root.setAttribute("data-theme", light ? "light" : "dark");
    try {
      localStorage.setItem("rv-theme", light ? "light" : "dark");
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      className="tgl"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg className="sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
