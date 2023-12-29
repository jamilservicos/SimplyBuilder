"use strict";

/**
 * Imports utility functions for converting pixel values to rem units and for creating elements from a structure.
 */
import {toRem} from "@components/core/utils/toRem.js";
import {CreateElementFromStruct} from "@components/core/utils/createElement/main.js";

/**
 * @private
 * @module UtilsApp
 * @description This module acts as a utility hub, bundling various utility functions and making them available
 * under the UtilsApp namespace. It is marked as private, indicating it's intended for internal use within the
 * application or package.
 *
 * @property {Function} CreateElementFromStruct - A utility for creating DOM elements from a structured object.
 * @property {Function} toRem - A utility for converting pixel values to rem units, aiding responsive design.
 */
export const UtilsApp = {
    ...{CreateElementFromStruct},
    ...{toRem}
};