/* @flow */

import React, { Component } from "react";

import { getConferenceName } from "../../../base/conference/functions";
import { getParticipantCount } from "../../../base/participants/functions";
import { connect } from "../../../base/redux";
import { isToolboxVisible } from "../../../toolbox/functions.web";
import ConferenceTimer from "../ConferenceTimer";

import ParticipantsCount from "./ParticipantsCount";

import socketIOClient from "socket.io-client";
import Axios from "axios";
import infoConf from "../../../../../infoConference";
import infoUser from "../../../../../infoUser";

/**
 * The type of the React {@code Component} props of {@link Subject}.
 */
type Props = {
    /**
     * Whether the conference timer should be shown or not.
     */
    _hideConferenceTimer: Boolean,

    /**
     * Whether the participant count should be shown or not.
     */
    _showParticipantCount: boolean,

    /**
     * The subject or the of the conference.
     * Falls back to conference name.
     */
    _subject: string,

    /**
     * Indicates whether the component should be visible or not.
     */
    _visible: boolean,
};

/**
 * Subject react component.
 *
 * @class Subject
 */

declare var interfaceConfig: Object;

class Subject extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */

    // doSomethingBeforeUnload = () => {
    //     if (this.props.count === 1) {
    //         Axios.post(interfaceConfig.DOMAIN + "/endmeeting", {
    //             meetingid: infoConf.getMeetingId(),
    //         });
    //     }
    // };

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            // const socket = socketIOClient(interfaceConfig.DOMAIN);
            // socket.emit("left", {
            //     status: "left",
            //     meeting_id: infoConf.getMeetingId(),
            //     count: this.props.count,
            //     user_id: infoUser.getUserId(),
            // });
            // return this.doSomethingBeforeUnload();
        });
    };

    componentDidMount() {
        // Activate the event listener
        const socket = socketIOClient(interfaceConfig.DOMAIN);
        socket.emit("status", {
            status: "created",
            meeting_id: infoConf.getMeetingId(),
            user_id: infoUser.getUserId(),
        });

        socket.emit("join", {
            status: "join",
            meeting_id: infoConf.getMeetingId(),
            count: this.props.count,
            user_id: infoUser.getUserId(),
        });

        window.addEventListener(
            "beforeunload",
            this.setupBeforeUnloadListener(),
            false
        );
    }

    render() {
        const {
            _hideConferenceTimer,
            _showParticipantCount,
            _subject,
            _visible,
        } = this.props;

        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            const socket = socketIOClient(interfaceConfig.DOMAIN);
            socket.emit("status", {
                status: "refresh",
                meeting_id: infoConf.getMeetingId(),
                count: this.props.count,
                user_id: infoUser.getUserId(),
            });
        } else {
            const socket = socketIOClient(interfaceConfig.DOMAIN);
            socket.emit("open session", {
                status: "open session",
                meeting_id: infoConf.getMeetingId(),
            });
        }

        return (
            <div className={`subject ${_visible ? "visible" : ""}`}>
                <span className="subject-text">{_subject}</span>
                {_showParticipantCount && <ParticipantsCount />}
                {!_hideConferenceTimer && <ConferenceTimer />}
            </div>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated
 * {@code Subject}'s props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _hideConferenceTimer: boolean,
 *     _showParticipantCount: boolean,
 *     _subject: string,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state) {
    const participantCount = getParticipantCount(state);

    return {
        _hideConferenceTimer: Boolean(
            state["features/base/config"].hideConferenceTimer
        ),
        _showParticipantCount: participantCount > 2,
        _subject: getConferenceName(state),
        _visible: isToolboxVisible(state) && participantCount > 1,
        count: participantCount,
    };
}

export default connect(_mapStateToProps)(Subject);
