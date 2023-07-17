import { useState } from "react"
import { Logo ,FormRow} from "../components"
import {useGlobalContext} from "../context/context"
import { toast } from "react-toastify"
import { Link,useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const initialState = {
  token: '',
  name: '',
  surname: '',
  email: '',
  password:'',
}

const Register = () => {
  const [isMember, setIsMember] = useState(true);
  const [values, setValues] = useState(initialState)
  const { isLoading, registerUsers,setupUsers } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  }

  const toggleMember = () => {
    setIsMember(!isMember)
  }

  const submitChange = async (e) => {
    e.preventDefault()
    const { name, surname, email, password } = values
    if ((!isMember && !name && !surname) || !email || !password) {
      toast.error('Please fill out all fields');
      return;
    } else {
      setValues({
        name: '',
        email: '',
        password: '',
      })
      setIsMember(true);
    }
    const currentUser = { name, surname, email, password };
    await registerUsers(currentUser);
  };

  return (
    <>
      <Wrapper className="page auth-flow">
        <form
          className={isLoading ? 'form form-loading form-register' : 'form'}
          onSubmit={submitChange}>
        <Logo className="form-logo" />
        <h2>
          Register
        </h2>
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="surname"
            value={values.surname}
            handleChange={handleChange}
          />
        {/* email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* name */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" disabled={isLoading} className="submit-btn btn">
           register
        </button>
        <button type="button" disabled={isLoading} className="demo-btn btn btn-hipster" onClick={() => {
          setupUsers({
            currentUser: {
              email: 'testUser@test.com',
              password: 'secret'
            },
            alertText: 'Login Successful! Redirecting...',
          });
            navigate('/')
        }}>
          continue without registering
        </button>
        <p>
           already a member : 
            <Link to="/login" type="button" className="member-btn" onClick={toggleMember}>
              login
            </Link>
        </p>
        <p>
          Forgot your password?{' '}
          <Link to='/forgot-password' className='reset-link'>
            Reset Password
          </Link>
        </p>
      </form>
    </Wrapper>
    </>
  )
};

const Wrapper = styled.section`
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--clr-primary);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
`
export default Register