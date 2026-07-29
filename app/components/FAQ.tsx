"use client";

import { useState } from "react";
import Script from "next/script";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Inside City: 1–2 business days. Outside City: 2–5 business days depending on location.",
    icon: "📦",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery, bKash, Nagad and Bank Transfer.",
    icon: "💳",
  },
  {
    question: "How much is the delivery charge?",
    answer:
      "Inside City: ৳60. Outside City: ৳120.",
    icon: "🚚",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. If you receive a damaged or incorrect product, contact us within 48 hours for replacement.",
    icon: "🔄",
  },
  {
    question: "Are your perfumes authentic?",
    answer:
      "Yes. Every fragrance is quality checked before shipping.",
    icon: "🌿",
  },
  {
    question: "How long does the fragrance last?",
    answer:
      "Depending on skin chemistry and environment, most fragrances last between 6–10 hours.",
    icon: "⏳",
  },
  {
    question: "How should I store my perfume?",
    answer:
      "Store your perfume in a cool, dry place away from direct sunlight.",
    icon: "🧴",
  },
  {
    question: "How can I contact Fragré de Riva?",
    answer:
      "You can contact us through WhatsApp, Facebook or Instagram anytime.",
    icon: "📞",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <section className="py-28 bg-[#F8F4EE]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="uppercase tracking-[0.4em] text-[#A88442] text-center mb-4">
            Support
          </p>

          <h2 className="text-5xl md:text-6xl font-serif text-center text-[#A88442] mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const open = active === index;

              return (
                <div
                  key={index}
                  className="group rounded-3xl border border-[#E7DDCC] bg-white overflow-hidden shadow-sm hover:shadow-xl transition duration-500"
                >
                  <button
                    onClick={() =>
                      setActive(open ? null : index)
                    }
                    className="w-full flex items-center justify-between px-8 py-7 text-left"
                  >
                    <div className="flex items-center gap-5">
                      <div className="text-3xl">
                        {faq.icon}
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold text-[#2B241A] group-hover:text-[#A88442] transition">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`text-3xl text-[#A88442] transition duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      open
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pb-8 text-gray-600 leading-8">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}