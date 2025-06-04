import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, TimeSelectors, ScrollList, ScrollItem, DivideDots, Dot, Controls } from "./Timer.styled";
import Button from "../Buttons/Button";
import { toast } from "sonner";

function Timer({ children, timerEndMessage, newMinutes, newSeconds, setTimerActive }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const minutesRef = useRef(null);
    const secondsRef = useRef(null);
    const intervalRef = useRef(null);
    const isPausedRef = useRef(false);
    const totalSecondsRef = useRef(0);

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

    const scrollToTime = (seconds) => {
        const scrollToValue = (ref, value) => {
            if (!ref.current) return;
            const scrollPosition = value * 40;
            ref.current.scrollTo({ top: scrollPosition, behavior: "smooth" });
        };

        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        scrollToValue(minutesRef, m);
        scrollToValue(secondsRef, s);
        updateActive(minutesRef);
        updateActive(secondsRef);
    };

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        totalSecondsRef.current = 0;
        setIsRunning(false);
        setIsPaused(false);
        scrollToTime(0);
    }, []);

    const startTimer = useCallback(() => {
        const minutes = getSelectedTime(minutesRef);
        const seconds = getSelectedTime(secondsRef);
        const total = minutes * 60 + seconds;

        if (total <= 0) return;

        totalSecondsRef.current = total;
        setIsRunning(true);
        scrollToTime(total);

        intervalRef.current = setInterval(() => {
            if (isPausedRef.current) return;

            const newTime = totalSecondsRef.current - 1;
            totalSecondsRef.current = newTime;

            if (newTime <= 0) {
                clearInterval(intervalRef.current);
                toast.info(timerEndMessage || "Timer finished", { id: "restTimeFinished" });
                resetTimer();
            } else {
                scrollToTime(newTime);
            }
        }, 1000);
    }, [resetTimer, timerEndMessage]);

    const handleScroll = (ref) => () => updateActive(ref);

    useEffect(() => {
        const minutes = minutesRef.current;
        const seconds = secondsRef.current;

        const handleMinutesScroll = handleScroll(minutesRef);
        const handleSecondsScroll = handleScroll(secondsRef);

        minutes.addEventListener("scroll", handleMinutesScroll);
        seconds.addEventListener("scroll", handleSecondsScroll);

        return () => {
            minutes?.removeEventListener("scroll", handleMinutesScroll);
            seconds?.removeEventListener("scroll", handleSecondsScroll);
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        const seconds = newMinutes * 60 + newSeconds;
        scrollToTime(seconds);
    }, [newMinutes, newSeconds]);

    const minutes = createScrollList(59);
    const seconds = createScrollList(59);

    return (
        <div>
            <Container>
                <TimeSelectors>
                    <ScrollList ref={minutesRef}>
                        {minutes.map((m) => (
                            <ScrollItem key={`m-${m}`}>{m}</ScrollItem>
                        ))}
                    </ScrollList>
                    <DivideDots><Dot /><Dot /></DivideDots>
                    <ScrollList ref={secondsRef}>
                        {seconds.map((s) => (
                            <ScrollItem key={`s-${s}`}>{s}</ScrollItem>
                        ))}
                    </ScrollList>
                </TimeSelectors>
                <Controls>
                    <Button
                        width={"172px"}
                        onClick={() =>
                            isRunning
                                ? setIsPaused((prev) => {
                                    const next = !prev;
                                    isPausedRef.current = next;
                                    return next;
                                })
                                : startTimer()
                        }
                    >
                        {isRunning ? (isPaused ? "Продолжить" : "Пауза") : "Старт"}
                    </Button>
                    <Button width={"172px"} onClick={() => (isRunning ? resetTimer() : setTimerActive(prev => !prev))}>
                        {isRunning ? "Отмена" : "Назад"}
                    </Button>
                </Controls>
            </Container>
            {children}
        </div>
    );
}

export default Timer;
