import { h, hFragment } from "../h"

export function lipsum(num) {
    const text = "Lorem ipsum dolor sit amet, consectetur adipisc-ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com-modo consequat."
    return hFragment(
        Array(num).fill(h(('p', {}, text)))
    )
}