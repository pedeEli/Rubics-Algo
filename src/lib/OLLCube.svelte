<script lang="ts">
    export let topLeft: CornerRotation = 0
    export let topRight: CornerRotation = 0
    export let bottomRight: CornerRotation = 0
    export let bottomLeft: CornerRotation = 0

    export let top: EdgeRotation = 0
    export let left: EdgeRotation = 0
    export let bottom: EdgeRotation = 0
    export let right: EdgeRotation = 0
</script>

<div class="oll-cube">
    <div></div>
    <div class:piece={topLeft === 2}></div>
    <div class:piece={top === 1}></div>
    <div class:piece={topRight === 1}></div>
    <div></div>
    <div class:piece={topLeft === 1}></div>
    <div class="center" class:piece={topLeft === 0}></div>
    <div class="center" class:piece={top === 0}></div>
    <div class="center" class:piece={topRight === 0}></div>
    <div class:piece={topRight === 2}></div>
    <div class:piece={left === 1}></div>
    <div class="center" class:piece={left === 0}></div>
    <div class="piece"></div>
    <div class="center" class:piece={right === 0}></div>
    <div class:piece={right === 1}></div>
    <div class:piece={bottomLeft === 2}></div>
    <div class="center" class:piece={bottomLeft === 0}></div>
    <div class="center" class:piece={bottom === 0}></div>
    <div class="center" class:piece={bottomRight === 0}></div>
    <div class:piece={bottomRight === 1}></div>
    <div></div>
    <div class:piece={bottomLeft === 1}></div>
    <div class:piece={bottom === 1}></div>
    <div class:piece={bottomRight === 2}></div>
</div>

<style>
    .oll-cube {
        width: 100%;
        height: 100%;
        display: grid;
        gap: 2px;
        grid-template-columns: .2fr 1fr 1fr 1fr .2fr;
        grid-template-rows: .2fr 1fr 1fr 1fr .2fr;
    }
    .center {
        background-color: hsl(var(--clr-gray-800));
    }
    .piece {
        background: hsl(var(--clr-yellow));
    }
</style>