"use client"

import { useState } from "react"
import "../styles/Quiz.css"

function Quiz({ question, questionNumber, totalQuestions, handleAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)

  const handleAnswerClick = (answer) => {
    if (answerSubmitted) return

    setSelectedAnswer(answer)
    setAnswerSubmitted(true)
    handleAnswer(answer)

    // Reset for next question
    setTimeout(() => {
      setSelectedAnswer(null)
      setAnswerSubmitted(false)
    }, 1000)
  }

  const getAnswerClass = (answer) => {
    if (!answerSubmitted) return ""

    if (answer === question.correct_answer) {
      return "correct"
    } else if (answer === selectedAnswer) {
      return "incorrect"
    }
    return ""
  }

  // Decode HTML entities
  const decodeHTML = (html) => {
    const textarea = document.createElement("textarea")
    textarea.innerHTML = html
    return textarea.value
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="quiz-category">Category: {question.category}</div>
        <div className="quiz-difficulty">
          Difficulty: {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{decodeHTML(question.question)}</h2>

        <div className="answers-container">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-button ${getAnswerClass(answer)}`}
              onClick={() => handleAnswerClick(answer)}
              disabled={answerSubmitted}
            >
              {decodeHTML(answer)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz
