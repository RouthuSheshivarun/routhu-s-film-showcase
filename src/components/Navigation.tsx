"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#work" },
];

const Navigation = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => ({
        name: link.name,
        element: document.querySelector(link.href),
      }));

      const scrollPosition = window.scrollY + 200;

      // Track if scrolled for styling
      setIsScrolled(window.scrollY > 50);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveLink(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (name: string) => {
    setActiveLink(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-4"
    >
      {/* Main navbar container - centered pill shape */}
      <motion.div
        className="relative flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-2xl border border-white/10"
        animate={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          boxShadow: isScrolled
            ? "0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >

        {/* Profile Image */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
          <img
            src="/rahul.jpeg"
            alt="Rahul"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 px-2">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.name)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeLink === link.name
                ? "text-white"
                : "text-white/60 hover:text-white"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator - liquid glass effect */}
              {activeLink === link.name && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Contact Button */}
        <motion.a
          href="#contact"
          onClick={() => handleNavClick("Contact")}
          className="hidden md:flex items-center px-6 py-2 rounded-full bg-white text-black text-sm font-medium transition-all duration-300 hover:bg-white/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
          }}
        >
          Contact
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className={`relative px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${activeLink === link.name
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => handleNavClick("Contact")}
                className="mt-2 px-4 py-3 rounded-xl bg-white text-black text-center font-medium"
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
