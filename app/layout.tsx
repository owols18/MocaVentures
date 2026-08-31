import type { Metadata } from "next";
import Footer from "../components/layout/Footer";
import Header from "../components/navigation/Header";
import MobileNavigation from "../components/navigation/MobileNavigation";
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
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="mobile-safe-content flex min-h-full flex-1 flex-col">{children}</main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  );
}
