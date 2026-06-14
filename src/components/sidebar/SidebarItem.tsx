"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  label: string;
  href: string;
  iconPath: string;
};

// Converts black SVG icons to #FF6B00 orange
const ORANGE_FILTER =
  "brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(620%) hue-rotate(3deg) brightness(110%) contrast(108%)";

export default function SidebarItem({ label, href, iconPath }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`
        flex items-center rounded-xl py-2.5
        px-[15px] group-hover/sidebar:px-3
        transition-all duration-300
        ${isActive ? "bg-white shadow-sm" : "hover:bg-white/60"}
      `}
    >
      <Image
        src={iconPath}
        alt={label}
        width={18}
        height={18}
        className="flex-shrink-0"
        style={isActive ? { filter: ORANGE_FILTER } : undefined}
      />
      <span
        className={`
          overflow-hidden whitespace-nowrap text-sm font-medium
          max-w-0 group-hover/sidebar:max-w-[160px]
          opacity-0 group-hover/sidebar:opacity-100
          ml-0 group-hover/sidebar:ml-3
          transition-all duration-300
          ${isActive ? "text-orange-500" : "text-gray-600"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
