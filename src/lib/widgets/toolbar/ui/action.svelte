<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let icon: typeof SvelteComponent;
  export let actionName: string;
  export let disabled: boolean = false;
  export let badge: string | null = null;
</script>

<button
  class="
    relative
    rounded-md
    w-12 h-12
    flex justify-center items-center
    bg-opacity-80 bg-blue-800 hover:bg-opacity-80 hover:bg-blue-700
    disabled:bg-gray-400 disabled:cursor-not-allowed
  "
  title={actionName}
  {disabled}
  on:click
>
  <svelte:component this={icon} class="w-6 h-6 text-white" />
  {#if badge !== null}
    <span class="absolute right-0 top-0 px-1 h-4 text-xs rounded-full bg-red-600 text-white">
      {badge}
    </span>
  {/if}
</button>
