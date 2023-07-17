import {Link} from "react-router-dom" 
import landingImg from "../assets/images/landing.svg"
import Logo from "../components/Logo"
import { useGlobalContext } from "../context/context"
import { Navigate } from "react-router-dom"

const Landing = () => {
  const { users } = useGlobalContext();
  return (
    <>
      {users && <Navigate to="/"/>}
    <section className="section">
      <nav>
        <Logo/>
      </nav>
      <article className="section-center landing-center page">
        <div className="info">
        <h2>Capturing moments</h2>
        <p>
          They’re being inundated with information and clutter and, because of this, they’re now demanding more. The modern consumer is sophisticated, powerful, and has increased expectations
        </p>
        <Link to="/login" className="btn landing-btn">
          register/login
        </Link>
        </div>
        <img src={landingImg} alt="capturing moment" className="landing-img" />
      </article>
    </section>
    </>
  )
}

export default Landing