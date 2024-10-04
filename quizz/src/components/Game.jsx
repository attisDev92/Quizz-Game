import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../redux/notificationReducer'
import { updatePlayerScore } from '../redux/playerReducer'
import { useSetQuestions } from '../hooks/useQuestions'
import { maxNumberQuestions, timeLimit, timeNotification } from '../config/globalVar'

const Game = () => {
  const navigate = useNavigate()
  const player = useSelector(state => state.player)
  const dispatch = useDispatch()
  const {questions} = useSetQuestions()
  const [numberQuestion, setNumberQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timer, setTimer] = useState(timeLimit)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          dispatch(
            setNotification({
              message: 'Se acabó el tiempo',
              style: 'error',
            }),
          )
          setTimeout(() => {
            handleNextQuestion()
          }, timeNotification)
          return timeLimit
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [numberQuestion])

  const handleNextQuestion = () => {
    if (numberQuestion === maxNumberQuestions) {
      dispatch(updatePlayerScore(player.id, score))
      dispatch(
        setNotification({
          message: 'Juego finalizado',
          style: 'warning',
        }),
      )
      navigate('/scores')
    } else {
      setNumberQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setTimer(timeLimit)
    }
  }

  const handleConfirmAnswer = () => {
    const currentQuestion = questions[numberQuestion - 1]
    const correctAnswer = currentQuestion.answers.find(ans => ans.correct)

    if (selectedAnswer === correctAnswer.res) {
      setScore(prevScore => prevScore + 100)
      dispatch(
        setNotification({
          message: 'CORRECTO!',
          style: 'success',
        }),
      )
      setTimeout(() => {
        handleNextQuestion()
      }, timeNotification)
    } else {
      dispatch(
        setNotification({
          message: 'INCORRECTO!',
          style: 'error',
        }),
      )
      setTimeout(() => {
        handleNextQuestion()
      }, timeNotification)
    }
  }

  if (!player) {
    return navigate('/new_player')
  }

  if (questions.length === 0) {
    return <>...Loading</>
  }

  const currentQuestion = questions[numberQuestion - 1]

  return (
    <div className='game__container'>
      <h2 className='game__title'>A jugar {player.name}!</h2>
      
      <div>
        <p>Tiempo restante: {timer} segundos</p>
        <p>Tu marcador es: {score}</p>
      </div>

      <p>Pregunta número: {numberQuestion}</p>
      <p className='question'>{currentQuestion.ask}</p>

      <div className='answer__container'>
        {currentQuestion.answers.map((answer, index) => (
          <>
            <input
              type='radio'
              id={`answer-${index}`}
              name='answer'
              value={answer.res}
              checked={selectedAnswer === answer.res}
              onChange={() => setSelectedAnswer(answer.res)}
            />
            <label htmlFor={`answer-${index}`}>{answer.res}</label>
          </>
        ))}
      </div>

      <button onClick={handleConfirmAnswer} disabled={!selectedAnswer}>
        Confirmar Respuesta
      </button>
    </div>
  )
}

export default Game
