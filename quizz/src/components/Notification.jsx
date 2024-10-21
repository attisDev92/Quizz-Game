import { useSelector } from 'react-redux'
import back_notification from '../assets/back_notification.png'
import error_notification from '../assets/bad_notification.png'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.active) {
    return null
  }
  console.log(notification)

  const NotificationContent = () => { 
    if (notification.style === 'time out') {
      return (
        <div className='notification_content'>
          <p>Se te acabó el tiempo</p>
          <img src={error_notification} />
        </div>
      )
    } else if (notification.style === 'success') {
      return (
        <div className='notification_content'>
          <p>{notification.message}</p>
          <img src={back_notification} />
        </div>
      )
    } else if (notification.style === 'error') {
      return (
        <div className='notification_content'>
          <p>{notification.message}</p>
          <img src={error_notification} />
        </div>
      )
    } else if (notification.style === 'win') {
      return (
        <div className='notification_content'>
          <p>GANASTE!</p>
          <img src={back_notification} />
        </div>
      )
    } else if (notification.style === 'lose') {
      return (
        <div className='notification_content'>
          <p>SIGUE <br/> INTENTANDO</p>
          <img src={error_notification} />
        </div>
      )
    } 
  }
  

  return (
    <div className='notification'>
        {NotificationContent()}
    </div>
  )
}

export default Notification
