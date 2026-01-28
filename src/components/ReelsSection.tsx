import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

// Video thumbnail images for the infinite scroll - using cinematic Unsplash images
const reelThumbnails = [
    {
        id: 1,
        thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop",
        title: "Golden Light",
    },
    {
        id: 2,
        thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
        title: "Nature's Call",
    },
    {
        id: 3,
        thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop",
        title: "Ocean Vibes",
    },
    {
        id: 4,
        thumbnail: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop",
        title: "Desert Dreams",
    },
    {
        id: 5,
        thumbnail: "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop",
        title: "Urban Flow",
    },
    {
        id: 6,
        thumbnail: "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop",
        title: "City Lights",
    },
    {
        id: 7,
        thumbnail: "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop",
        title: "Morning Mist",
    },
    {
        id: 8,
        thumbnail: "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop",
        title: "Coastal Escape",
    },
];

// Duplicate for seamless infinite loop
const duplicatedReels = [...reelThumbnails, ...reelThumbnails];

interface ReelCardProps {
    reel: typeof reelThumbnails[0];
    index: number;
}

const ReelCard = ({ reel, index }: ReelCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="reel-item flex-shrink-0 w-48 md:w-56 lg:w-64 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            {/* Play button overlay */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
                <motion.div
                    initial={false}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                </motion.div>
            </div>
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium">{reel.title}</p>
            </div>
        </div>
    );
};

const ReelsSection = () => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

    return (
        <section className="py-16 md:py-24 bg-foreground overflow-hidden">
            {/* Section Header */}
            <div className="container-narrow">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        Instagram Reels
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mt-4 mb-6 text-background">
                        Short-form <span className="italic text-primary">stories</span>
                    </h2>
                    <p className="text-background/70">
                        Quick, engaging content crafted for the social media generation.
                        Each reel tells a story in seconds.
                    </p>
                </motion.div>
            </div>

            {/* Infinite scroll container */}
            <div className="relative">
                {/* CSS for animations */}
                <style>{`
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .infinite-scroll-reels {
            animation: scroll-right 30s linear infinite;
          }

          .infinite-scroll-reels:hover {
            animation-play-state: paused;
          }

          .scroll-container-reels {
            mask: linear-gradient(
              90deg,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
            -webkit-mask: linear-gradient(
              90deg,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
          }

          .reel-item {
            transition: transform 0.3s ease, filter 0.3s ease;
          }

          .reel-item:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
        `}</style>

                <div className="scroll-container-reels w-full py-8">
                    <div className="infinite-scroll-reels flex gap-6 w-max">
                        {duplicatedReels.map((reel, index) => (
                            <ReelCard key={`${reel.id}-${index}`} reel={reel} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReelsSection;
