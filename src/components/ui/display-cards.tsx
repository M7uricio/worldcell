"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

/**
 * 21st.dev — @Codehagen/display-cards.
 * Same API and stacking behaviour as the original; the default palette is
 * retargeted from shadcn's blue/muted tokens to the World Cell navy + gold.
 */

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-gold-200" />,
  title = "Destaque",
  description = "Conheça o diferencial",
  date = "Agora",
  titleClassName = "text-gold-300",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-64 -skew-y-[8deg] flex-col justify-between rounded-xl border-2 border-white/10 bg-navy-800/70 px-4 py-3 backdrop-blur-sm transition-all duration-700 select-none sm:w-[22rem]",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-52 after:bg-linear-to-l after:from-navy-950 after:to-transparent after:content-[''] sm:after:w-[20rem]",
        "hover:border-gold-300/40 hover:bg-navy-700/80",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-navy-600 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="text-lg whitespace-nowrap text-white">{description}</p>
      <p className="text-sm text-navy-300">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-navy-950/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-10 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-navy-950/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-20 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid place-items-center opacity-100 duration-700 [grid-template-areas:'stack']">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
