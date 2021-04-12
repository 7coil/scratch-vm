export = MouseWheel;
declare class MouseWheel {
    constructor(runtime: any);
    /**
     * Reference to the owning Runtime.
     * @type{!Runtime}
     */
    runtime: any;
    /**
     * Mouse wheel DOM event handler.
     * @param  {object} data Data from DOM event.
     */
    postData(data: object): void;
}
