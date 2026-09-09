import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/CountUp";
const steps = [
  {
    n: "01",
    title: "Submit your property",
    body: "Tell us the address, condition, and why you're selling. Takes under five minutes.",
  },
  {
    n: "02",
    title: "We evaluate",
    body: "No inspections to schedule around. We review what you send and run the numbers.",
  },
  {
    n: "03",
    title: "You get a cash offer",
    body: "A real number, not a range. No obligation to accept it.",
  },
  {
    n: "04",
    title: "Close on your timeline",
    body: "Days, not months. As-is. No repairs, no showings, no realtor fees.",
  },
];

const services = [
  {
    title: "Distressed property",
    body: "Behind on payments, facing foreclosure, or holding a property you can't afford to fix. We buy it as it stands.",
  },
  {
    title: "Inherited property",
    body: "Property you didn't ask for and don't want to manage. We handle the paperwork.",
  },
  {
    title: "Landlords exiting",
    body: "Bad tenants, deferred maintenance, or you're just done. Sell without emptying the building first.",
  },
  {
    title: "Divorce & relocation",
    body: "When a fast, clean sale matters more than top dollar. We close on your schedule.",
  },
];

const stats = [
  { value: "312", label: "Properties bought" },
  { value: "$41M", label: "Paid to sellers" },
  { value: "11 days", label: "Average time to close" },
];

const testimonials = [
  {
    quote:
      "I had six months of back taxes and a house I couldn't afford to fix. They closed in two weeks and didn't waste my time.",
    name: "R. Adeyemi",
  },
  {
    quote:
      "No realtor, no showings, no repairs. I got a number on day two and cash by the end of the month.",
    name: "T. Okonkwo",
  },
  {
    quote:
      "Straightforward. They told me exactly what it was worth to them and didn't move the number around.",
    name: "M. Bello",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20  md:pt-24 md:pb-28">
        <p className="mb-4 text-sm text-grey">
          A property still sitting on the market is a property losing money.
        </p>

        <h1 className="wordmark text-[16vw] leading-[0.82] md:text-[9rem] lg:text-[11rem]">
          IMPESSMISTIC
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="max-w-md text-lg">
            We buy property directly from owners who need out. As-is condition.
            No fees. No repairs. No waiting for a buyer who may never come.
          </p>
          <div className="flex items-start md:justify-end">
            <Link
              href="/sell"
              className="border-2 border-ink cta-jitter bg-ink px-8 py-4 text-lg font-bold text-paper transition-none hover:bg-paper hover:text-ink">
              Get Your Cash Offer →
            </Link>
          </div>
        </div>
      </section>

      {/* <div className="hairline overflow-hidden border-t border-ink bg-ink py-3">
        <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-sm uppercase tracking-widest text-paper">
          {Array(2)
            .fill(
              "No Fees — No Repairs — No Waiting — Cash Offers — Sell As-Is — ",
            )
            .map((text, i) => (
              <span key={i}>{text.repeat(4)}</span>
            ))}
        </div>
      </div> */}

      {/* Stats strip */}
      <section className="hairline border-t border-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-paper/30 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-10 text-center">
              {/* <div className="wordmark text-5xl">{s.value}</div> */}
              <div className="wordmark text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-wide text-paper/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="wordmark text-4xl md:text-5xl">How It Works</h2>
        <div className="mt-10 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-paper p-6">
              <div className="text-sm text-grey">{s.n}</div>
              <div className="mt-3 text-lg font-bold">{s.title}</div>
              <p className="mt-2 text-sm text-grey">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="wordmark text-4xl md:text-5xl">Who We Buy From</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="border-t border-paper/40 pt-4">
                <div className="text-lg font-bold">{s.title}</div>
                <p className="mt-2 text-sm text-paper/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="wordmark text-4xl md:text-5xl">What Sellers Say</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-ink p-6">
              <blockquote className="text-sm">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-wide text-grey">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-ink px-6 py-20 text-center">
        <h2 className="wordmark text-4xl md:text-6xl">
          Stop Carrying It. Sell It.
        </h2>
        <Link
          href="/sell"
          className="mt-8 inline-block border-2 cta-jitter border-ink bg-ink px-8 py-4 text-lg font-bold text-paper transition hover:bg-paper hover:text-ink">
          Get Your Cash Offer →
        </Link>
      </section>
    </div>
  );
}
