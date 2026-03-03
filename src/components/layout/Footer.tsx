// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__title">NeuroFlight Lab</div>
          <p className="footer__text">
            Research lab focused on neuroengineering, BCI and intelligent systems.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <div className="footer__colTitle">Quick Links</div>
            <Link className="footer__link" href="/projects">Projects</Link>
            <Link className="footer__link" href="/publications">Publications</Link>
            <Link className="footer__link" href="/team">Team</Link>
            <Link className="footer__link" href="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <div className="footer__colTitle">Info</div>
            <Link className="footer__link" href="/about">About</Link>
            <Link className="footer__link" href="/career">Career</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottomInner">
          <span>© {new Date().getFullYear()} NeuroFlight Lab</span>
          <span className="footer__muted">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
