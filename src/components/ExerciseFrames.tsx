'use client';

import { useState } from 'react';
import type { ImageStyle } from '@/lib/bundle';

/**
 * Start/peak frames with a flat <-> classic style toggle.
 * `flat` is white-background; `classic` is a transparent matte-clay render.
 * Client component because the toggle is interactive; paths are derived from
 * the slug so no per-image wiring is needed.
 */
export function ExerciseFrames({
  id,
  name,
  hasClassic,
}: {
  id: string;
  name: string;
  hasClassic: boolean;
}) {
  const [style, setStyle] = useState<ImageStyle>('flat');
  const active = hasClassic ? style : 'flat';

  return (
    <div className="space-y-3">
      {hasClassic && (
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted">Style</span>
          <div className="inline-flex rounded-lg border border-border-soft bg-surface p-0.5 text-xs">
            {(['flat', 'classic'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                aria-pressed={active === s}
                className={`rounded-md px-3 py-1 capitalize transition ${
                  active === s
                    ? 'bg-accent text-white font-medium'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Frame label="Start" src={`/images/${active}/${id}-start.webp`} alt={`${name} — start`} />
        <Frame label="Peak" src={`/images/${active}/${id}-peak.webp`} alt={`${name} — peak`} />
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
