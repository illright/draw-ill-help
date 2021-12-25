<script lang="ts">
  import { goto } from '$app/navigation';
  import IconCircle from '~icons/bx/bx-circle';
  import IconSquare from '~icons/bx/bx-square';
  import IconBlock from '~icons/bx/bx-block';
  import IconDownload from '~icons/bx/bx-download';
  import IconUndo from '~icons/bx/bx-undo';
  import IconArrowBack from '~icons/bx/bx-arrow-back';

  import { Canvas, type CanvasEvents } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import {
    dataset,
    downloadDataset,
    removeLastImage,
    addImage,
    type SampleClass,
  } from '$lib/features/generate-dataset';
  import { colors } from '$lib/features/dark-mode';
  import { extractToSeparateCanvas } from '$lib/features/in-memory-canvas';

  let currentTool: SampleClass = 'Circle';

  async function addObjectToDataset({
    detail: { object, fabricCanvas },
  }: CustomEvent<CanvasEvents['object-drawn']>) {
    const lastObject = await extractToSeparateCanvas(object);
    if (lastObject !== null) {
      const { imageData, bbox } = lastObject;
      addImage(imageData, bbox, currentTool);
      setTimeout(() => fabricCanvas.remove(object), 500);
    }
  }
</script>

<div class="w-full h-screen relative">
  <Canvas
    drawMode
    backgroundColor={$colors.background}
    brushColor={$colors.foreground}
    on:object-drawn={addObjectToDataset}
  />
  <Toolbar>
    <Action actionName="Go to the home page" icon={IconArrowBack} on:click={() => goto('/')} />
    <Tool toolName="Circle" icon={IconCircle} bind:group={currentTool} />
    <Tool toolName="Rectangle" icon={IconSquare} bind:group={currentTool} />
    <Tool toolName="Nothing" icon={IconBlock} bind:group={currentTool} />
    <Action
      actionName="Download dataset"
      icon={IconDownload}
      on:click={downloadDataset}
      disabled={$dataset.length === 0}
      badge={$dataset.length !== 0 ? $dataset.length.toString() : null}
    />
    <Action
      actionName="Remove last image"
      icon={IconUndo}
      on:click={removeLastImage}
      disabled={$dataset.length === 0}
    />
  </Toolbar>
</div>
