<script lang="ts">
  import MenuItem from "./menu-item.svelte";

  import { modelReady } from '$lib/features/detect-shape';
</script>

<main class="min-h-screen flex flex-col justify-between items-center">
  <header class="text-center mt-20 w-60 md:text-xl md:w-80">
    <h1 class="font-semibold text-2xl md:text-4xl mb-2 md:mb-4 text-blue-800">Draw, I'll Help</h1>
    <div>A drawing app with magic shape-correcting powers.</div>
  </header>

  <div class="flex-col items-center px-12 w-full">
    <div class="text-center italic text-sm mb-2">
      {#await modelReady}
        Magic&nbsp;is&nbsp;cooking&nbsp;up, please&nbsp;wait...
      {:then}
        &nbsp;
      {/await}
    </div>
    <div class="flex flex-col sm:flex-row sm:justify-center w-full">
      {#await modelReady}
        <MenuItem disabled href="/draw">Draw</MenuItem>
      {:then}
        <MenuItem href="/draw">Draw</MenuItem>
      {/await}
      <MenuItem href="/dataset">Generate a dataset</MenuItem>
    </div>
  </div>

  <div class="mb-8 text-center">Built with ❤️ by <a class="underline text-blue-800 hover:text-blue-700 visited:text-purple-800 visited:hover:text-purple-700" href="https://github.com/illright">@illright</a> for Innopolis&nbsp;University</div>
</main>
