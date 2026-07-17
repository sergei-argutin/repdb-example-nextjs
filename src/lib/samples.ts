import fs from 'node:fs';
import path from 'node:path';

/**
 * Standard-tier teaser assets.
 *
 * The free tier ships flat images only. A handful of exercises additionally get
 * paid-tier sample stills (and one animation) under `public/images/samples/`,
 * shown as an upgrade teaser. The set is DERIVED from the files present at build
 * time — drop `<slug>-start.webp` in there and it lights up, no code change.
 */

const SAMPLES_DIR = path.join(process.cwd(), 'public', 'images', 'samples');

function readSampleSlugs(): Set<string> {
  try {
    const slugs = new Set<string>();
    for (const file of fs.readdirSync(SAMPLES_DIR)) {
      const m = file.match(/^(.+)-start\.webp$/);
      if (m) slugs.add(m[1]);
    }
    return slugs;
  } catch {
    return new Set();
  }
}

export const SAMPLE_SLUGS = readSampleSlugs();

export function isSampleExercise(id: string): boolean {
  return SAMPLE_SLUGS.has(id);
}

/** Path to a sample looping animation (`<slug>.webp`), or null if none ships. */
export function sampleAnimation(id: string): string | null {
  if (!SAMPLE_SLUGS.has(id)) return null;
  const file = path.join(SAMPLES_DIR, `${id}.webp`);
  return fs.existsSync(file) ? `/images/samples/${id}.webp` : null;
}
