let resizeObserver: ResizeObserver | undefined = undefined;

/** Get the dimensions of an observed element in a cross-browser way. */
function getDimensions(entry: ResizeObserverEntry) {
  if (entry.contentBoxSize) {
    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
    const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
      ? entry.contentBoxSize[0]
      : entry.contentBoxSize;
    return { width: contentBoxSize.inlineSize, height: contentBoxSize.blockSize };
  } else {
    return { width: entry.contentRect.width, height: entry.contentRect.height };
  }
}

/** Watch the container for size changes and resize the canvas to fit the available space. */
export function autoResize(canvas: fabric.Canvas, container: HTMLElement): void {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const dimensions = getDimensions(entry);
      canvas.setDimensions(dimensions);
    }
  });
  resizeObserver.observe(container);
}

/** Stop watching the container for size changes. */
export function stopAutoResizing(): void {
  resizeObserver?.disconnect();
  resizeObserver = undefined;
}
