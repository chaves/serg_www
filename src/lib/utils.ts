import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	return date.toLocaleDateString('en-US', options);
};

export const formatDateEvent = (startDate: string, endDate: string): string => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	if (startDate === endDate) {
		return start.toLocaleDateString('en-US', options);
	} else {
		return (
			start.toLocaleDateString('en-US', options) + ' - ' + end.toLocaleDateString('en-US', options)
		);
	}
};

type Dictionary = { [key: string]: unknown };

export const sortByKey = (
	list: Dictionary[],
	key: string,
	ascending: boolean = true
): Dictionary[] => {
	return list.sort((a, b) => {
		const aValue = a[key] as unknown;
		const bValue = b[key] as unknown;

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
		}

		if (typeof aValue === 'number' && typeof bValue === 'number') {
			if (aValue < bValue) return ascending ? -1 : 1;
			if (aValue > bValue) return ascending ? 1 : -1;
		}

		return 0;
	});
};

type RecordType = { [key: string]: unknown };

export const filterRecordsByKey = (
	records: RecordType[],
	key: string,
	value: unknown
): RecordType[] => {
	return records.filter((record) => record[key] === value);
};

export const getFirstTwoSentences = (input: string) => {
	const matches: string[] = input.match(/<p>(.*?)<\/p>/g) || []; // Match content inside <p> tags
	const result: string[] = [];
	let totalLength: number = 0;

	for (const match of matches) {
		const content: string = match
			.replace(/<\/?p>/g, '') // Remove <p> tags
			.replace(/<br\s*\/?>/g, '') // Remove <br> tags
			.trim();

		if (totalLength + content.length > 500) break;
		result.push(content);
		totalLength += content.length;
	}

	return result;
};

export const stripHtml = (html: string): string => {
	return html
		.replace(/<[^>]*>/g, '') // Remove all HTML tags
		.replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
		.replace(/&amp;/g, '&') // Replace &amp; with &
		.replace(/&lt;/g, '<') // Replace &lt; with <
		.replace(/&gt;/g, '>') // Replace &gt; with >
		.replace(/&quot;/g, '"') // Replace &quot; with "
		.replace(/&#39;/g, "'") // Replace &#39; with '
		.replace(/\s+/g, ' ') // Replace multiple spaces with single space
		.trim();
};

export const truncateText = (text: string, maxLength: number = 160): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + '...';
};

/**
 * Fetch options to ensure fresh data from CMS, bypassing all caches
 * This ensures new published content is immediately visible
 */
export const NO_CACHE_FETCH_OPTIONS: RequestInit = {
	cache: 'no-store',
	headers: {
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Pragma': 'no-cache',
		'Expires': '0'
	}
};
