<script lang="ts">
    import Arrow from '$lib/Arrow.svelte'

    export let arrows: ArrowProps[] = []
    export let top0: PLLColor = 0
    export let top1: PLLColor = 0
    export let top2: PLLColor = 0
    export let right0: PLLColor = 1
    export let right1: PLLColor = 1
    export let right2: PLLColor = 1
    export let bottom0: PLLColor = 2
    export let bottom1: PLLColor = 2
    export let bottom2: PLLColor = 2
    export let left0: PLLColor = 3
    export let left1: PLLColor = 3
    export let left2: PLLColor = 3
</script>

<div class="pll-cube">
    <div class="pieces">
        <div></div>
        <div class="color-{top0}"></div>
        <div class="color-{top1}"></div>
        <div class="color-{top2}"></div>
        <div></div>
        <div class="color-{left2}"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="color-{right0}"></div>
        <div class="color-{left1}"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="color-{right1}"></div>
        <div class="color-{left0}"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="piece"></div>
        <div class="color-{right2}"></div>
        <div></div>
        <div class="color-{bottom2}"></div>
        <div class="color-{bottom1}"></div>
        <div class="color-{bottom0}"></div>
    </div>
    <div class="arrows">
        {#each arrows as arrow}
            <Arrow {...arrow}/>
        {/each}
    </div>
</div>

<style>
    .pll-cube {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
    }
    .pieces, .arrows {
        aspect-ratio: 1 / 1;
        grid-column: 1;
        grid-row: 1;
        display: grid;
        gap: 2px;
        grid-template-columns: .2fr 1fr 1fr 1fr .2fr;
        grid-template-rows: .2fr 1fr 1fr 1fr .2fr;
    }
    .piece {
        background: hsl(var(--clr-yellow));
    }
    .color-0 {
        background-color: orange;
    }
    .color-1 {
        background-color: green;
    }
    .color-2 {
        background-color: red;
    }
    .color-3 {
        background-color: blue;
    }
</style>