import React, { ReactElement } from 'react'
import { Link } from 'wouter'

function Header (): ReactElement {
  return (
    <div className='flex pa1 justify-between nowrap orange'>
      <div className='flex flex-fixed black'>
        <div className='fw7 mr1'>Hacker News</div>
        <Link href='/'>
          <span className='ml1 no-underline black'>new</span>
        </Link>
        <div className='ml1'>|</div>
        <Link href='/create'>
          <span className='ml1 no-underline black'>submit</span>
        </Link>
      </div>
    </div>
  )
}

export default Header
