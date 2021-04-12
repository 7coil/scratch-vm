export = Scratch3Text2SpeechBlocks;
/**
 * Class for the text2speech blocks.
 * @constructor
 */
declare class Scratch3Text2SpeechBlocks {
    /**
     * The key to load & store a target's text2speech state.
     * @return {string} The key.
     */
    static get STATE_KEY(): string;
    /**
     * The default state, to be used when a target has no existing state.
     * @type {Text2SpeechState}
     */
    static get DEFAULT_TEXT2SPEECH_STATE(): any;
    constructor(runtime: any);
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    runtime: any;
    /**
     * Map of soundPlayers by sound id.
     * @type {Map<string, SoundPlayer>}
     */
    _soundPlayers: Map<string, any>;
    /**
     * Stop all currently playing speech sounds.
     */
    _stopAllSpeech(): void;
    /**
     * When a Target is cloned, clone the state.
     * @param {Target} newTarget - the newly created target.
     * @param {Target} [sourceTarget] - the target used as a source for the new clone, if any.
     * @listens Runtime#event:targetWasCreated
     * @private
     */
    private _onTargetCreated;
    /**
     * A list of all Scratch locales that are supported by the extension.
     * @type {Array}
     */
    _supportedLocales: any[];
    /**
     * An object with info for each voice.
     */
    get VOICE_INFO(): {
        ALTO: {
            name: string;
            gender: string;
            playbackRate: number;
        };
        TENOR: {
            name: string;
            gender: string;
            playbackRate: number;
        };
        SQUEAK: {
            name: string;
            gender: string;
            playbackRate: number;
        };
        GIANT: {
            name: string;
            gender: string;
            playbackRate: number;
        };
        KITTEN: {
            name: string;
            gender: string;
            playbackRate: number;
        };
    };
    /**
     * An object with information for each language.
     *
     * A note on the different sets of locales referred to in this extension:
     *
     * SCRATCH LOCALE
     *      Set by the editor, and used to store the language state in the project.
     *      Listed in l10n: https://github.com/LLK/scratch-l10n/blob/master/src/supported-locales.js
     * SUPPORTED LOCALE
     *      A Scratch locale that has a corresponding extension locale.
     * EXTENSION LOCALE
     *      A locale corresponding to one of the available spoken languages
     *      in the extension. There can be multiple supported locales for a single
     *      extension locale. For example, for both written versions of chinese,
     *      zh-cn and zh-tw, we use a single spoken language (Mandarin). So there
     *      are two supported locales, with a single extension locale.
     * SPEECH SYNTH LOCALE
     *      A different locale code system, used by our speech synthesis service.
     *      Each extension locale has a speech synth locale.
     */
    get LANGUAGE_INFO(): {
        ar: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        "zh-cn": {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        da: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        nl: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        en: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        fr: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        de: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        hi: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        is: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        it: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        ja: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        ko: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        nb: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        pl: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        "pt-br": {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        pt: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        ro: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        ru: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        es: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        "es-419": {
            name: string;
            locales: string[];
            speechSynthLocale: string;
        };
        sv: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        tr: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
        cy: {
            name: string;
            locales: string[];
            speechSynthLocale: string;
            singleGender: boolean;
        };
    };
    /**
     * A default language to use for speech synthesis.
     * @type {string}
     */
    get DEFAULT_LANGUAGE(): string;
    /**
     * @param {Target} target - collect  state for this target.
     * @returns {Text2SpeechState} the mutable state associated with that target. This will be created if necessary.
     * @private
     */
    private _getState;
    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo(...args: any[]): object;
    /**
     * Get the language code currently set in the editor, or fall back to the
     * browser locale.
     * @return {string} a Scratch locale code.
     */
    getEditorLanguage(): string;
    /**
     * Get the language code currently set for the extension.
     * @returns {string} a Scratch locale code.
     */
    getCurrentLanguage(): string;
    /**
     * Set the language code for the extension.
     * It is stored in the stage so it can be saved and loaded with the project.
     * @param {string} locale a locale code.
     */
    setCurrentLanguage(locale: string): void;
    /**
     * Get the extension locale for a supported locale, or null.
     * @param {string} locale a locale code.
     * @returns {?string} a locale supported by the extension.
     */
    _getExtensionLocaleForSupportedLocale(locale: string): string | null;
    /**
     * Get the locale code used by the speech synthesis server corresponding to
     * the current language code set for the extension.
     * @returns {string} a speech synthesis locale.
     */
    _getSpeechSynthLocale(): string;
    /**
     * Get an array of the locales supported by this extension.
     * @returns {Array} An array of locale strings.
     */
    _getSupportedLocales(): any[];
    /**
     * Check if a Scratch language code is in the list of supported languages for the
     * speech synthesis service.
     * @param {string} languageCode the language code to check.
     * @returns {boolean} true if the language code is supported.
     */
    isSupportedLanguage(languageCode: string): boolean;
    /**
     * Get the menu of voices for the "set voice" block.
     * @return {array} the text and value for each menu item.
     */
    getVoiceMenu(): any[];
    /**
     * Get the localized menu of languages for the "set language" block.
     * For each language:
     *   if there is a custom translated spoken language name, use that;
     *   otherwise use the translation in the languageNames menuMap;
     *   otherwise fall back to the untranslated name in LANGUAGE_INFO.
     * @return {array} the text and value for each menu item.
     */
    getLanguageMenu(): any[];
    /**
     * Set the voice for speech synthesis for this sprite.
     * @param  {object} args Block arguments
     * @param {object} util Utility object provided by the runtime.
     */
    setVoice(args: object, util: object): void;
    /**
     * Set the language for speech synthesis.
     * @param  {object} args Block arguments
     */
    setLanguage(args: object): void;
    /**
     * Convert the provided text into a sound file and then play the file.
     * @param  {object} args Block arguments
     * @param {object} util Utility object provided by the runtime.
     * @return {Promise} A promise that resolves after playing the sound
     */
    speakAndWait(args: object, util: object): Promise<any>;
}
