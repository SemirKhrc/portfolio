import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const btnSpring = { type: "spring", stiffness: 450, damping: 22 } as const;

const contactLinks = [
  { href: "mailto:sem.kahrimanovic@gmail.com", icon: Mail, label: "Invia un'email" },
  { href: "https://github.com/SemirKhrc", icon: Github, label: "Profilo GitHub" },
  { href: "https://www.linkedin.com/in/semir-kahrimanovic-647537184/", icon: Linkedin, label: "Profilo LinkedIn" },
];

const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-content", {
        opacity: 0,
        scale: 0.88,
        y: 40,
        duration: 0.85,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 88%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-label="Sezione contatti"
      className="py-24 border-t border-border/50"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="contact-content">
          <h2 className="text-3xl font-bold mb-4">
            Resta In <span className="text-gradient">Contatto</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Cerco un'opportunità entry-level in ambito SOC o cybersecurity.
            Se hai un'opportunità entry-level o vuoi conoscermi meglio, contattami.
          </p>

          <div className="flex justify-center gap-6">
            {contactLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                /* min 44×44px touch target enforced via p-3 on h-6 w-6 icon = ~48px total */
                className="glass-card p-3 hover:border-primary/40 transition-colors group
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                whileHover={{ scale: 1.14, y: -6 }}
                whileTap={{ scale: 0.93 }}
                transition={btnSpring}
              >
                <Icon
                  className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </div>

          <p className="mt-16 text-xs text-muted-foreground">
            © 2026 Semir. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
