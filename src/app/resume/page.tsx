
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import { parseResumeContent, ResumeData } from "../lib/resume";

type Resume = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
};

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/resumes?id=${id}`);

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Resume not found");
          router.push("/dashboard");
          return;
        }

        setResume(data);
        setResumeData(parseResumeContent(data.content));
      } catch (error) {
        console.error("Error fetching resume:", error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, router]);

  if (loading) {
    return (
      <main className={styles.loading}>
        <p>Loading resume...</p>
      </main>
    );
  }

  if (!resume || !resumeData) {
    return (
      <main className={styles.loading}>
        <p>Resume not found.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.topActions}>
            <button
              className={styles.printButton}
              onClick={() => window.print()}
            >
              Download PDF
            </button>

            <button
              className={styles.editButton}
              onClick={() =>
                router.push(`/edit-resume?id=${resume.id}`)
              }
            >
              Edit Resume
            </button>
          </div>
        </div>

        <div className={styles.resumePaper}>
          <header className={styles.header}>
            <h1>{resumeData.fullName || resume.title}</h1>

            {resumeData.professionalTitle && (
              <p className={styles.professionalTitle}>
                {resumeData.professionalTitle}
              </p>
            )}

            <div className={styles.contactInfo}>
              {resumeData.location && (
                <span>{resumeData.location}</span>
              )}

              {resumeData.email && (
                <span>{resumeData.email}</span>
              )}

              {resumeData.phone && (
                <span>{resumeData.phone}</span>
              )}

              {resumeData.github && (
                <span>{resumeData.github}</span>
              )}

              {resumeData.linkedin && (
                <span>{resumeData.linkedin}</span>
              )}
            </div>
          </header>

          {resumeData.summary.trim() && (
            <section className={styles.section}>
              <h2>SUMMARY</h2>
              <div className={styles.sectionLine}></div>

              <p className={styles.summary}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.education.some(
            (education) =>
              education.institution || education.degree
          ) && (
            <section className={styles.section}>
              <h2>EDUCATION</h2>
              <div className={styles.sectionLine}></div>

              {resumeData.education.map(
                (education, index) =>
                  (education.institution ||
                    education.degree) && (
                    <div
                      className={styles.educationItem}
                      key={index}
                    >
                      <div className={styles.itemHeader}>
                        <div>
                          <h3>{education.institution}</h3>

                          {education.degree && (
                            <p className={styles.subText}>
                              {education.degree}
                            </p>
                          )}
                        </div>

                        <div className={styles.rightText}>
                          {education.duration && (
                            <p>{education.duration}</p>
                          )}

                          {education.score && (
                            <p>{education.score}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </section>
          )}

          {(resumeData.skills.languages ||
            resumeData.skills.coreSubjects ||
            resumeData.skills.tools ||
            resumeData.skills.other) && (
            <section className={styles.section}>
              <h2>SKILLS</h2>
              <div className={styles.sectionLine}></div>

              <div className={styles.skills}>
                {resumeData.skills.languages && (
                  <p>
                    <strong>Languages:</strong>{" "}
                    {resumeData.skills.languages}
                  </p>
                )}

                {resumeData.skills.coreSubjects && (
                  <p>
                    <strong>Core Subjects:</strong>{" "}
                    {resumeData.skills.coreSubjects}
                  </p>
                )}

                {resumeData.skills.tools && (
                  <p>
                    <strong>Tools & Technologies:</strong>{" "}
                    {resumeData.skills.tools}
                  </p>
                )}

                {resumeData.skills.other && (
                  <p>
                    <strong>Other Skills:</strong>{" "}
                    {resumeData.skills.other}
                  </p>
                )}
              </div>
            </section>
          )}

          {resumeData.experience.some(
            (experience) =>
              experience.jobTitle ||
              experience.company ||
              experience.description
          ) && (
            <section className={styles.section}>
              <h2>EXPERIENCE</h2>
              <div className={styles.sectionLine}></div>

              {resumeData.experience.map(
                (experience, index) =>
                  (experience.jobTitle ||
                    experience.company ||
                    experience.description) && (
                    <div
                      className={styles.experienceItem}
                      key={index}
                    >
                      <div className={styles.itemHeader}>
                        <div>
                          <h3>{experience.jobTitle}</h3>

                          {experience.company && (
                            <p className={styles.subText}>
                              {experience.company}
                            </p>
                          )}
                        </div>

                        {experience.duration && (
                          <p className={styles.rightText}>
                            {experience.duration}
                          </p>
                        )}
                      </div>

                      {experience.description && (
                        <div className={styles.description}>
                          {experience.description
                            .split("\n")
                            .filter((line) => line.trim())
                            .map((line, bulletIndex) => (
                              <p key={bulletIndex}>
                                •{" "}
                                {line
                                  .replace(/^[-•]\s*/, "")
                                  .trim()}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  )
              )}
            </section>
          )}

          {resumeData.projects.some(
            (project) =>
              project.name ||
              project.technologies ||
              project.description
          ) && (
            <section className={styles.section}>
              <h2>PROJECTS</h2>
              <div className={styles.sectionLine}></div>

              {resumeData.projects.map(
                (project, index) =>
                  (project.name ||
                    project.technologies ||
                    project.description) && (
                    <div
                      className={styles.projectItem}
                      key={index}
                    >
                      <div className={styles.projectTitle}>
                        {project.name}

                        {project.technologies && (
                          <span>
                            {" — "}
                            {project.technologies}
                          </span>
                        )}
                      </div>

                      {project.description && (
                        <div className={styles.description}>
                          {project.description
                            .split("\n")
                            .filter((line) => line.trim())
                            .map((line, bulletIndex) => (
                              <p key={bulletIndex}>
                                •{" "}
                                {line
                                  .replace(/^[-•]\s*/, "")
                                  .trim()}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  )
              )}
            </section>
          )}

          {resumeData.certifications.some(
            (certification) => certification.trim()
          ) && (
            <section className={styles.section}>
              <h2>CERTIFICATIONS</h2>
              <div className={styles.sectionLine}></div>

              <ul className={styles.list}>
                {resumeData.certifications
                  .filter(
                    (certification) => certification.trim()
                  )
                  .map((certification, index) => (
                    <li key={index}>{certification}</li>
                  ))}
              </ul>
            </section>
          )}

          {resumeData.achievements.some(
            (achievement) => achievement.trim()
          ) && (
            <section className={styles.section}>
              <h2>ACHIEVEMENTS</h2>
              <div className={styles.sectionLine}></div>

              <ul className={styles.list}>
                {resumeData.achievements
                  .filter(
                    (achievement) => achievement.trim()
                  )
                  .map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
              </ul>
            </section>
          )}

          <div className={styles.updated}>
            Last updated:{" "}
            {new Date(
              resume.updatedAt
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <main className={styles.loading}>
          <p>Loading resume...</p>
        </main>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}

