import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import theme from "../../../../styles/theme";
import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import EditIcon from "../../../../assets/icons/Trainings/editIcon";
import Card from "../../../../components/Cards/InfoCard";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

function TrainingDaysView({ token, onScreenChange, trainingPlanId, setTrainingDayId, editModeStatus, setExercisingStatus }) {
    const [trainingDays, setTrainingDays] = useState(null);
    const [deleteDayId, setDeleteDayId] = useState(null);
    const [activeDay, setActiveDay] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getTrainingDays`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { trainingPlanId }
            });

            if (response?.data?.trainingDaysData?.data.length > 0) {
                setTrainingDays(response.data.trainingDaysData.data);
            }
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
        <div>
            {trainingDays && trainingDays.length > 0 ? (
                trainingDays.map((day) => (
                    <Card
                        key={day.day_id}
                        style={{ marginBottom: "14px", position: "relative" }}
                        onClick={() => {
                            if (editModeStatus) {
                                setTrainingDayId(day.day_id);
                                onScreenChange("ExercisesView");
                            } else {
                                setActiveDay((prev) => (prev === day.day_id ? null : day.day_id));
                            }
                        }}
                    >
                        <div style={{ color: "white" }}>
                            <Heading fontSize={theme.fontSizes.smallHeader}>{day.name}</Heading>
                            <p style={{ marginBottom: "0" }}>{day.description}</p>
                        </div>

                        <EditIcon
                            style={{ position: "absolute", right: 0, top: 0, display: editModeStatus ? "block" : "none" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setTrainingDayId(day.day_id);
                                onScreenChange("TrainingDaysDetails");
                            }}
                        />
                        <DeleteIcon
                            style={{
                                position: "absolute",
                                left: 7,
                                top: 4,
                                zIndex: "100",
                                display: editModeStatus ? "block" : "none",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteDayId(day.day_id);
                            }}
                        />

                        {/* Анімована кнопка з AnimatePresence */}
                        <AnimatePresence mode='wait'>
                            {activeDay === day.day_id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <Button
                                        width={"280px"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTrainingDayId(day.day_id);
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
                <div style={{ padding: "30px 0 10px 0" }}>
                    <Heading fontSize={theme.fontSizes.mediumHeader}>No training days yet</Heading>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Button onClick={() => onScreenChange("Trainings")} width={"172px"}>
                    Back
                </Button>
                <Button
                    onClick={() => {
                        setTrainingDayId(0);
                        onScreenChange("TrainingDaysDetails");
                    }}
                    width={"172px"}
                >
                    Add day
                </Button>
            </div>
        </div>
    );
}

export default TrainingDaysView;
