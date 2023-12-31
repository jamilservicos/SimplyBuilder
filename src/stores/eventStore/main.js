"use strict";

/**
 * Imports the DomStore for managing DOM elements.
 */
import {DomStore} from "@stores/domStore/main.js";

/**
 * Represents a map where each key is a DOM element and the value is an array of event handlers and types associated with that element.
 *
 * @private
 * @typedef {Map<Element, Array>} EventStoreActionRef
 * @memberof module:EventStore
 */
const ActionRefStore = new Map();

/**
 * Registers an event handler for a specific event type on a given element.
 *
 * This function associates a handler function with an event type for a given DOM element.
 * It stores the association in the ActionRefStore for future reference and management.
 *
 * @function registerEventStore
 * @memberof module:EventStore
 * @param {Object} data - The object containing the necessary data to register the event.
 * @param {HTMLElement} data.element - The element to which the event listener will be added.
 * @param {string} data.type - The type of event to listen for.
 * @param {Function} data.handler - The handler function to execute when the event occurs.
 * @param {string} [data.nodeId] - An optional ID associated with the element.
 */
const registerEventStore = (data) => {
    try {
        const {element, type, handler, nodeId} = data;
        if(element && type && handler) {
            if (!ActionRefStore.has(element)) ActionRefStore.set(element, []);
            const schema = {type, handler};
            if(nodeId) schema['nodeId'] = nodeId;
            ActionRefStore.get(element).push(schema);
            element.addEventListener(type, handler, false);
        }
    } catch(err) {
        console.log("Unable to register event:", data);
        console.error(err);
    }
};

/**
 * Removes an element from the DomStore and the DOM itself.
 *
 * @function removeFromDomStore
 * @memberof module:EventStore
 * @param {HTMLElement} element - The element to be removed from the DomStore and the DOM.
 */
const removeFromDomStore = (element) => {
    try {
        const {dataset} = element;
        if(dataset.state) DomStore.removeElement(dataset.state, 2);
        element.remove();
    } catch (err) {
        console.log("Unable to remove from DomStore:", element);
        console.error(err);
    }
};

/**
 * Removes all event handlers associated with a given element from the EventStore and then removes the element from the DOM.
 *
 * This function removes all event listeners that were previously registered for the element
 * and deletes its reference from the ActionRefStore. It also removes the element from the DOM.
 *
 * @function removeEventStore
 * @memberof module:EventStore
 * @param {HTMLElement} element - The element for which to remove all associated event handlers.
 */
const removeEventStore = (element) => {
    try {
        if (ActionRefStore.has(element)) {
            const eventList = ActionRefStore.get(element);
            if(eventList.length >= 1) {
                for(let i = (eventList.length - 1); i >=0; i--) {
                    const item = eventList[i];
                    if(item) element.removeEventListener(item.type, item.handler, false);
                    if(i === 0) ActionRefStore.delete(element);
                }
            }
        }
        removeFromDomStore(element);
    } catch(err) {
        console.log("Unable to remove event from element:", element);
        console.error(err);
    }
};

/**
 * The EventStore module provides functionality for managing event handlers associated with DOM elements.
 *
 * It includes methods for registering events to elements, removing events, and cleaning up associated data.
 * This module is intended for internal use within the application or package.
 *
 * @private
 * @module EventStore
 */
export const EventStore = {
    ...{registerEventStore},
    ...{removeEventStore}
};