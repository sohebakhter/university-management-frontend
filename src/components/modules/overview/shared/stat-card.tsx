"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "success" | "warning" | "destructive" | "neutral";
  };
  gradient?: "indigo" | "emerald" | "amber" | "violet" | "rose" | "sky";
  className?: string;
}

const GRADIENT_STYLES = {
  indigo:
    "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 text-indigo-500",
  emerald:
    "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 text-emerald-500",
  amber:
    "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 text-amber-500",
  violet:
    "from-violet-500/10 via-violet-500/5 to-transparent border-violet-500/20 text-violet-500",
  rose:
    "from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 text-rose-500",
  sky: "from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 text-sky-500",
};

const ICON_BG_STYLES = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
};

const BADGE_STYLES = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  destructive: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  gradient = "indigo",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-linear-to-br transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        GRADIENT_STYLES[gradient],
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </h3>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-xs transition-transform duration-300 group-hover:scale-105",
              ICON_BG_STYLES[gradient]
            )}
          >
            {icon}
          </div>
        </div>

        {(subtitle || badge) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 border-t border-border/40">
            {badge && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                  BADGE_STYLES[badge.variant || "default"]
                )}
              >
                {badge.text}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-muted-foreground">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;
