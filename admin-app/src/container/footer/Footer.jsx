import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import   './Footer.css'
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const countryCode = "+20" 
    const phoneNumber = "01023982624"
  return (
    <footer>
        <div>
            <ul>
                <li><a className='f' href='https://www.facebook.com/profile.php?id=100009392357660' target='_blank'><FontAwesomeIcon icon={faFacebook}/></a></li>
                <li><a className='i' href='https://www.instagram.com/youssef_eraky.111/?hl=ar' target='_blank'><FontAwesomeIcon icon={faInstagram}/></a></li>
                <li><a className='l' href='https://www.linkedin.com/in/youssef-eraky-183357257/' target='_blank'><FontAwesomeIcon icon={faLinkedin}/></a></li>
                <li><a className='w' href={`https://wa.me/${countryCode}${phoneNumber}`} target='_blank'><FontAwesomeIcon icon={faWhatsapp}/></a></li>
            </ul>
        </div>
        <div>
            <span>© 2023 - Ecommerce software by Youssef Eraky</span>
        </div> 
    </footer>
  )
}

export default Footer