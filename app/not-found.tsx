import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="display text-[clamp(5rem,22vw,14rem)] text-stroke">404</p>
      <p className="mt-4 text-lg text-bone-muted">
        That page wandered off the map.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-bone px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
      >
        ← Back home
      </Link>
    </main>
  );
}
