import {useState } from "react";
import FormRow from "./FormRow";
import { FaCamera } from "react-icons/fa";
import defaultUserProfile from "../assets/images/user.jpg"
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { authFetch } from "../utils/authFetch";
import { toast } from "react-toastify";

  // const PF = `https://venom-h97y.onrender.com`
  const PF = `http://localhost:3000`

const Profile = ({ fullProfile }) => {
  const { users, logoutUser, changePassword, updateUserProfile } = useGlobalContext();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: users?.name,
    userProfile: users?.userProfile,
    surname: users?.surname,
    email: users?.email,
  })
  const [file, setFile] = useState(null)
  const [imagesFile, setImagesFile] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      changePassword({ oldPassword, newPassword });
      return;
    }
    const { name, surname, email } = userData;
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const maxSize = 2024 * 2024;
      if (file.size < maxSize) {
        try {
          const { data } = await authFetch.post('/user/uploads', formData);
          setImagesFile(data.image)
        } catch (error) {
          console.log(error.msg);
        }
      } else {
        toast.error('Please upload image less than 2MB');
      }
    }
    const currentUser = { name, surname, email, userProfile: imagesFile };
    if ((!name || !email || !surname) && !imagesFile) {
      toast.error('Something went wrong,Please try again!')
    }
    if ((name || email || surname) && imagesFile) {
      updateUserProfile({ currentUser });
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      return;
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }
  
  const removeUser = () => {
    navigate('/landing')
    logoutUser();
  };
  
  return (
    <section className="page profile-center">
      {!fullProfile && (
        <button className="logout-btn btn" onClick={() => removeUser()}>
          log out
        </button>
      )}
      <form onSubmit={handleSubmit} className="form-profile">
        <div className={fullProfile ? "img-container profile-center" : "img-container"}>
          {!fullProfile && (
            <button type="button" className="upload-icon">
              <input
                type="file"
                name="image"
                id="image"
                accept=".png,.jpg,.jpeg"
                className="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <FaCamera />
            </button>
          )
          }
          {file ?
            <img src={URL.createObjectURL(file)} alt="" className="sidebar-img img" />
            :
            <img src={userData.userProfile ? PF + userData.userProfile : defaultUserProfile} alt="" className="sidebar-img img" />
          }
        </div>
        {!fullProfile && (
          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              value={userData.name}
              handleChange={onChange}
            />
            <FormRow
              type="text"
              name="surname"
              value={userData.surname}
              handleChange={onChange}
            />
            <FormRow
              type="email"
              name="email"
              value={userData.email}
              handleChange={onChange}
            />
            <FormRow
              type="password"
              name="oldPassword"
              labelText="old password"
              value={oldPassword}
              handleChange={(e) => setOldPassword(e.target.value)}
            />
            <FormRow
              type="password"
              name="newPassword"
              labelText="new password"
              value={newPassword}
              handleChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="btn">
              update user
            </button>
          </div>
        )}
      </form>
    </section>
  )
};

export default Profile