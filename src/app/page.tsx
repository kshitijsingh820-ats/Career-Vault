
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { createClient } from "./lib/supabase/client";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

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

    router.refresh();
  };

  const dashboardLink = user ? "/dashboard" : "/login";

  return (
    <main className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          CareerVault
        </Link>

        <div className={styles.navLinks}>
          {/* Dashboard */}
          <Link href={dashboardLink} className={styles.dashboardButton}>
            Dashboard
          </Link>

          {!loading && (
            <>
              {user ? (
                /* Logged-in user */
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              ) : (
                /* Logged-out user */
                <>
                  <Link href="/login" className={styles.loginButton}>
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className={styles.getStartedButton}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.tagline}>Your Career. Organized.</p>

          <h1>
            Build, manage, and
            <span> showcase your </span>
            professional profile.
          </h1>

          <p className={styles.description}>
            CareerVault helps you create, manage, and organize your resumes
            in one secure place. Keep your professional information updated
            and access it whenever you need it.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/signup" className={styles.primaryButton}>
              Get Started
            </Link>

            <Link href="/login" className={styles.secondaryButton}>
              Login
            </Link>
          </div>
        </div>

        {/* Simple visual card */}
        <div className={styles.heroCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardLabel}>CAREER PROFILE</p>
              <h2>Your Resume</h2>
            </div>

            <div className={styles.statusDot}></div>
          </div>

          <div className={styles.profileLine}></div>
          <div
            className={`${styles.profileLine} ${styles.short}`}
          ></div>

          <div className={styles.resumeSection}>
            <span></span>
            <div>
              <div className={styles.smallLine}></div>
              <div
                className={`${styles.smallLine} ${styles.smaller}`}
              ></div>
            </div>
          </div>

          <div className={styles.resumeSection}>
            <span></span>
            <div>
              <div className={styles.smallLine}></div>
              <div
                className={`${styles.smallLine} ${styles.smaller}`}
              ></div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span>Resume managed</span>
            <span>✓</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>✓</div>

          <h3>Secure</h3>

          <p>
            Your career data is connected to your personal account and
            protected through authentication.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>▣</div>

          <h3>Organized</h3>

          <p>
            Create and manage your resumes from one simple and organized
            dashboard.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>↗</div>

          <h3>Accessible</h3>

          <p>
            Keep your professional information available whenever you need
            it.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <h2>Build your career profile with CareerVault.</h2>

        <p>
          Keep your professional information organized and ready for your
          next opportunity.
        </p>

        <Link href="/signup" className={styles.primaryButton}>
          Create Your Profile
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 CareerVault. Built for your career journey.</p>
      </footer>
    </main>
  );
}

