import bundle from '@/data/exercises.json';

export type Locale = 'en' | 'de' | 'es';
export type ImageVariant = 'start' | 'peak' | 'main';

export interface Exercise {
  id: string;
  name_en: string;
  name_de?: string;
  name_es?: string;
  category: string;
  difficulty?: string;
  equipment?: string;
  body_part?: string;
  primary_muscles?: string[];
  secondary_muscles?: string[];
  instructions_en?: string[];
  instructions_de?: string[];
  instructions_es?: string[];
  /** Flat-style images shipped for this exercise: ["start","peak"] or ["main"]. */
  images?: { flat?: ImageVariant[] };
  /** When set, image files live under this other exercise's slug (shared render). */
  image_alias?: string;
  met?: number;
}

/** A muscle or equipment entry from the bundle's taxonomy. */
export interface TaxonomyEntry {
  name_en: string;
  name_de?: string;
  name_es?: string;
  image?: string;
}

export interface Bundle {
  schema_version: number;
  locales: Locale[];
  exercises: Exercise[];
  muscles?: Record<string, TaxonomyEntry>;
  equipment?: Record<string, TaxonomyEntry>;
}

const BUNDLE = bundle as unknown as Bundle;

export const EXERCISES = BUNDLE.exercises;
export const LOCALES: Locale[] = BUNDLE.locales;
export const MUSCLES = BUNDLE.muscles ?? {};
export const EQUIPMENT = BUNDLE.equipment ?? {};

/** Base slug for image files — aliased exercises borrow another slug's renders. */
export function imageBase(ex: Exercise): string {
  return ex.image_alias ?? ex.id;
}

/** Flat image variants this exercise ships (["start","peak"] or ["main"]). */
export function flatVariants(ex: Exercise): ImageVariant[] {
  return ex.images?.flat ?? [];
}

/** Best single thumbnail for cards: peak, else main, else the first variant. */
export function exerciseThumb(ex: Exercise): string | null {
  const variants = flatVariants(ex);
  const pick =
    variants.find((v) => v === 'peak') ?? variants.find((v) => v === 'main') ?? variants[0];
  return pick ? `/images/flat/${imageBase(ex)}-${pick}.webp` : null;
}

function localized(entry: TaxonomyEntry | undefined, locale: Locale, fallback: string): string {
  if (!entry) return fallback;
  if (locale === 'de' && entry.name_de) return entry.name_de;
  if (locale === 'es' && entry.name_es) return entry.name_es;
  return entry.name_en;
}

export function muscleLabel(key: string, locale: Locale): string {
  return localized(MUSCLES[key], locale, prettyEnum(key));
}

export function muscleIcon(key: string): string | null {
  const img = MUSCLES[key]?.image;
  return img ? `/images/muscles/${img}` : null;
}

export function equipmentLabel(key: string, locale: Locale): string {
  return localized(EQUIPMENT[key], locale, prettyEnum(key));
}

export function equipmentIcon(key: string): string | null {
  const img = EQUIPMENT[key]?.image;
  return img ? `/images/equipment/${img}` : null;
}

export function exerciseName(ex: Exercise, locale: Locale): string {
  if (locale === 'de' && ex.name_de) return ex.name_de;
  if (locale === 'es' && ex.name_es) return ex.name_es;
  return ex.name_en;
}

export function exerciseInstructions(ex: Exercise, locale: Locale): string[] {
  if (locale === 'de' && ex.instructions_de?.length) return ex.instructions_de;
  if (locale === 'es' && ex.instructions_es?.length) return ex.instructions_es;
  return ex.instructions_en ?? [];
}

export function uniqueValues<K extends keyof Exercise>(key: K): string[] {
  const set = new Set<string>();
  for (const ex of EXERCISES) {
    const v = ex[key];
    if (typeof v === 'string') set.add(v);
  }
  return Array.from(set).sort();
}

export const BODY_PARTS = uniqueValues('body_part');
export const EQUIPMENTS = uniqueValues('equipment');
export const DIFFICULTIES = uniqueValues('difficulty');

export function findExercise(slug: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === slug);
}

export function prettyEnum(value: string): string {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
