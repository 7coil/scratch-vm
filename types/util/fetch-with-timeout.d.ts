export = fetchWithTimeout;
/**
 * Fetch a remote resource like `fetch` does, but with a time limit.
 * @param {Request|string} resource Remote resource to fetch.
 * @param {?object} init An options object containing any custom settings that you want to apply to the request.
 * @param {number} timeout The amount of time before the request is canceled, in milliseconds
 * @returns {Promise<Response>} The response from the server.
 */
declare function fetchWithTimeout(resource: Request | string, init: object | null, timeout: number): Promise<Response>;
