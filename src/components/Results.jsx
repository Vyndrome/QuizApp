"use client"
import "../styles/Results.css"

function Results({ score, totalQuestions, restartQuiz }) {
  const percentage = Math.round((score / totalQuestions) * 100)

  let message = ""
  if (percentage >= 80) {
    message = "Excellent! You're a quiz master!"
  } else if (percentage >= 60) {
    message = "Good job! You know your stuff!"
  } else if (percentage >= 40) {
    message = "Not bad! Keep learning!"
  } else {
    message = "Keep practicing! You'll get better!"
  }

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>

      <div className="score-display">
        <div className="score-circle">
          <span className="score-number">{score}</span>
          <span className="score-total">/{totalQuestions}</span>
        </div>
      </div>

      <div className="percentage">{percentage}%</div>

      <p className="result-message">{message}</p>

      <button className="restart-button" onClick={restartQuiz}>
        Take Another Quiz
      </button>
    </div>
  )
}

export default Results
