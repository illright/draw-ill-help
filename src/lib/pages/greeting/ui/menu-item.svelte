<script lang="ts">
	export let href: string;
	export let disabled = false;
</script>

<a
	href={disabled ? undefined : href}
	class="
    flex h-16
    m-1 p-4
    items-center
    border-2 rounded-md
    font-semibold
    sm:w-64
    sm:h-24
    sm:px-6
    sm:text-xl
    {disabled
		? 'border-gray-500 text-gray-500'
		: 'border-blue-800 dark:border-blue-400 text-blue-800 dark:text-blue-400 hover:bg-blue-800 dark:hover:bg-blue-400 hover:bg-opacity-10 dark:hover:bg-opacity-10'}
  "
>
	<slot />
</a>
