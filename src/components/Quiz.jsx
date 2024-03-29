import React, { useState, useEffect, useCallback, useRef } from 'react'
import QUESTIONS from '../questions.js'
import shuffle from './utils/shuffle.js';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz(props) {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionindex = userAnswers.length;

    //shuffle on inititial render
    const answers = QUESTIONS[activeQuestionindex].answers 

    useEffect((answers) => {
        if (answers) {
           shuffle(answers) 
        } else {
            console.log('invalid')
            return answers
        }
    }, [answers])

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        console.log(QUESTIONS[activeQuestionindex].answers[0])
        console.log(selectedAnswer)
        if (selectedAnswer === QUESTIONS[activeQuestionindex].answers[0]) {
            console.log('true')
            setAnswerState(true)
        } else {
            console.log('false')
            setAnswerState(false)
        }

        const answerCorrectTimer = setTimeout(()=> { 
            clearInterval(answerCorrectTimer)
        
            setUserAnswers(prevAnswers => {
                return [...prevAnswers, selectedAnswer]
            })
        }, 1000) 
    } , [activeQuestionindex])

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [])

    const quizComplete = userAnswers.length === QUESTIONS.length

    if (quizComplete) {
        return (
            <div id="summary">
                <h2>Quiz complete</h2>
                <img src={quizCompleteImg} alt="Quiz complete picture" />
            </div>
        )
    }

    return (
        <div id='quiz'>
            <QuestionTimer key={activeQuestionindex} timeout={10000} onTimeOut={handleSkipAnswer} />
            <h2 id='questions'>{QUESTIONS[activeQuestionindex].text}</h2>
            <ul id='answers'>
                {answers.map((answer) => {
                    return (
                        <li key={answer} className='answer'>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
