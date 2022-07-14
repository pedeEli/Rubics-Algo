<script lang="ts">
    export let info: SingleTurnInfo | DoubleTurnInfo | string
</script>

<div class="info">
    {#if typeof info === 'string'}
        <div>{info}</div>
    {:else if 'finger' in info}
        <div>Use the {info.finger} on the {info.hand}.</div>
    {:else}
        <div>First use the {info.first.finger} on the {info.first.hand}.</div>
        <div>Then use the {info.second.finger} on the {info.second.hand}.</div>
    {/if}
</div>