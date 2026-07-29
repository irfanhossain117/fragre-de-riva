import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#F8F4EE] flex items-center justify-center pt-24">
      <div className="text-center max-w-4xl px-6">

        <p className="tracking-[0.35em] text-[#A88442] uppercase mb-4 text-xs sm:text-sm">
          Luxury Fragrance House
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#A88442] leading-none">
          FRAGRÉ
          <br />
          DE RIVA
        </h1>

        <p className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed">
          Crafted for Presence.
          <br />
          Chosen for Identity.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/shop"
            className="w-full sm:w-auto bg-[#A88442] text-white px-8 py-4 rounded-full hover:opacity-90 transition text-center"
          >
            Explore Collection
          </Link>

          <Link
            href="/story"
            className="w-full sm:w-auto border border-[#A88442] text-[#A88442] px-8 py-4 rounded-full hover:bg-[#A88442] hover:text-white transition text-center"
          >
            Our Story
          </Link>

        </div>

      </div>
    </section>
  );
}