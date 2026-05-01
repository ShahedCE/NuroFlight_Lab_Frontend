// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <div className="nav__left">
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="nav__brand" aria-label="NeuroFlight Lab Home">
            <Image
              src="/logo1.jpg" // path: my-frontend/public/logo.jpg       
              alt="NeuroFlight Lab logo"
              width={40}
              height={40}
              className="rounded-md"
              priority
            />
            <span className="nav__brandText">NeuroFlight Lab</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="nav__links" aria-label="Primary navigation">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav__link ${isActive(l.href) ? "nav__link--active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__right">
          <Link href="/career" className="btn btn--primary nav__ctaDesktop">
            Career
          </Link>
        </div>
      </div>

      {/* Mobile menu ( outside container) */}
      <div className={`mnav ${open ? "mnav--open" : ""}`}>
        <div className="mnav__panel">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mnav__link ${isActive(l.href) ? "mnav__link--active" : ""}`}
            >
              {l.label}
            </Link>
          ))}

          <Link href="/career" className="mnav__cta">
            Career
          </Link>
        </div>

        <button
          type="button"
          className="mnav__overlay"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      </div>
    </header>
  );
}