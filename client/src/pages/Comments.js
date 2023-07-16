import { Link, useParams } from "react-router-dom"
import { useGlobalContext } from "../context/context";
import { useEffect, useState } from "react";
import { CommentsContainer } from "../components";
import { toast } from "react-toastify";
import {
  Friends,
  Profile
} from "../components"
import { FiArrowDownCircle, FiSend } from "react-icons/fi";

const Comments = () => {
  const { id } = useParams();
  const { getAllCommentsForSingleStream, allComments, createComment } = useGlobalContext();
  const [comment, setComment] = useState('');

  const handleComments = async (e) => {
    try {
      e.preventDefault();
      if (!comment) {
        toast.error('Please write something....')
        return;
      }
      else {
        const tossie = {
          comments: comment,
          stream: id
        }
        createComment(tossie)
        setTimeout(() => {
          window.location.reload();
        },1000)
      }
      setComment('');
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('You have already commented');
        return;
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCommentsForSingleStream(id);
    // eslint-disable-next-line 
  }, [id])
  
  return (
    <main className="section-center full-page">
      <div className="profile">
        <Profile />
      </div>
      <article className="comments-center">
        <Link to="/" className="btn">
          <FiArrowDownCircle />
        </Link>
        <form className="form-comment">
          <div className="form-row">
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-textarea textarea"
            />
            <button className="form-comment-btn btn" type="submit" onClick={handleComments}>
              <FiSend/>
            </button>
          </div>
        </form>
        {allComments.map((item) => {
          return (
            <CommentsContainer key={item._id} {...item} />
          )
        })
        }
      </article>
      <div className="friends-wrapper">
        <Friends />
      </div>
    </main>
  )
};

export default Comments