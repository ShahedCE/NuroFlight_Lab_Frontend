// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "NeuroFlight Lab",
  description: "NeuroFlight Lab — Research & Innovation",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Background layers */}
        <div className="app-bg">
          <div className="app-bg__glow" />
          <div className="app-bg__waves" />
        </div>

        {/* App shell */}
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
