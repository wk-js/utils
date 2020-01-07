"use strict";
/**
 * raf.js
 *
 * Global RequestAnimationFrame
 *
 * ----------------------------
 *
 * use example
 *
 * var RAF = require('./libs/raf)'
 *
 * RAF.subscribe( 'mySubscriberId', mySubscriberFn )
 * RAF.unsubscribe( 'mySubscriberId' )
 * RAF.start()
 * RAF.stop()
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        // @ts-ignore
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        // @ts-ignore
        window.webkitCancelRequestAnimationFrame ||
        // @ts-ignore
        window.mozCancelRequestAnimationFrame ||
        // @ts-ignore
        window.oCancelRequestAnimationFrame ||
        // @ts-ignore
        window.msCancelRequestAnimationFrame;
})();
var RAF = /** @class */ (function () {
    function RAF() {
    }
    /**
     * Run all subscribers
     */
    RAF._update = function () {
        RAF._now = performance.now();
        RAF.dt = RAF._now - RAF._lt;
        RAF._elapsedInterval += RAF.dt;
        if (RAF._elapsedInterval >= RAF.framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._now;
        RAF._raf = requestAnimFrame(RAF._update);
    };
    RAF._processUpdate = function () {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            var _a = __read(RAF.subscribers[i], 2), _ = _a[0], subscriber = _a[1];
            // execute handler
            subscriber(RAF.dt, RAF._now);
        }
    };
    /**
     * Register a new subscriber
     */
    RAF.subscribe = function (id, fn) {
        RAF.subscribers.push([id, fn]);
    };
    /**
    * Unregister a subscriber
    */
    RAF.unsubscribe = function (id) {
        for (var i = 0; i < RAF.subscribers.length; i++) {
            // if id matches, removes
            if (RAF.subscribers[i][0] === id) {
                RAF.subscribers.splice(i, 1);
            }
        }
    };
    /**
     * Start globally the RAF
     */
    RAF.start = function () {
        RAF._raf = requestAnimFrame(RAF._update);
    };
    /**
     * Stop globally the RAF
     */
    RAF.stop = function () {
        cancelRequestAnimFrame(RAF._raf);
    };
    RAF.subscribers = [];
    RAF.dt = 0;
    RAF.framerate = 16;
    RAF._now = Date.now();
    RAF._lt = RAF._now;
    RAF._elapsedInterval = 0;
    RAF._raf = requestAnimFrame(RAF._update);
    return RAF;
}());
exports.RAF = RAF;