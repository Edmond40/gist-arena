import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

   // Utility for combining class names
   export function cn(...classes: (string | undefined | false | null)[]) {
    return classes.filter(Boolean).join(' ');
  }
