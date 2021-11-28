<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let icon: typeof SvelteComponent;
  export let actionName: string;
  export let color: string;
</script>

<button
  class="
    rounded-md
    w-12 h-12
    flex justify-center items-center
    bg-opacity-80 bg-{color}-800 hover:bg-opacity-80 hover:bg-{color}-700
  "
  title={actionName}
  on:click
>
  <svelte:component this={icon} class="w-6 h-6 text-white" />
</button>
