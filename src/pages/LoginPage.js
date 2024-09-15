import React, { useCallback, useEffect, useState } from 'react'
import AppContainer from '../components/AppContainer'
import WelcomeBanner from '../components/WelcomeBanner'
import FormContainer from '../components/FormContainer'
import VerticalForm from '../components/VerticalForm'
import FormHeader from '../components/FormHeader'
import FormGroup from '../components/FormGroup'
import Label from '../components/Label'
import TextInput from '../components/TextInput'
import SubmitButton from '../components/SubmitButton'
import FooterLink from '../components/FooterLink'
import useAuthStore from '../stores/useAuthStore'
import ErrorStripe from '../components/ErrorStripe'

const LoginPage = () => {
  const { error, clearError, login } = useAuthStore()

  const [gpn, setGpn] = useState('')
  const [password, setPassword] = useState('')

  const handleGpnChange = useCallback((event) => {
    setGpn(event.target.value)
  }, [])

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      clearError()

      login({ gpn, password }).then(() => {})
    },
    [login, gpn, password]
  )

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [])

  return (
    <AppContainer>
      <WelcomeBanner />
      <FormContainer>
        <VerticalForm onSubmit={handleSubmit}>
          <FormHeader>Login</FormHeader>
          <FormGroup>
            <Label htmlFor="gpn">GPN</Label>
            <TextInput type="number" id="gpn" name="gpn" value={gpn} onChange={handleGpnChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <TextInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FormGroup>
          {error && <ErrorStripe>{error}</ErrorStripe>}
          <SubmitButton type="submit">Login</SubmitButton>
          <FooterLink to="/sign-up">Sign up</FooterLink>
          <FooterLink to="/password-reset">Forgot your password?</FooterLink>
        </VerticalForm>
      </FormContainer>
    </AppContainer>
  )
}

export default LoginPage
