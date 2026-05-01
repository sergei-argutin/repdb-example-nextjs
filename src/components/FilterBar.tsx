'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { prettyEnum } from '@/lib/bundle';

interface Props {
  bodyParts: string[];
  equipments: string[];
  difficulties: string[];
}

export function FilterBar({ bodyParts, equipments, difficulties }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params);
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.replace(qs ? `/?${qs}` : '/', { scroll: false });
    },
    [params, router],
  );

  const hasFilters = ['body_part', 'equipment', 'difficulty'].some((k) => params.get(k));

  return (
    <div className="flex flex-wrap gap-3 items-center rounded-xl border border-border-soft bg-surface px-3 py-2.5">
      <Select
        label="Body part"
        value={params.get('body_part') ?? ''}
        options={bodyParts}
        onChange={(v) => update('body_part', v)}
      />
      <Select
        label="Equipment"
        value={params.get('equipment') ?? ''}
        options={equipments}
        onChange={(v) => update('equipment', v)}
      />
      <Select
        label="Difficulty"
        value={params.get('difficulty') ?? ''}
        options={difficulties}
        onChange={(v) => update('difficulty', v)}
      />
      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            const next = new URLSearchParams(params);
            next.delete('body_part');
            next.delete('equipment');
            next.delete('difficulty');
            const qs = next.toString();
            router.replace(qs ? `/?${qs}` : '/', { scroll: false });
          }}
          className="ml-auto text-sm text-accent hover:text-accent-hover"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted">
      <span className="uppercase tracking-wide font-medium">{label}</span>
      <select
        className="rounded-md border border-border-soft hover:border-border-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 bg-surface-2 text-foreground px-2 py-1.5 text-sm transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {prettyEnum(opt)}
          </option>
        ))}
      </select>
    </label>
  );
}
