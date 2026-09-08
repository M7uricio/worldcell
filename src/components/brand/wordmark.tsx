import Image from "next/image";

import { cn } from "@/lib/utils";
import logo from "../../../public/logo.png";

/**
 * The store's real logo: a circular gold-ring badge with its own white disc
 * background (the "CELL" wordmark and taglines are near-black, so they need
 * that light backing to stay readable — keeping the disc, rather than
 * knocking it out to transparent, is what makes this work on the navy
 * header/footer instead of just vanishing).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="World Cell"
      priority
      className={cn("h-9 w-9 rounded-full", className)}
    />
  );
}
