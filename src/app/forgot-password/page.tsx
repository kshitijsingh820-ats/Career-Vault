
"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "If an account exists with this email, a password reset link has been sent."
    );
  };

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

        {/* Forgot Password Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Forgot Password?
          </h1>

          <p className="mt-2 mb-7 text-sm text-[#8f98aa]">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleResetPassword} className="space-y-5">

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

            {/* Error Message */}
            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Success Message */}
            {message && (
              <p className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                {message}
              </p>
            )}

            {/* Send Reset Link Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white py-3 font-semibold text-[#0b0f19] transition hover:bg-[#e7eaf0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-[#8f98aa]">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-white hover:underline"
            >
              Login
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

