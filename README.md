# feature-highlight

Feature Highlight is a lightweight TypeScript library for visually highlighting elements on a web page, perfect for onboarding, tutorials, or drawing user attention to features.

## ✨ Features

- ⚡ **No dependencies** — Works out of the box, no extra packages required
- 📦 **Tiny footprint** — Less than 2KB gzipped
- 📱 **Responsive** — Adapts to any screen size
- 🎨 **Customizable** — Easily adjust color, radius, border, and opacity
- 🚀 **Fast & efficient** — Minimal DOM manipulation for smooth performance
- 🛠️ **TypeScript support** — Strongly typed API for safer development

<img src="public/demo2.webp" width="100%" alt="Demo" />

Install via npm:

```bash
npm install feature-highlight
```

## Usage

Import the main highlight function and use it to highlight any element by selector or reference:

```ts
import { highlight, removeHighlight } from "feature-highlight";

highlight("#newFeatureButton", {
  color: "#388E3C",
  borderWidth: 3,
  borderColor: "#fff",
  opacity: 0.7,
});

const removeButton = document.querySelector("#removeHighlight");
removeButton.addEventListener("click", () => removeHighlight());
```

### CSS variable

the library automatically set the following CSS variables to the root SVG element `#fhRoot`

```
--fh-radius // the radius of the highlight circle
--fh-left // left offset
--fh-top // top offset
--fh-right // right offset relative to the window width
--fh-bottom // bottom offset relative to the window height
```

### Smooth transitions

You can make the transition smooth by adding the appropriate css transition rules, as an example:

```css
#fhRoot circle {
  transition: 300ms linear all;
}
```

### Bouncing example

You can benefit from the CSS variable properties to make a bouncing effect to the highlight circle

```
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

### highlight(elOrSelector, options)

- `elOrSelector`: string (CSS selector) or HTMLElement
- `options`: Partial<HighlightArgs>
  - `radius`: number — Highlight circle radius (default: auto)
  - `radiusPadding`: number — adjust the radius size, useful only when the `radius` is automatically calculated (`radius: undefined`)
  - `color`: string — Highlight color (default: #388E3C)
  - `borderWidth`: number — Border width (default: 2)
  - `borderColor`: string — Border color (default: #fff)
  - `opacity`: number — Highlight opacity (default: 0.8)
  - `cssClass`: string — A css class set to the root svg element, useful for styling and animation

## License

MIT
