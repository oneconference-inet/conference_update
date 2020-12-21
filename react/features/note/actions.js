// @flow

import {
    TOGGLE_NOTE
} from './actionTypes';

/**
 * Toggles display of the chat side panel.
 *
 * @returns {{
 *     type: TOGGLE_CHAT
 * }}
 */
export function toggleNote() {
    return {
        type: TOGGLE_NOTE
    };
}
