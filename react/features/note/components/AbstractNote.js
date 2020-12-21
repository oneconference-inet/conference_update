// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';

import { toggleNote } from '../actions';

/**
 * The type of the React {@code Component} props of {@code AbstractNote}.
 */
export type Props = {

    /**
     * True if the Note window should be rendered.
     */
    _isOpen: boolean,

    /**
     * Function to toggle the Note window.
     */
    _onToggleNote: Function,


    /**
     * The Redux dispatch function.
     */
    dispatch: Dispatch<any>,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * Implements an abstract Note panel.
 */
export default class AbstractNote<P: Props> extends Component<P> {}

/**
 * Maps redux actions to the props of the component.
 *
 * @param {Function} dispatch - The redux action {@code dispatch} function.
 * @returns {{
 *     _onToggleNote: Function
 * }}
 * @private
 */
export function _mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        /**
         * Toggles the note window.
         *
         * @returns {Function}
         */
        _onToggleNote() {
            dispatch(toggleNote());
        }
    };
}

/**
 * Maps (parts of) the redux state to {@link Note} React {@code Component}
 * props.
 *
 * @param {Object} state - The redux store/state.
 * @private
 * @returns {{
 *     _isOpen: boolean
 * }}
 */
export function _mapStateToProps(state: Object) {
    const { isOpen } = state['features/note'];

    return {
        _isOpen: isOpen
    };
}
