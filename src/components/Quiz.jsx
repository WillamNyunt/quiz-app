import React, { useState, useEffect } from 'react'
import QUESTIONS from '../questions.js'

export default function Quiz(props) {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionindex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        })
    }

    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    const answers =[...QUESTIONS[activeQuestionindex].answers]
    console.log(answers)
    shuffle(answers)
    
    return (
        <div id='quiz'>
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
