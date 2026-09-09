import Link from "next/link";

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm text-grey">Reach out directly</p>
      <h1 className="wordmark mt-2 text-5xl md:text-6xl">Contact</h1>

      <p className="mt-6 text-grey">
        If you have a property to sell, the fastest path is the form below.
        For anything else, reach us directly.
      </p>

      <div className="mt-10 space-y-4 border-t border-ink pt-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-grey">Phone</div>
          <div className="text-lg font-bold">[ADD PHONE NUMBER]</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-grey">Email</div>
          <div className="text-lg font-bold">[ADD EMAIL ADDRESS]</div>
        </div>
      </div>

      <Link
        href="/sell"
        className="mt-10 inline-block border-2 border-ink bg-ink px-6 py-3 text-sm font-bold text-paper hover:bg-paper hover:text-ink"
      >
        Or just submit your property →
      </Link>
    </div>
  );
}
