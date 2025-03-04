// import React from "react";
// import { ScrollerWrapper, ScrollerButtons } from './ScrolleChoose.styled'

// function ScrolleChoose (){
//     return (
//         <ScrollerWrapper>
            
//         </ScrollerWrapper>
//     )
// }

// export default ScrolleChoose;
import React, { useState, useEffect, useRef } from "react";
import {
    ScrollerWrapper,
    ScrollerButtons,
    TimerWheel,
    TimerLabel,
    TimerItem,
} from "./ScrolleChoose.styled";

function ScrolleChoose() {
    const [selectedTime, setSelectedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);

    // Функція для створення чисел у колесі
    const populateWheel = (maxValue) => {
        const items = [];
        for (let i = 0; i <= maxValue; i++) {
            items.push(
                <TimerItem key={i} className="timer-item">
                    {i}
                </TimerItem>
            );
        }
        return items;
    };

    // Функція обробки скролу і вибору елемента
    const handleScroll = (ref, type) => {
        if (ref.current) {
            const scrollPosition = ref.current.scrollTop; // Позиція скролу
            const index = Math.round(scrollPosition / 50); // 50px - висота одного елемента
            setSelectedTime((prev) => ({ ...prev, [type]: index }));
        }
    };

    // Скрол до початкових значень
    useEffect(() => {
        const scrollToCenter = (ref) => {
            if (ref.current) ref.current.scrollTop = 0; // Скролимо до початку
        };

        scrollToCenter(hoursRef);
        scrollToCenter(minutesRef);
        scrollToCenter(secondsRef);
    }, []);

    return (
        <ScrollerWrapper>
            {/* Колесо годин */}
            <TimerWheel
                ref={hoursRef}
                onScroll={() => handleScroll(hoursRef, "hours")}
                className="timer-wheel"
            >
                <TimerLabel>godz.</TimerLabel>
                {populateWheel(23)}
            </TimerWheel>

            {/* Колесо хвилин */}
            <TimerWheel
                ref={minutesRef}
                onScroll={() => handleScroll(minutesRef, "minutes")}
                className="timer-wheel"
            >
                <TimerLabel>min</TimerLabel>
                {populateWheel(59)}
            </TimerWheel>

            {/* Колесо секунд */}
            <TimerWheel
                ref={secondsRef}
                onScroll={() => handleScroll(secondsRef, "seconds")}
                className="timer-wheel"
            >
                <TimerLabel>s</TimerLabel>
                {populateWheel(59)}
            </TimerWheel>

            {/* Кнопки управління */}
            <ScrollerButtons>
                <button onClick={() => console.log("Anuluj")}>Anuluj</button>
                <button onClick={() => console.log("Start", selectedTime)}>
                    Start
                </button>
            </ScrollerButtons>
        </ScrollerWrapper>
    );
}

export default ScrolleChoose;
