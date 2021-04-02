// @flow

import { translate } from '../../../../base/i18n';
import { connect } from '../../../../base/redux';
import AbstractRecordButton, {
    _mapStateToProps as _abstractMapStateToProps,
    type Props
} from '../AbstractRecordButton';

import infoConf from '../../../../../../infoConference'
import infoUser from '../../../../../../infoUser'

declare var interfaceConfig: Object;

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code RecordButton} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the Component.
 * @private
 * @returns {{
 *     _fileRecordingsDisabledTooltipKey: ?string,
 *     _isRecordingRunning: boolean,
 *     _disabled: boolean,
 *     visible: boolean
 * }}
 */
export function _mapStateToProps(state: Object, ownProps: Props): Object {
    const abstractProps = _abstractMapStateToProps(state, ownProps);
    const service = infoConf.getService();
    const role = infoUser.getUserId().split('-')[1];
    const visibleByService = checkService(service);
    const visibleByRole = role == 'moderator' ? true : false ;
    let { visible } = ownProps;

    if (typeof visible === 'undefined') {
        visible = interfaceConfig.TOOLBAR_BUTTONS.includes('recording') && abstractProps.visible && visibleByService && visibleByRole;
    }

    return {
        ...abstractProps,
        visible
    };
}

function checkService(service) {
    const services_check = interfaceConfig.SERVICE_RECORD_FEATURE || []
    if (!services_check.includes(service)) {
        return false
    } else {
        return true
    }
}

export default translate(connect(_mapStateToProps)(AbstractRecordButton));
