import React, { ReactElement } from 'react'
import { Route, Switch } from 'wouter'

import CreateLink from 'components/CreateLink'
import Header from 'components/Header'
import LinkList from 'components/LinkList'
import Login from 'components/Login'

function App (): ReactElement {
  return (
    <div className='center w85'>
      <Header />
      <div className='ph3 pv1 background-gray'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/create' component={CreateLink} />
          <Route path='/' component={LinkList} />
        </Switch>
      </div>
    </div>
  )
}

export default App
