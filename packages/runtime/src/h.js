import { withoutNulls } from './utils/arrays.js'

//here we write the code 
export const DOM_TYPES = {
    TEXT: 'text'
    , ELEMENT: 'element'
    , FRAGMENT: "fragment"
}

//hyperscript. This is what we use to create virtual elements
export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT
    }
}
export function hString(str) {
    return { type: DOM_TYPES.TEXT, value: str }
}
//fragment nodes group elements that don't share a parent
//but must be added to the DOM at the same time
export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes))
    }
}

//converts the text children to text elements
function mapTextNodes(children) {
    return children.map((child) => {
        typeof child == 'string' ? hString(child) : child
    })
}
