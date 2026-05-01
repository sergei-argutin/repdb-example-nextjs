import bundle from '@/data/exercises.json';

export type Locale = 'en' | 'de' | 'es';
export type ImageStyle = 'flat' | 'classic';
export type ImageVariant = 'start' | 'peak';

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
  images?: Partial<Record<ImageStyle, ImageVariant[]>>;
}

export interface Bundle {
  schema_version: number;
  locales: Locale[];
  exercises: Exercise[];
}

const BUNDLE = bundle as unknown as Bundle;

export const EXERCISES = BUNDLE.exercises;
export const LOCALES: Locale[] = BUNDLE.locales;

export function exerciseImage(ex: Exercise, variant: ImageVariant): string | null {
  return ex.images?.flat?.includes(variant)
    ? `/images/flat/${ex.id}-${variant}.webp`
    : null;
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
