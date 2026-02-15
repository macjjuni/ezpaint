# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EZPaint is a web-based paint application built as an alternative to macOS Preview's basic image editing tools. Provides drawing, cropping, undo/redo, clipboard integration, and image downloads.

**Stack**: React 18 + TypeScript + Vite + Emotion (CSS-in-JS) + Zustand + Firebase Hosting

**Live**: https://ez-paint.web.app/

## Development Commands

```bash
# Install dependencies
pnpm
# or
npm i

# Run dev server
pnpm dev
# or
npm run start

# Build for production (runs TypeScript compiler then Vite build)
pnpm build
# or
pnpm run build

# Preview production build
pnpm preview
# or
pnpm run preview
```

## Architecture

### Application Flow

- **Entry**: `src/main.tsx` → `RouterProvider` with routes from `src/router/Canvas.tsx`
- **Root**: `App.tsx` sets up HelmetProvider, ThemeProvider, global layout (Header/Main/Footer)
- **Routes**: Home page (main canvas) and Error page (404)

### State Management (Zustand)

Global state in `src/zustand/store.ts` persisted to localStorage as `ezPaint`:
- `tool`: Current tool (null | 'picker' | 'thick' | 'pen' | 'crop')
- `color`: Drawing color
- `thick`: Line thickness
- `inCanvas`: Whether cursor is in canvas bounds

### Canvas Drawing System

Core logic in `src/utils/canvas.ts`:

- **`drawImageInCanvas(canvas, image)`**: Loads File/Blob onto canvas, auto-resizes to viewport while maintaining aspect ratio
- **`copyImageInCanvas(canvas)`**: Writes canvas to clipboard as PNG
- **`pasteImageInCanvas(canvas, render)`**: Reads clipboard image and draws to canvas
- **`drawCanvas(ctx, moveToXY, lineToXY)`**: Draws line between points
- **`drawPoint(ctx, moveToXY, color, thick)`**: Draws single point for pen tool
- **`dataUrlDrawInCanvas(canvas, canvasData)`**: Renders base64 image to canvas
- **`downloadImage(canvas)`**: Exports canvas as timestamped PNG
- **`cropImage(image, crop)`**: Returns cropped region as base64 + dimensions

All drawing uses `imageSmoothingQuality: 'high'`.

### Key Components

- **Canvas**: Main drawing surface with undo/redo history, keyboard shortcuts (Ctrl+Z/C/V)
- **Toolbox**: Tool selection UI
- **ColorPicker**: Uses react-colorful
- **Range**: Thickness slider via react-rangeslider
- **Crop**: Image cropping via react-image-crop
- **DrawCursor**: Custom cursor following mouse during drawing
- **DropArea**: Drag-and-drop image upload zone

### Styling (Emotion)

- Global styles: `src/styles/global.tsx`
- Component styles: Typically in `style.ts` or `style.tsx` alongside components

### Path Aliases

Configured in `vite.config.ts`:
```
@ → src/
@components → src/components/
@layout → src/layout/
@pages → src/pages/
@styles → src/styles/
@utils → src/utils/
@router → src/router/
```

## Code Style

**ESLint**: Airbnb + TypeScript config

Key rules:
- Use arrow functions for all components
- `.tsx` extension required for JSX
- `console` statements allowed
- `react-hooks/exhaustive-deps` disabled
- Property mutation allowed in function params

## Deployment

Firebase Hosting (`firebase.json`):
- Build output: `dist/`
- SPA routing: All paths → `/index.html`

## Additional Features

- **SEO**: react-helmet-async in `src/components/Helmet`
- **Analytics**: Google Analytics 4 via react-ga4 in `src/components/GoogleGA`
- **Environment**: Vite env vars in `.env.development` and `.env.production`