import defaultUserProfile from '../assets/images/user.jpg'
import {FaCamera,FaAngleDoubleLeft} from "react-icons/fa"
import { useGlobalContext } from '../context/context'

const Sidebar = () => {
  const { users,toggleSidebar } = useGlobalContext();
  const currentUser = users.user;

  return (
    <div className="sidebar-wrapper">

    <aside className="sidebar page">
      <button className="btn close-btn" onClick={toggleSidebar}>
        <FaAngleDoubleLeft/>
      </button>
      <div className="sidebar-header">
        <div className="img-container">
          <button className="upload-icon" >
            <FaCamera/>
          </button>
        <img src={defaultUserProfile} alt="" className="sidebar-img img" />
        </div>
        <h4 className="username">{currentUser.name}</h4>
        <article className="followers">
          <div className="following">
          <div>
            <span className="card">1234k</span>
            <h5>following</h5>
          </div>
          <div>
            <span className="card">24095k</span>
            <h5>followers</h5>
          </div>
          <div>
            <span className="card">1958.4K</span>
            <h5>likes</h5>
          </div>
          </div>
          <button className="btn">
            follow
          </button>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero adipisci ipsum laudantium!
          </p>
        </article>
      </div>
    </aside>
    </div>
  )
}

export default Sidebar