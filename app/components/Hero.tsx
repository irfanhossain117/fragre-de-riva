import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#F8F4EE] flex items-center justify-center pt-24">
      <div className="text-center max-w-4xl px-6">
        <p className="tracking-[0.4em] text-[#A88442] uppercase mb-4">
          Luxury Fragrance House
        </p>

        <h1 className="text-6xl md:text-8xl font-serif text-[#A88442]">
          FRAGRÉ
          <br />
          DE RIVA
        </h1>

        <p className="mt-8 text-lg text-gray-600">
          Crafted for Presence.
          <br />
          Chosen for Identity.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/shop"
            className="bg-[#A88442] text-white px-8 py-4 rounded-full hover:opacity-90 transition"
          >
            Explore Collection
          </Link>

          <Link
            href="/story"
            className="border border-[#A88442] text-[#A88442] px-8 py-4 rounded-full hover:bg-[#A88442] hover:text-white transition"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}