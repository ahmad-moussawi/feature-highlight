export interface OffsetData {
	radius: number;
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

export interface HighlightArgs {
	radius: number;
	radiusPadding: number;
	color: string;
	borderWidth: number;
	borderColor: string;
	opacity: number;
	cssClass?: string;
}
