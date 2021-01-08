// @flow

import { getCurrentConference } from '../base/conference';
import { participantIsKnockingOrUpdated } from './actions';
import socketIOClient from 'socket.io-client';
import Logger from 'jitsi-meet-logger';

/**
 * Approves (lets in) or rejects a knocking participant.
 *
 * @param {Function} getState - Function to get the Redux state.
 * @param {string} id - The id of the knocking participant.
 * @param {boolean} approved - True if the participant is approved, false otherwise.
 * @returns {Function}
 */
export function setKnockingParticipantApproval(getState: Function, id: string, approved: boolean) {
    const conference = getCurrentConference(getState());

    if (conference) {
        if (approved) {
            conference.lobbyApproveAccess(id);
        } else {
            conference.lobbyDenyAccess(id);
        }
    }
}

export function onSocketReqJoin(meetingId, endpoint, props) {
    const { dispatch } = props
    const logger = Logger.getLogger(__filename);
    const socket = socketIOClient(endpoint)
    socket.on(meetingId+'-requestjoin' , (incoming) => {
        logger.log("Incoming-Join: ", incoming)
        dispatch(participantIsKnockingOrUpdated(incoming));
    })
}
