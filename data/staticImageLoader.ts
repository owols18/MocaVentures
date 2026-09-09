"use client";

import type { ImageLoaderProps } from "next/image";

const pagesBasePath = process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? "";

export default function staticImageLoader({ src }: ImageLoaderProps) {
  if (/^(?:https?:|data:|blob:)/.test(src)) return src;

  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  return `${pagesBasePath}${normalizedSrc}`;
}
