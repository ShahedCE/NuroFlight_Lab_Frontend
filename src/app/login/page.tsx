"use client";
import { useEffect } from "react";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormValues } from "@/lib/admin/validations/auth";
import { loginAdmin } from "@/lib/admin/admin-api";
import { saveAdminAuth } from "@/lib/admin/auth";

export default function AdminLoginPage() {
    
  const router = useRouter();
  
  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin(data);

      // save token + admin
      saveAdminAuth(res.accessToken, res.admin);

      // redirect
      router.push("/admin/dashboard");
    } catch (err: any) {
        console.log("LOGIN ERROR:", err);
        console.log("RESPONSE:", err?.response?.data);
        console.log("URL:", err?.config?.baseURL, err?.config?.url);
      
        setError(err?.response?.data?.message || err?.message || "Login failed");
      } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Nuroflight Lab Admin Panel
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white outline-none focus:border-blue-400"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white outline-none focus:border-blue-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}