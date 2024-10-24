import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../redux/notificationReducer'
import { useSetQuestions } from '../hooks/useQuestions'
import { maxNumberQuestions, timeLimit, timeNotification } from '../config/globalVar'
import { changeMusic, setMusic } from '../redux/musicReducer'
import logo from '../assets/Logo.png'
import back from '../assets/back_question.png'
import { plusScore } from '../redux/playerReducer'

const Game = () => {
  const {questions} = useSetQuestions()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const player = useSelector(state => state.player)
  const [numberQuestion, setNumberQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [_timer, setTimer] = useState(timeLimit)

  useEffect(() => {
    dispatch(setMusic('start'))
    dispatch(setNotification({
      message: `A jugar! ${player.nickname}`,
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

  const handleNextQuestion = async() => {
    if (numberQuestion === maxNumberQuestions) {
      navigate('/result')
    } else {
      setNumberQuestion(numberQuestion + 1)
      setSelectedAnswer(null)
      setTimer(timeLimit)
    }
  }

  const handleConfirmAnswer = () => {
    const currentQuestion = questions[numberQuestion - 1]
    const correctAnswer = currentQuestion.answers.find(ans => ans.correct)

    if (selectedAnswer === correctAnswer.res) {
      dispatch(changeMusic('success'))
      dispatch(plusScore())
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

  if (!player.nickname) {
    navigate('/new_player')
  }

  if (questions.length === 0) {
    return <>...loading</>
  }

  const currentQuestion = questions[numberQuestion - 1]

  return (
    <div className='game__container'>

      <p className='question'>{currentQuestion.ask}</p>

      <div className='answer__container'>
        {currentQuestion.answers.map((answer, i) => (
          <>
            <input
              key={i}
              type='radio'
              id={`answer-${i}`}
              name='answer'
              value={answer.res}
              checked={selectedAnswer === answer.res}
              onChange={() => setSelectedAnswer(answer.res)}
            />
            <label key={`answer-${i}`} htmlFor={`answer-${i}`}>{answer.res}</label>
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
