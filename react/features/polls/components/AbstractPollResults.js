// @flow

import React, { useMemo } from 'react';
import type { AbstractComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getParticipants } from '../../base/participants';


/**
 * The type of the React {@code Component} props of inheriting component.
 */
type InputProps = {

    /**
     * Whether to display vote details
     */
    showDetails: boolean,

    /**
     * ID of the poll to display
     */
    pollId: number,
};

export type AnswerInfo = {
    name: string,
    percentage: number,
    voters?: Array<{ id: number, name: string }>,
    voterCount: number
};

/**
 * The type of the React {@code Component} props of {@link AbstractPollResults}.
 */
export type AbstractProps = {
    answers: Array<AnswerInfo>,
    showDetails: boolean,
    question: string,
    t: Function
};

/**
 * Higher Order Component taking in a concrete PollResult component and
 * augmenting it with state/behavior common to both web and native implementations.
 *
 * @param {React.AbstractComponent} Component - The concrete component.
 * @returns {React.AbstractComponent}
 */
const AbstractPollResults = (Component: AbstractComponent<AbstractProps>) => (props: InputProps) => {
    const { pollId, showDetails } = props;

    const pollDetails = useSelector(state => state['features/polls'].polls[pollId]);

    const participants = useSelector(state => getParticipants(state));

    const answers: Array<AnswerInfo> = useMemo(() => {
        const voterSet = new Set();

        const senderWeights = pollDetails.senderWeights

        let totalSenderWeight = 0
        for (const senderWeight of pollDetails.senderWeights) {
            totalSenderWeight = totalSenderWeight + Number(senderWeight.weight)
        }

        // Getting every voters ID that participates to the poll
        for (const answer of pollDetails.answers) {
            for (const voter of answer.voters) {
                voterSet.add(voter);
            }
        }

        const totalVoters = voterSet.size;

        // Calculate the voter weight of the answer. 
        const answerWeight = (voters) => {
            let voterWeights = senderWeights.filter(senderWeight => Array.from(voters).includes(senderWeight.senderId))
            let totalvoterWeights = 0
            for (const voterWeight of voterWeights) {
                totalvoterWeights = totalvoterWeights + Number(voterWeight.weight)
            }
            return totalvoterWeights
        }

        return pollDetails.answers.map(answer => {
            // const percentage = totalVoters === 0 ? 0 : Math.round(answer.voters.size / totalVoters * 100);
            const percentage = totalSenderWeight === 0 ? 0 : Math.round(answerWeight(answer.voters) / totalSenderWeight * 100);

            let voters = null;

            if (showDetails) {
                voters = [ ...answer.voters ].map(voterId => {
                    // Getting the name of participant from its ID
                    const participant = participants.find(part => part.id === voterId);

                    return {
                        id: voterId,
                        name: participant
                            ? participant.name
                            : 'Absent Jitster'
                    };
                });
            }

            return {
                name: answer.name,
                percentage,
                voters,
                voterCount: answer.voters.size
            };
        });
    }, [ pollDetails.answers ]);

    const { t } = useTranslation();

    return (<Component
        answers = { answers }
        question = { pollDetails.question }
        showDetails = { showDetails }
        t = { t } />);
};

export default AbstractPollResults;