import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-layer flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="display text-[clamp(5rem,22vw,14rem)] text-stroke">404</p>
      <p className="mt-4 text-lg text-text-muted">
        That page wandered off the map.
      </p>
      <Link
        href="/"
        className="mt-8 rounded bg-gradient-to-r from-electric-blue to-soft-purple px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        ← Back home
      </Link>
    </main>
  );
}
