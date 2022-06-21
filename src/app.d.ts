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
    'L Shapes' |
    'No Edges Oriented' |
    'P Shapes' |
    'W Shapes' |
    'T Shapes' |
    'Square Shapes'
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