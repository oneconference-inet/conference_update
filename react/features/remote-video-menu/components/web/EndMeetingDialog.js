// @flow

import React from 'react';
import axios from 'axios'
import infoConf from '../../../../../infoConference'
import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { endAllParticipants } from '../../actions';
import UIEvents from '../../../../../service/UI/UIEvents';
import AbstractEndMeetingParticipantDialog, {
    type Props as AbstractProps
} from '../AbstractEndMeetingParticipantDialog';
import { disconnect } from "../../../base/connection";

declare var APP: Object;
declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of
 * {@link MuteEveryoneDialog}.
 */
type Props = AbstractProps & {

    /**
     * The IDs of the remote participants to exclude from being muted.
     */
    exclude: Array<string>
};

/**
 * Translations needed for dialog rendering.
 */
type Translations = {

    /**
     * Content text.
     */
    content: string,

    /**
     * Title text.
     */
    title: string
}

/**
 * A React Component with the contents for a dialog that asks for confirmation
 * from the user before muting a remote participant.
 *
 * @extends Component
 */
class EndMeetingDialog extends AbstractEndMeetingParticipantDialog<Props> {
    static defaultProps = {
        exclude: [],
        muteLocal: false,
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { content, title } = this._getTranslations();

        return (
            <Dialog
                okKey = 'dialog.endmeet'
                onSubmit = { this._onSubmit }
                titleString = { title }
                width = 'small'
                onLeave = { this._endJoin }
                >
                <div>
                    { content }
                </div>
            </Dialog>
        );
    }

    _onSubmit: () => boolean;

    /**
     * Callback to be invoked when the value of this dialog is submitted.
     *
     * @returns {boolean}
     */
    async _onSubmit() {
        try {
            const conference = APP;
            const {
                dispatch,
                exclude,
            } = this.props;
            const service = infoConf.getService();
            const secretKeyManageAi = interfaceConfig.SECRET_KEY_MANAGE_AI;
            const secretKeyOnechat = interfaceConfig.SECRET_KEY_ONECHAT;
            const secretKeyOneDental = interfaceConfig.SECRET_KEY_ONE_DENTAL;
            const secretKeyOneBinar = interfaceConfig.SECRET_KEY_ONE_BINAR;
            const secretKeyJmc = interfaceConfig.SECRET_KEY_JMC;
            const secretKeyTelemedicine = interfaceConfig.SECRET_KEY_TELEMEDICINE;
            const secretKeyEmeeting = interfaceConfig.SECRET_KEY_EMEETING;
            let domainEnd
            // APP.store.dispatch(maybeOpenFeedbackDialog(conference))
            dispatch(endAllParticipants(exclude))

            if (service == "onechat") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyOnechat }})
            } else if (service == "manageAi") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyManageAi }})
            } else if (service == "onemail") {
                domainEnd = interfaceConfig.DOMAIN_ONEMAIL + '/api/v1/oneconf/service/endmeeting'
                await axios.post(domainEnd, { meeting_id : infoConf.getMeetingId(), tag: service })
            } else if (service == "onemail_dga") {
                domainEnd = interfaceConfig.DOMAIN_ONEMAIL_DGA + '/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service })
            } else if (service == "onedental") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyOneDental }})
            } else if (service == "onebinar") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyOneBinar }})
            } else if (service == "jmc") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyJmc }})
            } else if (service == "telemedicine") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyTelemedicine }})
            } else if (service == "emeeting") {
                domainEnd = interfaceConfig.DOMAIN_BACK + '/service/endmeeting'
                await axios.post(domainEnd, { meetingid : infoConf.getMeetingId(), tag: service }, {headers: { Authorization: "Bearer " + secretKeyEmeeting }})
            } else {
                await axios.post(interfaceConfig.DOMAIN + '/endmeeting' , { meetingid : infoConf.getMeetingId() })
            }
            conference.UI.emitEvent(UIEvents.LOGOUT)

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
        
    }

    _endJoin: () => boolean;

    /**
     * Callback to be invoked when the value of this dialog is submitted.
     *
     * @returns {boolean}
     */

    async _endJoin() {
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
            const secretKeyTelemedicine =
                interfaceConfig.SECRET_KEY_TELEMEDICINE;
            const secretKeyEmeeting = interfaceConfig.SECRET_KEY_EMEETING;
            if (isModerator) {
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
                await axios.post(
                    interfaceConfig.DOMAIN_ONEMAIL_DGA + "/endJoin",
                    {
                        user_id: userId.split("-")[0],
                        meeting_id: meetingId,
                    }
                );
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
            } else {
                await axios.post(interfaceConfig.DOMAIN + "/endJoin", {
                    user_id: userId,
                    meeting_id: meetingId,
                });
            }

            APP.store.dispatch(disconnect(true))  
        } catch (error) {
            console.log(error)
        }
    };


    /**
     * Method to get translations depending on whether we have an exclusive
     * mute or not.
     *
     * @returns {Translations}
     * @private
     */
     _getTranslations(): Translations {
         const { exclude, t } = this.props;
         const dialog = {
                content: t('dialog.endMeetingDialog'),
                title: t('dialog.endMeetingTitle')
         };

         return dialog
     }
}

export default translate(connect()(EndMeetingDialog));
