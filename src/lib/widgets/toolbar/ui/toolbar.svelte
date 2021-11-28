<script lang="ts" context="module">
  export const toolbarContextKey = {};
</script>

<script lang="ts">
  import { setContext } from 'svelte';

  export let name = 'toolbar';

  setContext(toolbarContextKey, name);
</script>

<div
  class="
    p-1 rounded-lg
    absolute left-1/2 bottom-2 -translate-x-1/2
    grid grid-flow-col grid-rows-1 gap-1
    bg-black bg-opacity-20 text-gray-500
  "
>
  <slot />
</div>
