import React, { useState, useEffect, useCallback, useRef } from 'react'
import QUESTIONS from '../questions.js'
import shuffle from './utils/shuffle.js';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz(props) {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);
    const shuffledAnswers = useRef()

    //console.log('Quiz component rendered')
    const activeQuestionindex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    console.log(activeQuestionindex)

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answered')
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        })
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionindex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000)
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

    if (!shuffledAnswers.current) {
        console.log(shuffledAnswers.current)
        console.log('shuffled answers undefined')
        shuffledAnswers.current = shuffle(QUESTIONS[activeQuestionindex].answers)
    }


    return (
        <div id='quiz'>
            <QuestionTimer key={activeQuestionindex} timeout={10000} onTimeOut={handleSkipAnswer} />
            <h2 id='questions'>{QUESTIONS[activeQuestionindex].text}</h2>
            <ul id='answers'>
                {shuffledAnswers.current.map((answer) => {
                    let cssClass = ''
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    
                    if ((answerState === 'correct' || answerState == 'wrong') && isSelected) {
                        cssClass = answerState
                    }
                    if ((answerState == 'answered') && isSelected) {
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
