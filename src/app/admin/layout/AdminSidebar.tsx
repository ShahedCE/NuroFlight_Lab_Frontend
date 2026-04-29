"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Publications", href: "/admin/publications" },
  { label: "Team", href: "/admin/team" },
  { label: "Job Posts", href: "/admin/job-posts" },
  { label: "Applications", href: "/admin/job-applications" },
  { label: "Contact Messages", href: "/admin/contact-messages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-5">
      
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Nuroflight</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}