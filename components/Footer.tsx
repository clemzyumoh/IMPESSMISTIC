import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="wordmark mb-6 text-3xl">IMPESSMISTIC</div>
        <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          <div>
            <div className="mb-2 font-bold uppercase tracking-wide">Site</div>
            <ul className="space-y-1 text-grey">
              <li><Link href="/how-it-works" className="hover:text-ink">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-ink">About</Link></li>
              <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-bold uppercase tracking-wide">Sell</div>
            <ul className="space-y-1 text-grey">
              <li><Link href="/sell" className="hover:text-ink">Get Your Offer</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <div className="mb-2 font-bold uppercase tracking-wide">Contact</div>
            <ul className="space-y-1 text-grey">
              <li>Phone: [ADD PHONE]</li>
              <li>Email: [ADD EMAIL]</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-ink pt-6 text-xs text-grey md:flex-row">
          <span>© {new Date().getFullYear()} Impessmistic. All rights reserved.</span>
          <span>Your information stays confidential.</span>
        </div>
      </div>
    </footer>
  );
}
