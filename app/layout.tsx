import type { Metadata } from "next";
import {
  instrumentSans,
  lato,
  manrope,
  merriweather,
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOCA Ventures",
  description: "MOCA Ventures",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${instrumentSans.variable} ${lato.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}