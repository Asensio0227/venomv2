import Footer from "./Footer"
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";

const Trends = () => {
  const PF = process.env.PF
  const { videos, getAllVideos } = useGlobalContext();

  useEffect(() => {
    getAllVideos();
    // eslint-disable-next-line 
  }, []);

  return (
    <>
      <section className="">
        <article className="stream">
          {videos.map((item) => {
            const {
              title, _id, video, description,
              comments,
            } = item;
            return (
              <div key={_id} className="trend-center">
                <video controls loop muted className="video">
                  <source src={`${PF}${video}`} type="video/mp4" />
                </video>
                <div className="info">
                  <h5 className="trend-title">{title}</h5>
                  <p className="trend-desc">{description}</p>
                </div>
                <div className="comments">
                  <Link to={`/comments/${_id}`} className="comment-btn btn">
                    <FaComments/>
                    {comments.length}
                  </Link>
                </div>
              </div>
            )
          })}
        </article>
        <Footer />
      </section>
    </>
  )
};

export default Trends