# Deutsch Lernen 🇩🇪

A free, offline-capable German learning portal for English speakers.

## Features

- **4 Learning Sections:**
  - 📚 Grammar – Explanations with examples and exercises
  - 🔤 Vocabulary – Themed word lists with interactive flashcards
  - 🗣️ Pronunciation – Phonetic guides with English sound comparisons
  - 🌍 Everyday German – Practical dialogues for real-life scenarios

- **3 Levels:** A2 → B1 → B2 progression
- **Progress Tracking:** Your completed lessons are saved locally
- **Offline-First:** Works without internet after first load
- **Mobile-First Design:** Looks great on any device

## Tech Stack

- [Vite](https://vitejs.dev/) + TypeScript
- LocalStorage for progress persistence
- GitHub Pages deployment (CNAME configured)
- Mobile-first CSS

## Usage

1. Open `index.html` in a browser
2. Or deploy to GitHub Pages (CNAME already configured)
3. Start learning! 🎉

## Structure

```
learning-german/
├── index.html              # Main entry point
├── src/
│   ├── main.ts             # Vite app bootstrap
│   ├── app.ts              # Main application logic and UI rendering
│   ├── style.css           # All styles
│   ├── types.ts            # Shared TypeScript interfaces
│   └── data/               # Static learning content
│       ├── lessons.ts      # Chapters grouped into CEFR levels
│       ├── vocabulary.ts   # German–English word list
│       ├── grammar.ts      # Grammar rule explanations
│       ├── grammar-exercises.ts
│       ├── glossary.ts
│       └── achievements.ts
├── public/                 # Static assets (manifest, etc.)
├── dist/                   # Vite production build output
├── package.json            # Vite + TypeScript dependencies
├── tsconfig.json
├── vite.config.ts
└── CNAME                   # GitHub Pages custom domain
```

## License

MIT – See LICENSE file
