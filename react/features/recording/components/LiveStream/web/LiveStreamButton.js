// @flow

import { translate } from '../../../../base/i18n';
import { connect } from '../../../../base/redux';
import AbstractLiveStreamButton, {
    _mapStateToProps as _abstractMapStateToProps,
    type Props
} from '../AbstractLiveStreamButton';

import infoConf from '../../../../../../infoConference'

declare var interfaceConfig: Object;

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code LiveStreamButton} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the Component.
 * @private
 * @returns {{
 *     _conference: Object,
 *     _isLiveStreamRunning: boolean,
 *     _disabled: boolean,
 *     visible: boolean
 * }}
 */
function _mapStateToProps(state: Object, ownProps: Props) {
    const abstractProps = _abstractMapStateToProps(state, ownProps);
    const service = infoConf.getService();
    const visibleByService = checkService(service)
    let { visible } = ownProps;

    if (typeof visible === 'undefined') {
        visible = interfaceConfig.TOOLBAR_BUTTONS.includes('livestreaming') && abstractProps.visible && visibleByService;
    }

    return {
        ...abstractProps,
        visible
    };
}

function checkService(service) {
    const services_check = interfaceConfig.SERVICE_LIVE_FEATURE || []
    if (!services_check.includes(service)) {
        return false
    } else {
        return true
    }
}

export default translate(connect(_mapStateToProps)(AbstractLiveStreamButton));
