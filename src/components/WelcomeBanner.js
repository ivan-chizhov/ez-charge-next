import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'wouter'

const WelcomePanel = styled.div`
  background-color: #ffffff;
  margin-top: 24px;
  min-height: 80px;
  border-top: 1px solid #f2f2f2;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.063);
  display: flex;
  align-items: center;
  justify-content: center;
`

const WelcomeText = styled(Link)`
  font-size: 24px;
  color: #666666;
  font-weight: 300;
  display: flex;
  align-items: center;
  text-decoration: none;
`

const GlyphLogo = styled.div`
  font-size: 40px;
  color: #000000;
`

const Accent = styled.div`
  color: #e02d1f;
  font-weight: 400;
`

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background-color: #e5e5e5;
  margin: 0 16px;
`

const WelcomeBanner = () => (
  <WelcomePanel>
    <WelcomeText to="/">
      <GlyphLogo className="material-icons">ac_unit</GlyphLogo>
      <Accent>UWU</Accent>
      <Divider />
      EZCharge
    </WelcomeText>
  </WelcomePanel>
)

export default WelcomeBanner
