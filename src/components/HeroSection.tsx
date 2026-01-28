import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";

// Video files array - maps over all videos in /public/videos
const videos = [
  "/videos/vid 1.mov",
  "/videos/vid 2.mov",
  "/videos/vid 3.mov",
  "/videos/vid 4.mov",
];

const FloatingIcon = ({
  icon: Icon,
  className,
  delay = 0,
}: {
  icon: React.ElementType;
  className: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute bg-card rounded-2xl p-3 md:p-4 shadow-card z-40 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
    </motion.div>
  </motion.div>
);

// Video item component for scrolling rows - seamless loop
const VideoItem = ({ src }: { src: string }) => (
  <div className="relative flex-shrink-0 w-48 h-28 md:w-64 md:h-36 lg:w-80 lg:h-44 rounded-xl overflow-hidden">
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay for video visibility control */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-[5]" />

      {/* Top scrolling video row */}
      <div className="absolute top-16 left-0 right-0 z-50 opacity-100">
        <ScrollVelocity velocity={3} className="py-2">
          {videos.map((video, index) => (
            <VideoItem key={`top-${index}`} src={video} />
          ))}
        </ScrollVelocity>
      </div>

      {/* Bottom scrolling video row */}
      <div className="absolute bottom-0 left-0 right-0 z-50 opacity-100">
        <ScrollVelocity velocity={-3} className="py-2">
          {videos.map((video, index) => (
            <VideoItem key={`bottom-${index}`} src={video} />
          ))}
        </ScrollVelocity>
      </div>

      {/* Social icons - positioned near hero content for visibility */}
      <FloatingIcon
        icon={Instagram}
        className="top-1/2 -translate-y-1/2 left-[5%] md:left-[8%] lg:left-[12%]"
        delay={0.2}
      />
      <FloatingIcon
        icon={Play}
        className="top-1/2 -translate-y-1/2 right-[5%] md:right-[8%] lg:right-[12%]"
        delay={0.4}
      />

      {/* Decorative arc line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-[6]"
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

      {/* Hero content - centered and above all background elements */}
      <div className="container-narrow relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
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
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Hi, I'm Routhu Rahul — a passionate filmmaker and video creator
            specializing in short films, cinematic shoots, and viral reels.
          </motion.p>

          {/* CTA Buttons - directly below text, centered */}
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[7]" />
    </section>
  );
};

export default HeroSection;
