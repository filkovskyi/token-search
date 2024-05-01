import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Header from "@/components/header/Header";
import { headers } from "next/headers";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Token Search",
  description: "Token Search web 3.0 application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" type="image/png" sizes="32x32" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <Providers cookie={cookie}>
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
