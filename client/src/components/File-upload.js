import {
  FiSend
} from "react-icons/fi";
import { useGlobalContext } from "../context/context";
import { useState } from "react"
import { authFetch } from "../utils/authFetch";
import { toast } from "react-toastify";
import { FaFileVideo, FaWindowClose } from "react-icons/fa";

const FileUpload = () => {
  const { hideModal, postYourThoughts } = useGlobalContext();
  const [file, setFile] = useState(null)
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [videoFile, setVideoFile] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      try {
        const { data } = await authFetch.post('/streams/upload', formData);
        setVideoFile(data.video)
      } catch (error) {
        console.log(error.msg);
      }
    }

    const opinion = {
      title: name,
      description: desc,
      video: videoFile
    };
    if ((name || desc ) && videoFile) {
      postYourThoughts(opinion)
      setTimeout(() => {
        window.location.reload();
        hideModal()
      }, 1000);
      return;
    } else {
      toast.error('Something went wrong,Please try again!')
    }
       } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <section className=" volatile">
      <form className="form form-file" onSubmit={onSubmitHandler}>
        <button className="close-file-modal" onClick={() => hideModal()}>
          <FaWindowClose/>
        </button>
        <div className="form-row">
          <FaFileVideo className="shareIcon" />
          <input
            type="file" id="file" name="video" accept="mp4" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <hr />
        {
          file && (
            <div className="shareImgContainer">
              <div className="tossie">
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="desc" value={desc} className="form-textarea" onChange={(e) => setDesc(e.target.value)} />
                <button
                  type="submit"
                  className="btn"
                >
                  <FiSend/>
                </button>
              </div>
              <div className="upload-container">
                <video
                  autoPlay
                  className='video'
                >
                  <source
                    src={URL.createObjectURL(file)}
                    type='video/mp4'
                  />
                </video>
                <FaWindowClose className="shareCancelImg" onClick={() => setFile(null)} />
              </div>
            </div>
          )
        }
      </form>
    </section>
  )
}

export default FileUpload