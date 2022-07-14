<script lang="ts">
    import {afterNavigate} from '$app/navigation'

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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/>
    </svg>
    <div class="text">Back</div>
</a>

<style>
    .back-button {
        appearance: none;
        text-decoration: none;
        width: 100%;
        border: none;
        background: none;
        text-align: left;
        padding: .5rem 1rem;
        fill: white;
        box-shadow: 0rem .3rem 1rem hsl(0 0% 0% / .5);
        display: flex;
        align-items: center;
        gap: 1rem;
        position: fixed;
        top: 0;
        background-color: inherit;
        z-index: 100;
    }
    .back-button:active {
        text-decoration: none;
    }
    svg {
        height: 2rem;
    }
    .text {
        color: white;
        font-size: 2rem;
        transform: translateY(-3%);
    }
</style>