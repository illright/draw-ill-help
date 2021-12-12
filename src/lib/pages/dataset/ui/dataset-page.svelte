<script lang="ts">
  import { fabric } from 'fabric';
  import IconCircle from '~icons/bx/bx-circle';
  import IconSquare from '~icons/bx/bx-square';
  import IconBlock from '~icons/bx/bx-block';
  import IconDownload from '~icons/bx/bx-download';
  import IconUndo from '~icons/bx/bx-undo';

  import { Canvas, extractLastDrawing } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import {
    dataset,
    exportData,
    removeLastImage,
    addImage,
    type SampleClass,
  } from '$lib/features/generate-dataset';

  let currentTool: SampleClass = 'Circle';

  async function addObjectToDataset({ detail }: any) {
    const object = detail.originalEvent.target;
    if (!(object instanceof fabric.Path)) {
      return;
    }

    if (detail.fabricRealCanvas !== undefined && detail.fabricOffScreenCanvas !== undefined) {
      const lastObject = await extractLastDrawing(
        object,
        detail.fabricRealCanvas,
        detail.fabricOffScreenCanvas
      );
      if (lastObject !== null) {
        const [canvas, bbox] = lastObject;
        addImage(canvas, bbox, currentTool);
        setTimeout(() => detail.fabricRealCanvas.remove(object), 500);
      }
    }
  }

  function downloadDataset() {
    exportData($dataset);
    dataset.set([]);
  }
</script>

<div class="w-full h-screen relative">
  <Canvas
    on:object-added={addObjectToDataset}
  />
  <Toolbar>
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
