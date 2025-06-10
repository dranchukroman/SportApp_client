import React from "react";
import { formatDate } from "../../../../../../utils/stringHelpers";
import HistoryRecord from "./HistoryRecord";
import { TileHeading, RecordTile } from "../ExercisingHistory.styled";

function HistoryTile({ trainingData }) {
    const { date, sets } = trainingData;
    return (
        <RecordTile>
            <TileHeading>
                {formatDate(date)}
            </TileHeading>
            {sets.map((record, index) => (
                <HistoryRecord key={record.history_id} recordData={record} index={index} />
            ))}
        </RecordTile>
    )
}

export default HistoryTile;