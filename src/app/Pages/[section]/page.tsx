import SectionPage from '../../Components/SectionPage';

const Section = ({ params }) => {
  const { section } = params;
 

  return <SectionPage currentSection={section} />;
};

export default Section;
