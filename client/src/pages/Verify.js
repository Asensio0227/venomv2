import React, { useEffect, useState } from 'react'
import {
  useLocation, Link
} from 'react-router-dom'
import { useGlobalContext } from '../context/context'
import axios from 'axios'
import styled from 'styled-components';

function useQuery() {
  return new URLSearchParams(useLocation().search)
};


const Verify = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const { isLoading } = useGlobalContext();


  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
      console.log(data);

    } catch (error) {
      setLoading(false)
      setError(true)
    }
    setLoading(false)
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken()
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <h2>loading....</h2>
      </Wrapper>
    )
  }

   if (error) {
     return (
      <main>
         
      <Wrapper>
        <h4>There was an error, please double check your verification link </h4>
      </Wrapper>
      </main>
    )
  }

  return (
    <Wrapper className='container'>
      <h2>Account Confirmed</h2>
      <Link to="/login" className='btn'>
        Please login
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
min-height: calc(100vh - 6rem);
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 3rem;
a {
  cursor: pointer;
  color: var(--clr-font);
  background: var(--clr-primary);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
}
`

export default Verify