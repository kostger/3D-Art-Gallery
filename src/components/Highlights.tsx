import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HighlightProps {
  title: string;
  description: string;
  date: string;
  imagePlaceholder: string;
  label: string;
}

const HighlightItem: React.FC<HighlightProps> = ({
  title,
  description,
  date,
  imagePlaceholder,
  label,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement) {
      const handleMouseEnter = () => {
        gsap.to(imgElement, {
          scale: 1.02,
          duration: 0.5,
          ease: "power1.inOut",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imgElement, { scale: 1, duration: 0.5, ease: "power1.inOut" });
      };

      imgElement.addEventListener("mouseenter", handleMouseEnter);
      imgElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        imgElement.removeEventListener("mouseenter", handleMouseEnter);
        imgElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full">
        <div className="relative">
          <img
            ref={imgRef}
            src={imagePlaceholder}
            alt={title}
            className="w-full h-auto object-cover"
          />
          <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-sm font-bold rounded">
            {label}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <h3 className="text-2xl mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <p className="text-sm font-medium">{date}</p>
      </div>
    </div>
  );
};

const Highlights: React.FC = () => {
  const highlightsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    highlightsRef.current.forEach((highlight) => {
      gsap.fromTo(
        highlight,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: highlight,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const highlightsData = [
    [
      {
        title: "Figures of the Fool.",
        description:
          "From the Middle Ages to the Romantics. From 16 October 2024 to 3 February 2025",
        date: "16 October 2024 – 3 February 2025",
        imagePlaceholder: "/assets/maitre.jpeg",
        label: "Exhibition",
      },
      {
        title: "Masterpieces from the Torlonia Collection",
        description:
          "The largest ever private collection of ancient Roman sculptures, being shown for the first time in a series of special exhibitions.",
        date: "26 June 2025 – 6 January 2025",
        imagePlaceholder: "/assets/hestia.png",
        label: "Exhibition",
      },
    ],
    [
      {
        title: "The Met au Louvre",
        description:
          "Near Eastern Antiquities in Dialogue. From 29 February 2024 to 28 September 2025",
        date: "29 February 2024 – 28 September 2025",
        imagePlaceholder: "/assets/tete.png",
        label: "Exhibition",
      },
      {
        title: "Barbara Chase-Riboud",
        description:
          "Quand Un Nœud Est Dénoué, Un Dieu Est Libéré, a solo exhibition featuring works by Barbara Chase-Riboud.",
        date: "9 October 2024 – 6 January 2025",
        imagePlaceholder: "/assets/barbara.png",
        label: "Exhibition",
      },
      {
        title: "The Louvre’s Masterpieces",
        description:
          "What exactly is a masterpiece? Follow this trail to find out!",
        date: "Ongoing",
        imagePlaceholder: "/assets/mona_lisa.png",
        label: "Visitor Trails",
      },
    ],
  ];

  return (
    <section className="bg-white py-8 px-4 lg:py-16 lg:px-16">
      <h2
        ref={titleRef}
        className="text-4xl lg:text-8xl text-left mb-8 lg:mb-12"
      >
        Highlights
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {highlightsData.map((highlightGroup, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 ${
              highlightGroup.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            } gap-8`}
          >
            {highlightGroup.map((item, subIndex) => (
              <div
                key={subIndex}
                ref={(el) => {
                  if (el) {
                    highlightsRef.current[
                      index * highlightGroup.length + subIndex
                    ] = el;
                  }
                }}
              >
                <HighlightItem
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  imagePlaceholder={item.imagePlaceholder}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
