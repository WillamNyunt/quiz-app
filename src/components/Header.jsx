import React from 'react'
import logoImg from '../assets/quiz-logo.png'

export default function Header(props) {
    
    return (
        <header id='header'>
            <img src={logoImg} alt='quiz logo' />
            <h1>React Quiz</h1>
        </header>
    )
}
