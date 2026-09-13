
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password updated successfully!");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
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

        {/* Update Password Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create New Password
          </h1>

          <p className="mt-2 mb-7 text-sm text-[#8f98aa]">
            Enter your new password below.
          </p>

          <form onSubmit={handleUpdatePassword} className="space-y-5">

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d8dce7]">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/6 px-4 py-3 pr-12 text-sm text-white placeholder-[#687286] outline-none transition focus:border-white/30 focus:bg-white/8"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f98aa] transition hover:text-white"
                >
                  {showPassword ? (
                    /* Eye Off Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.5 5 8.5 5a13.16 13.16 0 0 1-2.15 2.82" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 3.5 10s3.5 5 8.5 5c1.02 0 1.98-.18 2.85-.5" />
                      <line x1="3" y1="3" x2="21" y2="21" />
                    </svg>
                  ) : (
                    /* Eye Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.74 7.45 7.73 5 12 5s8.26 2.45 9.94 6.65a1 1 0 0 1 0 .7C20.26 16.55 16.27 19 12 19s-8.26-2.45-9.94-6.65Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#d8dce7]">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/6 px-4 py-3 pr-12 text-sm text-white placeholder-[#687286] outline-none transition focus:border-white/30 focus:bg-white/8"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f98aa] transition hover:text-white"
                >
                  {showConfirmPassword ? (
                    /* Eye Off Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.5 5 8.5 5a13.16 13.16 0 0 1-2.15 2.82" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 3.5 10s3.5 5 8.5 5c1.02 0 1.98-.18 2.85-.5" />
                      <line x1="3" y1="3" x2="21" y2="21" />
                    </svg>
                  ) : (
                    /* Eye Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.74 7.45 7.73 5 12 5s8.26 2.45 9.94 6.65a1 1 0 0 1 0 .7C20.26 16.55 16.27 19 12 19s-8.26-2.45-9.94-6.65Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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

            {/* Update Password Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white py-3 font-semibold text-[#0b0f19] transition hover:bg-[#e7eaf0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-[#687286] transition hover:text-white"
          >
            Back to Login
          </a>
        </div>
      </div>
    </main>
  );
}

