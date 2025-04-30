export class Dispatcher {
    //did you know that the leading # makes the variable private? Neat! 
    #subs = new Map();
    #afterHandlers = []

    subscribe(commandName, handler) {
        if (!this.#subs.has(commandName)) {
            //create array of subs if it doesn't exist for given command
            this.#subs.set(commandName, []);
        }
        const handlers = this.#subs.get(commandName)
        //check if handler has already been subscribed 
        if(handlers.includes(handler)) { 
            return () => {};
        }

        //subscribe handler
        handlers.push(handler);

        //return unsubscribe function
        return () => { 
            const idx = handlers.indexOf(handler);
            handlers.splice(idx, 1)
        }
    }

    afterEveryCommand(handler) { 
        this.#afterHandlers.push(handler)
        return () => { 
            const idx = this.#afterHandlers.indexOf(handler)
            this.#afterHandlers.splice(idx, 1)
        }
    }

    dispatch(commandName, payload) {
        if(this.#subs.has(commandName)) { 
            this.#subs.get(commandName).forEach((handler) => handler(payload));
        } else { 
            console.warn(`No handlers for command ${commandName}`)
        }
        this.#afterHandlers.forEach((handler) => handler())
     }
}