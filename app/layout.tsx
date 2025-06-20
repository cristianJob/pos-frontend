import "./globals.css";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pos - Next.js",
  description: "Pos - Next.js"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
