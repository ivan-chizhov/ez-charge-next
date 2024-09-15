import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import TopBarContainer from '../components/TopBarContainer'
import TopBarAppHeaderContainer from '../components/TopBarAppHeaderContainer'
import TopBarAppHeaderLogo from '../components/TopBarAppHeaderLogo'
import TopBarAppHeaderText from '../components/TopBarAppHeaderText'
import TopBarFiller from '../components/TopBarFiller'
import TopBarIconButton from '../components/TopBarIconButton'
import AppContainer from '../components/AppContainer'
import Map from '../components/Map'

const BottomBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #fcfcfcb2;
  backdrop-filter: blur(10px);
`

const BottomBarDropdown = styled.select`
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 16px;
  padding: 8px;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 300;
  font-variation-settings: 'opsz' 40;
`

const BottomBarAddressDropdown = styled(BottomBarDropdown)`
  flex: auto;
  max-width: 320px;
`

const BottomBarFloorDropdown = styled(BottomBarDropdown)`
  flex: 0 0 96px;
`

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <BottomBarAddressDropdown value="1000">
        <option value="1000">1000 Harbor Boulevard, Weehawken, NJ</option>
      </BottomBarAddressDropdown>
      <BottomBarFloorDropdown value="1">
        <option value="1">1</option>
        <option value="2">2</option>
      </BottomBarFloorDropdown>
    </BottomBarContainer>
  )
}

const TopBar = () => {
  return (
    <TopBarContainer>
      <TopBarAppHeaderContainer>
        <TopBarAppHeaderLogo className="material-icons">ac_unit</TopBarAppHeaderLogo>
        <TopBarAppHeaderText>EZCharge</TopBarAppHeaderText>
      </TopBarAppHeaderContainer>
      <TopBarFiller />
      <TopBarIconButton type="button" className="material-icons">
        power
      </TopBarIconButton>
      <TopBarIconButton type="button" className="material-icons">
        account_circle
      </TopBarIconButton>
    </TopBarContainer>
  )
}

const MapPage = () => {
  const [svg, setSvg] = useState(null)

  useEffect(async () => {
    const response = await fetch('/map.svg')
    const text = await response.text()
    setSvg(text)
  }, [])

  return (
    <AppContainer>
      <TopBar />
      <Map svg={svg} />
      <BottomBar />
    </AppContainer>
  )
}

export default MapPage
