import { db } from "./db";
import {
  profile, experience, education, skills, projects, contactMessages,
  type Profile, type Experience, type Education, type Skill, type Project, type InsertContactMessage
} from "@shared/schema";
import { asc, desc } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile).limit(1);
    return result;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience).orderBy(asc(experience.order));
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education).orderBy(asc(education.order));
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.order));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.order));
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async seedData(): Promise<void> {
    // Check if profile exists
    const [existing] = await db.select().from(profile).limit(1);
    if (existing) return;

    // Seed Profile
    await db.insert(profile).values({
      name: "Drona Poudel",
      title: "Senior Frontend Developer",
      summary: "Experienced dynamic Frontend Developer with over 6 years in Frontend Development, specializing in UI & Development. Proven track record in creating scalable, human-readable code, ensuring quality throughout the product lifecycle, and collaborating effectively with cross-functional teams.",
      location: "Kathmandu, Nepal",
      email: "pdronachandra@gmail.com",
      linkedin: "linkedin.com/in/dron",
      resumeUrl: "#",
    });

    // Seed Experience
    await db.insert(experience).values([
      {
        company: "Nepal Clearing House Limited (NCHL)",
        role: "Senior Frontend Developer",
        startDate: "May 2022",
        endDate: "Present",
        description: "Wrote scalable, human-readable code adhering to industry best practices. Ensured quality control by testing components and debugging. Collaborated with product owners to translate business goals into platform changes. Worked on full production cycles from brainstorming to deployment.",
        order: 1,
      },
      {
        company: "Sewa Tech Pvt Ltd",
        role: "Frontend UI/ UX Developer",
        startDate: "Jan 2020",
        endDate: "May 2022",
        description: "Developed ReactJS applications using TypeScript, ensuring pixel-perfect UI/UX. Participated in brainstorming and prototyping. Contributed to recruitment process through test reviews and technical interviews.",
        order: 2,
      },
      {
        company: "EveMoo",
        role: "Front End Developer",
        startDate: "Mar 2018",
        endDate: "Dec 2019",
        description: "Worked on web apps and systems design in coordination with core teams. Employed critical thinking on mockups/prototypes to enhance user experience.",
        order: 3,
      },
    ]);

    // Seed Education
    await db.insert(education).values([
      {
        institution: "Asia Pacific University (APU)",
        degree: "MSc in Information Technology Management",
        period: "Oct 2022 - Dec 2024",
        order: 1,
      },
      {
        institution: "Tribhuvan University",
        degree: "Bachelors in Computer Science and IT (BSc. CSIT)",
        period: "2013 - 2017",
        order: 2,
      },
    ]);

    // Seed Skills
    await db.insert(skills).values([
      {
        category: "Languages",
        items: ["JavaScript", "TypeScript", "HTML5", "CSS", "SCSS"],
        order: 1,
      },
      {
        category: "Frameworks & Libraries",
        items: ["ReactJS", "NextJS", "Redux", "RxJS", "jQuery", "Tailwind CSS"],
        order: 2,
      },
      {
        category: "Tools & Practices",
        items: ["Git", "Figma", "Adobe Suite", "CI/CD", "Agile/Scrum"],
        order: 3,
      },
    ]);

    // Seed Projects
    await db.insert(projects).values([
      {
        title: "connect IPS",
        description: "A prominent payment system platform.",
        link: "https://login.connectips.com",
        techStack: ["React", "TypeScript"],
        order: 1,
      },
      {
        title: "ControlPlus",
        description: "Management dashboard and console application.",
        link: "https://app.controlplus.io",
        techStack: ["React", "Dashboard"],
        order: 2,
      },
      {
        title: "Other Projects",
        description: "Cupponpro.com, himalayanbeans.com, ichyoryokan.com",
        techStack: ["Web", "UI/UX"],
        order: 3,
      },
    ]);
  }
}

export class MemStorage implements IStorage {
  private profile: Profile | undefined;
  private experience: Experience[] = [];
  private education: Education[] = [];
  private skills: Skill[] = [];
  private projects: Project[] = [];
  private contactMessages: InsertContactMessage[] = [];

  constructor() {
    this.profile = undefined;
    this.experience = [];
    this.education = [];
    this.skills = [];
    this.projects = [];
    this.contactMessages = [];
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experience.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getEducation(): Promise<Education[]> {
    return this.education.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getProjects(): Promise<Project[]> {
    return this.projects.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    // @ts-ignore
    const id = this.contactMessages.length + 1;
    // @ts-ignore
    this.contactMessages.push({ ...message, id, createdAt: new Date() });
  }

  async seedData(): Promise<void> {
    if (this.profile) return;

    this.profile = {
      id: 1,
      name: "Drona Poudel",
      title: "Senior Frontend Developer",
      summary: "Experienced dynamic Frontend Developer with over 6 years in Frontend Development, specializing in UI & Development. Proven track record in creating scalable, human-readable code, ensuring quality throughout the product lifecycle, and collaborating effectively with cross-functional teams.",
      location: "Kathmandu, Nepal",
      email: "pdronachandra@gmail.com",
      linkedin: "linkedin.com/in/dron",
      resumeUrl: "#",
      github: null
    };

    this.experience = [
      {
        id: 1,
        company: "Nepal Clearing House Limited (NCHL)",
        role: "Senior Frontend Developer",
        startDate: "May 2022",
        endDate: "Present",
        description: "Wrote scalable, human-readable code adhering to industry best practices. Ensured quality control by testing components and debugging. Collaborated with product owners to translate business goals into platform changes. Worked on full production cycles from brainstorming to deployment.",
        order: 1,
      },
      {
        id: 2,
        company: "Sewa Tech Pvt Ltd",
        role: "Frontend UI/ UX Developer",
        startDate: "Jan 2020",
        endDate: "May 2022",
        description: "Developed ReactJS applications using TypeScript, ensuring pixel-perfect UI/UX. Participated in brainstorming and prototyping. Contributed to recruitment process through test reviews and technical interviews.",
        order: 2,
      },
      {
        id: 3,
        company: "EveMoo",
        role: "Front End Developer",
        startDate: "Mar 2018",
        endDate: "Dec 2019",
        description: "Worked on web apps and systems design in coordination with core teams. Employed critical thinking on mockups/prototypes to enhance user experience.",
        order: 3,
      },
    ];

    this.education = [
      {
        id: 1,
        institution: "Asia Pacific University (APU)",
        degree: "MSc in Information Technology Management",
        period: "Oct 2022 - Dec 2024",
        order: 1,
      },
      {
        id: 2,
        institution: "Tribhuvan University",
        degree: "Bachelors in Computer Science and IT (BSc. CSIT)",
        period: "2013 - 2017",
        order: 2,
      },
    ];

    this.skills = [
      {
        id: 1,
        category: "Languages",
        items: ["JavaScript", "TypeScript", "HTML5", "CSS", "SCSS"],
        order: 1,
      },
      {
        id: 2,
        category: "Frameworks & Libraries",
        items: ["ReactJS", "NextJS", "Redux", "RxJS", "jQuery", "Tailwind CSS"],
        order: 2,
      },
      {
        id: 3,
        category: "Tools & Practices",
        items: ["Git", "Figma", "Adobe Suite", "CI/CD", "Agile/Scrum"],
        order: 3,
      },
    ];

    this.projects = [
      {
        id: 1,
        title: "connect IPS",
        description: "A prominent payment system platform.",
        link: "https://login.connectips.com",
        techStack: ["React", "TypeScript"],
        order: 1,
      },
      {
        id: 2,
        title: "ControlPlus",
        description: "Management dashboard and console application.",
        link: "https://app.controlplus.io",
        techStack: ["React", "Dashboard"],
        order: 2,
      },
      {
        id: 3,
        title: "Other Projects",
        description: "Cupponpro.com, himalayanbeans.com, ichyoryokan.com",
        techStack: ["Web", "UI/UX"],
        order: 3,
        link: null
      },
    ];
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
