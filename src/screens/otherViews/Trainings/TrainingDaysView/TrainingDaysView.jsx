import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import theme from "../../../../styles/theme";
import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from "../../../../components/Cards/InfoCard";

import EditIcon from "../../../../assets/icons/Trainings/editIcon";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

import { Paragraph, TrainingDaysViewWrapper } from "./TrainingDaysView.styled";
import { toast } from "sonner";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { deleteTrainingDay, getTrainingDays } from "../../../../api/trainings/days";


function TrainingDaysView({ token, onScreenChange, trainingPlanId, setControllTrainings, editModeStatus, setExercisingStatus }) {
    const [trainingDays, setTrainingDays] = useState(null);
    const [deleteDayId, setDeleteDayId] = useState(null);
    const [activeDay, setActiveDay] = useState(null);

        const [loading, setLoading] = useState(false);
        const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await getTrainingDays(trainingPlanId);

                if (response.success && response?.data?.trainingDays?.length > 0)
                    return setTrainingDays(response.data.trainingDays);
            } catch (error) {
                toast.error(error?.response?.message || 'Getting training days failed')
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        };
        fetchData();
    }, [token, trainingPlanId]);

    useEffect(() => {
        const deleteDay = async () => {
            const response = await deleteTrainingDay(deleteDayId);
            if(response.success){
                toast.info(response.message || 'Training day has been deleted');
            }
            setTrainingDays(prevDays => prevDays.filter(day => day.day_id !== deleteDayId));
            setDeleteDayId(null);
        };

        if (deleteDayId) deleteDay();
    }, [deleteDayId, token]);

    return (
        <TrainingDaysViewWrapper>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    {trainingDays && trainingDays.length > 0 ? (
                        trainingDays.map((day) => (
                            <Card style={{ marginBottom: "14px", position: "relative" }}
                                key={day.day_id}
                                onClick={() => {
                                    if (editModeStatus) {
                                        setControllTrainings((prev) => ({
                                            ...prev,
                                            trainingDayId: day.day_id
                                        }));
                                        onScreenChange("ExercisesView");
                                    } else {
                                        setActiveDay((prev) => (prev === day.day_id ? null : day.day_id));
                                    }
                                }}
                            >
                                <Heading color={theme.colors.whiteText} fontSize={theme.fontSizes.smallHeader}>{day.name}</Heading>
                                <Paragraph>{day.description}</Paragraph>
                                <EditIcon editModeStatus={editModeStatus} CardStyles
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setControllTrainings((prev) => ({
                                            ...prev,
                                            trainingDayId: day.day_id
                                        }));
                                        onScreenChange("TrainingDaysDetails");
                                    }}
                                />
                                <DeleteIcon editModeStatus={editModeStatus} CardStyles
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteDayId(day.day_id);
                                    }}
                                />

                                {/* Анімована кнопка з AnimatePresence */}
                                <AnimatePresence mode='wait'>
                                    {activeDay === day.day_id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, paddingTop: 0 }}
                                            animate={{ height: "auto", opacity: 1, paddingTop: '10px' }}
                                            exit={{ height: 0, opacity: 0, paddingTop: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <Button
                                                width={"280px"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setControllTrainings((prev) => ({
                                                        ...prev,
                                                        trainingDayId: day.day_id
                                                    }));
                                                    setExercisingStatus(true);
                                                    onScreenChange("ExercisesView");
                                                }}
                                                bgColor={theme.colors.darkBackground}
                                            >
                                                Start
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        ))
                    ) : (
                        <Heading style={{ padding: "30px 0 10px 0" }} fontSize={theme.fontSizes.mediumHeader}>
                            No training days yet
                        </Heading>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <Button onClick={() => onScreenChange("Trainings")} width={"172px"}>
                            Back
                        </Button>
                        <Button
                            onClick={() => {
                                setControllTrainings((prev) => ({
                                    ...prev,
                                    trainingDayId: 0
                                }));
                                onScreenChange("TrainingDaysDetails");
                            }}
                            width={"172px"}
                        >
                            Add day
                        </Button>
                    </div>

                </LoadWrapper>}
        </TrainingDaysViewWrapper>
    );
}

export default TrainingDaysView;
