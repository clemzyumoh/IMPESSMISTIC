"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const links = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="hairline sticky top-0 z-40 bg-paper">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6 py-4">
        {/* <Link
          href="/"
          className="shrink-0 font-display flex justify-center items-end text-xl font-800 text-plum">
          <Image
            src="/impess1.png"
            alt="Party Hat"
            width={20}
            height={20}
          />
          <span className="text-coral"> Snot</span> Cleaners
        </Link> */}
        <Link
          href="/"
          className="wordmark text-xl flex justify-center items-end tracking-tight">
          <Image src="/impess1.png" alt="Party Hat" width={25} height={25} />
          IMPESSMISTIC
        </Link>
        {/* <nav className="hidden gap-8 text-sm uppercase tracking-wide md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:opacity-60">
              {l.label}
            </Link>
          ))}
        </nav> */}
        <nav className="hidden gap-8 text-sm uppercase tracking-wide lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href
                  ? "underline underline-offset-4"
                  : "hover:opacity-60"
              }>
              {l.label}
            </Link>
            // <Link key={l.href} href={l.href} className="hover:opacity-60">
            //   {l.label}
            //   </Link>
          ))}
        </nav>

        <Link
          href="/sell"
          className="border hidden lg:block border-ink cta-jitter bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:bg-paper hover:text-ink">
          Get Your Offer
        </Link>
        <button
          className="lg:hidden border border-ink px-3 py-1 text-sm"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        // <nav className="md:hidden border-t border-ink bg-paper px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-wide">
        <nav className="absolute inset-x-0 top-full z-40  flex flex-col gap-8 border-t border-plum/50 bg-paper tracking-wide   p-6 shadow-lg lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hover:opacity-60">
              {l.label}
            </Link>
          ))}
          <Link
            href="/sell"
            onClick={() => setOpen(false)}
            className="border border-ink bg-ink px-4 py-2 text-center font-bold text-paper">
            Get Your Offer
          </Link>
          {/* <Link
            href="/"
            className="wordmark text-xl flex justify-center items-end tracking-tight">
            <Image src="/impess1.png" alt="Party Hat" width={100} height={100} />
            
          </Link> */}
        </nav>
      )}
    </header>
  );
}
