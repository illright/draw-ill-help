import { browser } from '$app/env';
import type { StartStopNotifier } from 'svelte/store';

import type { Colors } from '../types';

export const startMediaListener: StartStopNotifier<Colors> = (set) => {
  if (!browser) {
    return;
  }

  const html = document.querySelector('html');
  const darkColorsMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function setColorsFromRoot(_e: MediaQueryList | MediaQueryListEvent) {
    if (html !== null) {
      const cssVars = getComputedStyle(html);

      set({
        background: cssVars.getPropertyValue('--background'),
        foreground: cssVars.getPropertyValue('--on-background'),
      });
    }
  }

  darkColorsMedia.addEventListener('change', setColorsFromRoot);
  setColorsFromRoot(darkColorsMedia);

  return () => {
    darkColorsMedia.removeEventListener('change', setColorsFromRoot);
  };
};
