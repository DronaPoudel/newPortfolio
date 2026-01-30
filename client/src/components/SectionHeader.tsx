import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  alignment?: "left" | "center";
}

export function SectionHeader({ title, subtitle, alignment = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/5 border border-white/10 text-white/80"
      >
        {title}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-display font-bold text-white mb-4"
      >
        {subtitle}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`h-1 w-20 bg-gradient-to-r from-white to-transparent rounded-full ${
          alignment === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
