# 🛠️ Pockly

A modern, fast, and lightweight **online toolkit** for everyday development and productivity tasks. Built with **Angular 20 + Tailwind CSS**.

🔗 [Live Demo](https://pockly.vercel.app)  
📂 [GitHub](https://github.com/luis-sagx/pockly)

---

## ✨ Features

### �_TEXT Tools

| Tool               | Description                                                                         | URL             |
| ------------------ | ----------------------------------------------------------------------------------- | --------------- |
| **Word Counter**   | Count words, characters, sentences, and paragraphs with instant feedback and export | `/word-count`   |
| **Text Case Tool** | Convert between UPPERCASE, lowercase, Title Case, Sentence case, and more           | `/text-case`    |
| **Diff Checker**   | Compare two texts side-by-side with clear highlighting and export                   | `/diff-checker` |
| **Quick Notes**    | Free online notepad. Save notes instantly, no login required                        | `/quick-notes`  |

### 📦 JSON Tools

| Tool               | Description                                                                                        | URL               |
| ------------------ | -------------------------------------------------------------------------------------------------- | ----------------- |
| **JSON Generator** | Build JSON objects interactively with type support (text, number, boolean, date, UUID, email, url) | `/json-generator` |
| **JSON Templates** | Pre-built JSON structures for testing (users, products, orders, API responses)                     | `/json/templates` |
| **JSON Convert**   | Transform between JSON, CSV, XML, and YAML formats                                                 | `/json/convert`   |
| **JSON Utils**     | Format, minify, sort keys, validate, flatten/unflatten, diff, query                                | `/json/utils`     |

### 🖼️ Image Tools

| Tool                   | Description                                                        | URL                   |
| ---------------------- | ------------------------------------------------------------------ | --------------------- |
| **Base64 Converter**   | Encode images to Base64 and decode Base64 back to images           | `/base64`             |
| **Image Resize**       | Resize images by exact pixel dimensions or percentage with preview | `/image-resize`       |
| **Format Converter**   | Convert between PNG, JPEG, WEBP, BMP formats                       | `/format-converter`   |
| **Background Remover** | AI-powered background removal in one click                         | `/background-remover` |

### 🔐 Developer Tools

| Tool                   | Description                                                 | URL                   |
| ---------------------- | ----------------------------------------------------------- | --------------------- |
| **Password Generator** | Generate secure passwords with custom length and complexity | `/password-generator` |
| **QR Generator**       | Create QR codes with custom colors and error correction     | `/qr-generator`       |
| **URL Shortener**      | Shorten URLs for easy sharing                               | `/url-shortener`      |

### 🧮 Calculator Tools

| Tool                      | Description                                        | URL                      |
| ------------------------- | -------------------------------------------------- | ------------------------ |
| **Percentage Calculator** | Calculate percentages, percentage change, and more | `/percentage-calculator` |
| **Currency Converter**    | Convert currencies with exchange rates             | `/currency-converter`    |
| **Unit Converter**        | Convert length, weight, temperature, and more      | `/unit-converter`        |

---

## 📦 Tech Stack

- **Angular 20** with Signals and standalone components
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **pnpm** as package manager
- **Vercel** for deployment

---

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

```bash
# Build for production
pnpm build

# Run tests
pnpm test
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── nav/           ← navigation bar
│   │   │   └── footer/       ← footer
│   │   ├── pages/
│   │   │   ├── home/              ← landing page
│   │   │   ├── json-generator/     ← JSON builder
│   │   │   ├── json-templates/    ← JSON templates
│   │   │   ├── json-convert/      ← JSON converter
│   │   │   ├── json-utils/        ← JSON utilities
│   │   │   ├── text-case-tool/    ← text case converter
│   │   │   ├── word-count/        ← word counter
│   │   │   ├── diff-checker/       ← text diff
│   │   │   ├── base64-tool/        ← base64 converter
│   │   │   ├── image-resize/       ← image resizer
│   │   │   ├── format-converter/    ← image format converter
│   │   │   ├── background-remover/   ← background remover
│   │   │   ├── password-generator/  ← password generator
│   │   │   ├── qr-generator/       ← QR code generator
│   │   │   ├── url-shortener/      ← URL shortener
│   │   │   ├── quick-notes/        ← online notepad
│   │   │   ├── percentage-calculator/
│   │   │   ├── currency-converter/
│   │   │   └── unit-converter/
│   │   └── ui/
│   │       ├── input-box/
│   │       ├── output-box/
│   │       ├── tool-card/
│   │       └── copy-button/
│   ├── services/
│   │   └── seo.service.ts
│   ├── app.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.css
└── index.html
```

---

## ⚡ All Tools Quick Reference

| Category | Tool               | Path                     |
| -------- | ------------------ | ------------------------ |
| Text     | Word Counter       | `/word-count`            |
| Text     | Text Case          | `/text-case`             |
| Text     | Diff Checker       | `/diff-checker`          |
| Text     | Quick Notes        | `/quick-notes`           |
| JSON     | Generator          | `/json-generator`        |
| JSON     | Templates          | `/json/templates`        |
| JSON     | Convert            | `/json/convert`          |
| JSON     | Utils              | `/json/utils`            |
| Image    | Base64             | `/base64`                |
| Image    | Resize             | `/image-resize`          |
| Image    | Format Converter   | `/format-converter`      |
| Image    | Background Remover | `/background-remover`    |
| Dev      | Password Generator | `/password-generator`    |
| Dev      | QR Generator       | `/qr-generator`          |
| Dev      | URL Shortener      | `/url-shortener`         |
| Calc     | Percentage         | `/percentage-calculator` |
| Calc     | Currency           | `/currency-converter`    |
| Calc     | Unit               | `/unit-converter`        |
