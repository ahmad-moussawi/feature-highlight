import { registerOnHighlight, highlight, removeHighlight } from "../lib/main";

export function findPlace(
	box: { width: number; height: number },
	blocked: { left: number; top: number; width: number; height: number },
	windowArea: { width: number; height: number },
) {
	// Try to place the box in one of the four sides around the blocked area
	function clampTop(top: number) {
		return Math.max(0, Math.min(top, windowArea.height - box.height));
	}
	function clampLeft(left: number) {
		return Math.max(0, Math.min(left, windowArea.width - box.width));
	}
	const positions = [
		// Left of blocked
		{
			left: clampLeft(blocked.left - box.width),
			top: clampTop(blocked.top),
		},
		// Right of blocked
		{
			left: clampLeft(blocked.left + blocked.width),
			top: clampTop(blocked.top),
		},
		// Above blocked
		{
			left: clampLeft(blocked.left),
			top: clampTop(blocked.top - box.height),
		},
		// Below blocked
		{
			left: clampLeft(blocked.left),
			top: clampTop(blocked.top + blocked.height),
		},
	];

	// Check if the box at a position is within windowArea and does not overlap blocked
	function isValid(pos: { left: number; top: number }) {
		const boxRect = {
			left: pos.left,
			top: pos.top,
			right: pos.left + box.width,
			bottom: pos.top + box.height,
		};
		// Check within window
		if (
			boxRect.left < 0 ||
			boxRect.top < 0 ||
			boxRect.right > windowArea.width ||
			boxRect.bottom > windowArea.height
		) {
			return false;
		}
		// Check overlap with blocked
		const blockedRect = {
			left: blocked.left,
			top: blocked.top,
			right: blocked.left + blocked.width,
			bottom: blocked.top + blocked.height,
		};
		const overlap =
			boxRect.left < blockedRect.right &&
			boxRect.right > blockedRect.left &&
			boxRect.top < blockedRect.bottom &&
			boxRect.bottom > blockedRect.top;
		return !overlap;
	}

	// Return the first valid position
	for (const pos of positions) {
		if (isValid(pos)) {
			return pos;
		}
	}
	// If none found, fallback to top-left corner
	return { left: 0, top: 0 };
}

highlight("nav", { opacity: 0.8, color: "#50e3c2" });

const overlay = document.createElement("div");
overlay.className = "overlay";
overlay.innerHTML = [
	"<h1>New side nav 🎉</h1>",
	"<p>Checkout the new side nav for quicker access</p>",
].join("");

document.body.append(overlay);

registerOnHighlight((el, offset) => {
	const place = findPlace(
		{
			width: overlay.clientWidth,
			height: overlay.clientHeight,
		},
		{
			left: Math.max(0, offset.left - 30),
			top: Math.max(0, offset.top - 30),
			height: offset.top + offset.height + 30,
			width: offset.left + offset.width + 30,
		},
		{
			width: window.innerWidth,
			height: window.innerHeight,
		},
	);

	overlay.style.left = `${place.left}px`;
	overlay.style.top = `${place.top}px`;
});

const queue = [
	() => {
		highlight(".user-info", {
			radius: 70,
			color: "#FFC107",
			borderColor: "black",
			borderWidth: 8,
			opacity: 0.9,
			cssClass: "bounce",
		});

		overlay.style.setProperty("--color", "#000");
		overlay.innerHTML = [
			"<h1>User profile</h1>",
			"<p>New user profile</p>",
		].join("");
	},

	() => {
		highlight(".chart-card", {
			color: "violet",
			borderColor: "#631072",
			borderWidth: 8,
			opacity: 0.9,
			cssClass: "bounce",
		});

		overlay.innerHTML = [
			"<h1>New charts 🎉</h1>",
			"<p>Charts are here</p>",
		].join("");
	},

	() => {
		highlight(".logo", {
			color: "black",
			borderColor: "#FFC107",
			borderWidth: 8,
			opacity: 0.8,
			radiusPadding: 90,
		});

		overlay.style.setProperty("--color", "#fff");
		overlay.innerHTML = [
			"<h1>Go home</h1>",
			"<p>Click here to go back</p>",
		].join("");
	},

	() => {
		highlight(".stat-card:nth-child(3)", {
			color: "#4caf50",
			borderColor: "#90ea29",
			borderWidth: 8,
			opacity: 0.9,
			cssClass: "bounce",
		});

		overlay.style.setProperty("--color", "#3f51b5");
		overlay.innerHTML = [
			"<h1>Advanced Stats</h1>",
			"<p>Here are the stats</p>",
		].join("");
	},
];

// for (let i = 0; i < queue.length; i++) {
//   setTimeout(() => {
//     queue[i]();
//   }, i * 2000);
// }
let i = 0;

document.querySelector("#fhRoot")?.addEventListener("click", () => {
	queue[i++ % queue.length]();
});
