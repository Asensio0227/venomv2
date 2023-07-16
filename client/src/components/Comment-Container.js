import { FaTrash } from "react-icons/fa";
import defualtProfile from "../assets/images/user.jpg";
import { useGlobalContext } from "../context/context";

const CommentsContainer = ({ comments, user, _id }) => {
  const PF = process.env.PF
  const { name, userProfile } = user;
  const { removeComment } = useGlobalContext();

  return (
    <section className="comment-container">
      <article className="comment-center">
        <div className="comment-img-container">
          <img src={userProfile ? PF + userProfile : defualtProfile} alt={name} className="user-img img" />
          <h5>{user?.name}</h5>
        </div>
        <div className="comment-info">
          <p>{comments}</p>
          <button className="btn remove-btn" onClick={() => removeComment(_id)}>
            <FaTrash />
          </button>
        </div>
      </article>
    </section>
  )
};

export default CommentsContainer;