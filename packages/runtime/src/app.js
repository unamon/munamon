import { destroyDOM } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDOM } from "./mount-dom";

export function createApp(state, view, reducers = {}) {
    let parentEl = null
    let vdom = null

    const dispatcher = new Dispatcher()
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)] //re-render app after every command

    function emit(eventName,payload) { 
        dispatcher.dispatch(eventName, payload)
    }

    for (const actionName in reducers) { 
        const reducer = reducers[actionName]
        const subs = dispatcher.subscribe(actionName, (payload) => { 
            state = reducer(state, payload) //updates the state calling the reducer function
        })  
        subscriptions.push(subs)
    }

    function renderApp() {
        if (vdom) { //if previous view exists, unmount it
            destroyDOM(vdom)
        }
        vdom = view(state) //mount the new view 
        mountDOM(vdom, parentEl)
    }


    return {
        mount(_parentEl) { //method to mount the application in the DOM 
            parentEl = _parentEl 
            renderApp()
        },
        unmount() {
            destroyDOM(vdom)
            vdom=null
            subscriptions.forEach((unsubscribe) => unsubscribe())
        }
    }
}