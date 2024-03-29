import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // Triggers onTimeOut once it reaches 'timeout' interval
    useEffect(() => {
        console.log('SETTING TIMEOUT')
        const timer = setTimeout(onTimeOut, timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeOut] )

    // Once every x seconds it will start reducing the time by x seconds
    useEffect(() => {
        console.log('SETTING INTERVAL')
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <progress id='question-time' max={timeout} value={remainingTime}></progress>
    )
}
