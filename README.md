# RepDB Example — Next.js

A small Next.js 16 starter that browses **400 fitness exercises** from the
[RepDB free-tier dataset](https://repdb.co/free-exercise-dataset).

## Features

- Static-rendered exercise list with filter by body part, equipment, difficulty
- Detail page per exercise with flat start/peak (or single-pose) frames,
  instructions, muscle data, equipment icon, and MET value
- EN / DE / ES locale switch (translates the exercise data — UI is EN-only)
- Standard-tier teaser: five sample exercises (deadlift, squat, bench-press,
  mountain-climbers, kettlebell-swing) show a **Flat / Standard** style toggle
  and, for mountain-climbers, a looping animation — the paid-tier look, marked
  with a "Standard tier preview" badge

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
npm run start
```

## What's vendored where

```
src/data/exercises.json        # the free-tier bundle (400 exercises), imported as a module
public/images/flat/*.webp      # 745 flat webp (start/peak pairs + single-pose "main")
public/images/muscles/*.webp   # 27 muscle icons
public/images/equipment/*.webp # 46 equipment icons
public/images/samples/*.webp   # paid-tier teaser stills + 1 animation (evaluation-only)
LICENSE-free.md                # RepDB Free Tier License for the bundle data & images
LICENSE                        # MIT for the example code
```

The `public/images/samples/` files are evaluation-only paid-tier assets; the
five sample slugs are derived at build time from the `*-start.webp` files
present there (see `src/lib/samples.ts`) — no hardcoded list.

## Data & license

This demo uses the RepDB **free tier**: a dated snapshot of 400 exercises with
flat-style images, under the [RepDB Free Tier License](LICENSE-free.md).

**Attribution required.** Keep a visible link — "Exercise data by RepDB
(repdb.co)" — in your app's credits, README, or footer.

**No generative-AI derivation.** The images may not be used as input, reference,
or conditioning material for generative models (image-to-image, style transfer,
fine-tuning, or similar). See term 5 of [LICENSE-free.md](LICENSE-free.md).

**No redistribution as a dataset** — in-app use only. The `samples/` folder is
evaluation-only and is not covered by the free-use grant.

For the full, growing dataset with two visual styles, transparent backgrounds,
animations, 1024px images, and multilingual data, see
<https://repdb.co/pricing>.

> Exercise data & images: RepDB (https://repdb.co)

## Sister demos

- [**exercise-dataset**](https://github.com/sergei-argutin/exercise-dataset) — the raw dataset (JSON + WebP), browsable [live viewer](https://sergei-argutin.github.io/exercise-dataset/)
- [repdb-example-react-native](https://github.com/sergei-argutin/repdb-example-react-native)
- [repdb-example-flutter](https://github.com/sergei-argutin/repdb-example-flutter)

## License

MIT for the example code (`LICENSE`). Bundle data & images under the
[RepDB Free Tier License](LICENSE-free.md). PRs welcome — accessibility
improvements especially.
