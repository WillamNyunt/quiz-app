import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('SETTING TIMEOUT')
        setTimeout(onTimeOut, timeout);
    }, [timeout, onTimeOut] )


    useEffect(() => {
        console.log('SETTING INTERVAL')
        setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);
    }, [])

    return (
        <progress id='question-time' max={timeout} value={remainingTime}></progress>
    )
}
