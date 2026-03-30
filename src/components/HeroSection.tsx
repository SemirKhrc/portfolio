import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import profileImg from "@/assets/profile.png";

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero-heading", {
        opacity: 0,
        y: 55,
        duration: 0.9,
        ease: "power4.out",
      });

      tl.from(
        ".hero-ring-wrap",
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.85,
          ease: "back.out(1.8)",
        },
        "-=0.5"
      );

      tl.from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.35"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      aria-label="Sezione presentazione"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Radial glow background — preserved */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div id="main-content" className="container mx-auto px-6 flex flex-col items-center text-center">

        {/* Heading — lower z-index so image overlaps it */}
        <h1 className="hero-heading relative z-10 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Piacere, sono <span className="text-gradient">Semir</span>
        </h1>

        {/*
          Image — higher z-index (z-20) + negative margin-top pulls it up
          to overlap the heading, creating the "text passes behind head" effect.
          The head (top of the circle) appears in front of the text.
        */}
        <div className="hero-ring-wrap relative z-20 -mt-8 sm:-mt-10 md:-mt-14 flex justify-center">
          {/* Pulsing orange ring — decorative */}
          <div
            className="absolute rounded-full border-4 border-primary/60 animate-pulse-glow"
            style={{ inset: "-20px" }}
            aria-hidden="true"
          />
          {/* Profile image — slightly larger than before */}
          <div className="relative w-80 h-80 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden border-2 border-primary/30">
            <img
              src={profileImg}
              alt="Foto di Semir, professionista in cybersecurity"
              className="w-full h-full object-cover object-top"
              width={352}
              height={352}
              fetchPriority="high"
            />
          </div>
        </div>

        <p className="hero-subtitle relative z-10 text-muted-foreground text-lg max-w-md leading-relaxed mt-10">
          Aspirante SOC Analyst con focus su analisi delle minacce,
          SIEM e difesa delle infrastrutture IT.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
