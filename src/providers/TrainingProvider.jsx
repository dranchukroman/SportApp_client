import React, { useState, useContext } from "react";
import { createContext } from "react";

export const TrainingContext = createContext(null);

export function TrainingProvider({ children }) {
    const [isExercising, setIsExercising] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState({});

    const startTraining = () => setIsExercising(true);
    const updateProgress = (data) => setTrainingProgress(data);
    const finishTraining = ({ shouldSave }) => setIsExercising(false); // Add function to save

    const value = {
        isExercising,
        trainingProgress,
        startTraining,
        updateProgress,
        finishTraining,
    }

    return (
        <TrainingContext.Provider value={value}>
            {children}
        </TrainingContext.Provider>
    )
}

export const useTraining = () => {
    const context = useContext(TrainingContext);
    if (!context) {
      throw new Error('useTraining must be used within a TrainingContext');
    }
    return context;
  };