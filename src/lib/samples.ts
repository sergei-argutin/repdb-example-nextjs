import fs from 'node:fs';
import path from 'node:path';

/**
 * Paid-tier preview animations.
 *
 * The free tier ships flat images only. `public/images/samples/` holds a small
 * set of looping animation webps — the exact clips shown on repdb.co — provided
 * so you can evaluate the paid tiers. They are NOT tied to specific free-tier
 * exercises. The list is DERIVED from the files present at build time: drop a
 * `<slug>.webp` in there and it shows up in the gallery, no code change.
 */

const SAMPLES_DIR = path.join(process.cwd(), 'public', 'images', 'samples');

export interface SampleAnimation {
  slug: string;
  src: string;
}

function readSampleAnimations(): SampleAnimation[] {
  try {
    return fs
      .readdirSync(SAMPLES_DIR)
      .filter((file) => file.endsWith('.webp'))
      .sort()
      .map((file) => ({
        slug: file.replace(/\.webp$/, ''),
        src: `/images/samples/${file}`,
      }));
  } catch {
    return [];
  }
}

export const SAMPLE_ANIMATIONS = readSampleAnimations();
