import { Link } from "react-router-dom"
import ErrorImg from "../assets/images/error.svg"
const Error = () => {
  return (
    <main className="error full-page">
      <div className="error-page ">
        <img src={ErrorImg} alt="not-found" className="img error-img" />
        <h3>Oops! dead end</h3>
        <p>seems like the page you are looking for is not found</p>
        <Link to="/" className=" error-btn">
          back home
        </Link>
      </div>
    </main>
  )
}

export default Error