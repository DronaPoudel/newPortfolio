import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Calendar, MapPin, Download, ChevronRight } from "lucide-react";
import { 
  useProfile, 
  useExperience, 
  useSkills, 
  useProjects, 
  useEducation 
} from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: experience, isLoading: isExperienceLoading } = useExperience();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();
  const { data: projects, isLoading: isProjectsLoading } = useProjects();
  const { data: education, isLoading: isEducationLoading } = useEducation();

  if (isProfileLoading || isExperienceLoading || isSkillsLoading || isProjectsLoading || isEducationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white/50 font-mono text-sm animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Navigation />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight"
            >
              I build <span className="text-gradient">digital experiences</span> that matter.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {profile?.summary}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                Contact Me <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-12 flex justify-center gap-6"
            >
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              <a href={`mailto:${profile?.email}`} className="text-muted-foreground hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT / PROFILE */}
      <section id="about" className="py-24 relative">
        <div className="container px-4">
          <SectionHeader title="About Me" subtitle="Frontend Engineer & UI Enthusiast" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-white/5"
            >
              {/* Using a placeholder if no image URL in profile yet, or add later */}
              {/* Descriptive comment for Unsplash image */}
              {/* dark tech workspace abstract minimalist */}
              <img 
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
                alt="Workspace" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-bold text-white">
                {profile?.title} based in {profile?.location}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {profile?.summary}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-3xl font-bold text-white mb-1">3+</h4>
                  <p className="text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-3xl font-bold text-white mb-1">10+</h4>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
              </div>

              <div className="pt-6">
                <Button className="rounded-full h-12 px-8 bg-white text-black font-bold hover:bg-white/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 bg-white/[0.02]">
        <div className="container px-4">
          <SectionHeader title="Experience" subtitle="My Professional Journey" />

          <div className="max-w-3xl mx-auto space-y-8">
            {experience?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline line for desktop */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
                
                <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Date (shows on one side) */}
                  <div className={`hidden md:block w-1/2 text-${index % 2 === 0 ? "left" : "right"}`}>
                    <span className="text-sm font-mono text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-background -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                  {/* Content Card */}
                  <div className="md:w-1/2">
                    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                      <div className="md:hidden mb-4">
                        <span className="text-xs font-mono text-white/60 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                          {exp.startDate} — {exp.endDate || "Present"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <h4 className="text-lg text-white/70 mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {exp.company}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24">
        <div className="container px-4">
          <SectionHeader title="Skills" subtitle="Technologies & Tools" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((skillGroup, index) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border-t border-t-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-white/[0.02]">
        <div className="container px-4">
          <SectionHeader title="Portfolio" subtitle="Featured Projects" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass-card hover:bg-white/5 transition-all duration-500"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-white/60 bg-white/5 px-2 py-1 rounded border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-24">
        <div className="container px-4">
          <SectionHeader title="Education" subtitle="Academic Background" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl flex flex-col justify-center text-center hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{edu.institution}</h3>
                <p className="text-lg text-blue-300 mb-2">{edu.degree}</p>
                <span className="text-sm font-mono text-muted-foreground px-3 py-1 rounded-full bg-white/5 inline-block mx-auto">
                  {edu.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
        <div className="container px-4 relative z-10">
          <SectionHeader title="Contact" subtitle="Get In Touch" />
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-display font-bold text-white">
                Let's work together
              </h3>
              <p className="text-muted-foreground text-lg">
                I'm currently available for freelance projects and full-time roles. 
                If you're interested in working together, please don't hesitate to get in touch.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${profile?.email}`} className="text-lg font-medium hover:text-white transition-colors">
                      {profile?.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-medium">{profile?.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  {profile?.github && (
                    <a 
                      href={profile.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a 
                      href={profile.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Drona Poudel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
