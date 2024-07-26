import React from 'react'

interface SubtopicsModalProps {
  isOpen: boolean
  onClose: () => void
  subtopics: { title: string }[]
  onSelect: (title: string) => void
}

const SubtopicsModal: React.FC<SubtopicsModalProps> = ({
  isOpen,
  onClose,
  subtopics,
  onSelect,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Subtopics</h2>
        <ul>
          {subtopics.map((subtopic) => (
            <li key={subtopic.title}>
              <a
                href={`#`}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(subtopic.title)
                }}
                className="block p-2 mb-2 rounded-md cursor-pointer text-blue-600 hover:bg-blue-100"
              >
                {subtopic.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SubtopicsModal
