import { List } from "./list";
export class Emitter {
    constructor() {
        this.listeners = {};
    }
    getOrCreateListener(name) {
        let n = name;
        return this.listeners[n] = this.listeners[n] || new List();
    }
    /**
     * Listen from native
     * eg.: "WebNative.on('message', msg => console.log(msg))"
     */
    on(name, cb) {
        this.getOrCreateListener(name).push({ once: false, cb });
    }
    /**
     * Listen from native, once
     * eg.: "WebNative.once('message', msg => console.log(msg))"
     */
    once(name, cb) {
        this.getOrCreateListener(name).push({ once: true, cb });
    }
    /**
     * Stop listening native event
     * eg.: "WebNative.off('message', myListener)"
     */
    off(name, cb) {
        const listeners = this.getOrCreateListener(name);
        for (const listener of listeners) {
            if (listener.cb == cb) {
                listeners.remove(listener);
                break;
            }
        }
    }
    /**
     * Called by the native to dispatch an event
     */
    dispatch(name, value) {
        const n = name;
        const listeners = this.listeners[n];
        if (listeners) {
            for (const listener of listeners) {
                listener.cb(value);
                if (listener.once)
                    listeners.remove(listener);
            }
        }
    }
}
