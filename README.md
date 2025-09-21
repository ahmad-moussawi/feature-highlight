# feature-highlight

A lightweight TypeScript library for visually highlighting elements on web pages. Perfect for onboarding, tutorials, and drawing attention to features.

Checkout the [live demo](https://ahmad-moussawi.github.io/feature-highlight/)

## ✨ Features

- ⚡ **Zero dependencies** — Works out of the box
- 📦 **Tiny footprint** — Less than 2KB gzipped
- 📱 **Responsive** — Adapts to any screen size
- 🎨 **Customizable** — Adjust color, radius, border, and opacity
- 🚀 **Performant** — Minimal DOM manipulation
- 🛠️ **TypeScript ready** — Fully typed API

## Installation

```bash
npm install feature-highlight
```

or via script tag

```html
<script src="https://unpkg.com/feature-highlight"></script>
<script>
  const { highlight, removeHighlight, registerOnHighlight } = FeatureHighlight;
</script>
```

## Quick Start

Highlight elements using CSS selectors or element references:

```ts
import { highlight, removeHighlight } from "feature-highlight";

// Highlight an element
highlight("#newFeatureButton", {
  color: "#388E3C",
  borderWidth: 3,
  borderColor: "#fff",
  opacity: 0.7,
});

// Remove highlight
removeHighlight();
```

## Advanced Usage

### Overlay Text

Add text overlays using the `registerOnHighlight` callback:

```ts
import { registerOnHighlight } from "feature-highlight";

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

registerOnHighlight((el: HTMLElement, offset: OffsetData) => {
  overlay.innerHTML = `<h1>New side nav 🎉</h1>
    <p>Quick access to navigation</p>`;
});
```

and add the following CSS styles

```CSS
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  width: 500px;
  z-index: 999;
}
```

### CSS Variables

The library sets CSS variables on the `#fhRoot` element:

- `--fh-radius` — Highlight circle radius
- `--fh-left`, `--fh-top` — Position offsets
- `--fh-right`, `--fh-bottom` — Right/bottom offsets

### Animations

Add smooth transitions:

```css
#fhRoot circle {
  transition: 300ms ease all;
}
```

Create bouncing effects:

```css
#fhRoot circle {
  animation: bounce 800ms alternate infinite;
}

@keyframes bounce {
  0% {
    r: var(--fh-radius);
  }
  100% {
    r: calc(var(--fh-radius) + 10px);
  }
}
```

## API

### `highlight(elOrSelector, options)`

**Parameters:**

- `elOrSelector`: CSS selector string or HTMLElement
- `options`: Configuration object
  - `radius`: number — Circle radius (auto-calculated if undefined)
  - `radiusPadding`: number — Adjust auto-calculated radius
  - `color`: string — Highlight color (default: "#388E3C")
  - `borderWidth`: number — Border width (default: 2)
  - `borderColor`: string — Border color (default: "#fff")
  - `opacity`: number — Opacity (default: 0.8)
  - `cssClass`: string — CSS class for the root SVG element

## License

MIT
