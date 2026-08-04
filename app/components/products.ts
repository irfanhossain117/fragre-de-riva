export const products = [
  {
    id: 1,
    slug: "Rahi-is-Legend",
    name: "Rahi is Legend",

    brand: "Fragré de Riva",
    sku: "FDR-001",
    availability: "In Stock",
    featured: true,
    bestSeller: true,

    price: 3500, // ডিফল্ট প্রাইস

    // 👇 এখান থেকে ৩০ মিলি, ১০ মিলি এবং ৫০ মিলির দাম এবং স্টক ঠিক করতে পারবেন
    variants: [
      { volume: "50ml", price: 3500, stock: 8 },
      { volume: "30ml", price: 2400, stock: 5 },
      { volume: "10ml", price: 990, stock: 12 },
    ],

    image: "/products/Screenshot 2026-07-18 225748.png",

    images: [
      "/products/Logo.jpeg",
      "/products/Screenshot 2026-07-18 225748.png",
      "/products/Screenshot 2026-07-18 225748.png",
      "/products/Screenshot 2026-07-18 225748.png",
    ],

    description: "Onekk Vhalo pola",

    topNotes: "Rage, Salt",
    heartNotes: "Frustration, Tilt",
    baseNotes: "Defeat, Tears",

    volume: "50ml",
    category: "Male Collection",

    rating: 4.9,
    reviews: 127,
    stock: 8,
  },

  {
    id: 2,
    slug: "Jahin-da-GOAT",
    name: "Jahin The Goat",

    brand: "Fragré de Riva",
    sku: "FDR-002",
    availability: "In Stock",
    featured: true,
    bestSeller: false,

    price: 3200,

    // 👇 এখান থেকে ৩০ মিলি, ১০ মিলি এবং ৫০ মিলির দাম এবং স্টক ঠিক করতে পারবেন
    variants: [
      { volume: "50ml", price: 3200, stock: 8 },
      { volume: "30ml", price: 2100, stock: 5 },
      { volume: "10ml", price: 890, stock: 10 },
    ],

    image: "/products/gugu.jpeg",

    images: [
      "/products/gugu.jpeg",
      "/products/gaga.jpeg",
      "/products/lulu.jpeg",
    ],

    description: "attatude boy, lover for all.",

    topNotes: "Bergamot, Lemon",
    heartNotes: "Rose, Jasmine",
    baseNotes: "Amber, Musk",

    volume: "50ml",
    category: "Female Collection",

    rating: 4.9,
    reviews: 127,
    stock: 8,
  },

  {
    id: 3,
    slug: "golden-essence",
    name: "Golden Essence",

    brand: "Fragré de Riva",
    sku: "FDR-003",
    availability: "In Stock",
    featured: false,
    bestSeller: true,

    price: 3490,

    // 👇 এখান থেকে ৩০ মিলি, ১০ মিলি এবং ৫০ মিলির দাম এবং স্টক ঠিক করতে পারবেন
    variants: [
      { volume: "50ml", price: 3490, stock: 8 },
      { volume: "30ml", price: 2300, stock: 6 },
      { volume: "10ml", price: 950, stock: 15 },
    ],

    image:
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",

    images: [
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
    ],

    description: "Bright citrus opening with warm amber finish.",

    topNotes: "Orange, Citrus",
    heartNotes: "Lavender, Rose",
    baseNotes: "Amber, Vanilla",

    volume: "50ml",
    category: "Luxury Collection",

    rating: 4.9,
    reviews: 127,
    stock: 8,
  },

  {
    id: 6,
    slug: "midnight-bloom",
    name: "Midnight Bloom",

    brand: "Fragré de Riva",
    sku: "FDR-004",
    availability: "In Stock",
    featured: false,
    bestSeller: false,

    price: 2790,

    // 👇 এখান থেকে ৩০ মিলি, ১০ মিলি এবং ৫০ মিলির দাম এবং স্টক ঠিক করতে পারবেন
    variants: [
      { volume: "50ml", price: 2790, stock: 8 },
      { volume: "30ml", price: 1890, stock: 4 },
      { volume: "10ml", price: 790, stock: 10 },
    ],

    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",

    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
    ],

    description: "Floral luxury blended with oriental richness.",

    topNotes: "Pear, Bergamot",
    heartNotes: "Jasmine, Rose",
    baseNotes: "Musk, Sandalwood",

    volume: "50ml",
    category: "Luxury Collection",

    rating: 4.9,
    reviews: 127,
    stock: 8,
  },

  {
    id: 7,
    slug: "imperial-rose",
    name: "Imperial Rose",

    brand: "Fragré de Riva",
    sku: "FDR-005",
    availability: "In Stock",
    featured: true,
    bestSeller: true,

    price: 3990,

    // 👇 এখান থেকে ৩০ মিলি, ১০ মিলি এবং ৫০ মিলির দাম এবং স্টক ঠিক করতে পারবেন
    variants: [
      { volume: "50ml", price: 3990, stock: 8 },
      { volume: "30ml", price: 2690, stock: 5 },
      { volume: "10ml", price: 1100, stock: 15 },
    ],

    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",

    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
    ],

    description: "A premium rose fragrance with royal character.",

    topNotes: "Pink Pepper, Citrus",
    heartNotes: "Turkish Rose",
    baseNotes: "Amber, Vanilla",

    volume: "50ml",
    category: "Luxury Collection",

    rating: 4.9,
    reviews: 127,
    stock: 8,
  },
];