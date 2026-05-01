'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/bundle';

const LABELS: Record<Locale, string> = { en: 'EN', de: 'DE', es: 'ES' };

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const switchTo = (locale: Locale) => {
    const next = new URLSearchParams(params);
    if (locale === 'en') next.delete('locale');
    else next.set('locale', locale);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="inline-flex rounded-lg border border-border-soft bg-surface overflow-hidden text-xs">
      {LOCALES.map((loc, i) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={
            (loc === current
              ? 'bg-accent text-white'
              : 'text-muted hover:text-foreground hover:bg-surface-2') +
            ' px-3 py-1.5 transition' +
            (i > 0 ? ' border-l border-border-soft' : '')
          }
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
