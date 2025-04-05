import { DOM_TYPES } from "./h";
import { addEventListeners } from "./events";
import { setAttributes } from "./attributes";

export function mountDOM(vdom, parentEl) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl)
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vdom, parentEl)
            break;
        default:
            break;
    }
}

function createTextNode(vdom, parentEl) {
    const { value } = vdom
    const textNode = document.createTextNode(value)
    vdom.el = textNode
    parentEl.append(textNode)
}

function createFragmentNode(vdom, parentEl) {
    const { children } = vdom
    vdom.el = parentEl 
    children.forEach(child => {
        mountDOM(child,parentEl)
    });
}

function createElementNode(vdom, parentEl) { 
    const { tag, props, children } = vdom 

    const elementNode = document.createElement(tag)
    addProps(elementNode, props, vdom)
    vdom.el = elementNode

    children.forEach(child => { 
        mountDOM(child, elementNode)
    })
    parentEl.append(elementNode)
}

function addProps(el, props, vdom) { 
    const { on: events, ...attrs } = props
    vdom.listeners = addEventListeners(events, el)
    setAttributes(el, attrs)
}

