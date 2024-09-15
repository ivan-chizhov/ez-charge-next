import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const MapContainer = styled.div`
  height: 100%;
  text-align: center;
  margin-top: 56px;
`

class Map extends Component {
  constructor(props) {
    super(props)
    this.svgContainerRef = createRef()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.svg !== prevProps.svg) {
      this.attachEventListeners()
      this.updateSlots()
    } else if (this.props.statuses !== prevProps.statuses) {
      this.updateSlots()
    }
  }

  attachEventListeners() {
    const svg = this.svgContainerRef.current && this.svgContainerRef.current.querySelector('svg')
    if (svg) {
      const children = svg.querySelectorAll('*')

      const slotElements = {}
      const padElements = {}
      for (let child of children) {
        if (child.id) {
          const match = child.id.match(/^slot-([0-9]+)/)
          if (match) {
            const slot = match[1]
            if (slotElements[slot]) {
              slotElements[slot].push(child)
            } else {
              slotElements[slot] = [child]
            }

            if (child.id.endsWith('-pad')) {
              padElements[slot] = child
            }
          }
        }
      }

      const svgSlots = Object.keys(slotElements).sort()
      for (let svgSlot of svgSlots) {
        const elements = slotElements[svgSlot]
        for (let element of elements) {
          element.style.cursor = 'pointer'
          // element.addEventListener('click', () => this.onSlotClick())
        }
      }

      this.svgSlots = svgSlots
      this.padElements = padElements
    } else {
      this.padElements = null
    }
  }

  updateSlots() {
    const statuses = this.props.statuses || {}
    const padElements = this.padElements
    if (padElements) {
      for (let slot in padElements) {
        const padElement = padElements[slot]
        switch (statuses[slot]) {
          case 'AVAILABLE':
            padElement.style.fill = '#78b2c9'
            padElement.style.stroke = '#007fff'
            break

          default:
            padElement.style.fill = '#d3d3d3'
            padElement.style.stroke = '#666666'
        }
      }
    }
  }

  render() {
    return <MapContainer ref={this.svgContainerRef} dangerouslySetInnerHTML={{ __html: this.props.svg }} />
  }
}

Map.propTypes = {
  svg: PropTypes.string,
  statuses: PropTypes.object,
}

export default Map
