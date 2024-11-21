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

export const flattenObj = (data: unknown): unknown => {
	const isObject = (data: unknown): data is Record<string, unknown> =>
		Object.prototype.toString.call(data) === '[object Object]';
	const isArray = (data: unknown): data is unknown[] =>
		Object.prototype.toString.call(data) === '[object Array]';
	const flatten = (data: any) => {
		if (!data.attributes) return data;

		return {
			id: data.id,
			...data.attributes
		};
	};

	if (isArray(data)) {
		return data.map((item) => flattenObj(item));
	}

	if (isObject(data)) {
		if (isArray(data.data)) {
			data = [...data.data];
		} else if (isObject(data.data)) {
			data = flatten({ ...data.data });
		} else if (data.data === null) {
			data = null;
		} else {
			data = flatten(data);
		}

		if (isObject(data)) {
			for (const key in data) {
				data[key] = flattenObj(data[key]);
			}
		}

		return data;
	}

	return data;
};

type Dictionary = { [key: string]: unknown };

export const sortByKey = (list: Dictionary[], key: string, ascending: boolean = true): Dictionary[] => {
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

export const filterRecordsByKey = (records: RecordType[], key: string, value: unknown): RecordType[] => {
    return records.filter(record => record[key] === value);
};

