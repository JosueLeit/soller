import React from 'react'
import { Button } from './button'
import { RightArrow } from './Icons'

const PurpleButton = () => {
  return (
      <Button variant="outlinePurple" size="sblg" className="z-30">
      <span className="text-2xl">Request a Quote</span>
      <RightArrow className="hover:text-amber-300"/>
      </Button>
  )
}

export default PurpleButton