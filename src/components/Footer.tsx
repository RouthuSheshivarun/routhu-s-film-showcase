import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, Film } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/seacrab_studio/", external: true },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:placeholder@email.com" },
];

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      {/* Decorative top section */}
      <div className="relative py-12 overflow-hidden">
        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-1/4 bg-card/10 rounded-xl p-3"
        >
          <Instagram className="w-5 h-5 text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 right-1/3 bg-card/10 rounded-xl p-3"
        >
          <Youtube className="w-5 h-5 text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-6 right-1/4 bg-card/10 rounded-xl p-3"
        >
          <Film className="w-5 h-5 text-primary" />
        </motion.div>

        {/* Decorative arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
          viewBox="0 0 1200 200"
          fill="none"
        >
          <path
            d="M0 150 Q 600 50 1200 120"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="container-narrow">
        <div className="py-12 border-t border-footer-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Logo & Name */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Film className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-xl font-bold">Routhu Rahul</span>
              </div>
              <p className="text-sm text-footer-foreground/70">
                Filmmaker & Video Creator
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "About", "Work", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm text-footer-foreground/70 hover:text-footer-foreground transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                    aria-label={social.label}
                    {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-footer-foreground/10">
          <p className="text-center text-sm text-footer-foreground/50">
            © {new Date().getFullYear()} Routhu Rahul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
