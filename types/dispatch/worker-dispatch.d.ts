declare const _exports: WorkerDispatch;
export = _exports;
/**
 * This class provides a Worker with the means to participate in the message dispatch system managed by CentralDispatch.
 * From any context in the messaging system, the dispatcher's "call" method can call any method on any "service"
 * provided in any participating context. The dispatch system will forward function arguments and return values across
 * worker boundaries as needed.
 * @see {CentralDispatch}
 */
declare class WorkerDispatch extends SharedDispatch {
    /**
     * This promise will be resolved when we have successfully connected to central dispatch.
     * @type {Promise}
     * @see {waitForConnection}
     * @private
     */
    private _connectionPromise;
    _onConnect: (value: any) => void;
    /**
     * Map of service name to local service provider.
     * If a service is not listed here, it is assumed to be provided by another context (another Worker or the main
     * thread).
     * @see {setService}
     * @type {object}
     */
    services: object;
    /**
     * @returns {Promise} a promise which will resolve upon connection to central dispatch. If you need to make a call
     * immediately on "startup" you can attach a 'then' to this promise.
     * @example
     *      dispatch.waitForConnection.then(() => {
     *          dispatch.call('myService', 'hello');
     *      })
     */
    get waitForConnection(): Promise<any>;
    /**
     * Set a local object as the global provider of the specified service.
     * WARNING: Any method on the provider can be called from any worker within the dispatch system.
     * @param {string} service - a globally unique string identifying this service. Examples: 'vm', 'gui', 'extension9'.
     * @param {object} provider - a local object which provides this service.
     * @returns {Promise} - a promise which will resolve once the service is registered.
     */
    setService(service: string, provider: object): Promise<any>;
}
import SharedDispatch = require("./shared-dispatch");
