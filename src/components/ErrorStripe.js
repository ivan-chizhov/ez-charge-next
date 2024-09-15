import React from 'react'
import styled from '@emotion/styled'

const ErrorStripeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px;
  background-color: #e02d1f;
  border-radius: 4px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`

const ErrorStripe = ({ children }) => (
  <ErrorStripeContainer>
    <div className="material-icons">error</div>
    {children}
  </ErrorStripeContainer>
)

export default ErrorStripe
