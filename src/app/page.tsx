"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clapperboard,
  Gift,
  Link as LinkIcon,
  Mic2,
  MonitorSmartphone,
  Music,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { BeforeAfter } from "@/components/before-after";
import { Modal } from "@/components/modal";
import { Reveal } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type ExampleCategory = "День Рождения" | "Свадьба/Годовщина" | "Новый Год/Праздники" | "Секретный бонус";

type Example = {
  id: string;
  category: ExampleCategory;
  title: string;
  subtitle: string;
  badges: string[];
  previewStyle: "minimal" | "confetti" | "retro" | "romantic" | "gold" | "hearts" | "winter" | "corporate" | "cartoon" | "cringe";
  includesBeforeAfter?: boolean;
  includesAI?: boolean;
};

const examples: Example[] = [
  {
    id: "bday-min",
    category: "День Рождения",
    title: "Минималистичный элегантный",
    subtitle: "Плавные анимации + оживленное фото именинника",
    badges: ["✨ Ожившее фото", "🎨 Индивидуальный стиль", "📱 Адаптив"],
    previewStyle: "minimal",
    includesBeforeAfter: true,
  },
  {
    id: "bday-party",
    category: "День Рождения",
    title: "Яркий праздничный",
    subtitle: "Конфетти, шарики + AI-поздравление от ‘знаменитости’",
    badges: ["🎭 AI-голос", "🎉 Конфетти", "🎵 Музыка"],
    previewStyle: "confetti",
    includesAI: true,
  },
  {
    id: "bday-retro",
    category: "День Рождения",
    title: "Ретро / винтаж",
    subtitle: "Ностальгия + анимированная фотогалерея ‘ожившая память’",
    badges: ["✨ Ожившее фото", "🖼️ Галерея", "📼 Ретро"],
    previewStyle: "retro",
    includesBeforeAfter: true,
  },
  {
    id: "wed-rom",
    category: "Свадьба/Годовщина",
    title: "Романтичный (пастель + цветы)",
    subtitle: "Оживленные фото пары + нежные микродетали",
    badges: ["✨ Ожившее фото", "🌸 Пастель", "💍 История"],
    previewStyle: "romantic",
    includesBeforeAfter: true,
  },
  {
    id: "wed-gold",
    category: "Свадьба/Годовщина",
    title: "Современный минимализм (золото)",
    subtitle: "Чистая типографика + AI-поздравление от ‘звезды кино’",
    badges: ["🎭 AI-голос", "✨ Gold", "🖤 Minimal"],
    previewStyle: "gold",
    includesAI: true,
  },
  {
    id: "wed-hearts",
    category: "Свадьба/Годовщина",
    title: "Классика с сердечками",
    subtitle: "Анимированные сердечки + love story из оживленных фото",
    badges: ["✨ Ожившее фото", "💗 Сердечки", "🎞️ Love story"],
    previewStyle: "hearts",
    includesBeforeAfter: true,
  },
  {
    id: "ny-winter",
    category: "Новый Год/Праздники",
    title: "Зимняя сказка",
    subtitle: "Снегопад, огоньки + оживленное семейное фото",
    badges: ["✨ Ожившее фото", "❄️ Снег", "✨ Огоньки"],
    previewStyle: "winter",
    includesBeforeAfter: true,
  },
  {
    id: "ny-corp",
    category: "Новый Год/Праздники",
    title: "Корпоративный стиль",
    subtitle: "Фирменные цвета + AI-поздравление от ‘CEO’",
    badges: ["🎭 AI-голос", "🏢 Corporate", "🔗 Уникальная ссылка"],
    previewStyle: "corporate",
    includesAI: true,
  },
  {
    id: "ny-cartoon",
    category: "Новый Год/Праздники",
    title: "Веселый мультяшный",
    subtitle: "Персонажи + оживленные детские фотографии",
    badges: ["✨ Ожившее фото", "🧸 Мульт-стиль", "🎨 Ярко"],
    previewStyle: "cartoon",
    includesBeforeAfter: true,
  },
  {
    id: "bonus-cringe",
    category: "Секретный бонус",
    title: "С юбилеем (максимально кринжовый)",
    subtitle: "Глиттер, золото, красный текст и ‘эффект PowerPoint’",
    badges: ["😬 Кринж", "✨ Блестки", "💥 Эффекты"],
    previewStyle: "cringe",
  },
];

const categories: { title: ExampleCategory; description: string }[] = [
  { title: "День Рождения", description: "3 разных настроения: от элегантного до взрывного." },
  { title: "Свадьба/Годовщина", description: "Романтика, минимализм и классика — под вашу историю." },
  { title: "Новый Год/Праздники", description: "Снег, корпоратив, мультяшность — выбирайте вайб." },
  { title: "Секретный бонус", description: "Да, я могу. Но предупреждаю заранее." },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-100 backdrop-blur dark:border-white/10 dark:bg-white/5">
      {children}
    </span>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card)] shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DemoScene({ example }: { example: Example }) {
  const base =
    "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900";

  const title = (
    <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
      <div className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        {example.category}
      </div>
      <div className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        {example.title}
      </div>
    </div>
  );

  if (example.previewStyle === "minimal") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(168,85,247,0.28),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.22),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
        <motion.div
          className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-fuchsia-500/20"
          animate={{ x: [0, 18, 0], y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(22px)" }}
        />
        <motion.div
          className="absolute -bottom-16 right-0 h-60 w-60 rounded-full bg-cyan-400/20"
          animate={{ x: [0, -14, 0], y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(26px)" }}
        />
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="text-sm font-semibold text-white">С Днем Рождения!</div>
          <div className="mt-1 text-xs text-white/70">Плавные анимации, фото, музыка — всё по вашему вайбу.</div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "confetti") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,59,99,0.30),transparent_60%),radial-gradient(circle_at_70%_55%,rgba(255,214,0,0.26),transparent_55%),radial-gradient(circle_at_40%_90%,rgba(34,211,238,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.10),transparent)] [background-size:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
        <div className="absolute inset-0">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-sm"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `-10%`,
                background:
                  ["#22c55e", "#f97316", "#e879f9", "#60a5fa", "#fde047"][i % 5],
              }}
              animate={{ y: [0, 420], rotate: [0, 180] }}
              transition={{
                duration: 2.6 + (i % 6) * 0.18,
                repeat: Infinity,
                delay: (i % 7) * 0.08,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
        <div className="absolute left-6 bottom-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Mic2 className="h-4 w-4 text-yellow-300" />
            AI-поздравление от ‘знаменитости’
          </div>
          <div className="mt-1 text-xs text-white/70">Добавляем голос/видео и ‘магический’ эффект.</div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "retro") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.18),transparent_55%),radial-gradient(circle_at_20%_30%,rgba(244,63,94,0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute left-6 top-16 grid w-[70%] grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-[4/3] rounded-xl border border-white/10 bg-white/5"
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <div className="absolute right-6 bottom-6 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
          <div className="text-sm font-semibold text-white">Ожившая память</div>
          <div className="mt-1 text-xs text-white/70">Галерея с мягкими ретро-переходами.</div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "romantic") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(251,113,133,0.24),transparent_55%),radial-gradient(circle_at_70%_55%,rgba(196,181,253,0.24),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.10),transparent)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/60"
              style={{ left: `${(i * 29) % 100}%`, top: `${(i * 41) % 100}%` }}
              animate={{ y: [0, -8, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
        <div className="absolute left-6 bottom-6 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="text-sm font-semibold text-white">Свадьба / годовщина</div>
          <div className="mt-1 text-xs text-white/70">Пастель, цветы и много воздуха — без перегруза.</div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "gold") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(250,204,21,0.24),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.18),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent)]" />
        <motion.div
          className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-yellow-300/15"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.8, repeat: Infinity }}
          style={{ filter: "blur(26px)" }}
        />
        <div className="absolute right-6 top-16 w-[60%] rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Star className="h-4 w-4 text-yellow-300" />
            AI-поздравление от ‘звезды кино’
          </div>
          <div className="mt-2 text-xs text-white/70">Минимализм + золотые акценты. Выглядит дорого.</div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-yellow-300/90 via-white/50 to-yellow-300/90"
              animate={{ x: ["-50%", "150%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "hearts") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(244,63,94,0.28),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.18),transparent_60%)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/90"
              style={{ left: `${(i * 33) % 100}%`, top: `${(i * 19) % 100}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.1 }}
            >
              ❤
            </motion.div>
          ))}
        </div>
        <div className="absolute left-6 bottom-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="text-sm font-semibold text-white">Love story</div>
          <div className="mt-1 text-xs text-white/70">Оживленные фотографии + сердечки и мягкие переходы.</div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "winter") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.26),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(14,165,233,0.22),transparent_60%)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
              style={{ left: `${(i * 23) % 100}%`, top: `-10%` }}
              animate={{ y: [0, 420], x: [0, (i % 2 === 0 ? 18 : -18)] }}
              transition={{ duration: 3.6 + (i % 6) * 0.25, repeat: Infinity, delay: (i % 9) * 0.12 }}
            />
          ))}
        </div>
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div>
            <div className="text-sm font-semibold text-white">Зимняя сказка</div>
            <div className="mt-1 text-xs text-white/70">Снег + огоньки и семейное фото.</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),rgba(255,255,255,0.1))]" />
        </div>
      </div>
    );
  }

  if (example.previewStyle === "corporate") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,197,94,0.18),transparent_55%),radial-gradient(circle_at_70%_45%,rgba(59,130,246,0.20),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="absolute left-6 top-16 w-[72%] rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <BadgeCheck className="h-4 w-4 text-emerald-300" />
            Поздравление от CEO (AI)
          </div>
          <div className="mt-2 text-xs text-white/70">Корпоративно, аккуратно, под фирстиль.</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded-lg bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (example.previewStyle === "cartoon") {
    return (
      <div className={cn(base, "aspect-[16/9]")}
        >
        {title}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.26),transparent_60%),radial-gradient(circle_at_70%_55%,rgba(250,204,21,0.28),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(244,63,94,0.20),transparent_60%)]" />
        <motion.div
          className="absolute left-10 top-16 h-16 w-16 rounded-full bg-white/10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-28 top-24 h-10 w-10 rounded-full bg-white/10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-20 top-32 h-5 w-5 rounded-full bg-white/10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute right-6 bottom-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="text-sm font-semibold text-white">Мульт-стиль</div>
          <div className="mt-1 text-xs text-white/70">Персонажи + оживление детских фото.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(base, "aspect-[16/9]")}
      >
      {title}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,204,21,0.30),transparent_55%),radial-gradient(circle_at_60%_40%,rgba(244,63,94,0.24),transparent_60%),radial-gradient(circle_at_20%_75%,rgba(34,211,238,0.22),transparent_60%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:18px_18px]" />
      <motion.div
        className="absolute left-6 bottom-6 rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-white backdrop-blur"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <div className="text-sm font-black tracking-wide text-yellow-200">С ЮБИЛЕЕМ!!!</div>
        <div className="mt-1 text-xs text-white/75">Да, это специально. Да, можно выключить.</div>
      </motion.div>
    </div>
  );
}

function ExampleCard({ example, onOpen }: { example: Example; onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="group"
    >
      <GlassCard className="h-full">
        <div className="p-4">
          <div className="relative overflow-hidden rounded-xl">
            <DemoScene example={example} />
          </div>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {example.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {example.subtitle}
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {example.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
            >
              Посмотреть демо
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function SparkleField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
            animation: `sparkle ${1.8 + (i % 4) * 0.4}s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function OrderForm({
  selectedStyle,
  onPickStyle,
}: {
  selectedStyle: string;
  onPickStyle: (id: string) => void;
}) {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [eventType, setEventType] = React.useState("День Рождения");
  const [style, setStyle] = React.useState(selectedStyle);
  const [revive, setRevive] = React.useState(false);
  const [reviveCount, setReviveCount] = React.useState("3");
  const [ai, setAi] = React.useState(false);
  const [aiFrom, setAiFrom] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<null | { ok: boolean; message: string }>(null);

  React.useEffect(() => {
    setStyle(selectedStyle);
  }, [selectedStyle]);

  const allStyles = React.useMemo(
    () => examples.map((e) => ({ id: e.id, label: `${e.category}: ${e.title}` })),
    [],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!name.trim() || !contact.trim() || !eventType.trim()) {
      setResult({ ok: false, message: "Заполните имя, контакт и тип праздника." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          eventType,
          style,
          options: {
            revive,
            reviveCount: revive ? reviveCount : null,
            ai,
            aiFrom: ai ? aiFrom : null,
          },
          notes,
        }),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as any;
        setResult({ ok: false, message: j?.error ?? "Ошибка отправки" });
        return;
      }

      setResult({ ok: true, message: "Заявка отправлена! Я свяжусь с вами для деталей." });
      setName("");
      setContact("");
      setNotes("");
      setAiFrom("");
      setRevive(false);
      setAi(false);
    } catch {
      setResult({ ok: false, message: "Не удалось отправить заявку. Попробуйте позже." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Имя
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Контакт (телефон/email)
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="h-11 rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
            placeholder="+7… или email"
          />
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Тип праздника
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="h-11 rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
          >
            <option>День Рождения</option>
            <option>Свадьба/Годовщина</option>
            <option>Новый Год/Праздники</option>
            <option>Юбилей</option>
            <option>Другое</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Желаемый стиль
          <select
            value={style}
            onChange={(e) => {
              setStyle(e.target.value);
              onPickStyle(e.target.value);
            }}
            className="h-11 rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
          >
            <option value="">Не знаю — помогите выбрать</option>
            {allStyles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 rounded-2xl border border-black/10 bg-black/[.02] p-4 dark:border-white/10 dark:bg-white/5">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Дополнительные опции</div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={revive}
            onChange={(e) => setRevive(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-black/20"
          />
          <div className="grid gap-1">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Оживить фотографии</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">Укажите количество (например: 3).</div>
            {revive ? (
              <input
                value={reviveCount}
                onChange={(e) => setReviveCount(e.target.value)}
                className="mt-1 h-10 max-w-[160px] rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                placeholder="Количество"
              />
            ) : null}
          </div>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={ai}
            onChange={(e) => setAi(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-black/20"
          />
          <div className="grid gap-1">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">AI-поздравление от знаменитости</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">Напишите, от кого хотите.</div>
            {ai ? (
              <input
                value={aiFrom}
                onChange={(e) => setAiFrom(e.target.value)}
                className="mt-1 h-10 rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
                placeholder="Например: ‘звезда кино’, ‘певец’, ‘CEO’"
              />
            ) : null}
          </div>
        </label>
      </div>

      <label className="grid gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Дополнительные пожелания
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[110px] resize-y rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-900/30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50"
          placeholder="Цвета, настроение, текст, ссылки, музыка…"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white/10 dark:hover:bg-white/15"
      >
        {submitting ? "Отправляю…" : "Отправить заявку"}
        <ArrowRight className="h-4 w-4" />
      </button>

      {result ? (
        <div
          className={cn(
            "rounded-xl border p-3 text-sm",
            result.ok
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
              : "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-200",
          )}
        >
          {result.message}
        </div>
      ) : null}
    </form>
  );
}

export default function Home() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const [activeExample, setActiveExample] = React.useState<Example | null>(null);
  const [stylePick, setStylePick] = React.useState<string>(examples[0]?.id ?? "");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 24, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 120, damping: 24, mass: 0.5 });

  function openDemo(example: Example) {
    setActiveExample(example);
    setDemoOpen(true);
  }

  const nav = [
    { id: "about", label: "О услуге" },
    { id: "features", label: "Возможности" },
    { id: "examples", label: "Примеры" },
    { id: "how", label: "Как это работает" },
    { id: "pricing", label: "Пакеты" },
    { id: "order", label: "Заказать" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        cursorX.set(e.clientX - r.left);
        cursorY.set(e.clientY - r.top);
      }}
      className="min-h-screen"
    >
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 via-cyan-400/20 to-emerald-400/20">
              <Gift className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline">ПоздравСайт</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollToId(n.id)}
                className="rounded-full px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-black/[.04] hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-zinc-50"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => scrollToId("order")}
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
            >
              Заказать
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.30),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_55%_90%,rgba(16,185,129,0.18),transparent_50%)]" />
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-25" />

          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-fuchsia-500/25"
            style={{ x: smoothX, y: smoothY, filter: "blur(30px)" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-28 top-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20"
            style={{ x: smoothX, y: smoothY, filter: "blur(40px)" }}
          />

          <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                    <Sparkles className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-300" />
                    За 1 час — готовый сайт-поздравление
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                    Персональные поздравительные сайты за 1 час
                  </h1>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                    Создаю уникальные веб-поздравления для любого праздника с вашими фото, видео и музыкой.
                    Можно добавить AI‑поздравление “голосом звезды” и оживление фотографий.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => scrollToId("order")}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                    >
                      Заказать поздравление
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToId("examples")}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white/60 px-5 text-sm font-semibold text-zinc-900 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
                    >
                      Смотреть примеры
                      <LinkIcon className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>

                <Reveal delay={0.22}>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        <CalendarCheck className="h-4 w-4" />
                        Готово за 1 час
                      </div>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">От заявки до ссылки.</div>
                    </div>
                    <div className="rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        <MonitorSmartphone className="h-4 w-4" />
                        Responsive
                      </div>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Мобайл + десктоп.</div>
                    </div>
                    <div className="rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        <LinkIcon className="h-4 w-4" />
                        Уникальная ссылка
                      </div>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Отправляете в мессенджер.</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1} className="relative">
                <GlassCard className="p-4">
                  <div className="relative">
                    <div className="absolute -inset-10 rounded-[32px] bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/20 to-emerald-400/20 opacity-60" style={{ animation: "glow 5s ease-in-out infinite" }} />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
                      <SparkleField />
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2">
                          <Badge>🎭 AI-голос</Badge>
                          <Badge>✨ Ожившее фото</Badge>
                          <Badge>🎵 Музыка</Badge>
                        </div>
                        <div className="mt-4 text-lg font-semibold text-white">
                          “Вау, это как мини‑фильм, только персональный.”
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                          Встроенный плеер, видео, галерея, анимации, кнопки — всё под праздник.
                        </div>
                        <div className="mt-5">
                          <BeforeAfter beforeLabel="Фото" afterLabel="Оживление" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  О услуге
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Как создается сайт‑поздравление
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  Вы присылаете материалы (фото/видео/музыку) и короткое ТЗ. Я собираю страницу в выбранном стиле:
                  интро, блоки с фото и видео, текстовые поздравления, кнопки, эффектные анимации.
                  В итоге получаете одну ссылку, которую можно отправить получателю.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: CalendarCheck, title: "Готово за 1 час", desc: "Быстро, без многоступенчатых согласований." },
                    { icon: Wand2, title: "Индивидуальный дизайн", desc: "Под человека, повод и настроение." },
                    { icon: Music, title: "Ваши фото/видео/музыка", desc: "Персональные материалы — главный вау‑фактор." },
                    { icon: MonitorSmartphone, title: "Адаптивный дизайн", desc: "Смотрится отлично на телефоне и ПК." },
                    { icon: LinkIcon, title: "Уникальная ссылка", desc: "Открывается в браузере без установок." },
                    { icon: BadgeCheck, title: "Ухоженный UX", desc: "Читабельно, плавно, без ‘сайта из 2007’." },
                  ].map((it) => (
                    <div key={it.title} className="rounded-2xl border border-black/5 bg-black/[.02] p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        <it.icon className="h-4 w-4" />
                        {it.title}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{it.desc}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(34,211,238,0.12),transparent_55%)]" />
                <div className="relative">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Что вы получаете
                  </div>
                  <div className="mt-3 grid gap-3">
                    {[
                      "Готовый сайт‑поздравление с вашей музыкой и материалами",
                      "Эффектные анимации (но без перегруза)",
                      "Кнопку/ссылку для отправки получателю",
                      "Возможность добавить AI‑поздравление и оживление фото",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white/10">
                          <BadgeCheck className="h-4 w-4" />
                        </div>
                        <div className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{t}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToId("order")}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Заказать поздравление
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section id="features" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.14),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.12),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(34,211,238,0.12),transparent_50%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Дополнительные возможности
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  AI и “оживление” — самые вау‑фичи
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Сделаем поздравление не просто красивым, а запоминающимся: голос звезды, анимированные фото,
                  личный саундтрек и монтаж.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Mic2,
                  title: "AI-поздравления от звезд",
                  desc: "Добавьте видео‑поздравление голосом известных личностей с помощью AI",
                  accent: "from-fuchsia-500/30 to-purple-500/10",
                },
                {
                  icon: Sparkles,
                  title: "Оживление фотографий",
                  desc: "Превращаю статичные фото в живые анимированные воспоминания",
                  accent: "from-cyan-400/25 to-emerald-400/10",
                },
                {
                  icon: Music,
                  title: "Персональный саундтрек",
                  desc: "Ваша любимая музыка как фон поздравления",
                  accent: "from-amber-400/25 to-orange-500/10",
                },
                {
                  icon: Clapperboard,
                  title: "Видео-монтаж",
                  desc: "Профессиональный монтаж ваших видео в единую историю",
                  accent: "from-rose-500/25 to-pink-500/10",
                },
              ].map((f, idx) => (
                <Reveal key={f.title} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="group"
                  >
                    <GlassCard className="h-full p-5">
                      <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", `bg-gradient-to-br ${f.accent}`)} />
                      <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/70 text-zinc-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-50">
                          <f.icon className="h-5 w-5" />
                        </div>
                        <div className="mt-4 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                          {f.title}
                        </div>
                        <div className="mt-2 text-xs leading-6 text-zinc-600 dark:text-zinc-300">{f.desc}</div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                          <Wand2 className="h-4 w-4" />
                          Hover = магия
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Примеры работ
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                9 вариантов + секретный бонус
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                Ниже — разные стили. Нажмите “Посмотреть демо” — откроется модальное окно.
                Понравившийся стиль можно выбрать в форме заказа.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-10">
            {categories.map((c) => {
              const items = examples.filter((e) => e.category === c.title);
              return (
                <div key={c.title} className="grid gap-5">
                  <Reveal>
                    <div className="flex flex-col gap-1">
                      <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-300">{c.description}</div>
                    </div>
                  </Reveal>
                  <div className="grid gap-6 md:grid-cols-3">
                    {items.map((ex, idx) => (
                      <Reveal key={ex.id} delay={idx * 0.04}>
                        <ExampleCard
                          example={ex}
                          onOpen={() => {
                            openDemo(ex);
                            setStylePick(ex.id);
                          }}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="how" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(168,85,247,0.12),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Как это работает
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Пошаговый процесс
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <GlassCard className="p-6 lg:col-span-2">
                  <div className="grid gap-4">
                    {[
                      "Вы оставляете заявку",
                      "Присылаете материалы (фото, видео, музыку)",
                      "Выбираете дополнительные опции (AI-поздравления, оживление фото)",
                      "Обсуждаем стиль и детали",
                      "Получаете готовый сайт через 1 час",
                      "Делитесь ссылкой с получателем",
                    ].map((s, idx) => (
                      <div key={s} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white dark:bg-white/10">
                          {idx + 1}
                        </div>
                        <div className="rounded-2xl border border-black/5 bg-black/[.02] px-4 py-3 text-sm leading-6 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={0.08}>
                <GlassCard className="p-6">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Пакет ‘быстро и красиво’</div>
                  <div className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    Большинство заказов — это 1‑2 правки по тексту + подбор атмосферы.
                    Я работаю быстро, потому что есть библиотека качественных компонентов.
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToId("order")}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Прайс / пакеты
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Выберите уровень “вау”
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Цены можно финально уточнить после материалов (объем фото/видео влияет на монтаж).
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Базовый",
                price: "от 3 990 ₽",
                items: ["Обычный сайт‑поздравление", "Ваши фото/видео/музыка", "Адаптив + уникальная ссылка"],
                highlight: false,
              },
              {
                name: "Премиум",
                price: "от 6 990 ₽",
                items: ["Всё из Базового", "✨ Оживление 3 фото", "Больше анимаций и эффектов"],
                highlight: true,
              },
              {
                name: "VIP",
                price: "от 9 990 ₽",
                items: ["Всё из Премиум", "🎭 AI-поздравление от звезды", "Приоритет и расширенный монтаж"],
                highlight: false,
              },
            ].map((p, idx) => (
              <Reveal key={p.name} delay={idx * 0.05}>
                <GlassCard
                  className={cn(
                    "p-6",
                    p.highlight && "ring-2 ring-fuchsia-500/20",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{p.name}</div>
                      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {p.price}
                      </div>
                    </div>
                    {p.highlight ? (
                      <div className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-200">
                        Популярно
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 grid gap-2">
                    {p.items.map((it) => (
                      <div key={it} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <BadgeCheck className="mt-0.5 h-4 w-4" />
                        <span className="leading-6">{it}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToId("order")}
                    className={cn(
                      "mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                      p.highlight
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                        : "border border-black/10 bg-white/60 text-zinc-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10",
                    )}
                  >
                    Выбрать
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="order" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.12),transparent_55%),radial-gradient(circle_at_75%_65%,rgba(34,211,238,0.12),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Форма заказа
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Заказать поздравление
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                Опишите повод и выберите стиль — дальше я предложу лучший вариант и уточню детали.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <GlassCard className="p-6">
                  <OrderForm selectedStyle={stylePick} onPickStyle={setStylePick} />
                </GlassCard>
              </Reveal>

              <Reveal delay={0.08}>
                <GlassCard className="p-6">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Выбранный стиль</div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    Можно выбрать из примеров или оставить “не знаю”.
                  </div>
                  <div className="mt-4">
                    {(() => {
                      const ex = examples.find((e) => e.id === stylePick) ?? examples[0];
                      return (
                        <div className="grid gap-3">
                          <div className="overflow-hidden rounded-2xl">
                            <DemoScene example={ex} />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ex.badges.map((b) => (
                              <span
                                key={b}
                                className="inline-flex items-center rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => openDemo(ex)}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                          >
                            Открыть демо
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              FAQ
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Частые вопросы
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "Как работает оживление фото?",
                a: "Вы присылаете фото, я делаю аккуратную анимацию (мимика/движение/параллакс). На сайте это выглядит как ‘живое’ воспоминание.",
              },
              {
                q: "Какие звезды доступны для AI-поздравлений?",
                a: "Обычно подбираем похожий голос/образ под запрос (звезда кино/певец/CEO). Список зависит от доступных моделей и корректности результата.",
              },
              {
                q: "Сколько стоит каждая опция?",
                a: "Оживление фото — зависит от количества. AI-поздравление — зависит от сложности/длительности. Точную стоимость назову после материалов.",
              },
              {
                q: "Можно ли изменить сайт после создания?",
                a: "Да. Небольшие правки текста обычно быстро. Более крупные изменения (стиль/монтаж) обсуждаем отдельно.",
              },
            ].map((f, idx) => (
              <Reveal key={f.q} delay={idx * 0.04}>
                <details className="group rounded-2xl border border-black/5 bg-black/[.02] p-5 open:bg-white/70 open:shadow-sm dark:border-white/10 dark:bg-white/5 dark:open:bg-white/5">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    <div className="flex items-center justify-between gap-3">
                      <span>{f.q}</span>
                      <span className="text-zinc-400 transition group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <div className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{f.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <footer className="border-t border-black/5 bg-white/40 py-12 backdrop-blur dark:border-white/10 dark:bg-zinc-950/40">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Контакты</div>
                <div className="mt-3 grid gap-1 text-sm text-zinc-600 dark:text-zinc-300">
                  <div>Email: hello@example.com</div>
                  <div>Telegram: @yourhandle</div>
                  <div>WhatsApp: +7 900 000‑00‑00</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Соцсети</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="#">
                    Instagram / Reels
                  </a>
                  <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="#">
                    TikTok
                  </a>
                  <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="#">
                    Behance / Portfolio
                  </a>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Навигация</div>
                <div className="mt-3 grid gap-2 text-sm">
                  {nav.slice(0, 6).map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => scrollToId(n.id)}
                      className="text-left text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Маленькая магия</div>
                <div className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Если хотите, я добавлю “волшебные” эффекты: glow, sparkles, parallax, микродвижения.
                </div>
                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-between gap-2 border-t border-black/5 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row">
              <div>© {new Date().getFullYear()} ПоздравСайт. Все права защищены.</div>
              <div>Сделано на Next.js + Tailwind + Framer Motion</div>
            </div>
          </div>
        </footer>
      </main>

      <Modal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title={activeExample ? `${activeExample.category} — ${activeExample.title}` : "Демо"}
      >
        {activeExample ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid gap-3">
              <div className="overflow-hidden rounded-2xl">
                <DemoScene example={activeExample} />
              </div>
              <div className="flex flex-wrap gap-2">
                {activeExample.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {activeExample.subtitle}
              </div>
            </div>

            <div className="grid gap-4">
              {activeExample.includesBeforeAfter ? (
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Оживление фото (демо)</div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    Сдвиньте ползунок — эффект “до/после”.
                  </div>
                  <div className="mt-3">
                    <BeforeAfter />
                  </div>
                </div>
              ) : null}

              {activeExample.includesAI ? (
                <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-black/[.02] p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(34,211,238,0.16),transparent_55%)]" />
                  <SparkleField className="opacity-80" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      <Mic2 className="h-4 w-4" />
                      AI‑поздравление (магический эффект)
                    </div>
                    <div className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      В реальном проекте мы вставляем видео/аудио и делаем деликатные эффекты: сияние,
                      подсветку и “волны” под голос.
                    </div>
                    <div className="mt-4 grid gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-2 w-full rounded-full bg-gradient-to-r from-fuchsia-500/40 via-cyan-400/30 to-emerald-400/25"
                          animate={{ opacity: [0.35, 1, 0.35], scaleX: [0.85, 1, 0.85] }}
                          transition={{ duration: 1.6 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="rounded-2xl border border-black/5 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Хотите такой?</div>
                <div className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Нажмите “Заказать” — и я сделаю сайт в похожем стиле, но с вашими материалами.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setStylePick(activeExample.id);
                      setDemoOpen(false);
                      scrollToId("order");
                    }}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Заказать в этом стиле
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoOpen(false)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
