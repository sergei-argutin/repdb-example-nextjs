import type { ImageVariant } from '@/lib/bundle';

const VARIANT_LABELS: Record<ImageVariant, string> = {
  start: 'Start',
  peak: 'Peak',
  main: 'Pose',
};

/**
 * Flat exercise frames.
 *
 * Every exercise ships flat (white-background) frames — either a start/peak
 * pair or a single `main` pose. `slug` is the image base slug (already
 * alias-resolved by the caller).
 */
export function ExerciseFrames({
  slug,
  name,
  variants,
}: {
  slug: string;
  name: string;
  variants: ImageVariant[];
}) {
  const frames = variants.length ? variants : (['main'] as ImageVariant[]);
  const single = frames.length === 1;

  return (
    <div
      className={`grid gap-4 ${single ? 'grid-cols-1 max-w-md' : 'grid-cols-1 sm:grid-cols-2'}`}
    >
      {frames.map((v) => (
        <Frame
          key={v}
          label={VARIANT_LABELS[v] ?? v}
          src={`/images/flat/${slug}-${v}.webp`}
          alt={`${name} — ${VARIANT_LABELS[v] ?? v}`}
        />
      ))}
    </div>
  );
}

function Frame({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <figure className="rounded-xl border border-border-soft bg-surface overflow-hidden shadow-sm">
      <div className="aspect-[4/3] flex items-center justify-center bg-sky-50 dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,#dbeafe_8%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="object-contain w-full h-full p-4" />
      </div>
      <figcaption className="px-3 py-2 text-xs uppercase tracking-wider font-medium text-muted border-t border-border-soft">
        {label}
      </figcaption>
    </figure>
  );
}
