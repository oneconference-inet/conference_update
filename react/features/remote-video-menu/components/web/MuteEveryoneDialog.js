// @flow

import React from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import AbstractMuteEveryoneDialog, { abstractMapStateToProps, type Props } from '../AbstractMuteEveryoneDialog';

/**
 * A React Component with the contents for a dialog that asks for confirmation
 * from the user before muting all remote participants.
 *
 * @extends AbstractMuteEveryoneDialog
 */
class MuteEveryoneDialog extends AbstractMuteEveryoneDialog<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { track, dialog } = this._trackAudioMute();

        return (
            <Dialog
                okKey = { dialog }
                onSubmit = { this._onSubmit }
                titleString = { track ? this.props.title : 'UnMute everyone except yourself?'}
                width = 'small'>
                <div>
                    { track ? this.props.content : 'Unlock Mute everyone this Room.' }
                </div>
            </Dialog>
        );
    }

    _onSubmit: () => boolean;
}

export default translate(connect(abstractMapStateToProps)(MuteEveryoneDialog));
