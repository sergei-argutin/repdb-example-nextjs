import { SAMPLE_ANIMATIONS } from '@/lib/samples';

function titleize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Paid-tier preview gallery.
 *
 * Renders the looping sample animations shipped in /images/samples/ — the exact
 * clips shown on repdb.co. These are evaluation-only assets, not part of the
 * free-tier exercises, so they live here on the catalog page rather than on any
 * individual exercise. The set is derived from the files at build time.
 */
export function SamplePreview() {
  if (SAMPLE_ANIMATIONS.length === 0) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-border-soft bg-surface p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold tracking-tight">Paid tier preview</h2>
            <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
              Standard tier preview — evaluation only
            </span>
          </div>
          <p className="text-sm text-muted">
            The paid tiers add looping animations — the exact clips shown on{' '}
            <a
              className="text-foreground hover:text-accent underline underline-offset-2"
              href="https://repdb.co"
              target="_blank"
              rel="noreferrer"
            >
              repdb.co
            </a>
            . These samples are for evaluation only.
          </p>
        </div>
        <a
          href="https://repdb.co/pricing"
          className="text-sm font-medium text-accent hover:text-accent-hover whitespace-nowrap"
          target="_blank"
          rel="noreferrer"
        >
          See pricing →
        </a>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {SAMPLE_ANIMATIONS.map(({ slug, src }) => (
          <li key={slug}>
            <figure className="rounded-xl border border-border-soft bg-surface overflow-hidden shadow-sm">
              <div className="aspect-square flex items-center justify-center bg-sky-50 dark:bg-[color-mix(in_srgb,var(--surface-2)_92%,#dbeafe_8%)]">
                {/* Plain <img>: animated webp plays natively; next/image would drop the animation. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${titleize(slug)} — looping animation`}
                  loading="lazy"
                  decoding="async"
                  className="object-contain w-full h-full p-2"
                />
              </div>
              <figcaption className="px-2 py-1.5 text-[11px] font-medium text-muted border-t border-border-soft truncate">
                {titleize(slug)}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
