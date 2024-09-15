import React from 'react'
import styled from '@emotion/styled'

const FormContainerComponent = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`

const FormContainerSpaceBefore = styled.div`
  flex: 2;
`

const FormContainerSpaceAfter = styled.div`
  flex: 3;
  min-height: 8px;
`

const FormContainer = ({ children }) => (
  <FormContainerComponent>
    <FormContainerSpaceBefore />
    {children}
    <FormContainerSpaceAfter />
  </FormContainerComponent>
)

export default FormContainer
