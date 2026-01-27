import { motion } from "framer-motion";
import { ArrowRight, Play, Film, Instagram, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  className: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute bg-card rounded-2xl p-3 md:p-4 shadow-card ${className}`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative floating icons */}
      <FloatingIcon icon={Film} className="top-32 left-[10%] hidden md:block" delay={0.2} />
      <FloatingIcon icon={Instagram} className="top-40 right-[12%] hidden md:block" delay={0.4} />
      <FloatingIcon icon={Video} className="bottom-40 left-[15%] hidden md:block" delay={0.6} />
      <FloatingIcon icon={Play} className="bottom-32 right-[18%] hidden md:block" delay={0.8} />

      {/* Decorative arc line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M200 600 Q 600 100 1000 500"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          strokeDasharray="8 8"
        />
      </svg>

      <div className="container-narrow relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 mb-8 shadow-soft"
          >
            <span className="text-primary">✦</span>
            <span className="text-sm font-medium text-foreground">Film Academy Student</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display mb-6"
          >
            Crafting stories through{" "}
            <span className="text-accent-italic">cinematic visuals</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Hi, I'm Routhu Rahul — a passionate filmmaker and video creator 
            specializing in short films, cinematic shoots, and viral reels.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="group">
              View My Work
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
