
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import { parseResumeContent } from "../lib/resume";
import { createClient } from "../lib/supabase/client";

type Resume = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const supabase = createClient();

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/resumes");
      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      await fetchResumes();
    };

    checkAuth();
  }, []);

  const deleteResume = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/resumes?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete resume");
        return;
      }

      setResumes((previousResumes) =>
        previousResumes.filter((resume) => resume.id !== id)
      );
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Something went wrong");
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This will permanently delete your account and all your resumes. This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingAccount(true);

      const response = await fetch("/api/account", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete account");
        return;
      }

      await supabase.auth.signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Something went wrong while deleting your account.");
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <section className={styles.topSection}>
          <div>
            <h1 className={styles.heading}>
              Your Career Dashboard
            </h1>

            <p className={styles.subtitle}>
              Create, manage and organize your resumes.
            </p>
          </div>

          <button
            className={styles.createButton}
            onClick={() => router.push("/create-resume")}
          >
            + Create Resume
          </button>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            Your Resumes
          </h2>

          {loading ? (
            <p className={styles.loading}>
              Loading resumes...
            </p>
          ) : resumes.length === 0 ? (
            <div className={styles.empty}>
              <p>You don't have any resumes yet.</p>

              <button
                className={styles.createButton}
                onClick={() => router.push("/create-resume")}
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {resumes.map((resume) => {
                const resumeData = parseResumeContent(
                  resume.content
                );

                return (
                  <div
                    className={styles.card}
                    key={resume.id}
                  >
                    <h3 className={styles.cardTitle}>
                      {resumeData.fullName || resume.title}
                    </h3>

                    {resumeData.professionalTitle && (
                      <p className={styles.professionalTitle}>
                        {resumeData.professionalTitle}
                      </p>
                    )}

                    {resumeData.email && (
                      <p className={styles.cardInfo}>
                        {resumeData.email}
                      </p>
                    )}

                    {resumeData.location && (
                      <p className={styles.cardInfo}>
                        {resumeData.location}
                      </p>
                    )}

                    {resumeData.summary && (
                      <p className={styles.cardContent}>
                        {resumeData.summary}
                      </p>
                    )}

                    <div className={styles.actions}>
                      <button
                        className={styles.viewButton}
                        onClick={() =>
                          router.push(
                            `/resume?id=${resume.id}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className={styles.editButton}
                        onClick={() =>
                          router.push(
                            `/edit-resume?id=${resume.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          deleteResume(resume.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Delete Account */}
        <section className={styles.deleteAccountSection}>
          <div>
            <h2 className={styles.deleteAccountTitle}>
              Delete Account
            </h2>

            <p className={styles.deleteAccountText}>
              Permanently delete your CareerVault account and all
              your saved resumes. This action cannot be undone.
            </p>
          </div>

          <button
            className={styles.deleteAccountButton}
            onClick={deleteAccount}
            disabled={deletingAccount}
          >
            {deletingAccount
              ? "Deleting Account..."
              : "Delete Account"}
          </button>
        </section>
      </div>
    </main>
  );
}

