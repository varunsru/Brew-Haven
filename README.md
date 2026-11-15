# ☕ Brew Haven — Artisan Coffee Shop Website

A modern, professional, multi-page website for **Brew Haven**, a local artisan coffee shop. Built entirely with **HTML5**, **CSS3**, and **Vanilla JavaScript** — no frameworks, no build tools, no npm.

---

## 🚀 Quick Start

1. **Download or clone** this repository
2. **Double-click** `index.html` to open in your browser
3. That's it! No installation required.

---

## 📁 Folder Structure

```
Brew-Haven/
│
├── index.html          # Home page (hero, features, about preview, menu preview, reviews)
├── about.html          # About page (story, values, team)
├── menu.html           # Menu page (filterable menu with category tabs)
├── gallery.html        # Gallery page (masonry grid with lightbox)
├── contact.html        # Contact page (form, info cards, Google Maps)
├── reviews.html        # Reviews page (slider + full grid of testimonials)
│
├── css/
│   ├── style.css       # Main stylesheet (design system, all components)
│   └── responsive.css  # Responsive breakpoints (mobile, tablet, desktop)
│
├── js/
│   └── script.js       # All JavaScript functionality (pure vanilla JS)
│
├── images/             # All website images
│   ├── hero_bg.jpg
│   ├── about_coffee.jpg
│   ├── gallery_1.jpg
│   ├── gallery_2.jpg
│   ├── gallery_3.jpg
│   ├── gallery_4.jpg
│   ├── gallery_5.jpg
│   └── gallery_6.jpg
│
└── README.md           # This file
```

---

## ✨ Features

### 🎨 Design
- **Modern, premium UI** with warm coffee-themed color palette
- **CSS Custom Properties** (variables) for easy theming
- **Dark Mode** with toggle button and localStorage persistence
- **Responsive design** — works on mobile, tablet, and desktop
- **Smooth animations** and micro-interactions
- **Custom scrollbar** styling
- **Google Fonts** (Playfair Display + Inter)

### 📄 Pages
| Page | Description |
|------|-------------|
| `index.html` | Home — Hero section, features, about preview, featured menu, testimonial slider, CTA |
| `about.html` | About — Company story, core values, team members |
| `menu.html` | Menu — Filterable menu with 6 categories and 22+ items |
| `gallery.html` | Gallery — Masonry grid with hover effects and full-screen lightbox |
| `contact.html` | Contact — Info cards, validated contact form, Google Maps embed |
| `reviews.html` | Reviews — Featured slider + grid of 9 customer reviews |

### ⚡ JavaScript Features (Pure Vanilla JS)
- ✅ **Sticky Navbar** — Transparent → solid on scroll
- ✅ **Mobile Navigation** — Hamburger menu with slide-in panel
- ✅ **Dark Mode Toggle** — Persists across pages via localStorage
- ✅ **Scroll Animations** — Elements animate in using IntersectionObserver
- ✅ **Scroll To Top Button** — Appears after scrolling 500px
- ✅ **Testimonial Slider** — Auto-advance, dots, prev/next, swipe support
- ✅ **Menu Category Tabs** — Filter items by category with animation
- ✅ **Gallery Lightbox** — Full-screen viewer with keyboard navigation
- ✅ **Contact Form Validation** — Real-time validation with error messages
- ✅ **Active Nav Highlight** — Current page link highlighted automatically
- ✅ **Smooth Scrolling** — For same-page anchor links

### 🎯 CSS Techniques
- **Flexbox** and **CSS Grid** layouts
- **CSS Custom Properties** (variables) for theming
- **clamp()** for fluid responsive typography
- **Gradients**, **box-shadows**, and **backdrop-filter**
- **CSS transitions** and **keyframe animations**
- **Media queries** for responsive breakpoints
- **Reduced motion** support (`prefers-reduced-motion`)
- **Print styles** for clean printing

### ♿ Accessibility
- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Skip-to-content link
- Keyboard-navigable lightbox (Escape, Arrow keys)
- Focus-visible outlines
- Proper heading hierarchy (single `<h1>` per page)
- Alt text on all images

### 🔍 SEO
- Descriptive `<title>` tags on every page
- Meta descriptions for search engines
- Open Graph meta tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Breadcrumb navigation on inner pages

---

## 🛠 Tech Stack

| Technology | Usage |
|-----------|-------|
| **HTML5** | Page structure, semantic elements |
| **CSS3** | Styling, animations, responsive design |
| **Vanilla JavaScript** | Interactivity, form validation, DOM manipulation |
| **Google Fonts** | Typography (Playfair Display, Inter) |
| **Google Maps Embed** | Location map on contact page |

### ❌ NOT Used
- No React / Vue / Angular / Svelte
- No Tailwind CSS / Bootstrap
- No jQuery
- No Node.js / npm / package.json
- No build tools (Webpack, Vite, etc.)
- No TypeScript
- No PHP or backend

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Coffee | `#2C1810` | Primary brand color |
| Warm Latte | `#D4A574` | Secondary / accent |
| Caramel | `#C8956C` | Accent / hover states |
| Cream White | `#FFF8F0` | Background |
| Rich Gold | `#B8860B` | Highlights |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `> 1400px` | Large desktop |
| `1024px` | Tablets & small laptops |
| `768px` | Mobile devices |
| `480px` | Small mobile |

---

## 🌐 Deployment

This website is ready to deploy directly to:

- **GitHub Pages** — Push to a repository and enable Pages
- **Netlify** — Drag and drop the folder
- **Vercel** — Import the repository
- **Any static hosting** — Upload the files via FTP

No build step required!

---

## 📝 Customization Guide

### Change Colors
Edit the CSS custom properties in `css/style.css` under the `:root` selector:

```css
:root {
  --primary: #2C1810;      /* Change your primary color */
  --secondary: #D4A574;    /* Change your accent color */
  --bg-primary: #FFF8F0;   /* Change background color */
}
```

### Change Business Info
Search and replace the following across all HTML files:
- Business name: "Brew Haven"
- Address: "123 Coffee Street, Downtown, CA 90210"
- Phone: "(555) 123-4567"
- Email: "hello@brewhaven.com"

### Add Menu Items
Copy an existing `.menu-card` block in `menu.html` and update the content. Make sure to set the correct `data-category` attribute for filtering.

---

## 📄 License

This project is open source and available for personal and commercial use.

---

**Made with ☕ and ❤️ by Brew Haven**
