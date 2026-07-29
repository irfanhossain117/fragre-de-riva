import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F4EE] px-6">
      <div className="bg-white rounded-[40px] shadow-xl border border-[#E7DDCC] p-12 text-center max-w-xl w-full">
        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-5xl font-serif text-[#A88442]">
          Order Sent
        </h1>

        <p className="mt-6 text-gray-600 leading-8">
          Thank you for choosing <strong>Fragré de Riva.</strong>
          <br />
          <br />
          Your order has been sent through WhatsApp.
          <br />
          We will contact you shortly to confirm it.
        </p>

        <Link
          href="/"
          className="inline-block mt-10 bg-[#A88442] text-white px-8 py-4 rounded-full hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}