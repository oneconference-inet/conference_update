// @flow
import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { openDialog } from '../../base/dialog';
import { translate } from '../../base/i18n';
import { IconEndCall } from '../../base/icons';
import { getLocalParticipant, PARTICIPANT_ROLE } from '../../base/participants';
import { connect } from '../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';
import { EndMeetingDialog } from '../../remote-video-menu/components';

import { JitsiRecordingConstants } from '../../base/lib-jitsi-meet';
import { getActiveSession } from '../../recording/functions';

declare var APP: Object;

type Props = AbstractButtonProps & {

    /**
     * The Redux dispatch function.
     */
    dispatch: Function,

    /*
     ** Whether the local participant is a moderator or not.
     */
    isModerator: Boolean,

    /**
     * The ID of the local participant.
     */
    localParticipantId: string
};

/**
 * Implements a React {@link Component} which displays a button for audio muting
 * every participant (except the local one)
 */
class EndMeetingButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.endmeeting';
    icon = IconEndCall;
    label = 'toolbar.endmeeting';
    tooltip = 'toolbar.endmeeting';

    /**
     * Handles clicking / pressing the button, and opens a confirmation dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch, localParticipantId } = this.props;
        var state = APP.store.getState()
        const _fileRecordingSessionOn = Boolean(getActiveSession(state, JitsiRecordingConstants.mode.FILE));

        if (_fileRecordingSessionOn) {
            const _conference = state['features/base/conference'].conference;
            const _fileRecordingSession = getActiveSession(state, JitsiRecordingConstants.mode.FILE);
            _conference.stopRecording(_fileRecordingSession.id);
        }

        sendAnalytics(createToolbarEvent('endmeeting.pressed'));
        dispatch(openDialog(EndMeetingDialog, {
            exclude: [ localParticipantId ]
        }));
    }
}

/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The redux store/state.
 * @param {Props} ownProps - The component's own props.
 * @returns {Object}
 */
function _mapStateToProps(state: Object, ownProps: Props) {
    const localParticipant = getLocalParticipant(state);
    const isModerator = localParticipant.role === PARTICIPANT_ROLE.MODERATOR;
    const { visible } = ownProps;
    const { disableRemoteMute } = state['features/base/config'];

    return {
        isModerator,
        localParticipantId: localParticipant.id,
        visible: visible && isModerator && !disableRemoteMute
    };
}

export default translate(connect(_mapStateToProps)(EndMeetingButton));