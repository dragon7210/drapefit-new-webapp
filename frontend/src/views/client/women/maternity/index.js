import { useState, useEffect } from 'react';

import Brands from '../../components/Brands';
import Top from './Top';
import TakeStyleQuiz from './TakeStyleQuiz';
import HowWorks from './HowWorks';
import FAQs from './FAQs';
import ReadMore from './ReadMore';
import StyleFit from './StyleFit';

const Maternity = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Top isLoading={isLoading} />
      <TakeStyleQuiz isLoading={isLoading} />
      <HowWorks isLoading={isLoading} />
      <StyleFit isLoading={isLoading} />
      <FAQs isLoading={isLoading} />
      <ReadMore isLoading={isLoading} />
      <Brands isLoading={isLoading} />
    </>
  );
};

export default Maternity;
