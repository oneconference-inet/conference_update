// @flow

import React from 'react';

import { Avatar } from '../../../base/avatar';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { isToolboxVisible } from '../../../toolbox/functions.web';
import AbstractKnockingParticipantList, {
    mapStateToProps as abstractMapStateToProps,
    type Props as AbstractProps
} from '../AbstractKnockingParticipantList';

type Props = AbstractProps & {

    /**
     * True if the toolbox is visible, so we need to adjust the position.
     */
    _toolboxVisible: boolean,
};

/**
 * Component to render a list for the actively knocking participants.
 */
class KnockingParticipantList extends AbstractKnockingParticipantList<Props> {
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _participants, _toolboxVisible, _visible, t } = this.props;

        if (!_visible) {
            return null;
        }

        return (
            <div
                className = { _toolboxVisible ? 'toolbox-visible' : '' }
                id = 'knocking-participant-list'>
                <span className = 'title'>
                    { t('lobby.knockingParticipantList') }
                </span>
                {console.log("_participants: ",_participants)}
                <ul>
                    { _participants.map(p => (
                        <li key = { p.id }>
                            <img style={{ width: 96 }} src={ p.image } />
                            <div className = 'details'>
                                <span data-testid = 'knockingParticipant.name'>
                                    { p.name }
                                </span>
                                { p.email && (
                                    <span data-testid = 'knockingParticipant.email'>
                                        { p.email }
                                    </span>
                                ) }
                            </div>
                            <button
                                className = 'primary'
                                data-testid = 'lobby.allow'
                                onClick = { () => this._onRespondToParticipantSocket(p.id ,p.name ,true) }
                                type = 'button'>
                                { t('lobby.allow') }
                            </button>
                            <button
                                className = 'borderLess'
                                data-testid = 'lobby.reject'
                                onClick = { () => this._onRespondToParticipantSocket(p.id ,p.name ,false) }
                                type = 'button'>
                                { t('lobby.reject') }
                            </button>
                        </li>
                    )) }
                </ul>
            </div>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state: Object): $Shape<Props> {
    return {
        ...abstractMapStateToProps(state),
        _toolboxVisible: isToolboxVisible(state)
    };
}

export default translate(connect(_mapStateToProps)(KnockingParticipantList));
