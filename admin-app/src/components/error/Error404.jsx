import { Link } from 'react-router-dom'
import   './Error.css'

const Error404 = () => {
  return (
    <section className='page_404'>
        <div className='Container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='col-sm-12 tect-center'>
                        <div className='four_zero_four_bg'>
                            <h1 className='text-center'>404</h1>
                        </div>
                        <div className='contact_box_404'>
                            <h3 className='h2'>Looks like you're lost 😕</h3>
                            <p>The page you are looking for is not available!</p>
                            <Link to={'/'} className='link_404'>Go To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Error404