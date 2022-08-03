<script lang="ts">
    import {afterNavigate} from '$app/navigation'
    import {Icon} from '@smui/common'
    import {Svg} from '@smui/common/elements'
    import {mdiChevronLeft} from '@mdi/js'

    export let url: string

    let href = url
    afterNavigate(({from}) => {
        if (!from)
            return
        const {pathname, search, hash} = from
        if (url !== pathname)
            return
        href = `${pathname}${search}${hash}`
    })
</script>

<a class="back-button" {href}>
    <Icon component={Svg} viewBox="0 0 24 24" height="2rem">
        <path fill="currentColor" d={mdiChevronLeft}/>
    </Icon>
    <div class="text">Back</div>
</a>

<style>
    .back-button {
        color: var(--clr-text);
        appearance: none;
        text-decoration: none;
        width: 100%;
        border: none;
        background: none;
        text-align: left;
        padding: .5rem 1rem;
        fill: white;
        box-shadow: 0rem .3rem 1rem hsl(0 0% 0% / .2);
        display: flex;
        align-items: center;
        gap: 1rem;
        position: fixed;
        top: 0;
        background-color: inherit;
        z-index: 1;
    }
    .back-button:active {
        text-decoration: none;
    }
    .text {
        font-size: 2rem;
        transform: translateY(-3%);
    }
</style>