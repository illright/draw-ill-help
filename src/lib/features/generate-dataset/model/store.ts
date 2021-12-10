import { writable } from 'svelte/store';

import type { Sample } from './type';

export const dataset = writable<Sample[]>([]);
