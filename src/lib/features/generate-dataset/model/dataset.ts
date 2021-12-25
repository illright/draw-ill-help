import { writable } from 'svelte/store';

import type { Sample } from './type';

/** A global in-memory dataset. */
export const dataset = writable<Sample[]>([]);
