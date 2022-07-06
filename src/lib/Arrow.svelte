<script lang="ts">
    export let x1: ArrowPosition
    export let y1: ArrowPosition
    export let x2: ArrowPosition
    export let y2: ArrowPosition

    const angle = Math.atan2(y1 - y2, x1 - x2)
    const deltaAngle = Math.PI / 180 * 45
    const headSize = .2

    const hx1 = headSize * Math.cos(angle + deltaAngle) + x2
    const hy1 = headSize * Math.sin(angle + deltaAngle) + y2

    const hx2 = headSize * Math.cos(angle - deltaAngle) + x2
    const hy2 = headSize * Math.sin(angle - deltaAngle) + y2

    const displacement = 10
    const posx1 = (a: number) => -50 + 100 * a + displacement * (x2 - x1)
    const posy1 = (a: number) => -50 + 100 * a + displacement * (y2 - y1)
    const posx2 = (a: number) => -50 + 100 * a + displacement * (x1 - x2)
    const posy2 = (a: number) => -50 + 100 * a + displacement * (y1 - y2)
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
    <path d="M{posx1(x1)} {posy1(y1)} L{posx2(x2)} {posy2(y2)} L{posx2(hx1)} {posy2(hy1)} M{posx2(x2)} {posy2(y2)} L{posx2(hx2)} {posy2(hy2)}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: hsl(var(--clr-gray-600));
        grid-column: 2 / 5;
        grid-row: 2 / 5;
    }
</style>