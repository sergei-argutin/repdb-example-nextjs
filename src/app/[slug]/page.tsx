import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EXERCISES,
  LOCALES,
  type Locale,
  equipmentIcon,
  equipmentLabel,
  exerciseInstructions,
  exerciseName,
  findExercise,
  flatVariants,
  imageBase,
  muscleIcon,
  muscleLabel,
  prettyEnum,
} from '@/lib/bundle';
import { ExerciseFrames } from '@/components/ExerciseFrames';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ slug: e.id }));
}

interface DetailProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}

function resolveLocale(raw: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(raw ?? '') ? (raw as Locale) : 'en';
}

export default async function ExerciseDetail({ params, searchParams }: DetailProps) {
  const { slug } = await params;
  const { locale: localeRaw } = await searchParams;
  const ex = findExercise(slug);
  if (!ex) notFound();

  const locale = resolveLocale(localeRaw);
  const name = exerciseName(ex, locale);
  const instructions = exerciseInstructions(ex, locale);

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          href={`/?locale=${locale}`}
          className="text-sm text-muted hover:text-accent transition"
        >
          ← All exercises
        </Link>
        <LocaleSwitcher current={locale} />
      </div>

      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{name}</h1>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {ex.body_part && <Tag>{prettyEnum(ex.body_part)}</Tag>}
          {ex.equipment && (
            <EquipmentTag iconSrc={equipmentIcon(ex.equipment)} label={equipmentLabel(ex.equipment, locale)} />
          )}
          {ex.difficulty && <Tag>{prettyEnum(ex.difficulty)}</Tag>}
          {ex.category && <Tag>{prettyEnum(ex.category)}</Tag>}
          {typeof ex.met === 'number' && <Tag>MET · {ex.met}</Tag>}
        </div>
      </header>

      <ExerciseFrames slug={imageBase(ex)} name={name} variants={flatVariants(ex)} />

      {instructions.length > 0 && (
        <section className="space-y-3 rounded-xl border border-border-soft bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Instructions
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-[15px] leading-relaxed marker:text-muted">
            {instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MuscleList title="Primary muscles" muscles={ex.primary_muscles} locale={locale} primary />
        <MuscleList title="Secondary muscles" muscles={ex.secondary_muscles} locale={locale} />
      </section>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border-soft bg-surface text-foreground px-2 py-0.5">
      {children}
    </span>
  );
}

function EquipmentTag({ iconSrc, label }: { iconSrc: string | null; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border-soft bg-surface text-foreground pl-1 pr-2 py-0.5">
      {iconSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="" aria-hidden className="h-4 w-4 object-contain" />
      )}
      {label}
    </span>
  );
}

function MuscleList({
  title,
  muscles,
  locale,
  primary = false,
}: {
  title: string;
  muscles?: string[];
  locale: Locale;
  primary?: boolean;
}) {
  if (!muscles?.length) return null;
  return (
    <div className="space-y-2 rounded-xl border border-border-soft bg-surface p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>
      <ul className="flex flex-wrap gap-1.5 text-xs">
        {muscles.map((m) => {
          const icon = muscleIcon(m);
          return (
            <li
              key={m}
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${
                primary
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'bg-surface-2 text-foreground border border-border-soft'
              }`}
            >
              {icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={icon} alt="" aria-hidden className="h-4 w-4 object-contain" />
              )}
              {muscleLabel(m, locale)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
