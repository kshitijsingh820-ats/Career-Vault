
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import {
  emptyResumeData,
  parseResumeContent,
  ResumeData,
} from "../lib/resume";

function EditResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [resume, setResume] = useState<ResumeData>(emptyResumeData);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

        setTitle(data.title);
        setResume(parseResumeContent(data.content));
      } catch (error) {
        console.error("Error fetching resume:", error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, router]);

  const updateField = (
    field: keyof ResumeData,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSkill = (
    field: keyof ResumeData["skills"],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value,
      },
    }));
  };

  const updateEducation = (
    index: number,
    field: keyof ResumeData["education"][number],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      ),
    }));
  };

  const updateExperience = (
    index: number,
    field: keyof ResumeData["experience"][number],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      ),
    }));
  };

  const updateProject = (
    index: number,
    field: keyof ResumeData["projects"][number],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      ),
    }));
  };

  const updateCertification = (
    index: number,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const updateAchievement = (
    index: number,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const updateResume = async () => {
    if (!title.trim()) {
      alert("Please enter a resume title");
      return;
    }

    if (!resume.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!resume.email.trim()) {
      alert("Please enter your email");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch(`/api/resumes?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: JSON.stringify(resume),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update resume");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.loading}>
        <p>Loading resume...</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.headingArea}>
          <h1 className={styles.heading}>Edit Resume</h1>

          <p className={styles.subtitle}>
            Update your professional resume.
          </p>
        </div>

        {/* Resume Information */}

        <section className={styles.section}>
          <h2>Resume Information</h2>

          <div className={styles.field}>
            <label>Resume Title</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Software Developer Resume"
            />
          </div>
        </section>

        {/* Personal Information */}

        <section className={styles.section}>
          <h2>Personal Information</h2>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Full Name</label>

              <input
                value={resume.fullName}
                onChange={(e) =>
                  updateField("fullName", e.target.value)
                }
                placeholder="Kritarth Singh"
              />
            </div>

            <div className={styles.field}>
              <label>Professional Title</label>

              <input
                value={resume.professionalTitle}
                onChange={(e) =>
                  updateField(
                    "professionalTitle",
                    e.target.value
                  )
                }
                placeholder="Frontend Developer"
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>

              <input
                type="email"
                value={resume.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.field}>
              <label>Phone</label>

              <input
                value={resume.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                placeholder="+91 9876543210"
              />
            </div>

            <div className={styles.field}>
              <label>Location</label>

              <input
                value={resume.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
                placeholder="Kanpur, Uttar Pradesh, India"
              />
            </div>

            <div className={styles.field}>
              <label>GitHub</label>

              <input
                value={resume.github}
                onChange={(e) =>
                  updateField("github", e.target.value)
                }
                placeholder="github.com/username"
              />
            </div>

            <div className={styles.field}>
              <label>LinkedIn</label>

              <input
                value={resume.linkedin}
                onChange={(e) =>
                  updateField("linkedin", e.target.value)
                }
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>
        </section>

        {/* Summary */}

        <section className={styles.section}>
          <h2>Professional Summary</h2>

          <div className={styles.field}>
            <textarea
              value={resume.summary}
              onChange={(e) =>
                updateField("summary", e.target.value)
              }
              placeholder="Write a concise professional summary..."
              rows={5}
            />
          </div>
        </section>

        {/* Education */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Education</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                setResume((prev) => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    {
                      institution: "",
                      degree: "",
                      duration: "",
                      score: "",
                    },
                  ],
                }))
              }
            >
              + Add Education
            </button>
          </div>

          {resume.education.map((education, index) => (
            <div className={styles.itemCard} key={index}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Institution</label>

                  <input
                    value={education.institution}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder="University / College"
                  />
                </div>

                <div className={styles.field}>
                  <label>Degree</label>

                  <input
                    value={education.degree}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "degree",
                        e.target.value
                      )
                    }
                    placeholder="B.Tech in Computer Science"
                  />
                </div>

                <div className={styles.field}>
                  <label>Duration</label>

                  <input
                    value={education.duration}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                    placeholder="2023–2027"
                  />
                </div>

                <div className={styles.field}>
                  <label>CGPA / Percentage</label>

                  <input
                    value={education.score}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "score",
                        e.target.value
                      )
                    }
                    placeholder="CGPA: 7.5"
                  />
                </div>
              </div>

              {resume.education.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() =>
                    setResume((prev) => ({
                      ...prev,
                      education: prev.education.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Skills */}

        <section className={styles.section}>
          <h2>Skills</h2>

          <div className={styles.field}>
            <label>Languages</label>

            <input
              value={resume.skills.languages}
              onChange={(e) =>
                updateSkill("languages", e.target.value)
              }
              placeholder="C, C++, Java, JavaScript, SQL"
            />
          </div>

          <div className={styles.field}>
            <label>Core Subjects</label>

            <input
              value={resume.skills.coreSubjects}
              onChange={(e) =>
                updateSkill("coreSubjects", e.target.value)
              }
              placeholder="DSA, OOP, DBMS, OS, Computer Networks"
            />
          </div>

          <div className={styles.field}>
            <label>Tools / Technologies</label>

            <input
              value={resume.skills.tools}
              onChange={(e) =>
                updateSkill("tools", e.target.value)
              }
              placeholder="React, Next.js, Git, GitHub, Prisma"
            />
          </div>

          <div className={styles.field}>
            <label>Other Skills</label>

            <input
              value={resume.skills.other}
              onChange={(e) =>
                updateSkill("other", e.target.value)
              }
              placeholder="Communication, Leadership, Teamwork"
            />
          </div>
        </section>

        {/* Experience */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Experience</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                setResume((prev) => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    {
                      jobTitle: "",
                      company: "",
                      duration: "",
                      description: "",
                    },
                  ],
                }))
              }
            >
              + Add Experience
            </button>
          </div>

          {resume.experience.map((experience, index) => (
            <div className={styles.itemCard} key={index}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Job Title</label>

                  <input
                    value={experience.jobTitle}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="Frontend Developer Intern"
                  />
                </div>

                <div className={styles.field}>
                  <label>Company</label>

                  <input
                    value={experience.company}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder="Company Name"
                  />
                </div>

                <div className={styles.field}>
                  <label>Duration</label>

                  <input
                    value={experience.duration}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                    placeholder="June 2026 – Present"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Description</label>

                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>

              {resume.experience.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() =>
                    setResume((prev) => ({
                      ...prev,
                      experience: prev.experience.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Projects */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Projects</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                setResume((prev) => ({
                  ...prev,
                  projects: [
                    ...prev.projects,
                    {
                      name: "",
                      technologies: "",
                      description: "",
                    },
                  ],
                }))
              }
            >
              + Add Project
            </button>
          </div>

          {resume.projects.map((project, index) => (
            <div className={styles.itemCard} key={index}>
              <div className={styles.field}>
                <label>Project Name</label>

                <input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="CareerVault"
                />
              </div>

              <div className={styles.field}>
                <label>Technologies</label>

                <input
                  value={project.technologies}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "technologies",
                      e.target.value
                    )
                  }
                  placeholder="Next.js, PostgreSQL, Prisma, Supabase"
                />
              </div>

              <div className={styles.field}>
                <label>Description</label>

                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your project, features and impact..."
                  rows={4}
                />
              </div>

              {resume.projects.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() =>
                    setResume((prev) => ({
                      ...prev,
                      projects: prev.projects.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Certifications */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Certifications</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                setResume((prev) => ({
                  ...prev,
                  certifications: [
                    ...prev.certifications,
                    "",
                  ],
                }))
              }
            >
              + Add Certification
            </button>
          </div>

          {resume.certifications.map((certification, index) => (
            <div className={styles.inlineItem} key={index}>
              <input
                value={certification}
                onChange={(e) =>
                  updateCertification(
                    index,
                    e.target.value
                  )
                }
                placeholder="Certification name — Organization"
              />

              {resume.certifications.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() =>
                    setResume((prev) => ({
                      ...prev,
                      certifications:
                        prev.certifications.filter(
                          (_, i) => i !== index
                        ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Achievements */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Achievements</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                setResume((prev) => ({
                  ...prev,
                  achievements: [
                    ...prev.achievements,
                    "",
                  ],
                }))
              }
            >
              + Add Achievement
            </button>
          </div>

          {resume.achievements.map((achievement, index) => (
            <div className={styles.inlineItem} key={index}>
              <input
                value={achievement}
                onChange={(e) =>
                  updateAchievement(
                    index,
                    e.target.value
                  )
                }
                placeholder="Solved 600+ DSA problems..."
              />

              {resume.achievements.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() =>
                    setResume((prev) => ({
                      ...prev,
                      achievements:
                        prev.achievements.filter(
                          (_, i) => i !== index
                        ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Actions */}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </button>

          <button
            className={styles.updateButton}
            onClick={updateResume}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Resume"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function EditResume() {
  return (
    <Suspense
      fallback={
        <main className={styles.loading}>
          <p>Loading resume...</p>
        </main>
      }
    >
      <EditResumeContent />
    </Suspense>
  );
}
