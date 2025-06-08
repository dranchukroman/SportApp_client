import React from "react";
import { Record, RecordInfo, RepsWeight, Note, Time } from "../ExercisingHistory.styled";

function HistoryRecord({ recordData, index }) {
    const { time, weight_used, reps_completed, notes } = recordData;
    return (
        <Record>
            <RecordInfo>
                <RepsWeight>
                    {index + 1 + ')'} {weight_used} kg x {reps_completed} reps
                </RepsWeight>
                <Note>{notes}</Note>
            </RecordInfo>
            <Time>{time}</Time>
        </Record>
    )
}

export default HistoryRecord;