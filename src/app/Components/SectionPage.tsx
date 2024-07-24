'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DummyData from '../DummyData.json'; // Adjust path if needed

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
  subtopics: {
    title: string;
    subsections: Subsection[];
  }[];
};

interface SectionPageProps {
  currentSection: string;
}

const SectionPage: React.FC<SectionPageProps> = ({ currentSection }) => {
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash') || 'overview'; // Default to 'overview' if no hash is present

  // Find the relevant section data
  const data: Doc | undefined = DummyData.find(
    (doc) => doc.section === currentSection
  );

  // Initialize state for selected subtopic
  const [selectedSubtopic, setSelectedSubtopic] = useState(
    data?.subtopics.find((subtopic) => subtopic.title.toLowerCase() === hash) ||
    data?.subtopics[0]
  );

  // Update selected subtopic when hash changes
  useEffect(() => {
    const updatedSubtopic = data?.subtopics.find(
      (subtopic) => subtopic.title.toLowerCase() === hash
    );
    setSelectedSubtopic(updatedSubtopic || data?.subtopics[0]);
  }, [hash, data]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <div className="fixed mt-16 top-16 left-0 bg-gray-100 p-4 w-64 border-r border-gray-300 overflow-y-auto z-10">
          <h2 className="text-xl font-semibold mb-4">Subtopics</h2>
          <ul>
            {data.subtopics.map((subtopic) => (
              <li key={subtopic.title}>
                <a
                  href={`?hash=${subtopic.title.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSubtopic(subtopic);
                  }}
                  className={`block p-2 mb-2 rounded-md cursor-pointer ${selectedSubtopic?.title.toLowerCase() === subtopic.title.toLowerCase() ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
                >
                  {subtopic.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Content */}
        <div className="ml-64 mr-64 w-full p-4">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4">
            <p className="text-base text-gray-600">
              <span>Docs</span> &gt; 
              <span> {selectedSubtopic?.title || 'Select a Subtopic'}</span> &gt;
              <span> {selectedSubtopic?.subsections.find(subsection => subsection.subTitle.toLowerCase() === hash)?.subTitle || 'Select a Subsection'}</span>
            </p>
          </nav>

          {selectedSubtopic && (
            <>
              <h1 className="text-4xl font-bold font-sora mb-4">{selectedSubtopic.title}</h1>
              {selectedSubtopic.subsections.map((subsection) => (
                <div
                  key={subsection.subTitle}
                  id={subsection.subTitle.toLowerCase()}
                  className="mb-5"
                >
                  <h3 className='mb-3 mt-6 text-3xl font-semibold font-sora'>{subsection.subTitle}</h3>
                  <p className='text-base text-gray-700'>{subsection.paragraph}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="fixed mt-16 top-16 right-0 bg-gray-100 p-4 w-64 border-l border-gray-300 overflow-y-auto z-10">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
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
  );
};

export default SectionPage;
