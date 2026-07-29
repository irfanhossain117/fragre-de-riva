"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];

  toggleWishlist: (
    product: WishlistItem
  ) => void;

  removeFromWishlist: (
    id: number
  ) => void;

  isWishlisted: (
    id: number
  ) => boolean;

  totalWishlist: number;
};

const WishlistContext =
  createContext<WishlistContextType | null>(
    null
  );

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("wishlist");

    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  function toggleWishlist(
    product: WishlistItem
  ) {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];
    });
  }

  function removeFromWishlist(
    id: number
  ) {
    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  function isWishlisted(
    id: number
  ) {
    return wishlist.some(
      (item) => item.id === id
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}