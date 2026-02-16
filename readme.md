# EZPaint

<div align="center">

### Simple and Fast Web-based Paint Application

[![Live Demo](https://img.shields.io/badge/🎨_Live_Demo-ez--paint.web.app-brightgreen?style=for-the-badge)](https://ez-paint.web.app/)

</div>

<br>

## 🎯 Overview

EZPaint is a web-based paint application built as an alternative to macOS Preview's basic image editing tools. It provides an intuitive interface for quick image editing directly in your browser with no installation required.

**Live Demo**: [https://ez-paint.web.app/](https://ez-paint.web.app/)

<br>

## ✨ Features

- **🎨 Drawing Tools**
  - Free-hand pen with customizable color and thickness
  - Color picker with full RGB spectrum
  - Adjustable brush size

- **✂️ Image Editing**
  - Drag-and-drop image upload
  - Crop tool for precise image trimming
  - Download edited images as PNG

- **⌨️ Keyboard Shortcuts**
  - `Ctrl/Cmd + Z`: Undo
  - `Ctrl/Cmd + C`: Copy image to clipboard
  - `Ctrl/Cmd + V`: Paste image from clipboard

- **💾 Auto-save**
  - Canvas state persisted to localStorage
  - Resume your work anytime

<br>

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=React&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=flat)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white)

</div>

### Core Technologies

- **React 19** - UI framework with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool with SWC
- **Zustand** - Lightweight state management
- **TailwindCSS** - Utility-first CSS framework
- **Firebase Hosting** - Fast and reliable hosting

### Key Libraries

- `react-colorful` - Color picker component
- `react-image-crop` - Image cropping functionality
- `react-rangeslider` - Thickness slider
- `react-ga4` - Google Analytics integration

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
# Run development server
pnpm dev
# or
npm run start

# Open http://localhost:5173
```

### Build

```bash
# Build for production
pnpm build
# or
npm run build

# Preview production build
pnpm preview
# or
npm run preview
```

<br>

## 📁 Project Structure

```
ezpaint/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Canvas/       # Main drawing canvas
│   │   ├── Crop/         # Image cropping tool
│   │   ├── ColorPicker/  # Color selection
│   │   ├── Range/        # Thickness slider
│   │   └── ...
│   ├── layout/           # Layout components (Header, Footer, Main)
│   ├── pages/            # Route pages
│   ├── router/           # React Router configuration
│   ├── zustand/          # Zustand store
│   ├── utils/            # Utility functions (canvas operations)
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # App constants
│   └── styles/           # Global styles
├── public/               # Static assets
└── CLAUDE.md            # AI coding assistant instructions
```

<br>

## 🏗️ Architecture

### State Management

Global state managed by Zustand and persisted to localStorage:
- Current tool selection (pen, crop, color picker, etc.)
- Drawing color and thickness
- Canvas interaction state

### Canvas Drawing System

Core drawing logic in `src/utils/canvas.ts`:
- High-quality image rendering (`imageSmoothingQuality: 'high'`)
- Undo/redo history management
- Clipboard integration (copy/paste)
- Auto-resize images to fit viewport while maintaining aspect ratio

### Path Aliases

```typescript
@ → src/
@components → src/components/
@layout → src/layout/
@pages → src/pages/
@utils → src/utils/
@router → src/router/
```

<br>

## 🎨 Code Style

- **ESLint**: Airbnb + TypeScript configuration
- **Prettier**: Code formatting
- Arrow functions for all components
- `.tsx` extension for JSX files

<br>

## 📝 License

This project is licensed under the MIT License - see below for details.

MIT © [macjjuni](https://github.com/macjjuni)

### Third-party Licenses

This project uses the following open-source libraries:

- **react-image-crop** - ISC License

<br>

## 👤 Author

**macjjuni**
- GitHub: [@macjjuni](https://github.com/macjjuni)
- Email: macjjuni@gmail.com

<br>

---

<div align="center">

**[⬆ back to top](#ezpaint)**

</div>
