"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { MessageCircle, Image, Settings, CloudSun, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const DOCK_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/photos", icon: Image, label: "Photos" },
  { href: "/weather", icon: CloudSun, label: "Weather" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-6 rounded-3xl bg-neutral-900/80 px-6 pb-3 backdrop-blur-2xl border border-white/10 shadow-2xl"
    >
      {DOCK_ITEMS.map((item) => (
        <DockItem key={item.href} item={item} mouseX={mouseX} />
      ))}
    </nav>
  );
}

function DockItem({ item, mouseX }: { item: typeof DOCK_ITEMS[0]; mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth magnification logic
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const ySync = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href} className="relative">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: "-50%" }}
            animate={{ opacity: 1, y: -55, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            // Increased text size to text-sm (14px) and added font-medium
            className="absolute left-1/2 -top-3 px-3 py-1.5 rounded-lg bg-neutral-800/90 border border-white/10 text-white text-sm font-medium whitespace-nowrap pointer-events-none shadow-xl backdrop-blur-md"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        <motion.div
          style={{ scale, y }}
          className={cn(
            "absolute bottom-0 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 origin-bottom",
            isActive
              ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              : "text-neutral-400 hover:text-white"
          )}
        >
          <item.icon className="w-8 h-8" strokeWidth={1.5} />

          {isActive && (
            <motion.div
              layoutId="active-dot"
              className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
            />
          )}
        </motion.div>
      </div>
    </Link>
  );
}