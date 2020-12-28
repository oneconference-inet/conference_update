// @flow

import React from 'react';
import Transition from 'react-transition-group/Transition';

// import { Icon, IconClose } from '../../../base/icons';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import AbstractNote, {
    _mapDispatchToProps,
    _mapStateToProps,
    type Props
} from '../AbstractNote';

import { getLocalParticipant } from '../../../base/participants';

import Iframe from 'react-iframe';
import infoConf from '../../../../../infoConference';
import infoUser from '../../../../../infoUser';

declare var APP: Object;

class Note extends AbstractNote<Props> {

    constructor(props: Props) {
        super(props);

        this._isExited = true;

        // Bind event handlers so they are only bound once for every instance.
        this._renderPanelContent = this._renderPanelContent.bind(this);
    }
    
    render() {
        return (
            <Transition
                in = { this.props._isOpen }
                timeout = { 500 }>
                { this._renderPanelContent }
            </Transition>
        );
    }

    _renderPanelContent: (string) => React$Node | null;

    /**
     * Renders the contents of the Note panel, depending on the current
     * animation state provided by {@code Transition}.
     *
     * @param {string} state - The current display transition state of the
     * {@code Note} component, as provided by {@code Transition}.
     * @private
     * @returns {ReactElement | null}
     */
    _renderPanelContent(state) {
        this._isExited = state === 'exited';
        const reduxState = APP.store.getState();

        const { name } = getLocalParticipant(reduxState);
        const config = reduxState['features/base/config'];

        var meetingId_noNum;

        if (infoUser.getiAmRecord()) {
            meetingId_noNum = 'botNote' //for Bot iAmRecord
        } else {
            meetingId_noNum = infoConf.getMeetingId().split('-')[0];
        }

        const etherpad_base = config.etherpad_base

        const url = etherpad_base + meetingId_noNum +'?' + 'userName=' + name
        const { _isOpen } = this.props;
        const ComponentToRender = !_isOpen && state === 'exited'
            ? null
            : (
                <>
                    <Iframe url={ url }
                            width="100%"
                            height="100%"
                            frameBorder='0'
                            id="NoteId"
                            className="noteClass"/>
                </>
            );
        let className = '';
        const opacity = {
            opacity: "0.8"
        }

        if (_isOpen) {
            className = 'slideInExt';
        } else if (this._isExited) {
            className = 'invisible';
        }

        return (
            <div
                className = { `sideToolbarContainer ${className}` }
                id = 'sideToolbarContainer'
                style={ opacity } >
                { ComponentToRender }
            </div>
        );
    }
}

export default translate(connect(_mapStateToProps, _mapDispatchToProps)(Note));
