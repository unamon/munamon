export function setAttributes(el, attrs) {
    const { class: className, style, ...otherAttrs } = attrs
    if (className) {
        setClass(el, className)
    }
    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value)
        })
    }

    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(el, name, value)
    }
}

function setClass(el, className) {
    el.className = ''
    if (typeof (className) == 'string') {
        el.className = className
    }

    if (Array.isArray(className)) {
        el.classList.add(...className)
    }
}

function setStyle(el, prop, value) { }

function setAttribute(el, name, value) { }