export default function InstagramGallery() {
  const images = [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
    "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
  ];

  return (
    <section className="py-28 bg-[#F8F4EE]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.4em] text-[#A88442]">
            Follow The Journey
          </p>

          <h2 className="text-5xl font-serif text-[#A88442] mt-4">
            Instagram Gallery
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl"
            >
              <img
                src={img}
                alt=""
                className="w-full h-[320px] object-cover hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}