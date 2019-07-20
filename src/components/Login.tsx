import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { set } from 'idb-keyval'
import { useLocation } from 'wouter'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../constants'

interface Form {
  name: string
  email: string
  password: string
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

function Login (): ReactElement {
  const [, setLocation] = useLocation()
  const [login, setLogin] = useState(true)
  const [inputs, setInputsData] = useState<Form>({
    name: '',
    email: '',
    password: ''
  })

  const confirm = async (data: any): Promise<void> => {
    const { token } = login ? data.login : data.signup
    await set(AUTH_TOKEN, token)
    setLocation('/')
  }

  const [doLogin] = useMutation(
    login ? LOGIN_MUTATION : SIGNUP_MUTATION,
    {
      onCompleted: (data) => confirm(data),
      variables: { ...inputs }
    }
  )

  const handleInputOnChange = (name: string) => {
    return (e: ChangeEvent<HTMLInputElement>): void => {
      e.persist()

      setInputsData((inputs): Form => ({
        ...inputs,
        [name]: e.target.value
      }))
    }
  }

  const toggleLoginSignup = (): void => setLogin(!login)

  const dispatchMutation = (): void => {
    if (Object.values(inputs)) {
      doLogin()
    }
  }

  return (
    <div>
      <h4 className='mv3'>{login ? 'Login' : 'Sign Up'}</h4>
      <div className='flex flex-column'>
        {!login && (
          <input
            value={inputs.name}
            onChange={handleInputOnChange('name')}
            type='text'
            placeholder='Your name'
          />
        )}
        <input
          value={inputs.email}
          onChange={handleInputOnChange('email')}
          type='text'
          placeholder='Your email address'
        />
        <input
          value={inputs.password}
          onChange={handleInputOnChange('password')}
          type='password'
          placeholder='Choose a safe password'
        />
      </div>
      <div className='flex mt3'>
        <div className='pointer mr2 button' onClick={dispatchMutation}>
          {login ? 'login' : 'create account'}
        </div>
        <div
          className='pointer button'
          onClick={toggleLoginSignup}
        >
          {login
            ? 'need to create an account?'
            : 'already have an account?'}
        </div>
      </div>
    </div>
  )
}

export default Login
