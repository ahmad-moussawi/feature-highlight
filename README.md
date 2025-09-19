# feature-highlight

Feature Highlight is a lightweight TypeScript library for visually highlighting elements on a web page, useful for onboarding, tutorials, or drawing user attention to features.

<!-- <video width="100%" autoplay loop src="public/demo.mp4"></video> -->

<img src="public/demo.webp" width="100%" alt="Demo" />

## Installation

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

// remove highlight
removeHighlight();
```

### Smooth transitions

You can make the transition smooth by adding the appropriate css transition rules, as an example:

```css
#hopSvg circle {
  transition: 300ms linear all;
}
```

### Bouncing example
```
#hopSvg circle {
    animation: bounce 800ms alternate infinite;
}

@keyframes bounce {
    0% {
        r: 30;
    }
    100% {
        r: 35;
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
