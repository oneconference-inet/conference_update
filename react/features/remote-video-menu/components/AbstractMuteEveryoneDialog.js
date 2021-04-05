// @flow

import React from 'react';

import { Dialog } from '../../base/dialog';
import { getLocalParticipant, getParticipantDisplayName } from '../../base/participants';
import { muteAllParticipants } from '../actions';

import AbstractMuteRemoteParticipantDialog, {
    type Props as AbstractProps
} from './AbstractMuteRemoteParticipantDialog';

import axios from "axios";
import infoConf from '../../../../infoConference';
import socketIOClient from 'socket.io-client';
import Logger from "jitsi-meet-logger";

declare var interfaceConfig: Object;
const logger = Logger.getLogger(__filename);

/**
 * The type of the React {@code Component} props of
 * {@link AbstractMuteEveryoneDialog}.
 */
export type Props = AbstractProps & {

    content: string,
    exclude: Array<string>,
    title: string
};

export type PropsTrack = {

    dialog: String,

    track: boolean
}

/**
 *
 * An abstract Component with the contents for a dialog that asks for confirmation
 * from the user before muting all remote participants.
 *
 * @extends AbstractMuteRemoteParticipantDialog
 */
export default class AbstractMuteEveryoneDialog<P: Props> extends AbstractMuteRemoteParticipantDialog<P> {
    static defaultProps = {
        exclude: [],
        muteLocal: false
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    // render() {
    //     const { content, title } = this.props;
    //     const { track, dialog } = this._trackAudioMute();

    //     return (
    //         <Dialog
    //             okKey = { dialog }
    //             onSubmit = { this._onSubmit }
    //             titleString = { track ? title : 'UnMute everyone except yourself?'}
    //             width = 'small'>
    //             <div>
    //                 { track ? content : 'Unlock Mute everyone this Room.' }
    //             </div>
    //         </Dialog>
    //     );
    // }

    _onSubmit: () => boolean;

    /**
     * Callback to be invoked when the value of this dialog is submitted.
     *
     * @returns {boolean}
     */
    _onSubmit() {
        const {
            dispatch,
            exclude
        } = this.props;

        const socket = socketIOClient(interfaceConfig.SOCKET_NODE)
        const { track } = this._trackAudioMute(this.props);
        const data = {
            eventName: 'trackMute',
            meetingId: infoConf.getMeetingId(),
            mute: track
        }

        if (track) {
            dispatch(muteAllParticipants(exclude));
            socket.emit('trackMute', data)
            infoConf.setMuteAllState(true)
            this._apiTrackmute(true);
        } else {
            socket.emit('trackMute', data)
            infoConf.setMuteAllState(false)
            this._apiTrackmute(false);
        }

        logger.info("trackMute state: ", track);
        // dispatch(muteAllParticipants(exclude)); 

        return true;
    }

    _trackAudioMute(props): PropsTrack {
        const { t } = props 
        const trackMuteAll = infoConf.getMuteAllState();

        return !trackMuteAll ? {
            dialog: t('dialog.muteParticipantButton'),
            _title: t('dialog.muteEveryoneTitle'),
            _content: t('dialog.muteEveryoneDialog'),
            track: true
        } : {
            dialog: t('dialog.unMuteParticipantButton'),
            _title: t('dialog.trackUnmuteTitle'),
            _content: t('dialog.trackUnmuteContent'),
            track: false
        };
    }

    async _apiTrackmute(mute) {
        const meetingId = infoConf.getMeetingId();
        const service = infoConf.getService();
        // console.log('------------service mute', service);
        try {
            if(service === 'onemail_dga') {
                await axios.post(interfaceConfig.DOMAIN_ONEMAIL_DGA + "/trackMuteAll", {
                    meetingId: meetingId,
                    muteAll: mute,
                });
            } else {
                await axios.post(interfaceConfig.DOMAIN + "/trackMuteAll", {
                    meetingId: meetingId,
                    muteAll: mute,
                });
            }
        } catch (error) {
            logger.error("Error api track mute: ", error);
        }
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code AbstractMuteEveryoneDialog}'s props.
 *
 * @param {Object} state - The redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component.
 * @returns {Props}
 */
export function abstractMapStateToProps(state: Object, ownProps: Props) {
    const { exclude, t } = ownProps;

    const whom = exclude
        // eslint-disable-next-line no-confusing-arrow
        .map(id => id === getLocalParticipant(state).id
            ? t('dialog.muteEveryoneSelf')
            : getParticipantDisplayName(state, id))
        .join(', ');

    return whom.length ? {
        content: t('dialog.muteEveryoneElseDialog'),
        title: t('dialog.muteEveryoneElseTitle', { whom })
    } : {
        content: t('dialog.muteEveryoneDialog'),
        title: t('dialog.muteEveryoneTitle')
    };
}
