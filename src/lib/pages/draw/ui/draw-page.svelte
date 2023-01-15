<script lang="ts">
  import { goto } from '$app/navigation';
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';
  import IconArrowBack from '~icons/bx/bx-arrow-back';

  import { Canvas } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { colors } from '$lib/features/dark-mode';

  import { tryToCorrect } from '../lib/try-to-correct';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';
</script>

<div class="w-full h-screen relative">
  <Canvas
    backgroundColor={$colors.background}
    brushColor={$colors.foreground}
    drawMode={currentTool === 'Draw'}
    bind:this={canvas}
    on:object-drawn={tryToCorrect}
  />
  <Toolbar>
    <Action actionName="Go to the home page" icon={IconArrowBack} on:click={() => goto('/')} />
    <Tool toolName="Draw" icon={IconPencil} bind:group={currentTool} />
    <Tool toolName="Select" icon={IconPointer} bind:group={currentTool} />
    <Action actionName="Clear canvas" icon={IconTrash} on:click={canvas.clear} />
  </Toolbar>
</div>
