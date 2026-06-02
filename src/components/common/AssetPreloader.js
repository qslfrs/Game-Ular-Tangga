"use client";

import { useEffect } from "react";
import { ALL_IMAGE_ASSETS } from "@/utils/assets";

export default function AssetPreloader() {
  useEffect(() => {
    const preloaded = [];

    for (const src of ALL_IMAGE_ASSETS) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      preloaded.push(img);
    }

    return () => {
      preloaded.length = 0;
    };
  }, []);

  return null;
}
