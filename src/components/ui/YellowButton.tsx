import React from 'react'
import { Button } from './button'
import { RightArrow } from './Icons'

const YellowButton = () => {
  return (
      <Button variant="outlineYellow" size="sblg" className="z-30">
      <span className="text-2xl">Request a Quote</span>
      <RightArrow className="hover:text-amber-900" />
      </Button>
  )
}

export default YellowButton