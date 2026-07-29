import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">

      <div className="text-center max-w-xl">

        <p className="text-[#A88442] uppercase tracking-[0.4em] mb-6">
          Error 404
        </p>

        <h1 className="text-7xl font-serif text-[#A88442] mb-6">
          Page Not Found
        </h1>

        <p className="text-gray-600 leading-8 mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block rounded-full bg-[#A88442] text-white px-8 py-4 hover:opacity-90 transition"
        >
          Back to Home
        </Link>

      </div>

    </main>
  );
}