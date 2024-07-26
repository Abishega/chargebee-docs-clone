import React, { useMemo } from 'react'

interface Subsection {
  subTitle: string
  paragraph: string
}

interface Subtopic {
  title: string
  subsections: Subsection[]
}

interface Doc {
  subtopics: Subtopic[]
}

interface SectionPageProps {
  currentSection: string
  data: Doc
  hash: string
}

const SectionPage: React.FC<SectionPageProps> = ({
  currentSection,
  data,
  hash,
}) => {
  const selectedSubtopic = useMemo(
    () =>
      data.subtopics.find(
        (subtopic) => subtopic.title.toLowerCase() === hash
      ) || data.subtopics[0],
    [data.subtopics, hash]
  )

  const getSubTitle = (subsectionTitle: string) =>
    selectedSubtopic.subsections.find(
      (subsection) => subsection.subTitle.toLowerCase() === subsectionTitle
    )?.subTitle || ''

  const createNavLink = (subtopicTitle: string, selected: boolean) =>
    `block p-2 mb-2 rounded-md cursor-pointer ${
      selected ? 'bg-verBlue text-white' : 'text-blue-600 hover:bg-blue-100'
    }`

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 relative">
          {/* Left Sidebar for Desktop */}
          <div className="hidden md:block ml-11rem fixed top-0 left-0 h-screen bg-grayShade p-4 w-64 border-r overflow-y-auto z-0 transition-all duration-800">
            <h2 className="text-xl font-semibold mb-4">Subtopics</h2>
            <ul className="mt-28">
              {data.subtopics.map((subtopic) => (
                <li key={subtopic.title}>
                  <a
                    href={`?hash=${subtopic.title.toLowerCase()}`}
                    className={createNavLink(
                      subtopic.title,
                      selectedSubtopic.title.toLowerCase() ===
                        subtopic.title.toLowerCase()
                    )}
                  >
                    {subtopic.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Content */}
          <div className="w-full p-4 md:ml-64 md:mr-20">
            <nav className="mb-4">
              <p className="text-base text-gray-600">
                <span>Docs</span> &gt;
                <span> {selectedSubtopic.title || 'Select a Subtopic'}</span>
                <span> {getSubTitle(hash)}</span>
              </p>
            </nav>

            {selectedSubtopic && (
              <>
                <h1 className="text-4xl font-bold font-sora mb-4">
                  {selectedSubtopic.title}
                </h1>
                {selectedSubtopic.subsections.map((subsection) => (
                  <div
                    key={subsection.subTitle}
                    id={subsection.subTitle.toLowerCase()}
                    className="scroll-margin mb-5"
                  >
                    <h3 className="mb-3 mt-6 text-3xl font-semibold font-sora">
                      {subsection.subTitle}
                    </h3>
                    <p className="text-base text-gray-700">
                      {subsection.paragraph}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Right Sidebar for Desktop */}
          <div className="hidden md:block fixed mr-40 mt-40 top-16 right-0 bg-grayShade p-4 w-64 border-l overflow-y-auto z-10">
            <h2 className="text-xl font-semibold mb-4">In this Page</h2>
            <ul>
              {selectedSubtopic?.subsections.map((subsection) => (
                <li key={subsection.subTitle}>
                  <a
                    href={`#${subsection.subTitle.toLowerCase()}`}
                    className="cursor-pointer block my-2 text-blue-600 hover:underline"
                  >
                    {subsection.subTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SectionPage
