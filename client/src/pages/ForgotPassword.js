import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormRow } from '../components'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setEmail(e.target.value)
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true);
    if (!email) {
      toast.error('Please provide email')
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('https://venomv2.onrender.com/api/v1/auth/forgot-password', {
        email
      });
      toast.success(data.msg);
      setSuccess(true);
    } catch (error) {
      toast.error('Something went wrong, please try again');
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <Wrapper>
      {!success && (
        <form className={loading ? "form form-loading" : "form"} onSubmit={handleSubmit}>
        <h4>forgot Password</h4>
        <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Please Wait...' : 'Get Reset Password Link'}
          </button>
          <p>
            Already a have an account?
            <Link to='/register' className='login-link'>
              Log In
            </Link>
          </p>
      </form>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.main`
h4,
p {
  text-align: center;
}
p {
  margin: 0 ;
  margin-top: 1rem;
}
.login-link {
  display: inline-block;
  margin-left: .25rem;
  text-transform: capitalize;
  color: var(--clr-primary);
  cursor: pointer;
}
`;

export default ForgotPassword