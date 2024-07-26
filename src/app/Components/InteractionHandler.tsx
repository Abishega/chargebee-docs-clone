'use client'
import React, { useState, useEffect } from 'react'
import SubtopicsModal from './SubTopicModal'
import { useRouter } from 'next/navigation'
import { GiHamburgerMenu } from 'react-icons/gi'

interface InteractionHandlerProps {
  children: React.ReactNode
  data: { title: string }[]
}

const InteractionHandler: React.FC<InteractionHandlerProps> = ({
  children,
  data,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSelectSubtopic = (title: string) => {
    setIsModalOpen(false)
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('hash', title.toLowerCase())
    router.push(`${window.location.pathname}?${queryParams.toString()}`)
  }

  if (!isClient) return null

  return (
    <>
      <div className="md:hidden fixed  z-20 bg-verBlue right-4 top-20">
        <button onClick={handleOpenModal} className="p-4 text-white rounded-md">
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
      </div>
      <SubtopicsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subtopics={data}
        onSelect={handleSelectSubtopic}
      />
      {children}
    </>
  )
}

export default InteractionHandler
