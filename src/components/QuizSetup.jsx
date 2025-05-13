"use client"

import { useState, useEffect } from "react"
import "../styles/QuizSetup.css"

function QuizSetup({ startQuiz, loading, error }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("any")
  const [selectedDifficulty, setSelectedDifficulty] = useState("any")
  const [questionAmount, setQuestionAmount] = useState(10)
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php")
        const data = await response.json()
        setCategories(data.trivia_categories)
        setLoadingCategories(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    startQuiz(selectedCategory, selectedDifficulty, questionAmount)
  }

  return (
    <div className="quiz-setup">
      <h2>Set Up Your Quiz</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loadingCategories || loading}
          >
            <option value="any">Any Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            disabled={loading}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions:</label>
          <input
            type="number"
            id="amount"
            min="1"
            max="50"
            value={questionAmount}
            onChange={(e) => setQuestionAmount(Number.parseInt(e.target.value))}
            disabled={loading}
          />
        </div>

        <button type="submit" className="start-button" disabled={loading || loadingCategories}>
          {loading ? "Loading..." : "Start Quiz"}
        </button>
      </form>
    </div>
  )
}

export default QuizSetup
