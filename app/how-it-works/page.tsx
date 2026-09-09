const steps = [
  {
    n: "01",
    title: "Submit your property",
    body: "Fill out the form with your contact info, property details, and current situation. Add photos if you have them. Five minutes, no account needed.",
  },
  {
    n: "02",
    title: "We evaluate",
    body: "We review the property, the area, and the condition you've described. No inspector visits required before you get a number.",
  },
  {
    n: "03",
    title: "You get a cash offer",
    body: "A specific number, sent directly to you. No range, no games. You're free to walk away.",
  },
  {
    n: "04",
    title: "You decide",
    body: "Accept it, negotiate, or don't. There's no pressure and no fee for getting the offer.",
  },
  {
    n: "05",
    title: "Close on your timeline",
    body: "If you accept, we handle the paperwork and close in as little as seven days, or on whatever schedule works for you.",
  },
];

const facts = [
  "No realtor commissions",
  "No repairs before closing",
  "No open houses or showings",
  "As-is, any condition",
  "No financing contingencies to fall through",
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm text-grey">The process</p>
      <h1 className="wordmark mt-2 text-5xl md:text-6xl">How It Works</h1>

      <div className="mt-14 space-y-0 border-t border-ink">
        {steps.map((s) => (
          <div
            key={s.n}
            className="grid gap-2 border-b border-ink py-8 sm:grid-cols-[80px_1fr]"
          >
            <div className="wordmark text-3xl text-grey">{s.n}</div>
            <div>
              <div className="text-xl font-bold">{s.title}</div>
              <p className="mt-2 max-w-xl text-grey">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-ink p-8">
        <div className="text-lg font-bold">What you don&apos;t deal with</div>
        <ul className="mt-4 space-y-2 text-grey">
          {facts.map((f) => (
            <li key={f}>— {f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
