
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-4 flex items-center justify-center">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            CareerVault
          </a>

          <p className="mt-3 text-sm text-[#8f98aa]">
            Your Career. Organized.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-2 mb-7 text-sm text-[#8f98aa]">
            Login to your CareerVault account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d8dce7]">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder-[#687286] outline-none transition focus:border-white/30 focus:bg-white/8"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d8dce7]">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder-[#687286] outline-none transition focus:border-white/30 focus:bg-white/8"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white py-3 font-semibold text-[#0b0f19] transition hover:bg-[#e7eaf0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Error / Success Message */}
          {message && (
            <p className="mt-5 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[#c4cad5]">
              {message}
            </p>
          )}

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-[#8f98aa]">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-white hover:underline"
            >
              Create one
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-[#687286] transition hover:text-white"
          >
            Back to CareerVault
          </a>
        </div>
      </div>
    </main>
  );
}

