<script lang="ts">
  import { onMount } from 'svelte';
  import { detector } from '$lib/features/detect-shape';
  import '../app.css';

  const basePath = vite.define.basePath;

  onMount(detector.initialize);
</script>

<svelte:head>
  <link rel="icon" href="{basePath}/FlatColorIconsPicture.svg" type="image/svg+xml">
</svelte:head>

<slot />
