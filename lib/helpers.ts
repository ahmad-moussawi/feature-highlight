import type { HighlightArgs } from "./types";

export function getElementOffset(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	const width = el.offsetWidth;
	const height = el.offsetHeight;
	// const left = rect.left + window.scrollX + width / 2;
	// const top = rect.top + window.scrollY + height / 2;
	const left = rect.left + width / 2;
	const top = rect.top + height / 2;
	return { left, top };
}

/**
 * Creates a debounced function that delays invoking fn until after wait ms have elapsed since the last time it was invoked.
 * Useful for resize or scroll event handlers.
 */
export function debounce<T extends () => void>(fn: T, wait: number): T {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (() => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(), wait);
	}) as T;
}

export function isElementOutOfViewport(element: HTMLElement) {
	const bounding = element.getBoundingClientRect();

	// Check if any side of the element is outside the viewport
	const isTopOutOfView = bounding.top < 0;
	const isLeftOutOfView = bounding.left < 0;
	const isBottomOutOfView =
		bounding.bottom >
		(window.innerHeight || document.documentElement.clientHeight);
	const isRightOutOfView =
		bounding.right >
		(window.innerWidth || document.documentElement.clientWidth);

	// Return true if any part of the element is outside the viewport
	return (
		isTopOutOfView || isLeftOutOfView || isBottomOutOfView || isRightOutOfView
	);
}

export function getElement(selector: string | HTMLElement) {
	if (typeof selector === "string") {
		return document.querySelector<HTMLElement>(selector);
	}

	return selector;
}

export function getOptions(
	options: Partial<HighlightArgs> = {},
): HighlightArgs {
	const defaultOptions = {
		radiusPadding: 0,
		borderColor: "#fff",
		color: "#388E3C",
		borderWidth: 2,
		opacity: 0.8,
		radius: 0,
	};

	return { ...defaultOptions, ...options };
}
