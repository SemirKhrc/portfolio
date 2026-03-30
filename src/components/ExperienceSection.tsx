import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experiences = [
  {
    company: "CompTIA Security+",
    period: "In corso",
    role: "Studio & Certificazione",
    side: "left" as const,
    current: true,
  },
  {
    company: "Italiaonline",
    period: "Gen 2026 – Mar 2026",
    role: "Digital Media Consultant",
    side: "right" as const,
    current: false,
  },
  {
    company: "GTN | we connect retail",
    period: "Gen 2024 – Gen 2026",
    role: "Help Desk Specialist",
    side: "left" as const,
    current: false,
  },
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-heading", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".exp-heading", start: "top 88%" },
      });

      gsap.from(".exp-slide-left", {
        opacity: 0,
        x: -60,
        duration: 0.65,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
      });

      gsap.from(".exp-slide-right", {
        opacity: 0,
        x: 60,
        duration: 0.65,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
      });

      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".exp-timeline", start: "top 80%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      aria-label="Sezione esperienza lavorativa"
      className="py-24"
    >
      <div className="container mx-auto px-6">
        <h2 className="exp-heading text-3xl font-bold text-center mb-16">
          La Mia{" "}
          <span className="text-gradient">Esperienza Lavorativa</span>
        </h2>

        <div className="exp-timeline relative max-w-2xl mx-auto" role="list" aria-label="Cronologia esperienze lavorative">
          {/* Vertical timeline line */}
          <div
            className="exp-line absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="relative flex items-center" role="listitem">
                {/* Pulsing dot — Framer Motion */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                  aria-hidden="true"
                >
                  <motion.div
                    className="absolute rounded-full bg-primary/40"
                    style={{ width: 12, height: 12 }}
                    animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.35,
                    }}
                  />
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Content block */}
                <div
                  className={`w-[calc(50%-24px)] ${
                    exp.side === "left"
                      ? "exp-slide-left pr-4 text-right"
                      : "exp-slide-right ml-auto pl-4"
                  }`}
                >
                  <h3 className="font-bold text-sm">{exp.company}</h3>
                  <p className="text-xs text-muted-foreground">{exp.period}</p>
                  <p className="text-sm text-primary mt-1">{exp.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
