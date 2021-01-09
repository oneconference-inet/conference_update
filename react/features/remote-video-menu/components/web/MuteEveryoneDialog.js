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
        const { dialog, _title, _content } = this._trackAudioMute(this.props);

        return (
            <Dialog
                okKey = { dialog }
                onSubmit = { this._onSubmit }
                titleString = { _title }
                width = 'small'>
                <div>
                    { _content }
                </div>
            </Dialog>
        );
    }

    _onSubmit: () => boolean;
}

export default translate(connect(abstractMapStateToProps)(MuteEveryoneDialog));
