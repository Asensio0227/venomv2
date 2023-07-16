import {FiHome,FiSearch,FiPlusSquare,FiInbox,FiUser} from "react-icons/fi"
import { useGlobalContext } from "../context/context"

const Footer = () => {
  const { showModal } = useGlobalContext();
  return (
    <footer className="footer">
      <div className="footer-container">
        <button className="footer-btn">
          <FiHome className="footer-icon" />
          <span>
            home
          </span>
        </button>
        <button className="footer-btn">
          <FiSearch className="footer-icon" />
          <span>
            discover
          </span>
        </button>
        <button className="footer-button" onClick={showModal}>
          <FiPlusSquare className="footer-icon" />
        </button>
        <button className="footer-btn">
          <FiInbox className="footer-icon" />
          <span>
            inbox
          </span>
        </button>
        <button className="footer-btn">
          <FiUser className="footer-icon" />
          <span>
            me
          </span>
        </button>
      </div>
    </footer>
  )
}

export default Footer