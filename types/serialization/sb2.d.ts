/**
 * Top-level handler. Parse provided JSON,
 * and process the top-level object (the stage object).
 * @param {!object} json SB2-format JSON to load.
 * @param {!Runtime} runtime Runtime object to load all structures into.
 * @param {boolean=} optForceSprite If set, treat as sprite (Sprite2).
 * @param {?object} zip Optional zipped assets for local file import
 * @return {Promise.<ImportedProject>} Promise that resolves to the loaded targets when ready.
 */
declare function sb2import(json: object, runtime: any, optForceSprite?: boolean | undefined, zip: object | null): Promise<any>;
export { sb2import as deserialize };
