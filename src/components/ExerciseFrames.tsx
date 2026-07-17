'use client';

import { useState } from 'react';
import type { ImageVariant } from '@/lib/bundle';

const VARIANT_LABELS: Record<ImageVariant, string> = {
  start: 'Start',
  peak: 'Peak',
  main: 'Pose',
};

/**
 * Flat exercise frames, with an optional Standard-tier teaser toggle.
 *
 * Every exercise ships flat (white-background) frames — either a start/peak
 * pair or a single `main` pose. For the handful of `isSample` exercises we also
 * ship paid-tier stills (transparent matte-clay) under /images/samples/, and a
 * "Flat / Standard" toggle plus a "Standard tier preview" badge appears.
 * Non-sample exercises render flat only, no toggle.
 *
 * `slug` is the image base slug (already alias-resolved by the caller). Sample
 * exercises are never aliased, so the samples/ path always uses this slug too.
 */
export function ExerciseFrames({
  slug,
  name,
  variants,
  isSample,
}: {
  slug: string;
  name: string;
  variants: ImageVariant[];
  isSample: boolean;
}) {
  const [showSample, setShowSample] = useState(false);
  const dir = isSample && showSample ? 'samples' : 'flat';
  const frames = variants.length ? variants : (['main'] as ImageVariant[]);
  const single = frames.length === 1;

  return (
    <div className="space-y-3">
      {isSample && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-muted">Style</span>
          <div className="inline-flex rounded-lg border border-border-soft bg-surface p-0.5 text-xs">
            {(
              [
                ['flat', 'Flat'],
                ['samples', 'Standard'],
              ] as const
            ).map(([value, label]) => {
              const activeToggle = value === dir;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setShowSample(value === 'samples')}
                  aria-pressed={activeToggle}
                  className={`rounded-md px-3 py-1 transition ${
                    activeToggle
                      ? 'bg-accent text-white font-medium'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
            Standard tier preview
          </span>
        </div>
      )}

      <div className={`grid gap-4 ${single ? 'grid-cols-1 max-w-md' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {frames.map((v) => (
          <Frame
            key={v}
            label={VARIANT_LABELS[v] ?? v}
            src={`/images/${dir}/${slug}-${v}.webp`}
            alt={`${name} — ${VARIANT_LABELS[v] ?? v}`}
          />
        ))}
      </div>
    </div>
  );
}

function Frame({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <figure className="rounded-xl border border-border-soft bg-surface overflow-hidden shadow-sm">
      <div className="aspect-[4/3] flex items-center justify-center bg-sky-50 dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,#dbeafe_8%)]">
        {/* Plain <img>: src swaps on toggle, no next/image optimization needed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="object-contain w-full h-full p-4" />
      </div>
      <figcaption className="px-3 py-2 text-xs uppercase tracking-wider font-medium text-muted border-t border-border-soft">
        {label}
      </figcaption>
    </figure>
  );
}
