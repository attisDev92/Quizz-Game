import React, { useEffect, useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import back_notification from '../assets/back_notification.png'
import error_notification from '../assets/error_notification.png'


const preloadImages = () => {
  const images = [back_notification, error_notification]
  images.forEach(image => {
    const img = new Image()
    img.src = image
  })
}

preloadImages()

const Notification = memo(() => {
  const notification = useSelector(state => state.notification)

  if (!notification.active) return null

  return (
    <div className='notification'>
      <div className='notification_content'>
        <p>{notification.message}</p>
        <img
          src={
            notification.style === 'success' || notification.style === 'win' || notification.style === 'star'
              ? back_notification
              : error_notification
          }
          alt={notification.style}
        />
      </div>
    </div>
  )
})

export default Notification