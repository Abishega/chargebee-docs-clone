import { notFound } from 'next/navigation';
import SectionPage from '../../Components/SectionPage';
import DummyData from '../../DummyData.json'; // Adjust path if needed

// Type definitions
type Subsection = {
  subTitle: string;
  paragraph: string;
};

type Subtopic = {
  title: string;
  subsections: Subsection[];
};

type Doc = {
  section: string;
  subtopics: Subtopic[];
};

// Fetch data based on params
async function getSectionData(section: string): Promise<Doc | null> {
  return DummyData.find((doc: Doc) => doc.section === section) || null;
}

// This function replaces getStaticPaths
export async function generateStaticParams() {
  const sections = DummyData.map((doc: Doc) => doc.section);
  return sections.map((section) => ({
    section
  }));
}

const Section = async ({ params, searchParams }: { params: { section: string }, searchParams: { hash?: string } }) => {
  const { section } = params;
  const hash = searchParams.hash?.toLowerCase() || 'overview';
  const data = await getSectionData(section);

  if (!data) {
    notFound();
  }

  return <SectionPage currentSection={section} data={data} hash={hash} />;
};

export default Section;
