import React, { useState } from 'react'
import { useLocation,useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { FormRow } from '../components'
import { toast } from 'react-toastify'


function useQuery() {
  return new URLSearchParams(useLocation().search)
};


const ResetPassword = () => {
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('')
  const history = useNavigate();

  const query = useQuery();

  const handleChange = e => {
    setPassword(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      toast.error('please enter password');
      setLoading(false);
      return;
    }
    try {
      await axios.post('/api/v1/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email')
      });
      setLoading(false);
      setSuccess(true);
      toast.success(`Success, redirecting to login page shortly`);
      setTimeout(() => {
        history('/login')
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false)
    }
  };

  return (
    <Wrapper>
      {!success && (
        <form className={loading ? "form form-loading" : "form"} onSubmit={handleSubmit}>
          <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Please Wait...' : 'New Password'}
          </button>
        </form>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
h4,
p {
  text-align: center;
}
p {
  margin: 0;
  margin-top: 1rem;
}
`;

export default ResetPassword