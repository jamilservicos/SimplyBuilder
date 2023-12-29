"use strict";

/**
 * Imports necessary DomStore
 */
import {DomStore} from "@stores/domStore/main.js";

/**
 * Sets namespaced attributes on a given DOM element.
 *
 * This function iterates through an array of attribute objects and sets each one on the specified
 * element using the setAttributeNS method. It's typically used for setting attributes that are part of a
 * particular namespace, such as SVG attributes. If an error occurs during the process of setting an attribute,
 * it logs the error to the console.
 *
 * @function setAttrNS
 * @memberof module:BuildElement
 * @param {HTMLElement|SVGElement} element - The DOM element to which the attributes should be added.
 * @param {Array} attrs - An array of attribute objects to set on the element. Each object should have 'name' and 'value' properties.
 */
const setAttrNS = (element, attrs) => {
    for (let i = attrs.length - 1; i >= 0; i--) {
        try {
            const item = attrs[i];
            if (item?.name) {
                element.setAttributeNS(null, item.name.toString(), item.value.toString());
            }
        } catch (err) {
            console.error(err);
        }
    }
};

/**
 * Sets attributes on a given DOM element.
 *
 * This function iterates through an array of attribute objects and sets each one on the specified
 * element using the setAttribute method. It's used for setting standard HTML attributes on elements.
 * If an error occurs during the process of setting an attribute, it logs the error to the console.
 *
 * @function setAttr
 * @memberof module:BuildElement
 * @param {HTMLElement|SVGElement} element - The DOM element to which the attributes should be added.
 * @param {Array} attrs - An array of attribute objects to set on the element. Each object should have 'name' and 'value' properties.
 */
const setAttr = (element, attrs) => {
    for (let i = attrs.length - 1; i >= 0; i--) {
        try {
            const item = attrs[i];
            if (item?.name) {
                element.setAttribute(item.name.toString(), item.value.toString());
            }
        } catch (err) {
            console.error(err);
        }
    }
};

/**
 * Sets data attributes on a given DOM element.
 *
 * This function iterates through an array of dataset objects and sets each one as a data attribute
 * on the specified element using the dataset property. Special handling is applied when the data attribute
 * name is 'state', where the element is also registered with the DomStore. If an error occurs during
 * the process of setting a data attribute, it logs the error to the console.
 *
 * @function setData
 * @memberof module:BuildElement
 * @param {HTMLElement|SVGElement} element - The DOM element to which the data attributes should be added.
 * @param {Array} datasets - An array of dataset objects to set on the element. Each object should have 'name' and 'value' properties.
 */
const setData = (element, datasets) => {
    for (let i = datasets.length - 1; i >= 0; i--) {
        try {
            const item = datasets[i];
            if (item?.name) {
                if (item.name) element.dataset[item.name.toString()] = item.value.toString();
                if (item.name === "state") {
                    DomStore.addElement({key: item.value.toString(), value: element});
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};

/**
 * Creates a namespaced DOM element, typically used for SVG elements.
 *
 * This function attempts to create an element within a specific namespace, commonly the SVG namespace.
 * It applies attributes, namespaced attributes, and datasets to the created element as specified.
 * If an error occurs during the element creation or while setting its properties, it logs the error to the console.
 *
 * @function createElementNS
 * @memberof module:BuildElement
 * @param {Object} data - The object containing the necessary data to create the element and set its properties.
 * @param {string} data.type - The type of the element to create (e.g., 'svg', 'circle').
 * @param {Array} [data.attr] - An array of attribute objects to set on the element.
 * @param {Array} [data.attrNS] - An array of namespaced attribute objects to set on the element.
 * @param {Array} [data.dataset] - An array of dataset objects to set on the element.
 * @returns {undefined|SVGElement} - The created namespaced element, or undefined if an error occurs.
 */
const createElementNS = (data) => {
    try {
        const { dataset, attrNS, attr, type } = data;
        const element = document.createElementNS("http://www.w3.org/2000/svg", type);
        if (attr?.length) setAttr(element, attr);
        if (attrNS?.length) setAttrNS(element, attrNS);
        if (dataset?.length) setData(element, dataset);
        return element;
    } catch (err) {
        console.error(err);
    }
    return undefined;
};

/**
 * Creates a standard HTML element and sets its attributes and data attributes.
 *
 * This function attempts to create a standard HTML element of the specified type. It then applies
 * attributes and datasets to the created element as specified. If an error occurs during the
 * element creation or while setting its properties, it logs the error to the console.
 *
 * @function buildElement
 * @memberof module:BuildElement
 * @param {Object} data - The object containing the necessary data to create the element and set its properties.
 * @param {string} data.type - The type of the element to create (e.g., 'div', 'span').
 * @param {Array} [data.attr] - An array of attribute objects to set on the element.
 * @param {Array} [data.dataset] - An array of dataset objects to set on the element.
 * @returns {undefined|HTMLElement} - The created HTML element, or undefined if an error occurs.
 */
const buildElement = (data) => {
    try {
        const { dataset, attr, type} = data;
        const element = document.createElement(type);
        if (attr?.length) setAttr(element, attr);
        if (dataset?.length) setData(element, dataset);
        return element;
    } catch (err) {
        console.error(err);
    }
    return undefined;
};

/**
 * Creates an HTML element, appends it to the specified parent, and handles shadow DOM if necessary.
 *
 * This function creates a new HTML element using the provided element data. It then appends the new element
 * to the specified parent. If the parent is not provided or invalid, it appends the element to the document body.
 * If shadow DOM is specified, it sets up a shadow root on the created element. If an error occurs during the
 * element creation or appending process, it logs the error to the console.
 *
 * @function createHTMLElement
 * @memberof module:BuildElement
 * @param {Object} data - The object containing the necessary data to create the element and append it.
 * @param {Object|HTMLElement} data.parent - The parent element to append the new element to. If not provided or invalid, defaults to document.body.
 * @param {Object} data.element - The structure defining the new element to be created.
 * @param {string} [data.shadow] - The shadow mode ('open' or 'closed') if a shadow DOM is to be attached to the created element.
 * @returns {undefined|HTMLElement} - The created and appended HTML element, or undefined if an error occurs.
 */
const createHTMLElement = (data) => {
    try {
        const { parent, element, shadow} = data;
        let childElement = buildElement(element);
        if (parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof ShadowRoot) {
            parent.appendChild(childElement);
        } else if (parent && typeof parent === "object") {
            const parentElement = buildElement(parent);
            parentElement.appendChild(childElement);
        } else document.body.appendChild(childElement);
        if(shadow && childElement.dataset?.state) {
            const state = childElement.dataset.state.toString();
            childElement = DomStore.getElement(state).attachShadow({
                mode: shadow
            });
        }
        return childElement;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

/**
 * Creates an SVG element and appends it to the specified parent.
 *
 * This function creates a new SVG element using the provided element data and namespace. It then appends the new SVG element
 * to the specified parent. If the parent is an HTMLElement or SVGElement, it appends the child directly. If the parent is an object,
 * it assumes it's a structured definition and creates a new parent SVG element to append the child to. If an error occurs during the
 * element creation or appending process, it logs the error to the console.
 *
 * @function createSVGElement
 * @memberof module:BuildElement
 * @param {Object} data - The object containing the necessary data to create the SVG element and append it.
 * @param {Object|SVGElement} data.parent - The parent element or structured definition to append the new SVG element to.
 * @param {Object} data.element - The structure defining the new SVG element to be created.
 * @returns {undefined|SVGElement} - The created and appended SVG element, or undefined if an error occurs.
 */
const createSVGElement = (data) => {
    try {
        const { parent, element } = data;
        const childElement = createElementNS(element);
        if(parent) {
            if (parent instanceof HTMLElement || parent instanceof SVGElement) {
                parent.appendChild(childElement);
            } else if (typeof parent === "object") {
                const parentElement = createElementNS(parent);
                parentElement.appendChild(childElement);
            }
        }
        return childElement;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

/**
 * Provides functionality for building HTML and SVG elements.
 *
 * This module includes functions for creating and manipulating DOM elements.
 * It exports `createHTMLElement` for creating standard HTML elements and `createSVGElement`
 * for creating SVG elements. Both functions facilitate setting attributes, appending to parents,
 * and handling shadow DOM where applicable. This module is intended for internal use within the application or package.
 *
 * @private
 * @module BuildElement
 */
export const BuildElement = {
    ...{createHTMLElement},
    ...{createSVGElement}
};