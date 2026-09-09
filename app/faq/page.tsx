const faqs = [
  {
    q: "Do I pay any fees or commissions?",
    a: "No. There are no agent commissions, no closing cost fees passed to you, and no cost to get an offer.",
  },
  {
    q: "Do I need to fix anything before selling?",
    a: "No. We buy properties as-is, in any condition, including ones that need major repairs or a full teardown.",
  },
  {
    q: "How fast can this close?",
    a: "As fast as seven to ten days if you need it, or on a timeline that works for you, including a few months out.",
  },
  {
    q: "Is this a scam?",
    a: "We give you a specific written offer with no obligation to accept. You can walk away at any point before closing with no cost to you.",
  },
  {
    q: "What if I still have a mortgage on the property?",
    a: "That's fine. We factor any existing mortgage balance into the offer and handle the payoff as part of closing.",
  },
  {
    q: "What if the property is occupied by a tenant?",
    a: "Let us know in the form. We can still make an offer and work out occupancy as part of the deal.",
  },
  {
    q: "Will I get a fair price?",
    a: "Our offer reflects the property's condition, location, and what it will cost us to bring it up to market value. It will generally be below full retail price, in exchange for speed, certainty, and zero fees.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-grey">Questions</p>
      <h1 className="wordmark mt-2 text-5xl md:text-6xl">FAQ</h1>

      <div className="mt-12 divide-y divide-ink border-t border-b border-ink">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
              {f.q}
              <span className="ml-4 text-grey group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-grey">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
