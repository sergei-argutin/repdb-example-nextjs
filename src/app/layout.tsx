import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exercise Browser — built with RepDB',
  description:
    '400 fitness exercises with flat images, instructions, and muscle data — sourced from the RepDB free-tier dataset.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-10 backdrop-blur bg-[color-mix(in_srgb,var(--background)_85%,transparent)] border-b border-border-soft">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 text-accent text-[11px] font-bold">
                R
              </span>
              <span>RepDB</span>
              <span className="text-muted">·</span>
              <span className="text-muted font-normal">Exercise Browser</span>
            </Link>
            <a
              href="https://repdb.co"
              className="text-sm text-muted hover:text-foreground transition"
              target="_blank"
              rel="noreferrer"
            >
              repdb.co ↗
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border-soft mt-12">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted space-y-1.5">
            <p>
              Exercise data &amp; images:{' '}
              <a
                className="text-foreground hover:text-accent underline underline-offset-2"
                href="https://repdb.co"
                target="_blank"
                rel="noreferrer"
              >
                RepDB
              </a>{' '}
              — free tier, attribution required.
            </p>
            <p>
              Want the full growing catalog with two visual styles, transparent
              backgrounds, animations, 1024px images, and more?{' '}
              <a
                className="text-accent hover:text-accent-hover font-medium"
                href="https://repdb.co/pricing"
                target="_blank"
                rel="noreferrer"
              >
                See pricing →
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
