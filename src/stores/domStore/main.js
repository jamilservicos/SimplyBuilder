"use strict";

/**
 * Imports the EventStore for managing events related to DOM elements.
 */
import {EventStore} from "@stores/eventStore/main.js";

/**
 * Represents a simple object for storing references to DOM elements.
 *
 * @private
 * @typedef {Object} DomStoreElementRef
 * @memberof module:DomStore
 */
const ElementRefStore = {};

/**
 * Adds a DOM element to the ElementRefStore with the specified key.
 *
 * This function stores a reference to a DOM element in the store, allowing it to be retrieved later using its key.
 *
 * @function addElement
 * @memberof module:DomStore
 * @param {Object} element - The object containing the key and the DOM element to store.
 * @param {string} element.key - The key under which to store the element.
 * @param {HTMLElement} element.value - The DOM element to be stored.
 */
const addElement = (element) => {
    try {
        const {key, value} = element;
        if(key && value) ElementRefStore[key.toString()] = value;
    } catch (err) {
        console.log("Unable to add element:", element);
        console.error(err);
    }
};

/**
 * Retrieves a DOM element from the ElementRefStore using the specified key.
 *
 * @function getElement
 * @memberof module:DomStore
 * @param {string} key - The key of the element to retrieve.
 * @returns {HTMLElement|undefined} - The retrieved DOM element or undefined if not found or on error.
 */
const getElement = (key) => {
    try {
        if(key) return ElementRefStore[key];
    } catch (err) {
        console.log("Unable to get element from key:", key);
        console.error(err);
    }
    return undefined;
};

/**
 * Removes a DOM element from the ElementRefStore and optionally removes associated events.
 *
 * @function removeElement
 * @memberof module:DomStore
 * @param {string} key - The key of the element to remove.
 * @param {number} [mode=1] - The mode of removal: 1 for removing element and events, 2 for just removing the reference.
 */
const removeElement = (key, mode = 1) => {
    try {
        const modeTypes = {
            1: (key) => EventStore.removeEventStore(ElementRefStore[key]),
            2: (key) => delete ElementRefStore[key]
        };
        if(key && Number(mode) >= 1 && modeTypes[Number(mode)]) {
            modeTypes[Number(mode)](key);
        }
    } catch (err) {
        console.log("Unable to remove element from key:", key);
        console.error(err);
    }
};

/**
 * The DomStore module provides functionality for managing references to DOM elements.
 *
 * It includes methods for adding, retrieving, and removing elements from an internal store,
 * as well as handling their associated events. This module is intended for internal use within the application or package.
 *
 * @private
 * @module DomStore
 */
export const DomStore = {
    ...{addElement},
    ...{getElement},
    ...{removeElement}
};