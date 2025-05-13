"use client"

import { useState } from "react"
import "./App.css"
import QuizSetup from "./components/QuizSetup"
import Quiz from "./components/Quiz"
import Results from "./components/Results"

function App() {
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    quizStarted: false,
    loading: false,
    error: null,
  })

  const startQuiz = async (category, difficulty, amount) => {
    setQuizState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const url = `https://opentdb.com/api.php?amount=${amount}${category !== "any" ? `&category=${category}` : ""}${difficulty !== "any" ? `&difficulty=${difficulty}` : ""}&type=multiple`

      const response = await fetch(url)
      const data = await response.json()

      if (data.response_code === 0) {
        // Process questions to include all answers in a single array
        const processedQuestions = data.results.map((question) => {
          const answers = [...question.incorrect_answers, question.correct_answer]
          // Shuffle answers
          const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

          return {
            ...question,
            answers: shuffledAnswers,
          }
        })

        setQuizState({
          questions: processedQuestions,
          currentQuestionIndex: 0,
          score: 0,
          showResults: false,
          quizStarted: true,
          loading: false,
          error: null,
        })
      } else {
        throw new Error("Failed to fetch questions")
      }
    } catch (error) {
      setQuizState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch questions. Please try again.",
      }))
    }
  }

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correct_answer

    // Update score if answer is correct
    if (isCorrect) {
      setQuizState((prev) => ({
        ...prev,
        score: prev.score + 1,
      }))
    }

    // Move to next question or show results if it's the last question
    setTimeout(() => {
      if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }))
      } else {
        setQuizState((prev) => ({
          ...prev,
          showResults: true,
        }))
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      quizStarted: false,
      loading: false,
      error: null,
    })
  }

  return (
    <div className="app">
      <header>
        <h1>Quiz Master</h1>
      </header>

      <main>
        {!quizState.quizStarted ? (
          <QuizSetup startQuiz={startQuiz} loading={quizState.loading} error={quizState.error} />
        ) : quizState.showResults ? (
          <Results score={quizState.score} totalQuestions={quizState.questions.length} restartQuiz={restartQuiz} />
        ) : (
          <Quiz
            question={quizState.questions[quizState.currentQuestionIndex]}
            questionNumber={quizState.currentQuestionIndex + 1}
            totalQuestions={quizState.questions.length}
            handleAnswer={handleAnswer}
          />
        )}
      </main>

      <footer>
        <p>Created with React - Powered by Open Trivia Database</p>
      </footer>
    </div>
  )
}

export default App
