import React, { useState, useEffect } from 'react'
import QUESTIONS from '../questions.js'
import shuffle from './utils/shuffle.js';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz(props) {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionindex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        })
    }

    const quizComplete = userAnswers.length === QUESTIONS.length

    if (quizComplete) {
        return (
            <div id="summary">
                <h2>Quiz complete</h2>
                <img src={quizCompleteImg} alt="Quiz complete picture" />
            </div>
        )
    }

    const answers = QUESTIONS[activeQuestionindex].answers
    shuffle(answers)

    return (
        <div id='quiz'>
            <QuestionTimer timeout={10000} onTimeOut={() => handleSelectAnswer(null)} />
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
