import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="display text-[clamp(5rem,22vw,14rem)] text-line-strong">404</p>
      <p className="mt-4 text-lg text-text-muted">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="btn-grad mt-8"
      >
        ← Back home
      </Link>
    </main>
  );
}
