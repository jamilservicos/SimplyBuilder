"use strict";

/**
 * Converts pixel values to rem units.
 *
 * This function takes a pixel value and an optional base value (defaulting to 16) to convert the pixel value
 * into rem units. It handles both string and numeric inputs for the pixel value. If an error occurs during the
 * conversion process, it logs the error and returns the original pixel value.
 *
 * @function toRem
 * @memberof module:UtilsApp
 * @param {number|string} px - The pixel value to convert. Can be a number or a string ending in 'px'.
 * @param {number} [base=16] - The base pixel size for the conversion, typically the font-size of the document. Defaults to 16.
 * @returns {string} - The converted value in rem units, or the original pixel value if an error occurs.
 */
export const toRem = (px, base = 16) => {
    try {
        let tempPx = px
        if (typeof px === 'string' || px instanceof String) tempPx = tempPx.replace('px', '')
        tempPx = parseInt(tempPx)
        return (1 / base) * tempPx + 'rem'
    } catch (err) {
        console.error(err);
    }
    return px;
};