import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    img: project1,
    title: "AI-Driven SOC Analyst Lab",
    tag: "AI & Automazione SOC",
    tagBg: "hsl(270 70% 18% / 0.9)",
    tagColor: "hsl(270 80% 75%)",
    highlight: false,
    url: "https://github.com/SemirKhrc/AI-Driven-SOC-Analyst-Home-Lab",
  },
  {
    img: project2,
    title: "Active Directory Home Lab",
    tag: "SIEM & Active Directory",
    tagBg: "hsl(25 80% 18% / 0.9)",
    tagColor: "hsl(25 95% 65%)",
    highlight: true,
    url: "https://github.com/SemirKhrc/Active-Directory-Home-Lab",
  },
  {
    img: project3,
    title: "pfSense Firewall Lab",
    tag: "Firewall & Network",
    tagBg: "hsl(0 60% 18% / 0.9)",
    tagColor: "hsl(0 70% 68%)",
    highlight: false,
    url: "https://github.com/SemirKhrc/pfSense-Firewall-Home-Lab",
  },
  {
    img: project4,
    title: "Rete Cisco Multi-Piano",
    tag: "Rete & Infrastruttura",
    tagBg: "hsl(210 70% 18% / 0.9)",
    tagColor: "hsl(210 80% 72%)",
    highlight: false,
    url: "https://github.com/SemirKhrc/Vic-Modern-Hotel-Progetto-di-Rete",
  },
];

const cardSpring = { type: "spring", stiffness: 380, damping: 22 } as const;
const btnSpring = { type: "spring", stiffness: 500, damping: 20 } as const;

const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".projects-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".projects-header", start: "top 88%" },
      });

      gsap.from(".project-card-gsap", {
        opacity: 0,
        y: 65,
        scale: 0.9,
        duration: 0.75,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-grid", start: "top 82%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Sezione progetti"
      className="py-16"
    >
      <div className="container mx-auto px-6">
        <div
          className="rounded-2xl border border-border/40 p-8 md:p-10"
          style={{ background: "hsl(20 10% 6% / 0.95)" }}
        >
          {/* Header */}
          <div className="projects-header flex items-start justify-between mb-10">
            <h2 className="text-2xl font-bold">
              I Miei <span className="text-gradient">Progetti</span>
            </h2>
            <div className="max-w-xs text-right hidden md:flex flex-col items-end gap-1">
              <span
                className="text-primary leading-none select-none"
                style={{ fontSize: "2.5rem", fontFamily: "Georgia, serif", lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </span>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Il mio portfolio presenta una gamma diversificata di progetti
                nel campo della cybersecurity e IT.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div
            className="projects-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            role="list"
            aria-label="Lista progetti"
          >
            {projects.map((p) => (
              <div
                key={p.title}
                className="project-card-gsap flex flex-col gap-3"
                role="listitem"
              >
                {/* Tag badge */}
                <span
                  className="self-start text-[11px] font-medium px-3 py-1 rounded-full"
                  style={{ background: p.tagBg, color: p.tagColor }}
                >
                  {p.tag}
                </span>

                {/* FM: card hover lift */}
                <motion.div
                  className="relative"
                  style={{ paddingBottom: "14px" }}
                  whileHover={{ y: -8 }}
                  transition={cardSpring}
                >
                  {/* Orange glow on highlighted card */}
                  {p.highlight && (
                    <div
                      className="absolute -inset-4 pointer-events-none blur-2xl rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 60%, hsl(25 95% 53% / 0.55) 0%, transparent 70%)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Back cards — fanned effect */}
                  <div
                    className="absolute inset-x-3 top-3 bottom-0 rounded-xl border border-border/30"
                    style={{
                      background: "hsl(20 10% 10%)",
                      transform: "rotate(-5deg)",
                      transformOrigin: "bottom center",
                      zIndex: 0,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-3 top-3 bottom-0 rounded-xl border border-border/30"
                    style={{
                      background: "hsl(20 10% 10%)",
                      transform: "rotate(5deg)",
                      transformOrigin: "bottom center",
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  />

                  {/* Main image — wrapped in link to GitHub repo */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative rounded-xl overflow-hidden border border-border/60 group block"
                    style={{ zIndex: 2 }}
                    aria-label={`Apri repository GitHub: ${p.title}`}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                      aria-hidden="true"
                    />

                    {/* FM: arrow button — opens GitHub */}
                    <motion.span
                      className="absolute bottom-3 right-3 w-11 h-11 rounded-full border border-primary/50 flex items-center justify-center
                        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                        transition-opacity transition-transform duration-300"
                      style={{ background: "hsl(25 95% 53% / 0.15)" }}
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.9 }}
                      transition={btnSpring}
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </motion.span>
                  </a>
                </motion.div>

                <p className="text-sm font-semibold text-foreground/90 leading-snug mt-1">
                  {p.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
