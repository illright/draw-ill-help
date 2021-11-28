<script lang="ts">
	import { getContext } from 'svelte';
	import type { SvelteComponent } from 'svelte';

	import { toolbarContextKey } from './toolbar.svelte';

	export let icon: typeof SvelteComponent;
  export let toolName: string;
  export let group: string;

  const name = getContext<string>(toolbarContextKey);
</script>

<label
	class="
    rounded-md
    w-12 h-12
    flex justify-center items-center
    cursor-pointer
    hover:bg-opacity-20 hover:bg-black
  "
  title={toolName}
  class:text-indigo-500={toolName === group}
>
  <input
    type="radio"
    {name}
    value={toolName}
    aria-label={toolName}
    bind:group
    class="sr-only"
  />
	<svelte:component this={icon} class="w-6 h-6" />
</label>
