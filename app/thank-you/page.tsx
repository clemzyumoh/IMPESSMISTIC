import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm text-grey">Submission received</p>
      <h1 className="wordmark mt-2 text-5xl md:text-6xl">
        We&apos;ve Got It.
      </h1>
      <p className="mt-6 text-grey">
        Your property details are in. We review every submission and reach out
        directly, usually within one business day. Keep an eye on your phone
        and email.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border-2 border-ink px-6 py-3 text-sm font-bold hover:bg-ink hover:text-paper"
      >
        Back to home
      </Link>
    </div>
  );
}
