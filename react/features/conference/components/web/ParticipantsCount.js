// @flow

import React, { PureComponent } from "react";
import type { Dispatch } from "redux";

import { openDialog } from "../../../base/dialog";
import { getParticipantCount } from "../../../base/participants";
import { connect } from "../../../base/redux";
import { SpeakerStats } from "../../../speaker-stats";
import Axios from "axios";
import infoConf from "../../../../../infoConference";
/**
 * The type of the React {@code Component} props of {@link ParticipantsCount}.
 */
type Props = {
    /**
     * Number of the conference participants.
     */
    count: string,

    /**
     * Conference data.
     */
    conference: Object,

    /**
     * Invoked to open Speaker stats.
     */
    dispatch: Dispatch<any>,
};

declare var interfaceConfig: Object;

/**
 * ParticipantsCount react component.
 * Displays the number of participants and opens Speaker stats on click.
 *
 * @class ParticipantsCount
 */
class ParticipantsCount extends PureComponent<Props> {
    /**
     * Initializes a new ParticipantsCount instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    doSomethingBeforeUnload = async () => {
        if (this.props.count === 1) {
            Axios.post(interfaceConfig.DOMAIN + "/endmeeting", {
                meetingid: infoConf.getMeetingId(),
            });
        }
    };

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            //   this.checkReload();

            return this.doSomethingBeforeUnload();
        });
    };

    componentDidMount() {
        // Activate the event listener
        window.addEventListener(
            "beforeunload",
            this.setupBeforeUnloadListener(),
            false
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.setupBeforeUnloadListener(),
            false
        );
        this.setupBeforeUnloadListener();
    }

    _onClick: () => void;

    /**
     * Callback invoked to display {@code SpeakerStats}.
     *
     * @private
     * @returns {void}
     */
    _onClick() {
        const { dispatch, conference } = this.props;

        dispatch(openDialog(SpeakerStats, { conference }));
    }

    /**
     * Implements React's {@link PureComponent#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */

    render() {
        return (
            <div className="participants-count" onClick={this._onClick}>
                <span className="participants-count-number">
                    {this.props.count}
                </span>
                <span className="participants-count-icon" />
            </div>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code ParticipantsCount} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function mapStateToProps(state) {
    return {
        conference: state["features/base/conference"].conference,
        count: getParticipantCount(state),
    };
}

export default connect(mapStateToProps)(ParticipantsCount);
