// @flow

import { PureComponent } from 'react';

import { isLocalParticipantModerator } from '../../base/participants';

// import { setKnockingParticipantApproval } from '../actions';

import infoConf from '../../../../infoConference';
import socketIOClient from 'socket.io-client';

import Logger from 'jitsi-meet-logger';

const logger = Logger.getLogger(__filename);

export type Props = {

    /**
     * The list of participants.
     */
    _participants: Array<Object>,

    /**
     * True if the list should be rendered.
     */
    _visible: boolean,

    /**
     * The Redux Dispatch function.
     */
    dispatch: Function,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * Abstract class to encapsulate the platform common code of the {@code KnockingParticipantList}.
 */
export default class AbstractKnockingParticipantList<P: Props = Props> extends PureComponent<P> {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: P) {
        super(props);

        this.state = {
            meetingId: '',
            endpoint: interfaceConfig.SOCKET_NODE || 'https://oneconf-dev3.cloudns.asia' ///UAT test
        }
    }

    componentDidMount () {
        this.setState({
            meetingId: infoConf.getMeetingId(),
        })
    }

    /**
     * Function that constructs a callback for the response handler button.
     *
     * @param {string} id - The id of the knocking participant.
     * @param {boolean} approve - The response for the knocking.
     * @returns {Function}
     */
    // return Approve to Socket
    _onRespondToParticipantSocket(id, name, approve) {
        const { dispatch } = this.props
        const { meetingId, endpoint } = this.state
        const socket = socketIOClient(endpoint)
        const data = {
            meetingId: meetingId,
            id: id,
            name: name,
            approve: approve
        }
        logger.log("DATA: ", data);
        socket.emit('handleApprove', data) ;
        // dispatch(setKnockingState(false))
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
export function mapStateToProps(state: Object): $Shape<Props> {
    const { knockingParticipants } = state['features/lobby'];

    return {
        _participants: knockingParticipants,
        _visible: isLocalParticipantModerator(state) && Boolean(knockingParticipants.length)
    };
}
