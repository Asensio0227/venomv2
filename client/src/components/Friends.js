import { useEffect, useState } from "react";
import defaultUserProfile from "../assets/images/user.jpg"
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context/context';
import axios from "axios"
const defaultURL = axios.create({
  baseURL: `/api/v1`
});

const Friends = () => {
  const { users,deleteUser } = useGlobalContext();
  const PF = `https://venom-h97y.onrender.com`
  const [friends, setFriends] = useState([]);
  const [index, setIndex] = useState(0);

  const getAllUsers = async () => {
    try {
      let url = `/user`;
      const { data } = await defaultURL.get(url);
      const { friends, count } = data;
      const items = friends;
      setFriends(items);
      setIndex(count)
    } catch (error) {
      if (error.response.status !== 401) {
        console.log(error.msg);
      }
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="container">
      <div className="container-center">
      <p>
        {index} users online
        </p>
        {friends.map((items) => {
          const { name, userProfile, _id } = items;
          return (
            <Link to={`/user/${_id}`} className="users" key={_id}>
              <img src={userProfile ? PF + userProfile : defaultUserProfile} alt={name} className="user-img img" />
              <div className="friends-info">
                <h5 className="user-name">@{name.toUpperCase()}</h5>
              {users?.roles === 'admin' && (
                <button className="remove-user-btn" type="button" onClick={()=>deleteUser(_id)}>
                remove user
              </button>
              )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Friends