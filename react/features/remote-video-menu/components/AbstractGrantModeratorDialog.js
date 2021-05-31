// @flow

import { Component } from 'react';

import {
    createRemoteVideoMenuButtonEvent,
    sendAnalytics
} from '../../analytics';
import { grantModerator, participantRoleChanged } from '../../base/participants';
import socketIOClient from 'socket.io-client';
import infoConf from '../../../../infoConference';

declare var interfaceConfig: Object;

type Props = {

    /**
     * The Redux dispatch function.
     */
    dispatch: Function,

    /**
     * The ID of the remote participant to be granted moderator rights.
     */
    participantID: string,

    /**
     * Function to translate i18n labels.
     */
    t: Function
};

/**
 * Abstract dialog to confirm granting moderator to a participant.
 */
export default class AbstractGrantModeratorDialog
    extends Component<Props> {
    /**
     * Initializes a new {@code AbstractGrantModeratorDialog} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            endpoint: interfaceConfig.SOCKET_NODE || '',
        };

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit: () => boolean;

    /**
     * Callback for the confirm button.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        const { dispatch, participantID } = this.props;
        const socket = socketIOClient(this.state.endpoint)
        const meetingId = infoConf.getMeetingId()

        sendAnalytics(createRemoteVideoMenuButtonEvent(
            'grant.moderator.button',
            {
                'participant_id': participantID
            }));

        socket.emit("coHost", { meetingId: meetingId, participantID: participantID });
        // dispatch(grantModerator(participantID));
        dispatch(participantRoleChanged(participantID, 'moderator'));

        return true;
    }
}
