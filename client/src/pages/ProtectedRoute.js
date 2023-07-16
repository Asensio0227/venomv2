import { Navigate } from "react-router-dom";
import { Loading } from "../components";
import { useGlobalContext } from "../context/context";

const ProtectedRoute = ({children}) => {
  const { userLoading, users } = useGlobalContext();

  if (userLoading) {
    return <main>
      <Loading />
    </main> 
  }

  if (!users) {
    return <Navigate to='/landing'/>
  }

  return children
}

export default ProtectedRoute