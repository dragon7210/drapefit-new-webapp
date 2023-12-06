import { useState, useEffect } from 'react';

import Brands from '../components/Brands';
import Top from './Top';
import TakeStyleQuiz from './TakeStyleQuiz';
import HowWorks from './HowWorks';
import FAQs from './FAQs';
import Feedbacks from './Feedbacks';

const Kids = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Top isLoading={isLoading} />
      <TakeStyleQuiz isLoading={isLoading} />
      <HowWorks isLoading={isLoading} />
      <FAQs isLoading={isLoading} />
      <Feedbacks isLoading={isLoading} />
      <Brands isLoading={isLoading} type="kid" />
    </>
  );
};

export default Kids;
