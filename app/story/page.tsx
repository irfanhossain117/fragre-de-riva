export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EE] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        <p className="uppercase tracking-[0.4em] text-[#A88442] text-center mb-4">
          Our Story
        </p>

        <h1 className="text-6xl font-serif text-[#A88442] text-center mb-16">
          Fragré de Riva
        </h1>

        <div className="bg-white rounded-[32px] shadow-lg border border-[#E7DDCC] p-10 md:p-16">

          <p className="text-lg leading-9 text-gray-700 mb-8">
            Fragré de Riva was created with one belief:
            fragrance is more than a scent—it is identity.
          </p>

          <p className="text-lg leading-9 text-gray-700 mb-8">
            Every fragrance we offer is carefully selected to help you express
            confidence, elegance, and individuality. Whether for everyday wear
            or special occasions, each bottle is chosen to leave a lasting
            impression.
          </p>

          <p className="text-lg leading-9 text-gray-700 mb-8">
            We believe luxury should be authentic, memorable, and accessible.
            That is why every fragrance is quality-checked before reaching our
            customers.
          </p>

          <div className="border-t border-[#E7DDCC] pt-10 mt-10">

            <h2 className="text-3xl font-serif text-[#A88442] mb-8">
              Our Values
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div>
                <h3 className="font-semibold text-xl mb-3 text-[#A88442]">
                  Authenticity
                </h3>

                <p className="text-gray-600">
                  Genuine fragrances with trusted quality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3 text-[#A88442]">
                  Elegance
                </h3>

                <p className="text-gray-600">
                  Crafted for presence and timeless style.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3 text-[#A88442]">
                  Customer First
                </h3>

                <p className="text-gray-600 ">
                  Fast delivery and dedicated support across Bangladesh.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}