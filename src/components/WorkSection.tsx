"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

// Projects data - using existing videos
const projects = [
  {
    id: 1,
    title: "Urban Dreams",
    category: "Short Film",
    video: "/videos/vid 1.mov",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Cinematic",
    video: "/videos/vid 2.mov",
  },
  {
    id: 3,
    title: "Motion & Rhythm",
    category: "Instagram Reel",
    video: "/videos/vid 3.mov",
  },
  {
    id: 4,
    title: "Silent Voices",
    category: "Short Film",
    video: "/videos/vid 4.mov",
  },
];

const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track which card is active based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section id="work" className="relative bg-background">
      {/* Section Header */}
      <div className="container-narrow py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="heading-section mt-4 mb-6">
            Selected <span className="text-accent-italic">works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my best video projects, from short films to viral
            reels. Each piece represents my growth as a visual storyteller.
          </p>
        </motion.div>
      </div>

      {/* Scroll-Driven Cards Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-6xl relative">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  isActive,
  scrollYProgress,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause video based on active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  // Calculate card-specific animations
  const cardStart = index / projects.length;
  const cardEnd = (index + 1) / projects.length;

  const y = useTransform(
    scrollYProgress,
    [cardStart - 0.1, cardStart, cardEnd, cardEnd + 0.1],
    [100, 0, 0, -100]
  );

  const scale = useTransform(
    scrollYProgress,
    [cardStart - 0.1, cardStart, cardEnd, cardEnd + 0.1],
    [0.9, 1, 1, 0.95]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        y,
        scale,
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : 0,
        pointerEvents: isActive ? "auto" : "none",
      }}
      animate={{
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-elevated">
        {/* Video Background */}
        <video
          ref={videoRef}
          src={project.video}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category Badge */}
        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-2 rounded-full">
            {project.category}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4">
            {project.title}
          </h3>
          <Button
            size="lg"
            variant="outline"
            className="group border-white/50 text-white hover:bg-white hover:text-black"
          >
            <Play className="w-4 h-4 mr-2 fill-current" />
            Play Project
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkSection;
