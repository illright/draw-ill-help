<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { yolov5 } from '$lib/features/detect-shape';
  import { discardInMemoryCanvas } from '$lib/shared/in-memory-canvas';

  import '../app.css';

  onMount(yolov5.initialize);
  onDestroy(yolov5.stop);
  onDestroy(discardInMemoryCanvas);
</script>

<slot />
