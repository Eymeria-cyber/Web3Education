import React, { useEffect, useState, useContext } from 'react'

import { Button } from '@nextui-org/react'
import confetti from 'canvas-confetti'

type LearnButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const LearnButton: React.FC<LearnButtonProps> = ({ children, onClick }) => {
  const handleConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  return (
    <Button
      className="relative rounded-full hover:-translate-y-1 px-12 shadow-xl  after:content-[''] after:absolute after:rounded-full after:inset-0  after:bg-background/40 after:z-[-1] after:transition after:!duration-500  hover:after:scale-150 hover:after:opacity-0
      fixed inset-x-0 bottom-1 flex justify-center"
      color="success"
      variant="solid"
      onPress={() => {
        if (children === '完成课程') {
          handleConfetti()
        }
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
export default LearnButton
