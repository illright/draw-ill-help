export let markModelAsReady: (() => void) | undefined;

/** A promise that resolves after the model is loaded and warmed up. */
export const modelReady = new Promise<void>((resolve) => {
  markModelAsReady = resolve;
});
