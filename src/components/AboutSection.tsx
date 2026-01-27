import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-secondary overflow-hidden relative">
              {/* Placeholder for portrait */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎬</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Portrait placeholder</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              About Me
            </span>
            <h2 className="heading-section mt-4 mb-6">
              Turning raw footage into{" "}
              <span className="text-accent-italic">visual stories</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a filmmaking student with a deep passion for visual storytelling. 
                From the first time I picked up a camera, I knew this was my calling — 
                capturing moments that evoke emotion and tell compelling stories.
              </p>
              <p>
                My work spans across short films, cinematic video shoots, and 
                engaging Instagram reels. I believe every frame should have purpose, 
                every cut should feel intentional, and every story should resonate 
                with its audience.
              </p>
              <p>
                Whether it's a dramatic narrative piece or a fast-paced social media 
                reel, I bring the same level of dedication and creative vision to 
                every project I undertake.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {[
                { number: "20+", label: "Projects" },
                { number: "50K+", label: "Views" },
                { number: "3+", label: "Years Exp." },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
