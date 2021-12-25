<script lang="ts">
  import { goto } from '$app/navigation';
  import IconCircle from '~icons/bx/bx-circle';
  import IconSquare from '~icons/bx/bx-square';
  import IconBlock from '~icons/bx/bx-block';
  import IconDownload from '~icons/bx/bx-download';
  import IconUndo from '~icons/bx/bx-undo';
  import IconArrowBack from '~icons/bx/bx-arrow-back';

  import { Canvas } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { dataset, downloadDataset, removeLastImage } from '$lib/features/generate-dataset';
  // TODO: merge with the import above when ESLint starts supporting this TS syntax
  import type { SampleClass } from '$lib/features/generate-dataset';
  import { colors } from '$lib/features/dark-mode';

  import { addToDataset } from '../model/add-to-dataset';

  let currentTool: SampleClass = 'Circle';
</script>

<div class="w-full h-screen relative">
  <Canvas
    drawMode
    backgroundColor={$colors.background}
    brushColor={$colors.foreground}
    on:object-drawn={(event) => addToDataset(event, currentTool)}
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
