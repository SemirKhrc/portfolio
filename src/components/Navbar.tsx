import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Progetti", href: "#projects", section: "projects" },
  { label: "Esperienza", href: "#experience", section: "experience" },
  { label: "Contatti", href: "#contact", section: "contact" },
];

/* ─── Liquid glass style tokens ─── */
const glassStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(14,10,8,0.72) 100%)",
  backdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
  WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow:
    "0 4px 40px rgba(0,0,0,0.55), " +
    "inset 0 1px 0 rgba(255,255,255,0.18), " +
    "inset 0 -1px 0 rgba(0,0,0,0.25), " +
    "0 0 0 0.5px rgba(255,255,255,0.06)",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section);
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    /* Outer wrapper — positions the floating bar */
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      <nav
        className="w-full max-w-3xl"
        aria-label="Navigazione principale"
      >
        {/* ── Main bar ── */}
        <motion.div
          className="relative rounded-2xl flex items-center justify-between px-5 py-3"
          style={glassStyle}
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Specular top-edge highlight — simulates glass light refraction */}
          <div
            className="absolute top-0 left-8 right-8 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.38) 30%, rgba(255,255,255,0.38) 70%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          {/* Subtle bottom inner shadow */}
          <div
            className="absolute bottom-0 left-12 right-12 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.3) 60%, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-[1.05rem] font-bold shrink-0
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            aria-label="Torna alla home"
          >
            <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>
              Il Mio<span className="text-primary">Portfolio</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  ${active === link.section
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/80"
                  }`}
              >
                {/* Animated glass pill on active link */}
                {active === link.section && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {/* Orange underline on active */}
                {active === link.section && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Contattami CTA — desktop only */}
          <motion.a
            href="mailto:sem.kahrimanovic@gmail.com"
            aria-label="Contattami via email"
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-background
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ background: "hsl(25 95% 53%)" }}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          >
            Contattami
          </motion.a>

          {/* Hamburger — min 44×44px touch target */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl
              text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* ── Mobile dropdown — separate glass card below ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              role="navigation"
              aria-label="Menu mobile"
              className="mt-2 rounded-2xl overflow-hidden"
              style={glassStyle}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-colors
                    ${active === link.section
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }
                    focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.18 }}
                >
                  {link.label}
                  {active === link.section && (
                    <span className="ml-2 text-primary text-xs">●</span>
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
