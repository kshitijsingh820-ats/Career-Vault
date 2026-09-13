
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { createClient } from "../lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const isDashboard = pathname === "/dashboard";
  const isCreateResume = pathname === "/create-resume";

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);

    router.push("/");
    router.refresh();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.logo}>
          CareerVault
        </Link>

        <div className={styles.navActions}>
          {user && !isDashboard && (
            <>
              <Link href="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>

              {!isCreateResume && (
                <Link href="/create-resume" className={styles.createButton}>
                  Create Resume
                </Link>
              )}
            </>
          )}

          {!loading && (
            <>
              {user ? (
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className={styles.navLink}>
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

