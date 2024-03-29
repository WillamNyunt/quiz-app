import React, { useState, useEffect, useCallback, useRef } from 'react'
import QUESTIONS from '../questions.js'
import shuffle from './utils/shuffle.js';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz(props) {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);

    console.log('Quiz component rendered')

    const activeQuestionindex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setAnswerState('answered')
            setUserAnswers(prevAnswers => {
                return [...prevAnswers, selectedAnswer]
            })
            console.log('Answer States updated ')

            setTimeout(() => {
                if (selectedAnswer === QUESTIONS[activeQuestionindex].answers[0]) {
                    console.log('true')
                    setAnswerState('correct')
                } else {
                    console.log('false')
                    setAnswerState('wrong')
                }
                setTimeout(() => {
                    setAnswerState('');
                    console.log('set answer state')
                }, 2000)

                console.log('handle select answer end ')
            }, 1000)
        }, [activeQuestionindex])

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    const quizComplete = userAnswers.length === QUESTIONS.length

    if (quizComplete) {
        return (
            <div id="summary">
                <h2>Quiz complete</h2>
                <img src={quizCompleteImg} alt="Quiz complete picture" />
            </div>
        )
    }

    const shuffledAnswers = shuffle(QUESTIONS[activeQuestionindex].answers)

    let cssClass = ''

    return (
        <div id='quiz'>
            <QuestionTimer key={activeQuestionindex} timeout={10000} onTimeOut={handleSkipAnswer} />
            <h2 id='questions'>{QUESTIONS[activeQuestionindex].text}</h2>
            <ul id='answers'>
                {shuffledAnswers.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    if ((answerState === 'correct' || answerState == 'wrong') && isSelected) {
                        cssClass = answerState
                    }
                    if (answerState == 'answered' && isSelected) {
                        cssClass = 'selected'
                    }
                    return (
                        <li key={answer} className='answer'>
                            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
