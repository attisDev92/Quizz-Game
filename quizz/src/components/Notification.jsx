import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.active) {
    return null
  }

  return (
    <div className={`notification ${notification.style}`}>
      <div className='notification__container'>
        <p>{notification.message}</p>
      </div>
    </div>
  )
}

export default Notification
