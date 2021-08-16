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
                const { dispatch, localParticipantId, isModerator } =
                    this.props;

                if (isModerator) {
                    sendAnalytics(createToolbarEvent("endmeeting.pressed"));
                    dispatch(
                        openDialog(EndMeetingDialog, {
                            exclude: [localParticipantId],
                        })
                    );
                } else {
                    _endJoin();
                }
            }
        };
    }
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
    // const { visible } = ownProps;
    // const { disableRemoteMute } = state["features/base/config"];

    return {
        isModerator,
        localParticipantId: localParticipant.id,
        visible: true,
    };
}

export default translate(connect(_mapStateToProps)(HangupButton));

export async function _endJoin() {
    try {
        const domainEnd = interfaceConfig.DOMAIN_BACK;
        const service = infoConf.getService();
        const meetingId = infoConf.getMeetingId();
        const isModerator = infoConf.getIsModerator();
        const nameJoin = infoUser.getName();
        const userId = infoUser.getUserId();
        const secretKeyManageAi = interfaceConfig.SECRET_KEY_MANAGE_AI;
        const secretKeyOnechat = interfaceConfig.SECRET_KEY_ONECHAT;
        const secretKeyOneDental = interfaceConfig.SECRET_KEY_ONE_DENTAL;
        const secretKeyOneBinar = interfaceConfig.SECRET_KEY_ONE_BINAR;
        const secretKeyJmc = interfaceConfig.SECRET_KEY_JMC;
        const secretKeyTelemedicine = interfaceConfig.SECRET_KEY_TELEMEDICINE;
        const secretKeyEmeeting = interfaceConfig.SECRET_KEY_EMEETING;
        const secretKeyEducation = interfaceConfig.SECRET_KEY_EDUCATION;
        
        if (isModerator && infoConf.getUserRole() == "moderator") {
            infoConf.setIsHostHangup();
        }

        if (service == "onechat") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "onechat",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyOnechat,
                    },
                }
            );
        } else if (service == "manageAi") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "ManageAi",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyManageAi,
                    },
                }
            );
        } else if (service == "onemail") {
            if (isModerator) {
                await axios.post(
                    interfaceConfig.DOMAIN_ONEMAIL +
                        "/api/v1/oneconf/service/hangup",
                    {
                        meeting_id: meetingId,
                        user_id: userId,
                        tag: "onemail",
                    }
                );
            } else {
                await axios.post(
                    interfaceConfig.DOMAIN_ONEMAIL +
                        "/api/v1/oneconf/service/hangup",
                    {
                        meeting_id: meetingId,
                        user_id: userId,
                        tag: "onemail",
                    }
                );
            }
        } else if (service == "onemail_dga") {
            await axios.post(interfaceConfig.DOMAIN_ONEMAIL_DGA + "/endJoin", {
                user_id: userId.split("-")[0],
                meeting_id: meetingId,
            });
        } else if (service == "onedental") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "onedental",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyOneDental,
                    },
                }
            );
        } else if (service == "onebinar") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "onebinar",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyOneBinar,
                    },
                }
            );
        } else if (service == "jmc") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "jmc",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyJmc,
                    },
                }
            );
        } else if (service == "telemedicine") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "telemedicine",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyTelemedicine,
                    },
                }
            );
        } else if (service == "emeeting") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "emeeting",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyEmeeting,
                    },
                }
            );
        } else if (service == "education") {
            await axios.post(
                domainEnd + "/service/endjoin",
                {
                    meetingid: meetingId,
                    name: nameJoin,
                    tag: "education",
                },
                {
                    headers: {
                        Authorization: "Bearer " + secretKeyEducation,
                    },
                }
            );
        } else {
            await axios.post(interfaceConfig.DOMAIN + "/endJoin", {
                user_id: userId,
                meeting_id: meetingId,
            });
        }

        APP.store.dispatch(disconnect(true));
    } catch (error) {
        console.log(error);
    }
}
