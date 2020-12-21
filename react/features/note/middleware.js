// @flow

import {
    getCurrentConference
} from '../base/conference';

import { StateListenerRegistry } from '../base/redux';
import { showToolbox } from '../toolbox/actions';

declare var APP: Object;

/**
 * Timeout for when to show the privacy notice after a private message was received.
 *
 * E.g. if this value is 20 secs (20000ms), then we show the privacy notice when sending a non private
 * message after we have received a private message in the last 20 seconds.
 */

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. clear messages or close the chat modal if it's left
 * open.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, { dispatch, getState }, previousConference) => {
        if (conference !== previousConference) {
            // conference changed, left or failed...

            if (getState()['features/note'].isOpen) {
                // Closes the chat if it's left open.
                dispatch(toggleNote());
            }

            // Clear chat messages.
            // dispatch(clearMessages());
        }
    });

StateListenerRegistry.register(
    state => state['features/note'].isOpen,
    (isOpen, { dispatch }) => {
        if (typeof APP !== 'undefined' && isOpen) {
            dispatch(showToolbox());
        }
    }
);