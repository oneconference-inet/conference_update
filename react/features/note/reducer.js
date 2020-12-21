// @flow
import { ReducerRegistry } from '../base/redux';

import {
    TOGGLE_NOTE
} from './actionTypes';

const DEFAULT_STATE = {
    isOpen: false
};

ReducerRegistry.register('features/note', (state = DEFAULT_STATE, action) => {
    switch (action.type) {

    case TOGGLE_NOTE:
        return updateNoteState(state);
    }

    return state;
});

/**
 * Updates the chat status on opening the chat view.
 *
 * @param {Object} state - The Redux state of the feature.
 * @returns {Object}
 */
function updateNoteState(state) {
    return {
        ...state,
        isOpen: !state.isOpen
    };
}
