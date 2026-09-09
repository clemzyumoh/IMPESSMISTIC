export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-grey">Who we are</p>
      <h1 className="wordmark mt-2 text-5xl md:text-6xl">About</h1>

      <p className="mt-8 text-lg text-grey">
        [PLACEHOLDER — replace with your boss&apos;s background: years in
        property, number of deals closed, why he started buying property
        directly from owners.]
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        <div className="border-t border-ink pt-4">
          <div className="wordmark text-4xl">[X]+</div>
          <div className="mt-1 text-sm text-grey">Years buying property</div>
        </div>
        <div className="border-t border-ink pt-4">
          <div className="wordmark text-4xl">[X]</div>
          <div className="mt-1 text-sm text-grey">Properties closed</div>
        </div>
        <div className="border-t border-ink pt-4">
          <div className="wordmark text-4xl">[X] days</div>
          <div className="mt-1 text-sm text-grey">Average close time</div>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <div>
          <div className="text-lg font-bold">Why we buy directly</div>
          <p className="mt-2 text-grey">
            [PLACEHOLDER — the reasoning: sellers with limited time or a
            property in poor condition don&apos;t get served well by the
            traditional listing process. Explain the gap this business
            fills.]
          </p>
        </div>
        <div>
          <div className="text-lg font-bold">How we&apos;re different</div>
          <p className="mt-2 text-grey">
            [PLACEHOLDER — no agents, no commissions, straightforward numbers,
            fast closings.]
          </p>
        </div>
      </div>
    </div>
  );
}
