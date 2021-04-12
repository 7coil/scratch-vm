export = defineMessages;
/**
 * @typedef {object} MessageDescriptor
 * @property {string} id - the translator-friendly unique ID of this message.
 * @property {string} default - the message text in the default language (English).
 * @property {string} [description] - a description of this message to help translators understand the context.
 */
/**
 * This is a hook for extracting messages from extension source files.
 * This function simply returns the message descriptor map object that's passed in.
 * @param {object.<MessageDescriptor>} messages - the messages to be defined
 * @return {object.<MessageDescriptor>} - the input, unprocessed
 */
declare function defineMessages(messages: any): any;
declare namespace defineMessages {
    export { MessageDescriptor };
}
type MessageDescriptor = {
    /**
     * - the translator-friendly unique ID of this message.
     */
    id: string;
    /**
     * - the message text in the default language (English).
     */
    default: string;
    /**
     * - a description of this message to help translators understand the context.
     */
    description?: string;
};
