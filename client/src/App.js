import { Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  ProtectedRoute,
  Landing,
  Error,
  Home,
  SingleUser,
  Comments,
  ResetPassword,
  Verify,
  ForgotPassword
} from "./pages"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" exact element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user/:id" element={<SingleUser/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/user/verify-email" element={<Verify/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/user/reset-password" element={<ResetPassword/>}/>
        <Route path="/comments/:id" element={<Comments/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center"/>
    </>
  )
}

export default App