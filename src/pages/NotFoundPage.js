import React from 'react'
import AppContainer from '../components/AppContainer'
import WelcomeBanner from '../components/WelcomeBanner'
import FormContainer from '../components/FormContainer'
import VerticalForm from '../components/VerticalForm'
import FormHeader from '../components/FormHeader'
import FooterLink from '../components/FooterLink'
import styled from '@emotion/styled'

const CenterMessage = styled(FormHeader)`
  text-align: center;
`

const NotFoundPage = () => {
  return (
    <AppContainer>
      <WelcomeBanner />
      <FormContainer>
        <VerticalForm>
          <CenterMessage>Page not found 👀</CenterMessage>
          <FooterLink to="/">Home</FooterLink>
        </VerticalForm>
      </FormContainer>
    </AppContainer>
  )
}

export default NotFoundPage
