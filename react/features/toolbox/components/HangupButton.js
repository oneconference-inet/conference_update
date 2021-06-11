// @flow

import _ from "lodash";

import { createToolbarEvent, sendAnalytics } from "../../analytics";
import { appNavigate } from "../../app/actions";
import { disconnect } from "../../base/connection";
import { translate } from "../../base/i18n";
import { connect } from "../../base/redux";
import { AbstractHangupButton } from "../../base/toolbox/components";
import type { AbstractButtonProps } from "../../base/toolbox/components";
import { getLocalParticipant, PARTICIPANT_ROLE } from "../../base/participants";
import { getActiveSession } from "../../recording/functions";
import { JitsiRecordingConstants } from "../../base/lib-jitsi-meet";
import { EndMeetingDialog } from "../../remote-video-menu/components";
import { openDialog } from "../../base/dialog";

import axios from "axios";
import infoConf from "../../../../infoConference";
import infoUser from "../../../../infoUser";

declare var interfaceConfig: Object;
declare var APP: Object;

/**
 * The type of the React {@code Component} props of {@link HangupButton}.
 */
type Props = AbstractButtonProps & {
    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,
};

/**
 * Component that renders a toolbar button for leaving the current conference.
 *
 * @extends AbstractHangupButton
 */
class HangupButton extends AbstractHangupButton<Props, *> {
    _hangup: Function;

    accessibilityLabel = "toolbar.accessibilityLabel.hangup";
    label = "toolbar.hangup";
    tooltip = "toolbar.hangup";

    /**
     * Initializes a new HangupButton instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._hangup = () => {
            // sendAnalytics(createToolbarEvent("hangup"));
            // this._endJoin();

            // FIXME: these should be unified.
            if (navigator.product === "ReactNative") {
                this.props.dispatch(appNavigate(undefined));
            } else {
                // this.props.dispatch(disconnect(true));
                const { dispatch, localParticipantId } = this.props;
                var state = APP.store.getState();
                const _fileRecordingSessionOn = Boolean(
                    getActiveSession(state, JitsiRecordingConstants.mode.FILE)
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

                sendAnalytics(createToolbarEvent("endmeeting.pressed"));
                dispatch(
                    openDialog(EndMeetingDialog, {
                        exclude: [localParticipantId],
                        // _endJoin: this._endJoin,
                    })
                );
            }
        };

        

    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _doHangup() {
        this._hangup();
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
    const { disableRemoteMute } = state["features/base/config"];

    return {
        isModerator,
        localParticipantId: localParticipant.id,
        visible: visible && isModerator && !disableRemoteMute,
    };
}

export default translate(connect(_mapStateToProps)(HangupButton));
