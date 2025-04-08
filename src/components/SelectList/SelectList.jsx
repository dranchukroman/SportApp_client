import React, { useState } from "react";

function SelectList({ noDataText }) {

    const getMuscleGroup = () => {
        if (muscleGroupList.length === 0) return <option value="">{noDataText}</option>;
        
        return muscleGroupList.map(group => (
            <option key={group} value={group}>{group}</option>
        ));
    };
    
    return (
        <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
            {getMuscleGroup()}
        </select>
    )
}

export default SelectList;