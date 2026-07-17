import Link from 'next/link';
import Image from 'next/image';
import {
  type Exercise,
  type Locale,
  exerciseThumb,
  exerciseName,
  prettyEnum,
} from '@/lib/bundle';

export function ExerciseCard({ exercise, locale }: { exercise: Exercise; locale: Locale }) {
  const thumb = exerciseThumb(exercise);
  const name = exerciseName(exercise, locale);
  return (
    <Link
      href={`/${exercise.id}?locale=${locale}`}
      className="group block rounded-xl border border-border-soft hover:border-border-strong bg-surface hover:bg-surface-2 transition overflow-hidden shadow-sm hover:shadow-md"
    >
      <div className="aspect-[4/3] bg-sky-50 dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,#dbeafe_8%)] flex items-center justify-center overflow-hidden">
        {thumb ? (
          <Image
            src={thumb}
            alt={name}
            width={344}
            height={258}
            className="object-contain w-full h-full p-2 transition group-hover:scale-[1.04]"
          />
        ) : (
          <span className="text-xs text-muted">no image</span>
        )}
      </div>
      <div className="p-3 space-y-2 border-t border-border-soft">
        <div className="font-medium leading-tight text-foreground">{name}</div>
        <div className="flex flex-wrap gap-1 text-[11px]">
          {exercise.body_part && <Pill>{prettyEnum(exercise.body_part)}</Pill>}
          {exercise.equipment && <Pill>{prettyEnum(exercise.equipment)}</Pill>}
          {exercise.difficulty && <Pill>{prettyEnum(exercise.difficulty)}</Pill>}
        </div>
      </div>
    </Link>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border-soft bg-surface-2 text-muted px-1.5 py-0.5">
      {children}
    </span>
  );
}
