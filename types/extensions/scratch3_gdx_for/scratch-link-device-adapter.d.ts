export = ScratchLinkDeviceAdapter;
/**
 * Adapter class
 */
declare class ScratchLinkDeviceAdapter {
    constructor(socket: any, { service, commandChar, responseChar }: {
        service: any;
        commandChar: any;
        responseChar: any;
    });
    socket: any;
    _service: any;
    _commandChar: any;
    _responseChar: any;
    _onResponse(base64: any): any;
    _deviceOnResponse: any;
    get godirectAdapter(): boolean;
    writeCommand(commandBuffer: any): any;
    setup({ onResponse }: {
        onResponse: any;
    }): any;
}
