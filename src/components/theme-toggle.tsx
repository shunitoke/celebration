"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const active: ThemeMode = (theme as ThemeMode) ?? "system";
  const display = mounted ? resolvedTheme : "light";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white shadow-sm backdrop-blur",
        "dark:border-white/10 dark:bg-white/5",
        className,
      )}
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-1 transition",
          active === "light" && "bg-white/15",
        )}
        aria-pressed={active === "light"}
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-1 transition",
          active === "dark" && "bg-white/15",
        )}
        aria-pressed={active === "dark"}
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-1 transition",
          active === "system" && "bg-white/15",
        )}
        aria-pressed={active === "system"}
      >
        <Monitor className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Auto</span>
      </button>

      <span className="sr-only">Resolved theme: {display}</span>
    </div>
  );
}
