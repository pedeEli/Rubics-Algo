/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}


type CornerRotation = 0 | 1 | 2
type EdgeRotation = 0 | 1
type OLLSections =
    'All Corners Oriented' |
    'All Edges Oriented' |
    'No Edges Oriented' |
    'P Shapes' |
    'W Shapes' |
    'T Shapes' |
    'Square Shapes' |
    'Fish Shapes' |
    'C Shapes' |
    'Small Lightning Bolts' |
    'Big Lightning Bolts' |
    'L Shapes' |
    'Knight Move Shapes' |
    'I Shapes' |
    'Awkward Shapes'
type OLLType = `OLL ${number}`
type OLLProps = {
    topLeft?: CornerRotation,
    topRight?: CornerRotation,
    bottomRight?: CornerRotation,
    bottomLeft?: CornerRotation,
    top?: EdgeRotation,
    right?: EdgeRotation,
    bottom?: EdgeRotation,
    left?: EdgeRotation
}

type PLLColor = 0 | 1 | 2 | 3
type ArrowPosition = 1 | 2 | 3
type ArrowProps = {
    x1: ArrowPosition,
    y1: ArrowPosition,
    x2: ArrowPosition,
    y2: ArrowPosition,
}
type PLLProps = {
    arrows: ArrowProps[],
    top0?: PLLColor,
    top1?: PLLColor,
    top2?: PLLColor,
    right0?: PLLColor,
    right1?: PLLColor,
    right2?: PLLColor,
    bottom0?: PLLColor,
    bottom1?: PLLColor,
    bottom2?: PLLColor,
    left0?: PLLColor,
    left1?: PLLColor,
    left2?: PLLColor
}
type PLLSections =
    'Edges Only' |
    'Corners Only' |
    'Adjacent Corner Swap' |
    'Diagonal Corner Swap' |
    'G Permutations'

namespace svelte.JSX {
    interface SvelteWindowProps {
        onbeforeinstallprompt?: EventHandler<BeforeInstallPromptEvent, Window> | undefined | null
        onappinstalled?: EventHandler<Event, Window> | undefined | null
    }
}


interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>
    prompt(): Promise<void>
}