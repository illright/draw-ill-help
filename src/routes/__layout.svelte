<script lang="ts">
  import '../app.css';

  const basePath = vite.define.basePath;
</script>

<svelte:head>
  <link rel="icon" href="{basePath}/FlatColorIconsPicture.svg" type="image/svg+xml">
</svelte:head>

<slot />
