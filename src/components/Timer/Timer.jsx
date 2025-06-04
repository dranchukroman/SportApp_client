import React, { useEffect, useRef, useState } from "react";
import {
    Container,
    TimeSelectors,
    ScrollList,
    ScrollItem,
    TimeLeft,
    Controls,
} from "./Timer.styled";

import Button from "../Buttons/Button";

function Timer({ children }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [displayTime, setDisplayTime] = useState("00:00:00");

    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);
    const intervalRef = useRef(null);

    const createScrollList = (max) => {
        return Array.from({ length: max + 1 }, (_, i) => i.toString().padStart(2, "0"));
    };

    const updateActive = (ref) => {
        if (!ref.current) return;
        const children = Array.from(ref.current.children);
        const index = Math.round(ref.current.scrollTop / 40);
        children.forEach((child) => child.classList.remove("active"));
        children[index]?.classList.add("active");
    };

    const getSelectedTime = (ref) => {
        const activeItem = ref.current.querySelector(".active");
        return parseInt(activeItem?.textContent || "0");
    };

    const updateDisplay = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        setDisplayTime(
            `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        );
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setTotalSeconds(0);
        setIsRunning(false);
        setIsPaused(false);
        updateDisplay(0);
    };

    const startTimer = () => {
        const hours = getSelectedTime(hoursRef);
        const minutes = getSelectedTime(minutesRef);
        const seconds = getSelectedTime(secondsRef);
        const total = hours * 3600 + minutes * 60 + seconds;

        if (total <= 0) return;

        setTotalSeconds(total);
        setIsRunning(true);
        updateDisplay(total);

        intervalRef.current = setInterval(() => {
            setTotalSeconds((prev) => {
                if (isPaused) return prev;

                const newTime = prev - 1;
                if (newTime <= 0) {
                    clearInterval(intervalRef.current);
                    alert("Время вышло!");
                    resetTimer();
                    return 0;
                }
                updateDisplay(newTime);
                return newTime;
            });
        }, 1000);
    };

    useEffect(() => {
        const hours = hoursRef.current;
        const minutes = minutesRef.current;
        const seconds = secondsRef.current;

        const handleScroll = (ref) => () => updateActive(ref);

        [hours, minutes, seconds].forEach((ref) => {
            ref.addEventListener("scroll", handleScroll({ current: ref }));
        });

        updateActive(hoursRef);
        updateActive(minutesRef);
        updateActive(secondsRef);

        return () => {
            [hours, minutes, seconds].forEach((ref) => {
                ref?.removeEventListener("scroll", handleScroll({ current: ref }));
            });
            clearInterval(intervalRef.current);
        };
    }, []);

    const hours = createScrollList(12);
    const minutes = createScrollList(59);
    const seconds = createScrollList(59);

    const closeTimer = () => {
        console.log('Close timer');
    }

    return (
        <div>
            <Container>
                <TimeSelectors>
                    <ScrollList ref={hoursRef}>
                        {hours.map((h) => (
                            <ScrollItem key={`h-${h}`}>{h}</ScrollItem>
                        ))}
                    </ScrollList>
                    <ScrollList ref={minutesRef}>
                        {minutes.map((m) => (
                            <ScrollItem key={`m-${m}`}>{m}</ScrollItem>
                        ))}
                    </ScrollList>
                    <ScrollList ref={secondsRef}>
                        {seconds.map((s) => (
                            <ScrollItem key={`s-${s}`}>{s}</ScrollItem>
                        ))}
                    </ScrollList>
                </TimeSelectors>
                <TimeLeft>{displayTime}</TimeLeft>

                <Controls>
                    <Button width={'172px'} onClick={isRunning ? (prev) => setIsPaused(!prev) : startTimer}>
                        {isRunning ? `${isPaused ? 'Продолжить' : 'Пауза'}` : 'Старт'}
                    </Button>
                    <Button width={'172px'} onClick={isRunning ? resetTimer : closeTimer}>
                        {isRunning ? 'Отмена' : 'Назад'}
                    </Button>
                </Controls>
            </Container>
            {children}
        </div>
    );
}

export default Timer;
