export type ResumeExperience = {
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
};

export type ResumeProject = {
  name: string;
  technologies: string;
  description: string;
};

export type ResumeEducation = {
  institution: string;
  degree: string;
  duration: string;
  score: string;
};

export type ResumeData = {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;

  summary: string;

  education: ResumeEducation[];

  skills: {
    languages: string;
    coreSubjects: string;
    tools: string;
    other: string;
  };

  experience: ResumeExperience[];

  projects: ResumeProject[];

  certifications: string[];

  achievements: string[];
};

export const emptyResumeData: ResumeData = {
  fullName: "",
  professionalTitle: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",

  summary: "",

  education: [
    {
      institution: "",
      degree: "",
      duration: "",
      score: "",
    },
  ],

  skills: {
    languages: "",
    coreSubjects: "",
    tools: "",
    other: "",
  },

  experience: [
    {
      jobTitle: "",
      company: "",
      duration: "",
      description: "",
    },
  ],

  projects: [
    {
      name: "",
      technologies: "",
      description: "",
    },
  ],

  certifications: [""],

  achievements: [""],
};

export function parseResumeContent(content: string | null): ResumeData {
  if (!content) {
    return emptyResumeData;
  }

  try {
    const parsed = JSON.parse(content);

    return {
      ...emptyResumeData,
      ...parsed,
      skills: {
        ...emptyResumeData.skills,
        ...(parsed.skills || {}),
      },
    };
  } catch {
    return {
      ...emptyResumeData,
      summary: content,
    };
  }
}