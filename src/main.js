"use strict";
/**
 * @fileoverview This module initializes the application and demonstrates the creation of HTML elements
 * from a structured object using UtilsApp's CreateElementFromStruct utility.
 */

/**
 * Imports the main stylesheet for the application.
 */
import '@styles/main.scss';

/**
 * Imports the UtilsApp module from the core utilities.
 * This module provides utility functions like creating elements from structures and converting pixel values to rem units.
 */
import {UtilsApp} from "@components/core/utils/main.js";

/**
 * Imports the EventApp module from the core event handling utilities.
 * This module provides functionality for registering and unregistering custom event types and actions.
 */
import {EventApp} from "@components/core/eventApp/main.js";

/**
 * Imports the clickButton module from the application components.
 * This module contains functionality related to click events, such as specific event handlers for button clicks.
 */
import {clickButton} from "@components/app/clickButton.js";
/**
 * Adds a DOMContentLoaded event listener to ensure the logic executes after the DOM is fully loaded.
 * Within this event, it demonstrates creating a structured HTML element and appending it to the DOM.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Registers a custom event named 'clickHelloWord' with the specified handler from clickButton object.
    EventApp.eventRegister("clickHelloWord", clickButton.clickHelloWord);

    // Defines the structure for the entire application container including header, section, and footer.
    const struct =  {
        "element": "div",
        "attr": {
            "class": "app-container"
        },
        "children": [
            {
                "element": "header",
                "attr": {
                    "class": "header-container"
                },
                "text": "header"  // Text content for the header.
            },
            {
                "element": "section",
                "attr": {
                    "class": "content-container"
                },
                "children": [
                    {
                        "element": "button",
                        "attr": {
                            // Styling for the button, converting pixel values to rem units for better scalability.
                            "style": `padding: ${UtilsApp.toRem("4px")};height: fit-content; font-size: ${UtilsApp.toRem("24px")}; font-weight: bold; margin: 0 auto; align-self: center;`
                        },
                        "event": {
                            "type": "mousedown",  // Event type to listen for.
                            "action": "clickHelloWord"  // Custom event action registered earlier.
                        },
                        "text": "click here to test"  // Text content for the button.
                    }
                ]
            },
            {
                "element": "footer",
                "attr": {
                    "class": "footer-container"
                },
                "text": "footer"  // Text content for the footer.
            }
        ]
    };

    // Creates and appends structured HTML elements to the DOM using the createFromStruct method from UtilsApp.
    UtilsApp.CreateElementFromStruct.createFromStruct({
        struct
    });
});