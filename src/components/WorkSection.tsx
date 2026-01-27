import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  type: "Short Film" | "Instagram Reel" | "Cinematic";
  videoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Urban Dreams",
    description: "A cinematic exploration of city life and the stories hidden in everyday moments.",
    type: "Short Film",
  },
  {
    id: 2,
    title: "Golden Hour",
    description: "Capturing the magic of sunset in a visual poetry piece.",
    type: "Cinematic",
  },
  {
    id: 3,
    title: "Motion & Rhythm",
    description: "Fast-paced reel showcasing dynamic transitions and creative editing.",
    type: "Instagram Reel",
  },
  {
    id: 4,
    title: "Silent Voices",
    description: "A short documentary exploring untold stories from local communities.",
    type: "Short Film",
  },
  {
    id: 5,
    title: "Neon Nights",
    description: "Vibrant night cinematography featuring urban landscapes.",
    type: "Cinematic",
  },
  {
    id: 6,
    title: "Quick Cuts",
    description: "High-energy reel with seamless transitions and sound design.",
    type: "Instagram Reel",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-elevated overflow-hidden">
        {/* Video placeholder */}
        <div className="relative aspect-video bg-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-elevated group-hover:bg-primary/90 transition-colors"
            >
              <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
            </motion.button>
          </div>
          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full">
              {project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground font-serif group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {project.description}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="heading-section mt-4 mb-6">
            Selected <span className="text-accent-italic">works</span>
          </h2>
          <p className="text-muted-foreground">
            A collection of my best video projects, from short films to viral reels. 
            Each piece represents my growth as a visual storyteller.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
