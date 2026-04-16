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

- Plain HTML/CSS/JavaScript (no build step required)
- Service Worker for offline capability
- LocalStorage for progress persistence
- Single-page app with hash routing

## Usage

1. Open `index.html` in a browser
2. Or deploy to GitHub Pages (CNAME already configured)
3. Start learning! 🎉

## Structure

```
deutsch-lernen/
├── index.html          # Main entry point
├── manifest.json       # PWA manifest
├── sw.js               # Service worker for offline support
├── css/
│   └── style.css       # All styles
└── js/
    ├── data.js         # Lesson content (grammar, vocab, etc.)
    ├── router.js       # Hash-based routing
    ├── components.js   # UI component functions
    └── app.js          # Main application logic
```

## License

MIT – See LICENSE file
