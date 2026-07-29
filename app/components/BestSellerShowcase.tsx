export default function BestSellerShowcase() {
  return (
    <section className="bg-[#F8F4EE] py-32">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-[#A88442]">
            Best Seller
          </p>

          <h2 className="text-6xl font-serif text-[#A88442] mt-6">
            Royal Oud
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <img
              src="/products/gaga.jpeg"
              alt="Royal Oud"
              className="rounded-[40px] shadow-2xl"
            />
          </div>

          <div>

            <p className="uppercase tracking-[0.3em] text-[#A88442] mb-4">
              Signature Creation
            </p>

            <h3 className="text-5xl font-serif text-[#A88442] mb-8">
              Crafted For Presence
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              A rich composition of oud, amber and rare florals
              designed to create a memorable presence.
              Elegant, confident and timeless.
            </p>

            <div className="font text-[#A88442]">

              <div>
                <strong>Top Notes:</strong> Bergamot, Lemon
              </div>

              <div>
                <strong>Heart Notes:</strong> Rose, Jasmine
              </div>

              <div>
                <strong>Base Notes:</strong> Oud, Amber, Musk
              </div>

            </div>

            <div className="mt-12">

              <p className="text-4xl text-[#A88442] font-serif">
                ৳2,490
              </p>

              <a
                href="https://wa.me/8801511856101"
                className="inline-block mt-6 bg-[#A88442] text-white px-8 py-4 rounded-full"
              >
                Order via WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}