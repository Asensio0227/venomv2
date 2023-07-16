import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FormRow from '../components/FormRow';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/context';

const Login = () => {
  const [isMember, setIsMember] = useState(true);
 const [values, setValues] = useState({
    email: '',
    password: '',
 });
  const navigate = useNavigate();
  const { setupUsers, isLoading, users } = useGlobalContext();
  
  useEffect(() => {
    if (users) {
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  },[users,navigate])


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  }

  const toggleMember = () => {
    setIsMember(!isMember)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {email, password } = values
    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    } else {
      setValues({
        email: '',
        password: '',
      })
      setIsMember(true);
    }
    const currentUser = { email, password };
    setupUsers({
      currentUser,
      alertText: "Login Successful! Redirecting..."
    })
    // navigate('/')
  };

  return (
    <>
      <Wrapper className='page'>
        <form
          className={isLoading ? 'form form-loading' : 'form'}
          onSubmit={onSubmit}
        >
          {/* single form row */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <button type="button" disabled={isLoading} className="demo-btn btn btn-hipster" onClick={() => {
          console.log('test user')
          setupUsers({
            currentUser: {
              email: 'testUser@test.com',
              password: 'secret'
            },
            endPoint: 'login',
            alertText: 'Login Successful! Redirecting...',
          });
        }}>
          continue without registering
        </button>
          <p>
          Not a member yet : 
            <Link to="/register" type="button" className="member-btn" onClick={toggleMember}>
              Register
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
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;


export default Login