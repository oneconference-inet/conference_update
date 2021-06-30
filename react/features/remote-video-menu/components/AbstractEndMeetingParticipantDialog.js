// @flow

import { Component } from 'react';

import UIEvents from '../../../../service/UI/UIEvents';
import { getActiveSession } from "../../recording/functions";
import { JitsiRecordingConstants } from "../../base/lib-jitsi-meet";

declare var APP: Object;

export type Props = {
  
    getState: Function,

    dispatch: Function,

    participantID: string,

    /**
     * Function to translate i18n labels.
     */
    t: Function
};

/**
 * Abstract dialog to confirm a remote participant mute action.
 *
 * @extends Component
 */
export default class AbstractEndMeetingParticipantDialog<P:Props = Props>
    extends Component<P> {
    /**
     * Initializes a new {@code AbstractMuteRemoteParticipantDialog} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: P) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit: () => boolean;

    /**
     * Handles the submit button action.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        var state = APP.store.getState();
        const _fileRecordingSessionOn = Boolean(
            getActiveSession(
                state,
                JitsiRecordingConstants.mode.FILE
            )
        );

        if (_fileRecordingSessionOn) {
            const _conference =
                state["features/base/conference"].conference;
            const _fileRecordingSession = getActiveSession(
                state,
                JitsiRecordingConstants.mode.FILE
            );
            _conference.stopRecording(_fileRecordingSession.id);
        }

        // APP.UI.emitEvent(UIEvents.LOGOUT);

        return true;
    }
}
