import SellForm from "@/components/SellForm";

export default function SellPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-grey">Sell your property</p>
      <h1 className="wordmark mt-2 text-4xl md:text-6xl">Get Your Cash Offer</h1>
      <p className="mt-4 max-w-xl text-grey">
        Every field below helps us give you an accurate number faster. Nothing
        here is shared. There&apos;s no obligation to accept whatever we offer.
      </p>
      <div className="mt-12">
        <SellForm />
      </div>
    </div>
  );
}
