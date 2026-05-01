import {
  EXERCISES,
  BODY_PARTS,
  EQUIPMENTS,
  DIFFICULTIES,
  LOCALES,
  type Locale,
} from '@/lib/bundle';
import { ExerciseCard } from '@/components/ExerciseCard';
import { FilterBar } from '@/components/FilterBar';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

interface PageProps {
  searchParams: Promise<{
    body_part?: string;
    equipment?: string;
    difficulty?: string;
    locale?: string;
  }>;
}

function resolveLocale(raw: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(raw ?? '') ? (raw as Locale) : 'en';
}

export default async function Home({ searchParams }: PageProps) {
  const sp = await searchParams;
  const locale = resolveLocale(sp.locale);
  const filtered = EXERCISES.filter(
    (ex) =>
      (!sp.body_part || ex.body_part === sp.body_part) &&
      (!sp.equipment || ex.equipment === sp.equipment) &&
      (!sp.difficulty || ex.difficulty === sp.difficulty),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Exercise Browser</h1>
          <p className="text-sm text-muted">
            21 hand-picked exercises from the RepDB preview bundle. Filter, click in for details.
          </p>
        </div>
        <LocaleSwitcher current={locale} />
      </div>

      <FilterBar
        bodyParts={BODY_PARTS}
        equipments={EQUIPMENTS}
        difficulties={DIFFICULTIES}
      />

      <div className="text-xs text-muted">
        Showing <span className="text-foreground font-medium">{filtered.length}</span> of{' '}
        {EXERCISES.length} exercises
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-8 text-center rounded-lg border border-dashed border-border-soft">
          No exercises match these filters.
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((ex) => (
            <li key={ex.id}>
              <ExerciseCard exercise={ex} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
