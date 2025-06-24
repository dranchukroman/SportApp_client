import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import theme from "../../../../../styles/theme";

import {
    ExerciseFrame,
    FlexItems,
    ExerciseInfoFrame,
    ExerciseName,
    ExerciseParagraf,
    ControllPanel,
    ExerciseHistory,
    RecordInfo,
    RecordDate,
    HistoryRecord,
} from './Exercising.styled';

import Input from "../../../../../components/Inputs/Input";
import {ReactComponent as HistoryIcon} from '../../../../../assets/icons/history.svg';
import DivideLine from "../../../../../components/Dividers/DivideLine";
import Button from "../../../../../components/Buttons/Button";
import CrossIcon from "../../../../../components/icons/CrossIcon/CrossIcon";
import { toast } from "sonner";
import { parseRestTime } from "../../../../../utils/stringHelpers";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { getExerciseInDayById } from "../../../../../api/trainings/exercise.api";
import Timer from "../../../../../components/Timer/Timer";
import { useTraining } from "../../../../../providers/TrainingProvider";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

function Exercising() {
    // To remove it
    const { editModeStatus, setEditModeStatus } = useOutletContext();
    const { exerciseId } = useParams();
    const { dayId } = useParams();
    const navigate = useNavigate();
    // Current exercise
    const [exerciseData, setExerciseData] = useState({
        exerciseName: 'No data to show',
        restTime: '00:00',
        times: '0',
        weight: '0, 0, 0',
        sets: '0',
        description: 'No data to show'
    });

    const { trainingProgress, updateProgress } = useTraining();

    // Save or get training history
    const [exerciseHistory, setExerciseHistory] = useState(() => {
        const existingExercise = trainingProgress?.progress?.find(exercise => exercise.exerciseId === exerciseId);
        return existingExercise ? existingExercise.records : [];
    });

    // State for inputs
    const [recordInfo, setRecordInfo] = useState({
        weight: '',
        reps: '',
        note: ''
    })

    const [activeDelButton, setActiveDelButton] = useState(false);
    const [timerActive, setTimerActive] = useState(false);

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    // Fetch exercise data
    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await getExerciseInDayById(exerciseId);

                const exerciseData = response.data.exercise;
                const { minutes, seconds } = parseRestTime(exerciseData.rest_time);
                setExerciseData((prev) => ({
                    ...prev,
                    exerciseName: exerciseData.name,
                    restTime: `${minutes}:${seconds}`,
                    times: exerciseData.reps,
                    weight: exerciseData.weight,
                    sets: exerciseData.sets,
                    description: exerciseData.description,
                }))
            } catch (error) {
                toast.error(error.response?.data?.message || 'Getting exercise failed');
                console.error('Error fetching exercise data: ', error)
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        }
        fetchExerciseData();
    }, [exerciseId]);

    const addRecordToHistory = () => {
        const now = new Date();
        const newRecord = {
            weight: recordInfo.weight || 0,
            reps: recordInfo.reps || 0,
            note: recordInfo.note || null,
            time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            date: now.toISOString().split('T')[0].replace(/-/g, '.'),
        };

        setExerciseHistory(prev => [...prev, newRecord]);
        setRecordInfo({ weight: '', reps: '', note: '' });
    };

    const handleDoneButton = () => {
        updateProgress(prev => {
            const progressArray = Array.isArray(prev?.progress) ? prev.progress : [];
            return {
                ...prev,
                progress: progressArray.some(ex => ex.exerciseId === exerciseId)
                    ? progressArray.map(ex =>
                        ex.exerciseId === exerciseId
                            ? { ...ex, records: [...exerciseHistory] }
                            : ex
                    )
                    : [...progressArray, { exerciseId: exerciseId, records: [...exerciseHistory] }]
            };
        });
        setExerciseHistory([]);
        setRecordInfo({ weight: '', reps: '', note: '' });
        navigate(`/trainings/days/${dayId}/exercises`);
    }

    return (
        <ExerciseFrame style={{overflowY: timerActive ? 'hidden' : 'auto'}}>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    <FlexItems>
                        <ExerciseInfoFrame>
                            <ExerciseName>
                                {exerciseData.exerciseName}
                            </ExerciseName>
                            <ExerciseParagraf>
                                Sets - {exerciseData.sets}
                            </ExerciseParagraf>
                            <ExerciseParagraf>
                                Reps - {exerciseData.times}
                            </ExerciseParagraf>
                            <ExerciseParagraf>
                                Weight - {exerciseData.weight}
                            </ExerciseParagraf>
                            <ExerciseParagraf>
                                Rest time - {exerciseData.restTime}
                            </ExerciseParagraf>
                            <ExerciseParagraf>
                                Note - {exerciseData.description}
                            </ExerciseParagraf>
                        </ExerciseInfoFrame>
                        <div onClick={() => navigate(`/trainings/exercises/${exerciseId}/history`)}>
                            <HistoryIcon />
                        </div>
                    </FlexItems>
                    <DivideLine />
                    <ControllPanel>
                        <FlexItems>
                            <Input style={{ width: '99px' }} placeholder="Reps" value={recordInfo.reps} onChange={e => setRecordInfo(prev => ({ ...prev, reps: e.target.value }))} />
                            <Input style={{ width: '99px' }} placeholder="Weight" value={recordInfo.weight} onChange={e => setRecordInfo(prev => ({ ...prev, weight: e.target.value }))} />
                            <Button width={'70px'} onClick={() => addRecordToHistory()}>Add</Button>
                        </FlexItems>
                        <FlexItems>
                            <Input style={{ width: '233px' }} placeholder="Note" value={recordInfo.note} onChange={e => setRecordInfo(prev => ({ ...prev, note: e.target.value }))} />
                            <Button onClick={() => (setTimerActive(prev => !prev))} style={{ marginLeft: '10px' }} width={'70px'}>Rest</Button>
                        </FlexItems>
                    </ControllPanel>
                    <ExerciseHistory $textPosition={exerciseHistory.length > 0 ? 'center' : 'center'}>
                        {exerciseHistory.length === 0
                            ? <HistoryRecord>No added series yet</HistoryRecord>

                            : exerciseHistory.map((record, index) => (
                                <HistoryRecord style={{ display: 'flex', justifyContent: 'space-between' }}
                                    key={`${record.date}-${record.time}-${index}`}
                                    onClick={() => setActiveDelButton((prev) => (prev === index ? null : index))}
                                >
                                    <RecordInfo>
                                        <div>
                                            {index + 1 + ')'} {record.weight} kg x {record.reps} reps
                                        </div>
                                        <div style={{ opacity: 0.7, fontSize: theme.fontSizes.mediumParagraph }}>
                                            {record.note}
                                        </div>
                                    </RecordInfo>
                                    <RecordDate>
                                        <div style={{ marginRight: '7px' }}>
                                            <div>
                                                {record.time}
                                            </div>
                                            <div style={{ opacity: 0.7, fontSize: theme.fontSizes.mediumParagraph }}>
                                                {record.date}
                                            </div>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            {activeDelButton === index && (
                                                <motion.div
                                                    initial={{ width: 0, opacity: 0 }}
                                                    animate={{ width: '30px', opacity: 1 }}
                                                    exit={{ width: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    <CrossIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setExerciseHistory(prev => prev.filter((_, i) => i !== index));
                                                            setActiveDelButton(null);
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </RecordDate>
                                </HistoryRecord>
                            ))
                        }
                    </ExerciseHistory>
                    {timerActive && <Timer restTime={exerciseData.restTime} setTimerActive={setTimerActive}/>}
                    {/* Temporary buttons */}
                    <Button
                        onClick={handleDoneButton}
                        width={'330px'}
                        style={{ marginTop: '20px' }}
                    >
                        Done
                    </Button>
                </LoadWrapper>}
        </ExerciseFrame>
    )
}

export default Exercising;