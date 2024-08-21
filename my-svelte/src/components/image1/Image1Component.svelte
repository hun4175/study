<script lang="ts">
    import { onMount } from 'svelte'

    let src = ''
    let parent: HTMLElement
    let height: number
    let width: number

    $: imageApiUrl = `https://picsum.photos/${width}/${height}`
    $: {
        fetch(imageApiUrl).then((response) => {
            src = response.url
        })
    }
    onMount(() => {
        height = parent.clientHeight
        width = parent.clientWidth
    })
</script>
<div bind:this={parent} style="width: 100%; height: 100%;">
    <img {src} alt="image"/>
</div>
