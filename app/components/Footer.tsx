export default function Footer() {
  return (
    <footer
    id="footer"
    className="bg-[#111111] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-3xl font-serif text-[#C9A86A]">
              FRAGRÉ DE RIVA
            </h3>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Crafted for Presence.
              <br />
              Chosen for Identity.
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-[#C9A86A]">
              Contact
            </h4>

            <div className="space-y-3 text-gray-400">
              <p>+8801511-856101</p>
              <p><a href="mailto:fragrederiva@protonmail.com" className="text-[#C9A86A] hover:underline">fragrederiva@protonmail.com</a></p>
              <p>Bangladesh</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-3 text-[#C9A86A]">
              Follow Us
            </h4>

            <div className="space-y-4">

              <a
                href="https://www.instagram.com/fragrederiva/"
                target="_blank"
                className="block text-gray-400 hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="https://wa.me/8801511856101"
                target="_blank"
                className="block text-gray-400 hover:text-white transition"
              >
                WhatsApp
              </a>

              <a
                href="https://www.facebook.com/fragrederiva"
                target="_blank"
                className="block text-gray-400 hover:text-white transition"
              >
                Facebook
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">
          © 2026 Fragré de Riva. All Rights Reserved.
        </div>
        <div className=" text-center text-gray-500">
          Website and Design by Irfan Hossain (Cofounder of Fragré de Riva)
        </div>
        <div className=" text-center text-gray-500">
          For For any inquiries regarding the website, please contact me at <a href="mailto:connect.irfanhossain@gmail.com" className="text-[#C9A86A] hover:underline">connect.irfanhossain@gmail.com</a>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">
          Founders of Riva:
        </div>
        <div className=" text-center text-[#C9A86A]">
          Ahin Kaiser
        </div>
        <div className=" text-center  text-[#C9A86A]">
          Irfan Hossain Nishat
        </div>
        <div className="text-center  text-[#C9A86A]">
          Azharul Islam Rahi
        </div>
        <div className=" text-center text-[#C9A86A]">
          Rahat Chowdhury
        </div>
        <div className=" text-center text-gray-500">
          
        </div>
      </div>
    </footer>
  );
}