"use strict";

/**
 * Imports necessary components and stores.
 */
import {EventStore} from "@stores/eventStore/main.js";
import {BuildElement} from "@components/core/utils/createElement/buildElement.js";
import {EventApp} from "@components/core/eventApp/main.js";

/**
 * Selects the appropriate element creation function based on the specified type.
 *
 * This function checks the provided type and returns the corresponding function for creating
 * either an SVG or HTML element. If the type is "svg", it returns the function for creating
 * SVG elements. For any other type, it returns the function for creating HTML elements.
 * If an error occurs during the selection process, it logs the error and returns undefined.
 *
 * @private
 * @function TypeSelect
 * @memberof module:CreateElementFromStruct
 * @param {string} type - The type of element to create ('svg' for SVG elements, anything else for HTML elements).
 * @returns {undefined|(function(*): (*|undefined))|*} - The appropriate element creation function or undefined if an error occurs.
 * @constructor
 */
const TypeSelect = (type) => {
    const {createSVGElement, createHTMLElement} = BuildElement
    try {
        if(type && type === "svg") return createSVGElement;
        return createHTMLElement;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

/**
 * Creates child elements from the provided structure and appends them to a parent element.
 *
 * This function iterates through the 'children' property of the provided structure (if it exists)
 * and recursively creates each child element using the `createFromStruct` function. It appends the
 * created children to the specified parent element. If a callback is provided, it's called after all
 * children have been created and appended.
 *
 * @private
 * @function createChildren
 * @memberof module:CreateElementFromStruct
 * @param {Object} data - The object containing the structure and parent element.
 * @param {Object} data.struct - The structure of the element to create children for.
 * @param {HTMLElement} data.el - The parent element to append the created children to.
 * @param {Function} cb - The callback function to execute after creating and appending all children.
 * @returns {*} - The result of the callback function or undefined.
 */
const createChildren = (data, cb) => {
    const {struct, el} = data;
    if (struct.children) {
        const startFromLast = struct.children.reverse();
        for (let i = (startFromLast.length - 1); i >= 0; i--) {
            const childItem = startFromLast[i];
            if (childItem) createFromStruct({struct: childItem, parent: el}, cb);
            if (i === 0) {
                if (typeof cb === "function") return cb({res: "done"});
            }
        }
    } else if (typeof cb === "function") {
        return cb({res: "done"});
    }
};

/**
 * Registers events for elements based on the provided structure.
 *
 * This function checks if the 'event' property exists in the provided structure and has the necessary sub-properties ('action' and 'type').
 * If valid, it retrieves the corresponding event handler from the 'EventApp' and registers it with the 'EventStore' for the specified element.
 * Additional event details, such as a specific node ID, can also be included if specified in the structure.
 *
 * @private
 * @function createEventElement
 * @memberof module:CreateElementFromStruct
 * @param {Object} struct - The structure defining the element and the event to be registered.
 * @param {HTMLElement} el - The element to which the event should be attached.
 */
const createEventElement = (struct, el) => {
    if (struct.event && (struct.event.action && struct.event.type)
        && EventApp["EventActions"][struct.event.action.toString()]) {

        const eventStoreSchema = {
            element: el,
            type: struct.event.type.toString(),
            handler: EventApp["EventActions"][struct.event.action.toString()]
        };

        if(struct.event.node) eventStoreSchema['nodeId'] = struct.event.node;

        EventStore.registerEventStore(eventStoreSchema);
    }
};

/**
 * Creates DOM elements from a specified structure.
 *
 * This function takes a structure defining an element, its attributes, children, events, and other properties, then creates the element accordingly.
 * It uses `TypeSelect` to determine whether to create an SVG or HTML element. It sets attributes, content, and registers events for the created element.
 * If the structure specifies children, it recursively creates and appends them to the element. A callback function can be executed upon completion.
 *
 * @function createFromStruct
 * @memberof module:CreateElementFromStruct
 * @param {Object} data - The object containing the structure and optional parent for the element creation.
 * @param {Object} data.struct - The structure defining the element to be created.
 * @param {HTMLElement} [data.parent=document.body] - The parent element to append the created element to. Defaults to the document's body.
 * @param {Function} [cb=undefined] - An optional callback function to execute after creating the element and its children.
 * @returns {undefined|*} - The result of the callback function, or undefined if an error occurs or the structure is invalid.
 */
const createFromStruct = (data, cb = undefined) => {
    try {
        if(typeof data === "object") {
            const {struct, parent = document.body} = data;
            if (!struct?.element) return;
            const el = TypeSelect(struct.element.toString().toLowerCase())({
                parent,
                shadow: struct['shadow'],
                element: {
                    type: struct.element,
                    attr: Object.entries(struct.attr || {}).map(([name, value]) => ({name, value})),
                    attrNS: Object.entries(struct.attrNS || {}).map(([name, value]) => ({name, value})),
                    dataset: Object.entries(struct.dataset || {}).map(([name, value]) => ({name, value}))
                }
            });

            if (struct["text"]) el.textContent = struct["text"];
            if (struct["html"]) el.innerHTML = struct["html"];
            createEventElement(struct, el);
            return createChildren({struct, el}, cb);
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
/**
 * Provides utilities for creating DOM elements from structured object definitions.
 *
 * This module includes the `createFromStruct` function, which allows for the dynamic creation of elements
 * based on a specified structure, including setting attributes, content, and events, as well as handling
 * children elements recursively. It's intended for internal use within the application or package.
 *
 * @private
 * @module CreateElementFromStruct
 */
export const CreateElementFromStruct = {
    ...{createFromStruct}
};