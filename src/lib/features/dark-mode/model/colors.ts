import { readable } from 'svelte/store';

import { startMediaListener } from './start-media-listener';
import type { Colors } from '../types';

export const colors = readable<Colors>(
	{
		background: '#fff',
		foreground: '#000',
	},
	startMediaListener
);
