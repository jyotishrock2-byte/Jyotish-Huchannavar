import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface StorySectionProps {
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  alignment?: "left" | "right";
  className?: string;
  id?: string;
}

export function StorySection({
  title,
  subtitle,
  content,
  image,
  alignment = "left",
  className,
  id
}: StorySectionProps) {
  return (
    <section id={id} className={cn("min-h-screen flex items-center py-20 px-6 sm:px-12", className)}>
      <div className={cn(
        "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
        alignment === "right" && "lg:direction-rtl"
      )}>
        <motion.div
          initial={{ opacity: 0, x: alignment === "left" ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(alignment === "right" && "lg:order-2")}
        >
          {subtitle && (
            <span className="text-clay-500 font-mono text-sm tracking-widest uppercase block mb-4">
              {subtitle}
            </span>
          )}
          <h2 className="text-5xl sm:text-7xl font-serif font-medium leading-tight mb-8">
            {title}
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed max-w-xl whitespace-pre-line">
            {content}
          </p>
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-earth-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Artistic accents */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-clay-500 pointer-events-none" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
