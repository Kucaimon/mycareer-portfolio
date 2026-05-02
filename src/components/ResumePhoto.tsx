import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Resume } from "@/types/content";

const sizeClass = {
  sm: "h-12 w-12",
  md: "h-[4.5rem] w-[4.5rem]",
  lg: "h-28 w-28 sm:h-32 sm:w-32",
} as const;

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = (parts[1]?.[0] ?? parts[0]?.[1] ?? "").toString();
  return (a + b).toUpperCase();
}

export function ResumePhoto({
  resume,
  size = "md",
  className,
}: {
  resume: Resume;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  const label = resume.name;

  if (resume.photoSrc) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100",
          sizeClass[size],
          className,
        )}
      >
        <Image
          src={resume.photoSrc}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 7rem, 8rem"
          unoptimized
        />
      </div>
    );
  }

  const initials = initialsFromName(resume.name);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-semibold text-gray-600",
        sizeClass[size],
        size === "lg" && "text-2xl sm:text-3xl",
        size === "md" && "text-lg",
        className,
      )}
    >
      <span className="select-none" aria-hidden>
        {initials}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
