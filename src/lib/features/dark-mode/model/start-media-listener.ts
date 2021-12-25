import { browser } from '$app/env';
import type { StartStopNotifier } from 'svelte/store';

import type { Colors } from '../types';

export const startMediaListener: StartStopNotifier<Colors> = (set) => {
  if (!browser) {
    return;
  }

  const html = document.querySelector('html');
  const darkColorsMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function setColorsFromRoot(e: MediaQueryListEvent) {
    if (html !== null) {
      const cssVars = getComputedStyle(html);
      const theme = e.matches ? 'dark' : 'light';

      set({
        background: cssVars.getPropertyValue(`--canvas-${theme}-bg`),
        foreground: cssVars.getPropertyValue(`--canvas-${theme}-fg`),
      });
    }
  }

  darkColorsMedia.addEventListener('change', setColorsFromRoot);

  return () => {
    darkColorsMedia.removeEventListener('change', setColorsFromRoot);
  };
};
