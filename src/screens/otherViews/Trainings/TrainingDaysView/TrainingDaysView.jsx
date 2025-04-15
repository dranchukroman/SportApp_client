import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import theme from "../../../../styles/theme";
import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from "../../../../components/Cards/InfoCard";

import EditIcon from "../../../../assets/icons/Trainings/editIcon";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

import { Paragraph, TrainingDaysViewWrapper } from "./TrainingDaysView.styled";


function TrainingDaysView({ token, onScreenChange, trainingPlanId, setControllTrainings, editModeStatus, setExercisingStatus }) {
    const [trainingDays, setTrainingDays] = useState(null);
    const [deleteDayId, setDeleteDayId] = useState(null);
    const [activeDay, setActiveDay] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getTrainingDays`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { trainingPlanId }
            });
            if (response?.data?.trainingDaysData?.data.length > 0)
                return setTrainingDays(response.data.trainingDaysData.data);
        };
        fetchData();
    }, [token, trainingPlanId]);

    useEffect(() => {
        const deleteDay = async () => {
            await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingDays`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { day_id: deleteDayId }
            });

            setTrainingDays(prevDays => prevDays.filter(day => day.day_id !== deleteDayId));
            setDeleteDayId(null);
        };

        if (deleteDayId) deleteDay();
    }, [deleteDayId, token]);

    return (
        <TrainingDaysViewWrapper>
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
        </TrainingDaysViewWrapper>
    );
}

export default TrainingDaysView;
