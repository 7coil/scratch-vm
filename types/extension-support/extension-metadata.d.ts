/**
 * All the metadata needed to register an extension.
 */
type ExtensionMetadata = {
    /**
     * - a unique alphanumeric identifier for this extension. No special characters allowed.
     */
    id: string;
    /**
     * - the human-readable name of this extension.
     */
    name?: string;
    /**
     * - URI for an image to be placed on each block in this extension. Data URI ok.
     */
    blockIconURI?: string;
    /**
     * - URI for an image to be placed on this extension's category menu item. Data URI ok.
     */
    menuIconURI?: string;
    /**
     * - link to documentation content for this extension.
     */
    docsURI?: string;
    /**
     * - the blocks provided by this extension, plus separators.
     */
    blocks: Array<ExtensionBlockMetadata | string>;
    /**
     * - map of menu name to metadata for each of this extension's menus.
     */
    menus?: any;
};
/**
 * All the metadata needed to register an extension block.
 */
type ExtensionBlockMetadata = {
    /**
     * - a unique alphanumeric identifier for this block. No special characters allowed.
     */
    opcode: string;
    /**
     * - the name of the function implementing this block. Can be shared by other blocks/opcodes.
     */
    func?: string;
    /**
     * - the type of block (command, reporter, etc.) being described.
     */
    blockType: any;
    /**
     * - the text on the block, with [PLACEHOLDERS] for arguments.
     */
    text: string;
    /**
     * - true if this block should not appear in the block palette.
     */
    hideFromPalette?: boolean;
    /**
     * - true if the block ends a stack - no blocks can be connected after it.
     */
    isTerminal?: boolean;
    /**
     * - true if this block is a reporter but should not allow a monitor.
     */
    disableMonitor?: boolean;
    /**
     * - if this block is a reporter, this is the scope/context for its value.
     */
    reporterScope?: any;
    /**
     * - sets whether a hat block is edge-activated.
     */
    isEdgeActivated?: boolean;
    /**
     * - sets whether a hat/event block should restart existing threads.
     */
    shouldRestartExistingThreads?: boolean;
    /**
     * - for flow control blocks, the number of branches/substacks for this block.
     */
    branchCount?: any;
    /**
     * - map of argument placeholder to metadata about each arg.
     */
    arguments?: any;
};
/**
 * All the metadata needed to register an argument for an extension block.
 */
type ExtensionArgumentMetadata = {
    /**
     * - the type of the argument (number, string, etc.)
     */
    type: any;
    /**
     * - the default value of this argument.
     */
    defaultValue?: any;
    /**
     * - the name of the menu to use for this argument, if any.
     */
    menu?: string;
};
/**
 * All the metadata needed to register an extension drop-down menu.
 */
type ExtensionMenuMetadata = ExtensionDynamicMenu | (string | ExtensionMenuItemComplex)[];
/**
 * The string name of a function which returns menu items.
 */
type ExtensionDynamicMenu = string;
/**
 * Items in an extension menu.
 */
type ExtensionMenuItems = Array<ExtensionMenuItemSimple | ExtensionMenuItemComplex>;
/**
 * A menu item for which the label and value are identical strings.
 */
type ExtensionMenuItemSimple = string;
/**
 * A menu item for which the label and value can differ.
 */
type ExtensionMenuItemComplex = {
    /**
     * - the value of the block argument when this menu item is selected.
     */
    value: any;
    /**
     * - the human-readable label of this menu item in the menu.
     */
    text: string;
};
