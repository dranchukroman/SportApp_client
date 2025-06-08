import React, { useState, useEffect } from "react";
import { RecordTile, HistoryWrapper, TileWrapper, RecordInfo, RecordDate, HistoryRecord } from './ExercisingHistory.styled';
import FunctionalBarLoader from "../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader";
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { getExerciseHistory } from "../../../../api/user/statistic";
import { toast } from "sonner";
import Heading from '../../../../components/Headings/Heading';
import theme from "../../../../styles/theme";
import Button from "../../../../components/Buttons/Button";
import { formatDate } from "../../../../utils/stringHelpers";

function ExercisingHistory({ exerciseId, onScreenChange }) {
    const [exerciseHistory, setExerciseHistory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        const fetchTrainingHistory = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const resutl = await getExerciseHistory(exerciseId)
                if (resutl?.success) {
                    return setExerciseHistory(resutl.data);
                } return toast.error(resutl.message);
            } catch (error) {
                return toast.error(error?.response?.message || 'Error getting training history');
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        }
        fetchTrainingHistory();
    }, []);

    const getHistoryTiles = () => {
        if (exerciseHistory.length === 0) {
            return (<div>
                <Heading style={{ padding: "30px 0 20px 0" }} fontSize={theme.fontSizes.mediumHeader}>
                    No records to display
                </Heading>
                <Button onClick={() => onScreenChange('Exercising')}>
                    Back
                </Button>
            </div>)
        }
        return (<div>
            <Button onClick={() => onScreenChange('Exercising')}>Back</Button>
            {exerciseHistory.map((training, index) => (
                <TileWrapper key={index}>
                    <RecordTile>
                        <Heading
                            fontSize={theme.fontSizes.largeParagraph}
                            style={{ padding: 10 }}
                        >
                            {formatDate(training.date)}
                        </Heading>

                        {training.sets.map((record, index) => {
                            return (
                                <HistoryRecord style={{ display: 'flex', justifyContent: 'space-between' }}
                                    key={`${record.date}-${record.time}-${index}`}
                                >
                                    <RecordInfo>
                                        <div>
                                            {index + 1 + ')'} {record.weight_used} kg x {record.reps_completed} reps
                                        </div>
                                        <div style={{ opacity: 0.7, fontSize: theme.fontSizes.mediumParagraph }}>
                                            {record.notes}
                                        </div>
                                    </RecordInfo>
                                    <RecordDate>
                                        <div style={{ marginRight: '7px' }}>
                                            {record.time}
                                        </div>
                                    </RecordDate>
                                </HistoryRecord>
                            )
                        })}
                    </RecordTile>
                </TileWrapper>
            )
            )}
        </div>)
    };

    return (
        <HistoryWrapper>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    {getHistoryTiles()}
                </LoadWrapper>}
        </HistoryWrapper>
    )
}

export default ExercisingHistory;