import { Navbar, Profile } from "../components"
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { useEffect } from "react";

const SingleUser = () => {
  const { id } = useParams();
  const { getSingleUserVideos, numOfVideos, singleUserVideos } = useGlobalContext();
  const PF = process.env.PF

  useEffect(() => {
    getSingleUserVideos(id)
    // eslint-disable-next-line 
  },[id])

  return (
    <>
      <Navbar/>
    <section className="section-center page singe-user-video">
      <Profile fullProfile /> 
        <article className="features">
          <p>{numOfVideos} videos</p>
          <div className="feature">
          {singleUserVideos.map((item) => {
            const { _id, title, video,description } = item;
            return (
              <div key={_id} className="feature-center">
                <video autoPlay controls muted className="video">
                  <source src={PF + video} type="video/mp4"/>
                </video>
                <footer className="feature-footer">
                  <h5 className="feature-title">{title}</h5>
                  <p className="feature-desc">{description}</p>
                </footer>
              </div>
            )
          })}
          </div>
      </article>
      </section>
    </>
  )
}

export default SingleUser