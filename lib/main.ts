import type { HighlightArgs } from "./types";
import {
	debounce,
	getElement,
	getElementOffset,
	getOptions,
	isElementOutOfViewport,
} from "./helpers";

let svgEl: SVGSVGElement | undefined;
let debouncedDraw: () => void;
let originalOverflow: string | undefined = undefined;

function draw(el: HTMLElement, options: HighlightArgs) {
	const offest = getElementOffset(el);

	let computedRadius = options.radius;

	if (!computedRadius || computedRadius === 0) {
		const side = Math.min(
			Math.max(el.offsetWidth, el.offsetHeight),
			window.innerHeight * 0.8,
			window.innerWidth * 0.8,
		);
		computedRadius = options.radiusPadding + Math.ceil(Math.sqrt((side / 2) ** 2));
	}

	if (!svgEl) {
		svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgEl.id = "hopSvg";
		svgEl.setAttribute("height", "100vh");
		svgEl.setAttribute("width", "100vw");
		svgEl.style.position = "fixed";
		svgEl.style.top = "0";
		svgEl.style.left = "0";
		svgEl.innerHTML = `<defs>
      <mask id="hopMask">  
          <rect x="0" y="0" width="100%" height="100%" fill="white" />    
          <circle cx="${offest.left}" cy="${offest.top}" r="${computedRadius}" fill="black"/>
      </mask>
    </defs>
  
    <rect id="hopBg" width="100%" height="100%" fill="${options.color}" opacity="${options.opacity}" mask="url(#hopMask)" />
    <circle id="hopBorder" cx="${offest.left}" cy="${offest.top}" r="${computedRadius}" fill="transparent" stroke="${options.borderColor}" stroke-width="${options.borderWidth}"/>`;
		document.body.appendChild(svgEl);
	}

	for (const entry of svgEl.classList) {
		svgEl.classList.remove(entry);
	}

	if (options.cssClass) {
		svgEl.classList.add(...options.cssClass.split(/\s+/g));
	}

	const circles = svgEl.querySelectorAll<SVGCircleElement>("circle");
	for (const circle of circles) {
		circle.setAttribute("cx", offest.left.toString());
		circle.setAttribute("cy", offest.top.toString());
		circle.setAttribute("r", computedRadius.toString());

		if (circle.id === "hopBorder") {
			circle.setAttribute("stroke", options.borderColor);
			circle.setAttribute("stroke-width", options.borderWidth.toString());
		}
	}

	const bgs = svgEl.querySelectorAll<SVGRectElement>("#hopBg");
	for (const bg of bgs) {
		bg.setAttribute("fill", options.color);
		bg.setAttribute("opacity", options.opacity.toString());
	}
}

export function highlight(
	elOrSelector: string | HTMLElement,
	args: Partial<HighlightArgs> = {},
) {
	const el = getElement(elOrSelector);
	if (!el) {
		console.debug("Cannot find el: %s", elOrSelector);
		return;
	}

	const options = getOptions(args);

	const isOutsideViewport = isElementOutOfViewport(el);

	if (isOutsideViewport) {
		el.scrollIntoView({ behavior: "smooth", block: "center" });
		setTimeout(() => {
			draw(el, options);
		}, 600);
	} else {
		draw(el, options);
	}

	debouncedDraw = debounce(() => draw(el, options), 30);

	window.addEventListener("resize", debouncedDraw);

	if (originalOverflow === undefined) {
		originalOverflow = document.body.style.overflow;
	}

	document.body.style.overflow = "hidden";

	return el;
}

export function removeHighlight() {
	if (svgEl) {
		window.removeEventListener("resize", debouncedDraw);
		document.body.removeChild(svgEl);
		document.body.style.overflow = originalOverflow ?? "";
		svgEl = undefined;
	}
}
