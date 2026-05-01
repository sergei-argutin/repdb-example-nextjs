# RepDB Example — Next.js

A small Next.js 16 starter that browses 21 fitness exercises from the
[RepDB](https://repdb.co) preview dataset.

## Features

- Static-rendered exercise list with filter by body part, equipment, difficulty
- Detail page per exercise with start + peak frames, instructions, and muscle data
- EN / DE / ES locale switch (translates the exercise data — UI is EN-only)

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
public/images/flat/*.webp   # 42 webp images (21 exercises × start/peak)
src/data/exercises.json     # the preview bundle, imported as a module
LICENSE-preview.md          # CC-BY-NC for the bundle data
LICENSE                     # MIT for the example code
```

## Data

This demo uses the RepDB **preview** bundle: 21 hand-picked exercises under
[CC-BY-NC 4.0](LICENSE-preview.md). For commercial use or the full dataset
(300+ exercises with two visual styles, transparent backgrounds, multilingual
translations, alternative & progression relations), see
<https://repdb.co/pricing>.

> Exercise data & images: RepDB (https://repdb.co)

## Sister demos

- [repdb-example-react-native](https://github.com/sergei-argutin/repdb-example-react-native)
- [repdb-example-flutter](https://github.com/sergei-argutin/repdb-example-flutter)

## License

MIT for the example code (`LICENSE`). Bundle data under CC-BY-NC 4.0
(`LICENSE-preview.md`). PRs welcome — accessibility improvements especially.
