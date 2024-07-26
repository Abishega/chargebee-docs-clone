import React, { useMemo } from 'react'
import SectionPage from '../SectionPage'
import InteractionHandler from '../../Components/InteractionHandler'
import DummyData from '../../DummyData.json'

type Subsection = {
  subTitle: string
  paragraph: string
}

type Subtopic = {
  title: string
  subsections: Subsection[]
}

type Doc = {
  section: string
  subtopics: Subtopic[]
}

const getSectionData = async (section: string): Promise<Doc | null> => {
  return DummyData.find((doc: Doc) => doc.section === section) || null
}

const Section = async ({
  params,
  searchParams,
}: {
  params: { section: string }
  searchParams: { hash?: string }
}) => {
  const { section } = params
  const hash = searchParams.hash?.toLowerCase() || 'overview'

  const data = await getSectionData(section)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return (
    <InteractionHandler data={data.subtopics}>
      <SectionPage currentSection={section} data={data} hash={hash} />
    </InteractionHandler>
  )
}

export default Section
