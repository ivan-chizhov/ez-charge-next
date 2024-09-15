import React from 'react'
import styled from '@emotion/styled'
import { Route, Switch } from 'wouter'
import LoginPage from './pages/LoginPage'
import useAuthStore from './stores/useAuthStore'
import NotFoundPage from './pages/NotFoundPage'
import MapPage from './pages/MapPage'

const App = () => {
  const { isLoggedIn } = useAuthStore()

  return isLoggedIn ? (
    <Switch>
      <Route path="/">{() => <MapPage />}</Route>
      <Route>{() => <NotFoundPage />}</Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/">{() => <LoginPage />}</Route>
      <Route>{() => <NotFoundPage />}</Route>
    </Switch>
  )
}

export default App
