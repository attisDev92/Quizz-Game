import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../redux/notificationReducer'
import { updatePlayerScore } from '../redux/playerReducer'
import { useSetQuestions } from '../hooks/useQuestions'
import { maxNumberQuestions, timeLimit, timeNotification } from '../config/globalVar'
import { changeMusic, endGameMusic, setMusic } from '../redux/musicReducer'
import logo from '../assets/Logo.png'
import back from '../assets/back_question.png'

const Game = () => {
  const navigate = useNavigate()
  const player = useSelector(state => state.player)
  const dispatch = useDispatch()
  const {questions} = useSetQuestions()
  const [numberQuestion, setNumberQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [_timer, setTimer] = useState(timeLimit)
  const [score, setScore] = useState(0)

  useEffect(() => {
    dispatch(setMusic('start'))
    dispatch(setNotification({
      message: 'A jugar!',
      style: 'start'
    }))
  },[])

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          dispatch(changeMusic('error'))
          dispatch(
            setNotification({
              message: 'Se acabó el tiempo',
              style: 'time out',
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
      if (score === (maxNumberQuestions * 100)) { 
        dispatch(endGameMusic('win'))
        dispatch(
          setNotification({
            message: 'Ganaste!',
            style: 'win',
          }),
        )
      } else {
        dispatch(endGameMusic('lose'))
        dispatch(
          setNotification({
            message: 'Sigue intentando!',
            style: 'lose',
          }),
        )
      }
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
      dispatch(changeMusic('success'))
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
      dispatch(changeMusic('error'))
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

      <p className='question'>{currentQuestion.ask}</p>

      <div className='answer__container'>
        {currentQuestion.answers.map((answer, index) => (
          <>
            <input
              key={index}
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

      <img className='game__logo' src={logo} /> 
      <img className='game__background' src={back} />
    </div>
  )
}

export default Game
