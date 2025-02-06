# Mölu - Word Guessing Game

Mölu is an interactive multiplayer word guessing game built with SvelteKit and TailwindCSS. Players take turns guessing words while their teammates provide clues, making it perfect for parties and social gatherings.

## Features

- 🎮 Multiplayer support
- ⏱️ Customizable timer settings
- ❤️ Lives system
- 🎲 Optional punishment system
- 🌐 Responsive design
- 🎨 Modern UI with animations

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/karlromets/molu.git
cd molu
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Rules

1. Players take turns being the guesser
2. The guesser stands with their back to the screen
3. Other players provide clues about the word shown on screen
4. The guesser must guess the word within the time limit
5. Players lose lives for incorrect guesses
6. Last player standing wins!

## Building for Production

To create a production build:

```bash
npm run build
```

You can preview the production build with:
```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
