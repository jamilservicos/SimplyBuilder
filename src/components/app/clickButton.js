"use strict";

/**
 * Provides a simple interaction function to demonstrate event handling.
 * The clickHelloWord function triggers an alert with a "Hello world!" message when called.
 * This module can be used to test event registration and response within the application.
 */

/**
 * Displays an alert with the message "Hello world!".
 * This function is meant to be used as an event handler for a click event.
 *
 * @function clickHelloWord
 */
const clickHelloWord = () => {
    window.alert("Hello world!");
};

/**
 * Exports the clickHelloWord function as part of the clickButton object.
 * This structure allows for easy expansion with more click-related functions in the future.
 *
 * @module clickButton
 */
export const clickButton = {
    ...{clickHelloWord}
}