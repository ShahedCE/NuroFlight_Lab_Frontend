"use client";

import { useRouter } from "next/navigation";
import { removeAdminAuth } from "@/lib/admin/auth";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeAdminAuth();
    router.push("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      
      {/* Title */}
      <h1 className="text-sm text-gray-300">
        Admin Dashboard
      </h1>

      {/* Right side */}
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md"
      >
        Logout
      </button>

    </header>
  );
}