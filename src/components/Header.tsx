import React, { ReactElement, useEffect, useState } from 'react'
import { del, get } from 'idb-keyval'
import { Link, useLocation } from 'wouter'

import { AUTH_TOKEN } from '../constants'

function Header (): ReactElement {
  const [, setLocation] = useLocation()
  const [authToken, setAuthToken] = useState()

  useEffect(() => {
    setAuthToken(get(AUTH_TOKEN))
  }, [])

  return (
    <div className='flex pa1 justify-between nowrap orange'>
      <div className='flex flex-fixed black'>
        <div className='fw7 mr1'>Hacker News</div>
        <Link href='/'>
          <span className='ml1 no-underline black'>new</span>
        </Link>
        {authToken && (
          <div className='flex'>
            <div className='ml1'>|</div>
            <Link to='/create'>
              <span className='ml1 no-underline black'>submit</span>
            </Link>
          </div>
        )}
      </div>
      <div className='flex flex-fixed'>
          {authToken ? (
            <div
              className='ml1 pointer black'
              onClick={async () => {
                await del(AUTH_TOKEN)
                setAuthToken(null)
                setLocation('/')
              }}
            >
              logout
          </div>
          ) : (
              <Link to='/login'>
                <span className='ml1 no-underline black'>login</span>
              </Link>
            )}
        </div>
    </div>
  )
}

export default Header
