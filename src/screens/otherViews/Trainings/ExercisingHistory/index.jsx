import React, { useState, useEffect, useCallback } from "react";
import { PageWrapper } from './ExercisingHistory.styled';
import FunctionalBarLoader from "../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader";
import { getExerciseHistory } from "../../../../api/user/statistic";
import { toast } from "sonner";
import Button from "../../../../components/Buttons/Button";
import HistoryTile from "./components/HistoryTile";
import NoHistoryRecords from "./components/NoHistoryRecords";

function ExercisingHistory({ exerciseId, onScreenChange }) {
    const [status, setStatus] = useState('loading');
    const [exerciseHistory, setExerciseHistory] = useState([]);

    const fetchData = useCallback(async () => {
        setStatus('loading');
        try {
            const result = await getExerciseHistory(exerciseId)
            if (result?.success) {
                if (result.data.length === 0) {
                    setStatus('empty');
                } else {
                    setStatus('success');
                    setExerciseHistory(result.data);
                }
            } else {
                toast.error(result.message || 'Error getting training history');
                setStatus('error');
            }
        } catch (error) {
            toast.error(error?.response?.message || 'Error getting training history');
            setStatus('error');
        }
    }, [exerciseId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (status === 'loading') {
        return <FunctionalBarLoader />
    }
    if (['error', 'empty'].includes(status)) {
        return <NoHistoryRecords onScreenChange={onScreenChange} />
    }
    return (
        <PageWrapper>
            <Button onClick={() => onScreenChange('Exercising')}>Back</Button>
            {exerciseHistory.map(training =>
            (<HistoryTile key={training.session_id} trainingData={training} />
            ))}
        </PageWrapper>
    )
}

export default ExercisingHistory;