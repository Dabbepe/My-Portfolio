"use client";;
import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpotlightNavbar({
    items = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "Sponsors", href: "#sponsors" },
        { label: "Pricing", href: "#pricing" },
    ],

    className,
    onItemClick,
    defaultActiveIndex = 0,
    onMobileMenuClick
}) {
    const navRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState(null);
    const [isDark, setIsDark] = useState(false);

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            // Direct update for immediate feedback (no spring for the mouse itself, feels snappier)
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            // When mouse leaves, spring the spotlight back to the active item
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex]);

    // Handle the "Ambience" (Active Item) Movement
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            animate(ambienceX.current, targetX, {
                type: "spring",
                stiffness: 200,
                damping: 20,
                onUpdate: (v) => {
                    ambienceX.current = v;
                    nav.style.setProperty("--ambience-x", `${v}px`);
                },
            });
        }
    }, [activeIndex]);

    const handleItemClick = (item, index) => {
        setActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center pt-10", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "relative h-11 rounded-full transition-all duration-300 overflow-hidden"
                )}>
                {/* Content */}
                <ul className="nav-links relative flex items-center justify-evenly w-full h-full px-2 gap-0 z-[10]">
                    {items.map((item, idx) => (
                        <li key={idx} className="relative h-full flex-1 flex items-center justify-center">
                            <a
                                href={item.href}
                                data-index={idx}
                                onClick={(e) => {
                                    handleItemClick(item, idx);
                                    if(item.href.startsWith('#')) {
                                        e.preventDefault();
                                        const el = document.querySelector(item.href);
                                        if(el) {
                                            el.scrollIntoView({behavior: 'smooth'});
                                        }
                                    }
                                }}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                                    // Active vs Inactive Text
                                    activeIndex === idx
                                        ? "text-white font-medium drop-shadow-md"
                                        : "text-white/70 hover:text-white hover:font-medium"
                                )}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-btn z-[10]" onClick={onMobileMenuClick}>
                    ☰
                </div>

                {/* LIGHTING LAYERS 
           We use CSS variables --spotlight-x and --ambience-x updated by JS
        */}

                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(0,0,0,0.1)) 0%, 
                transparent 50%
              )
            `
                    }} />

                {/* 2. The Active State Ambience (Stays on Active) */}
                <div
                    className="pointer-events-none absolute top-0 left-0 w-full h-full z-[2]"
                    style={{
                        background: `
                  radial-gradient(
                    80px circle at var(--ambience-x) 50%, 
                    var(--ambience-color, rgba(0,229,255,0.4)) 0%, 
                    transparent 100%
                  )
                `
                    }} />

            </nav>
            {/* STYLE BLOCK for Dynamic Colors 
        This allows us to switch the gradient colors cleanly using Tailwind classes 
        without messy inline conditionals.
      */}
            <style>{`
        nav {
          --spotlight-color: rgba(255,255,255,0.15);
          --ambience-color: rgba(0, 229, 255, 0.4);
        }
      `}</style>
        </div>
    );
}
