// @flow

import React from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';

declare var interfaceConfig: Object; 

class NotDefindDialog {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Dialog
                okKey = 'OK'
                onSubmit = { this.onSubmit }
                titleString = 'Not Defind Meeting id'
                width = 'small'>
                <div>
                    Meeting ID or Url is Wrong !!
                </div>
            </Dialog>
        );
    }

    onSubmit() {
        window.location.href = interfaceConfig.DOAMIN
    }
}

export default translate(connect()(NotDefindDialog));
