import logo from '../assets/Logo.png'
import knowMore from '../assets/knowMore.png'
import buy from '../assets/buy.png'

const Start = () => {
  return (
  <div className='inicio'>
    <h1>¿Serás el próximo <br/>
      Master Digital?</h1>
    <img className='logo__index' src={logo} />
    <div className='qr__container'>
      <div>
        <p>Conoce más:</p>
        <img className='qr__img' src={knowMore}/>
      </div>
      <div>
        <p>Adquiere tu firma electrónica en:</p>
        <img className='qr__img' src={buy}/>
      </div>
    </div>
  </div>
  )
}

export default Start