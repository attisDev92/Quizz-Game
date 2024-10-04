import { useEffect, useState } from "react"
import questionsDataBase from '../db/questionsDataBase.json'
import { maxNumberQuestions } from "../config/globalVar"

export const useSetQuestions = () => {
  
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getRandomQuestions = () => {
      const questionsShuffle = [...questionsDataBase].sort(
        () => 0.3 - Math.random(),
      )
      return questionsShuffle.slice(0, maxNumberQuestions)
    }
    setQuestions(getRandomQuestions())
  }, [])

  return {
    questions
  }
}