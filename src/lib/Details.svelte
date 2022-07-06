<script lang="ts">
    import Back from '$lib/Back.svelte'

    export let back: '/oll' | '/pll'
    export let title: string
    export let algos: string[]
</script>

<Back url={back}/>
<main>
    <h1>{title}</h1>
    <div class="cube">
        <slot/>
    </div>
    {#each algos as algo}
        <div class="algos">{algo}</div>
    {/each}
</main>

<style>
    main {
        display: grid;
        grid-template-areas:
            "header header"
            "cube algos";
        justify-content: center;
        gap: 1rem;
        margin-inline: 1rem;
    }
    h1 {
        grid-area: header;
        text-align: center;
    }
    .cube {
        width: min(50vw, 10rem);
        height: min(50vw, 10rem);
        appearance: none;
        border-radius: 1rem;
        padding: min(5vw, 1rem);
        background: hsl(var(--clr-gray-500));
        grid-area: cube;
    }
    .algos {
        grid-area: algos;
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>