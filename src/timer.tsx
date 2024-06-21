import React, { useState, useEffect, useRef } from 'react';
import "./index.css"

const Timer: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(() => {
        return JSON.parse(localStorage.getItem('isRunning') || 'false');
    });
    const [elapsedTime, setElapsedTime] = useState<number>(() => {
        return parseInt(localStorage.getItem('elapsedTime') || '0', 10);
    });
    const timerIntervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const handleTimer = () => {
            setElapsedTime(Date.now() - startTimeRef.current);
        };

        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            timerIntervalRef.current = window.setInterval(handleTimer, 1);
        } else if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        localStorage.setItem('isRunning', JSON.stringify(isRunning));
        localStorage.setItem('elapsedTime', elapsedTime.toString());
    }, [isRunning, elapsedTime]);

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    const formatTime = (time: number) => {
        const pad = (num: number, digits: number) => num.toString().padStart(digits, '0');
        const milliseconds = time % 1000;
        const totalSeconds = Math.floor(time / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
    };

    return (
        <div className="container">
            <div id="timer">{formatTime(elapsedTime)}</div>
            <div className='buttonscont'>
                <button className='start' onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
                <button className='reset' onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
