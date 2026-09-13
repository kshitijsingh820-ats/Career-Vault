
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import {
  emptyResumeData,
  ResumeData,
} from "../lib/resume";

export default function CreateResume() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [resume, setResume] = useState<ResumeData>(emptyResumeData);
  const [loading, setLoading] = useState(false);

  // Fill the form with sample data
  const fillSampleData = () => {
    setTitle("Full Stack Developer Resume");

    setResume({
      fullName: "Arjun Mehta",
      professionalTitle: "Full Stack Developer",
      email: "arjun.mehta@example.com",
      phone: "+91 9876543210",
      location: "Bengaluru, Karnataka, India",
      github: "github.com/arjunmehta",
      linkedin: "linkedin.com/in/arjunmehta",

      summary:
        "Computer Science undergraduate with a strong foundation in data structures, algorithms, object-oriented programming, and database management. Experienced in developing responsive web applications using React and Next.js with PostgreSQL-based backends. Passionate about building scalable products and solving real-world problems through technology.",

      education: [
        {
          institution: "National Institute of Technology, Jaipur",
          degree: "B.Tech in Computer Science and Engineering",
          duration: "2022–2026",
          score: "CGPA: 8.4",
        },
        {
          institution: "Delhi Public School",
          degree: "Intermediate — Science",
          duration: "2022",
          score: "Percentage: 91%",
        },
      ],

      skills: {
        languages:
          "C++, Java, JavaScript, TypeScript, Python, SQL",
        coreSubjects:
          "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks",
        tools:
          "React, Next.js, Node.js, PostgreSQL, Prisma, Git, GitHub, Docker, Vercel",
        other:
          "REST APIs, Responsive Design, Generative AI, Problem Solving, Teamwork",
      },

      experience: [
        {
          jobTitle: "Software Developer Intern",
          company: "NovaTech Solutions",
          duration: "January 2026 – June 2026",
          description:
            "Developed responsive web interfaces using React and TypeScript. Integrated REST APIs and improved reusable components while collaborating through Git and GitHub.",
        },
      ],

      projects: [
        {
          name: "TaskFlow",
          technologies:
            "Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS",
          description:
            "Built a task management platform with authentication, database persistence, and CRUD functionality using Next.js and Prisma.",
        },
        {
          name: "ExpenseMate",
          technologies:
            "React, JavaScript, Tailwind CSS, Local Storage",
          description:
            "Developed an expense tracking application with category-based organization and persistent browser storage.",
        },
        {
          name: "StudySphere",
          technologies:
            "React, Node.js, Express, MongoDB",
          description:
            "Created a study resource platform for organizing notes, learning materials, and useful links with REST APIs.",
        },
      ],

      certifications: [
        "Complete Web Development Bootcamp — Udemy",
        "SQL for Data Analysis — Coursera",
        "JavaScript Algorithms and Data Structures — freeCodeCamp",
      ],

      achievements: [
        "Solved 750+ Data Structures and Algorithms problems across coding platforms.",
        "Achieved a top 10% ranking in a national-level coding contest.",
        "Selected among the top teams in a university-level hackathon.",
      ],
    });
  };

  // Update basic fields
  const updateField = (
    field: keyof ResumeData,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update skills
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

  // Update education
  const updateEducation = (
    index: number,
    field: keyof ResumeData["education"][number],
    value: string
  ) => {
    setResume((prev) => {
      const education = [...prev.education];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...prev,
        education,
      };
    });
  };

  // Add education
  const addEducation = () => {
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
    }));
  };

  // Remove education
  const removeEducation = (index: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Update experience
  const updateExperience = (
    index: number,
    field: keyof ResumeData["experience"][number],
    value: string
  ) => {
    setResume((prev) => {
      const experience = [...prev.experience];

      experience[index] = {
        ...experience[index],
        [field]: value,
      };

      return {
        ...prev,
        experience,
      };
    });
  };

  // Add experience
  const addExperience = () => {
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
    }));
  };

  // Remove experience
  const removeExperience = (index: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Update project
  const updateProject = (
    index: number,
    field: keyof ResumeData["projects"][number],
    value: string
  ) => {
    setResume((prev) => {
      const projects = [...prev.projects];

      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...prev,
        projects,
      };
    });
  };

  // Add project
  const addProject = () => {
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
    }));
  };

  // Remove project
  const removeProject = (index: number) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Update certification
  const updateCertification = (
    index: number,
    value: string
  ) => {
    setResume((prev) => {
      const certifications = [...prev.certifications];

      certifications[index] = value;

      return {
        ...prev,
        certifications,
      };
    });
  };

  // Add certification
  const addCertification = () => {
    setResume((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        "",
      ],
    }));
  };

  // Remove certification
  const removeCertification = (index: number) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Update achievement
  const updateAchievement = (
    index: number,
    value: string
  ) => {
    setResume((prev) => {
      const achievements = [...prev.achievements];

      achievements[index] = value;

      return {
        ...prev,
        achievements,
      };
    });
  };

  // Add achievement
  const addAchievement = () => {
    setResume((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        "",
      ],
    }));
  };

  // Remove achievement
  const removeAchievement = (index: number) => {
    setResume((prev) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Create resume
  const createResume = async () => {
    if (!title.trim()) {
      alert("Please enter a resume title.");
      return;
    }

    if (!resume.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!resume.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/resumes", {
        method: "POST",
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
        alert(
          data.error || "Failed to create resume."
        );
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while creating the resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.container}>
        {/* Back Button */}
        

        {/* Heading */}
        <div className={styles.headingArea}>
          <div>
            <h1 className={styles.heading}>
              Create Resume
            </h1>

            <p className={styles.subtitle}>
              Build a professional, ATS-friendly resume.
            </p>
          </div>

          <button
            type="button"
            className={styles.addButton}
            onClick={fillSampleData}
          >
            ✨ Fill Sample Data
          </button>
        </div>

        {/* Resume Title */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Resume Details</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Resume Title *</label>

              <input
                type="text"
                placeholder="e.g. Full Stack Developer Resume"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Personal Information</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Full Name *</label>

              <input
                type="text"
                placeholder="Your full name"
                value={resume.fullName}
                onChange={(e) =>
                  updateField(
                    "fullName",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Professional Title</label>

              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                value={
                  resume.professionalTitle
                }
                onChange={(e) =>
                  updateField(
                    "professionalTitle",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Email *</label>

              <input
                type="email"
                placeholder="your@email.com"
                value={resume.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Phone</label>

              <input
                type="text"
                placeholder="+91 9876543210"
                value={resume.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Location</label>

              <input
                type="text"
                placeholder="City, State, Country"
                value={resume.location}
                onChange={(e) =>
                  updateField(
                    "location",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>GitHub</label>

              <input
                type="text"
                placeholder="github.com/username"
                value={resume.github}
                onChange={(e) =>
                  updateField(
                    "github",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>LinkedIn</label>

              <input
                type="text"
                placeholder="linkedin.com/in/username"
                value={resume.linkedin}
                onChange={(e) =>
                  updateField(
                    "linkedin",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Professional Summary</h2>
          </div>

          <div className={styles.field}>
            <label>Summary</label>

            <textarea
              rows={5}
              placeholder="Write a short professional summary..."
              value={resume.summary}
              onChange={(e) =>
                updateField(
                  "summary",
                  e.target.value
                )
              }
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
              onClick={addEducation}
            >
              + Add Education
            </button>
          </div>

          {resume.education.map(
            (education, index) => (
              <div
                className={styles.itemCard}
                key={index}
              >
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>Institution</label>

                    <input
                      type="text"
                      value={
                        education.institution
                      }
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Degree</label>

                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Duration</label>

                    <input
                      type="text"
                      value={
                        education.duration
                      }
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Score</label>

                    <input
                      type="text"
                      value={education.score}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "score",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {resume.education.length >
                  1 && (
                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    onClick={() =>
                      removeEducation(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Skills */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Skills</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Languages</label>

              <input
                type="text"
                placeholder="C++, JavaScript, Python..."
                value={resume.skills.languages}
                onChange={(e) =>
                  updateSkill(
                    "languages",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Core Subjects</label>

              <input
                type="text"
                placeholder="DSA, DBMS, OS..."
                value={
                  resume.skills.coreSubjects
                }
                onChange={(e) =>
                  updateSkill(
                    "coreSubjects",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Tools & Technologies</label>

              <input
                type="text"
                placeholder="React, Next.js, Git..."
                value={resume.skills.tools}
                onChange={(e) =>
                  updateSkill(
                    "tools",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label>Other Skills</label>

              <input
                type="text"
                placeholder="Problem Solving, Teamwork..."
                value={resume.skills.other}
                onChange={(e) =>
                  updateSkill(
                    "other",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Experience</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={addExperience}
            >
              + Add Experience
            </button>
          </div>

          {resume.experience.map(
            (experience, index) => (
              <div
                className={styles.itemCard}
                key={index}
              >
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>Job Title</label>

                    <input
                      type="text"
                      value={
                        experience.jobTitle
                      }
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Company</label>

                    <input
                      type="text"
                      value={
                        experience.company
                      }
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Duration</label>

                    <input
                      type="text"
                      value={
                        experience.duration
                      }
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Description</label>

                  <textarea
                    rows={4}
                    value={
                      experience.description
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                {resume.experience.length >
                  1 && (
                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    onClick={() =>
                      removeExperience(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Projects */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Projects</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={addProject}
            >
              + Add Project
            </button>
          </div>

          {resume.projects.map(
            (project, index) => (
              <div
                className={styles.itemCard}
                key={index}
              >
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>Project Name</label>

                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        updateProject(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label>
                      Technologies
                    </label>

                    <input
                      type="text"
                      value={
                        project.technologies
                      }
                      onChange={(e) =>
                        updateProject(
                          index,
                          "technologies",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Description</label>

                  <textarea
                    rows={4}
                    value={
                      project.description
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                {resume.projects.length >
                  1 && (
                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    onClick={() =>
                      removeProject(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Certifications */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Certifications</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={addCertification}
            >
              + Add Certification
            </button>
          </div>

          {resume.certifications.map(
            (certification, index) => (
              <div
                className={styles.inlineItem}
                key={index}
              >
                <input
                  type="text"
                  placeholder="Certification name"
                  value={certification}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      e.target.value
                    )
                  }
                />

                {resume.certifications.length >
                  1 && (
                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    onClick={() =>
                      removeCertification(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Achievements */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Achievements</h2>

            <button
              type="button"
              className={styles.addButton}
              onClick={addAchievement}
            >
              + Add Achievement
            </button>
          </div>

          {resume.achievements.map(
            (achievement, index) => (
              <div
                className={styles.inlineItem}
                key={index}
              >
                <input
                  type="text"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) =>
                    updateAchievement(
                      index,
                      e.target.value
                    )
                  }
                />

                {resume.achievements.length >
                  1 && (
                  <button
                    type="button"
                    className={
                      styles.removeButton
                    }
                    onClick={() =>
                      removeAchievement(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() =>
              router.push("/dashboard")
            }
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.updateButton}
            onClick={createResume}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Resume"}
          </button>
        </div>
      </main>
    </div>
  );
}

