// @flow

import { ReducerRegistry } from '../base/redux';

import { RECEIVE_POLL, RECEIVE_ANSWER } from './actionTypes';
import type { Answer } from './types';

const INITIAL_STATE = {
    polls: {}
};

ReducerRegistry.register('features/polls', (state = INITIAL_STATE, action) => {
    switch (action.type) {

    // Reducer triggered when a poll is received
    case RECEIVE_POLL:
        return {
            ...state,
            polls: {
                ...state.polls,

                // The poll is added to the dictionnary of received polls
                [action.pollId]: action.poll
            }
        };

    // Reducer triggered when an answer is received
    // The answer is added  to an existing poll
    case RECEIVE_ANSWER: {

        const { pollId, answer }: { pollId: string; answer: Answer } = action;

        // if the poll doesn't exist
        if (!(pollId in state.polls)) {
            console.warn('requested poll does not exist: pollId ', pollId);

            return state;
        }

        console.log('111111answer:', answer);

        // if the poll exists, we update it with the incoming answer
        const newAnswers = state.polls[pollId].answers
            .map(_answer => {
                return {
                    name: _answer.name,
                    voters: new Set(_answer.voters)
                };
            });

        for (let i = 0; i < newAnswers.length; i++) {
            // if the answer was chosen, we add the senderID to the set of voters of this answer
            if (answer.answers[i] === true) {
                newAnswers[i].voters.add(answer.senderId);
            }
        }

        console.log('111111senderWeights:', state.polls[pollId].senderWeights);
        let newSenderWeights = (state.polls[pollId].senderWeights).push({
            senderId: answer.senderId,
            weight: Number(answer.weight)
        })
        console.log('111111senderWeights2:', newSenderWeights);

        // if ((newSenderWeights.filter(senderWeight => senderWeight.senderId === answer.senderId)).length < 1) {
            // newSenderWeights.push({
            //     senderId: answer.senderId,
            //     weight: Number(answer.weight)
            // })
        // }

        // finally we update the state by returning the updated poll
        return {
            ...state,
            polls: {
                ...state.polls,
                [pollId]: {
                    ...state.polls[pollId],
                    answers: newAnswers,
                    senderWeights: []
                    // senderWeights: newSenderWeights
                }
            }
        };
    }


    default:
        return state;
    }
});