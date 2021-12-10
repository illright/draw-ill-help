let resizeObserver: ResizeObserver | undefined = undefined;

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

export function autoResize(canvases: fabric.Canvas[], container: HTMLElement): void {
  if (resizeObserver !== undefined) {
    resizeObserver.disconnect();
  }

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const dimensions = getDimensions(entry);
      for (const canvas of canvases) {
        canvas.setDimensions(dimensions);
      }
    }
  });
  resizeObserver.observe(container);
}

export function stopAutoResizing(): void {
  resizeObserver?.disconnect();
}
