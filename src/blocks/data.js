const ArgumentType = require('../extension-support/argument-type');
const BlockType = require('../extension-support/block-type');
const Cast = require('../util/cast');
const Variable = require('../engine/variable');
const formatMessage = require('format-message');

const cloudSymbol = '\u2601';
const LIST_ITEM_LIMIT = 200000;

/**
 * This Scratch 3.0 extension implements Scratch "data" blocks for variables and lists, including cloud variables.
 */
class Scratch3DataBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    static get RENAME_VARIABLE_ID () {
        return 'RENAME_VARIABLE_ID';
    }

    static get DELETE_VARIABLE_ID () {
        return 'DELETE_VARIABLE_ID';
    }

    forEachVariable (callback) {
        const stageTarget = this.runtime.getTargetForStage();
        if (stageTarget) {
            for (const key in stageTarget.variables) {
                if (stageTarget.variables.hasOwnProperty(key)) {
                    callback(stageTarget.variables[key]);
                }
            }
        }
        const editingTarget = this.runtime.getEditingTarget();
        if (editingTarget && (editingTarget !== stageTarget)) {
            for (const key in editingTarget.variables) {
                if (editingTarget.variables.hasOwnProperty(key)) {
                    callback(editingTarget.variables[key]);
                }
            }
        }
    }

    getVariablesMenuItems (editingTargetID, menuState) {
        const menuItems = [];
        this.forEachVariable(v => {
            if (v.type === Variable.SCALAR_TYPE) {
                menuItems.push(v.name);
            }
        });
        const selectedVariableText = menuState && menuState.selectedValue;
        if (selectedVariableText) {
            menuItems.push({
                text: formatMessage({
                    id: 'data.renameVariable',
                    default: 'Rename variable',
                    description: 'Text for the "rename variable" menu option'
                }),
                value: Scratch3DataBlocks.RENAME_VARIABLE_ID
            }, {
                text: formatMessage({
                    id: 'data.deleteVariable',
                    default: 'Delete the "{VARIABLE}" variable',
                    description: 'Text for the "delete variable" menu option'
                }, {
                    VARIABLE: selectedVariableText
                }),
                value: Scratch3DataBlocks.DELETE_VARIABLE_ID
            });
        }
        return menuItems;
    }

    getVariableValue (args, util, blockInfo) {
        const variable = util.target.lookupOrCreateVariableByNameAndType(blockInfo.text, Variable.SCALAR_TYPE);
        return variable.value;
    }

    getVariableObject (util, variableNameOrMenuItem, variableOrListType) {
        // work around scratch-blocks' special handling of variable menus
        const variableName =
            variableNameOrMenuItem.hasOwnProperty('name') ? variableNameOrMenuItem.name : variableNameOrMenuItem;
        return util.target.lookupOrCreateVariableByNameAndType(variableName, variableOrListType);
    }

    setVariable ({VARIABLE, VALUE}, util) {
        const variable = this.getVariableObject(util, VARIABLE, Variable.SCALAR_TYPE);
        if (variable.value !== VALUE) {
            variable.value = VALUE;

            if (variable.isCloud) {
                util.ioQuery('cloud', 'requestUpdateVariable', [variable.name, variable.value]);
            }
        }
    }

    changeVariableBy ({VARIABLE, VALUE}, util) {
        const dValue = Cast.toNumber(VALUE);
        if (dValue !== 0) {
            const variable = this.getVariableObject(util, VARIABLE, Variable.SCALAR_TYPE);
            const castedValue = Cast.toNumber(variable.value);
            const newValue = castedValue + dValue;
            variable.value = newValue;

            if (variable.isCloud) {
                util.ioQuery('cloud', 'requestUpdateVariable', [variable.name, variable.value]);
            }
        }
    }

    showVariable ({VARIABLE}, util) {
        this.changeMonitorVisibility(util, VARIABLE, Variable.SCALAR_TYPE, true);
    }

    hideVariable ({VARIABLE}, util) {
        this.changeMonitorVisibility(util, VARIABLE, Variable.SCALAR_TYPE, false);
    }

    getListNames () {
        const listNames = [];
        this.forEachVariable(v => {
            if (v.type === Variable.LIST_TYPE) {
                listNames.push(v.name);
            }
        });
        return listNames;
    }

    getListsMenuItems (editingTargetID, menuState) {
        const menuItems = [];
        this.forEachVariable(v => {
            if (v.type === Variable.LIST_TYPE) {
                menuItems.push(v.name);
            }
        });
        const selectedListText = menuState && menuState.selectedValue;
        if (selectedListText) {
            menuItems.push({
                text: formatMessage({
                    id: 'data.renameList',
                    default: 'Rename list',
                    description: 'Text for the "rename list" menu option'
                }),
                value: Scratch3DataBlocks.RENAME_VARIABLE_ID
            }, {
                text: formatMessage({
                    id: 'data.deleteList',
                    default: 'Delete the "{LIST}" list',
                    description: 'Text for the "delete list" menu option'
                }, {
                    LIST: selectedListText
                }),
                value: Scratch3DataBlocks.DELETE_VARIABLE_ID
            });
        }
        return menuItems;
    }

    getListContents ({LIST}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);

        // If block is running for monitors, return copy of list as an array if changed.
        if (util.thread.updateMonitor) {
            // Return original list value if up-to-date, which doesn't trigger monitor update.
            if (list._monitorUpToDate) return list.value;
            // If value changed, reset the flag and return a copy to trigger monitor update.
            // Because monitors use Immutable data structures, only new objects trigger updates.
            list._monitorUpToDate = true;
            return list.value.slice();
        }

        // Determine if the list is all single letters.
        // If it is, report contents joined together with no separator.
        // If it's not, report contents joined together with a space.
        let allSingleLetters = true;
        for (let i = 0; i < list.value.length; i++) {
            const listItem = list.value[i];
            if (!((typeof listItem === 'string') &&
                    (listItem.length === 1))) {
                allSingleLetters = false;
                break;
            }
        }
        if (allSingleLetters) {
            return list.value.join('');
        }
        return list.value.join(' ');
    }

    addToList ({LIST, ITEM}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        if (list.value.length < LIST_ITEM_LIMIT) {
            list.value.push(ITEM);
            list._monitorUpToDate = false;
        }
    }

    deleteOfList ({LIST, INDEX}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        const index = Cast.toListIndex(INDEX, list.value.length);
        if (index === Cast.LIST_INVALID) {
            return;
        } else if (index === Cast.LIST_ALL) {
            list.value = [];
            return;
        }
        list.value.splice(index - 1, 1);
        list._monitorUpToDate = false;
    }

    deleteAllOfList ({LIST}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        list.value = [];
    }

    insertAtList ({LIST, INDEX, ITEM}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        const index = Cast.toListIndex(INDEX, list.value.length + 1);
        if (index === Cast.LIST_INVALID) {
            return;
        }
        if (index > LIST_ITEM_LIMIT) return;
        list.value.splice(index - 1, 0, ITEM);
        if (list.value.length > LIST_ITEM_LIMIT) {
            // If inserting caused the list to grow larger than the limit,
            // remove the last element in the list
            list.value.pop();
        }
        list._monitorUpToDate = false;
    }

    replaceItemOfList ({LIST, INDEX, ITEM}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        const index = Cast.toListIndex(INDEX, list.value.length);
        if (index === Cast.LIST_INVALID) {
            return;
        }
        list.value.splice(index - 1, 1, ITEM);
        list._monitorUpToDate = false;
    }

    itemOfList ({LIST, INDEX}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        const index = Cast.toListIndex(INDEX, list.value.length);
        if (index === Cast.LIST_INVALID) {
            return '';
        }
        return list.value[index - 1];
    }

    itemNumOfList ({LIST, ITEM}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);

        // Go through the list items one-by-one using Cast.compare. This is for
        // cases like checking if 123 is contained in a list [4, 7, '123'] --
        // Scratch considers 123 and '123' to be equal.
        for (let i = 0; i < list.value.length; i++) {
            if (Cast.compare(list.value[i], ITEM) === 0) {
                return i + 1;
            }
        }

        // We don't bother using .indexOf() at all, because it would end up with
        // edge cases such as the index of '123' in [4, 7, 123, '123', 9].
        // If we use indexOf(), this block would return 4 instead of 3, because
        // indexOf() sees the first occurrence of the string 123 as the fourth
        // item in the list. With Scratch, this would be confusing -- after all,
        // '123' and 123 look the same, so one would expect the block to say
        // that the first occurrence of '123' (or 123) to be the third item.

        // Default to 0 if there's no match. Since Scratch lists are 1-indexed,
        // we don't have to worry about this conflicting with the "this item is
        // the first value" number (in JS that is 0, but in Scratch it's 1).
        return 0;
    }

    lengthOfList ({LIST}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        return list.value.length;
    }

    listContainsItem ({LIST, ITEM}, util) {
        const list = this.getVariableObject(util, LIST, Variable.LIST_TYPE);
        if (list.value.indexOf(ITEM) >= 0) {
            return true;
        }
        // Try using Scratch comparison operator on each item.
        // (Scratch considers the string '123' equal to the number 123).
        for (let i = 0; i < list.value.length; i++) {
            if (Cast.compare(list.value[i], ITEM) === 0) {
                return true;
            }
        }
        return false;
    }

    showList ({LIST}, util) {
        this.changeMonitorVisibility(util, LIST, Variable.LIST_TYPE, true);
    }

    hideList ({LIST}, util) {
        this.changeMonitorVisibility(util, LIST, Variable.LIST_TYPE, false);
    }

    changeMonitorVisibility (util, variableNameOrMenuItem, variableOrListType, visible) {
        const variableObject = this.getVariableObject(util, variableNameOrMenuItem, variableOrListType);
        // Send the monitor blocks an event like the flyout checkbox event.
        // This both updates the monitor state and changes the isMonitored block flag.
        this.runtime.monitorBlocks.changeBlock({
            id: variableObject.id, // Monitor blocks for variables are the variable ID.
            element: 'checkbox', // Mimic checkbox event from flyout.
            value: visible
        }, this.runtime);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        const variables = [];
        const lists = [];
        this.forEachVariable(x => {
            switch (x.type) {
            case Variable.SCALAR_TYPE:
                variables.push(x);
                break;
            case Variable.LIST_TYPE:
                lists.push(x);
                break;
            default:
                // ignore other types such as broadcast messages
                break;
            }
        });

        const blocks = [];
        this.addBlocksForVariables(blocks, variables);
        this.addBlocksForLists(blocks, lists);
        return {
            id: 'data2',
            color1: '#FF8C1A',
            color2: '#DB6E00',
            name: formatMessage({
                id: 'data.categoryName',
                default: 'Variables',
                description: 'Label for the data (variables) extension category'
            }),
            blocks,
            menus: {
                variables: {
                    items: 'getVariablesMenuItems',
                    rejectReporters: true
                },
                lists: {
                    items: 'getListsMenuItems',
                    rejectReporters: true
                }
            }
        };
    }

    addBlocksForVariables (blocks, variables) {
        blocks.push({
            func: 'MAKE_A_VARIABLE',
            blockType: BlockType.BUTTON,
            text: formatMessage({
                id: 'data.makeVariableButton',
                default: 'Make a Variable',
                description: 'Label for the button which opens the "New Variable" dialog'
            })
        });
        if (variables.length < 1) {
            return;
        }
        variables.forEach(v => blocks.push({
            isDynamic: true, // use the new "dynamic" block definition code path
            opcode: 'variable',
            func: 'getVariableValue',
            blockType: BlockType.REPORTER,
            text: v.name
        }));
        blocks.push(
            '---',
            {
                opcode: 'setvariableto',
                func: 'setVariable',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.setVariable',
                    default: 'set [VARIABLE] to [VALUE]',
                    description: 'text for the "set variable to" block'
                }),
                arguments: {
                    VARIABLE: {
                        type: ArgumentType.STRING,
                        menu: 'variables',
                        defaultValue: variables[0].name
                    },
                    VALUE: {
                        type: ArgumentType.STRING,
                        defaultValue: 0
                    }
                }
            },
            {
                opcode: 'changevariableby',
                func: 'changeVariableBy',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.changeVariable',
                    default: 'change [VARIABLE] by [VALUE]',
                    description: 'text for the "change variable by" block'
                }),
                arguments: {
                    VARIABLE: {
                        type: ArgumentType.STRING,
                        menu: 'variables',
                        defaultValue: variables[0].name
                    },
                    VALUE: {
                        type: ArgumentType.STRING,
                        defaultValue: 1
                    }
                }
            },
            {
                opcode: 'showvariable',
                func: 'showVariable',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.showVariable',
                    default: 'show variable [VARIABLE]',
                    description: 'text for the "show variable" block'
                }),
                arguments: {
                    VARIABLE: {
                        type: ArgumentType.STRING,
                        menu: 'variables',
                        defaultValue: variables[0].name
                    }
                }
            },
            {
                opcode: 'hidevariable',
                func: 'hideVariable',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.hideVariable',
                    default: 'hide variable [VARIABLE]',
                    description: 'text for the "hide variable" block'
                }),
                arguments: {
                    VARIABLE: {
                        type: ArgumentType.STRING,
                        menu: 'variables',
                        defaultValue: variables[0].name
                    }
                }
            }
        );
    }

    addBlocksForLists (blocks, lists) {
        blocks.push({
            func: 'MAKE_A_LIST',
            blockType: BlockType.BUTTON,
            text: formatMessage({
                id: 'data.makeListButton',
                default: 'Make a List',
                description: 'Label for the button which opens the "New List" dialog'
            })
        });
        if (lists.length < 1) {
            return;
        }
        const commonArgs = {
            INDEX: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
            },
            ITEM: {
                type: ArgumentType.STRING,
                defaultValue: formatMessage({
                    id: 'data.defaultListItem',
                    default: 'thing',
                    description: 'example list item for list blocks like "add to list" or "contains"'
                })
            },
            LIST: {
                type: ArgumentType.STRING,
                menu: 'lists',
                defaultValue: lists[0].name
            }
        };
        lists.forEach(list => blocks.push({
            isDynamic: true, // use the new "dynamic" block definition code path
            opcode: `listcontents`,
            func: 'getListContents',
            blockType: BlockType.REPORTER,
            text: list.name
        }));
        blocks.push(
            '---',
            {
                opcode: 'addtolist',
                func: 'addToList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.addToList',
                    default: 'add [ITEM] to [LIST]',
                    description: 'text for the "add to list" block'
                }),
                arguments: {
                    ITEM: commonArgs.ITEM,
                    LIST: commonArgs.LIST
                }
            },
            '---',
            {
                opcode: 'deleteoflist',
                func: 'deleteOfList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.deleteOfList',
                    default: 'delete [INDEX] of [LIST]',
                    description: 'text for the "delete of" block'
                }),
                arguments: {
                    INDEX: commonArgs.INDEX,
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'deletealloflist',
                func: 'deleteAllOfList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.deleteAllOfList',
                    default: 'delete all of [LIST]',
                    description: 'text for the "delete all of" block'
                }),
                arguments: {
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'insertatlist',
                func: 'insertAtList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.insertAtList',
                    default: 'insert [ITEM] at [INDEX] of [LIST]',
                    description: 'text for the "hide variable" block'
                }),
                arguments: {
                    ITEM: commonArgs.ITEM,
                    INDEX: commonArgs.INDEX,
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'replaceitemoflist',
                func: 'replaceItemOfList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.replaceItemOfList',
                    default: 'replace item [INDEX] of [LIST] with [ITEM]',
                    description: 'text for the "replace index of list with item" block'
                }),
                arguments: {
                    INDEX: commonArgs.INDEX,
                    LIST: commonArgs.LIST,
                    ITEM: commonArgs.ITEM
                }
            },
            '---',
            {
                opcode: 'itemoflist',
                func: 'itemOfList',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'data.itemOfList',
                    default: 'item [INDEX] of [LIST]',
                    description: 'text for the "item of list" block'
                }),
                arguments: {
                    INDEX: commonArgs.INDEX,
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'itemnumoflist',
                func: 'itemNumOfList',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'data.itemNumOfList',
                    default: 'item # of [ITEM] in [LIST]',
                    description: 'text for the "item # of item in list" block'
                }),
                arguments: {
                    ITEM: commonArgs.ITEM,
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'lengthoflist',
                func: 'lengthOfList',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'data.lengthOfList',
                    default: 'length of [LIST]',
                    description: 'text for the "length of list" block'
                }),
                arguments: {
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'listcontainsitem',
                func: 'listContainsItem',
                blockType: BlockType.BOOLEAN,
                text: formatMessage({
                    id: 'data.listContainsItem',
                    default: '[LIST] contains [ITEM]?',
                    description: 'text for the "list contains item" block'
                }),
                arguments: {
                    LIST: commonArgs.LIST,
                    ITEM: commonArgs.ITEM
                }
            },
            '---',
            {
                opcode: 'showlist',
                func: 'showList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.showList',
                    default: 'show list [LIST]',
                    description: 'text for the "show list" block'
                }),
                arguments: {
                    LIST: commonArgs.LIST
                }
            },
            {
                opcode: 'hidelist',
                func: 'hideList',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'data.hideList',
                    default: 'hide list [LIST]',
                    description: 'text for the "hide list" block'
                }),
                arguments: {
                    LIST: commonArgs.LIST
                }
            }
        );
    }
}

module.exports = Scratch3DataBlocks;