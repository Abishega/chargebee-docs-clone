import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import InteractionHandler from '../InteractionHandler'
import SubtopicsModal from './../SubTopicModal'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('./../SubTopicModal', () => {
  return jest.fn(({ isOpen, onClose, subtopics, onSelect }: any) =>
    isOpen ? (
      <div data-testid="subtopics-modal">
        <button onClick={onClose}>Close</button>
        {subtopics.map((subtopic: { title: string }, index: number) => (
          <button key={index} onClick={() => onSelect(subtopic.title)}>
            {subtopic.title}
          </button>
        ))}
      </div>
    ) : null
  )
})

describe('InteractionHandler', () => {
  const mockData = [{ title: 'Overview' }, { title: 'Details' }]
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    render(
      <InteractionHandler data={mockData}>
        <div>Child Component</div>
      </InteractionHandler>
    )

    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })

  test('opens and closes the modal', () => {
    render(
      <InteractionHandler data={mockData}>
        <div>Child Component</div>
      </InteractionHandler>
    )

    const openButton = screen.getByRole('button', {
      name: /Open Subtopics Menu/i,
    })
    fireEvent.click(openButton)

    expect(screen.getByTestId('subtopics-modal')).toBeInTheDocument()

    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)

    expect(screen.queryByTestId('subtopics-modal')).not.toBeInTheDocument()
  })

  test('selects a subtopic and updates the URL', () => {
    render(
      <InteractionHandler data={mockData}>
        <div>Child Component</div>
      </InteractionHandler>
    )

    const openButton = screen.getByRole('button', {
      name: /Open Subtopics Menu/i,
    })
    fireEvent.click(openButton)

    const subtopicButton = screen.getByText('Overview')
    fireEvent.click(subtopicButton)

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('?hash=overview')
    )
    expect(screen.queryByTestId('subtopics-modal')).not.toBeInTheDocument()
  })
})
