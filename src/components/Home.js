import React from 'react';
import { usePaper } from '../context/PaperContext';
import Header from './Header';
import Hero from './Hero';
import PaperSelector from './PaperSelector';
import QuestionTypes from './QuestionTypes';
import ExamStructure from './ExamStructure';
import Stats from './Stats';
import Footer from './Footer';

const Home = () => {
  const { selectedPaper } = usePaper();

  return (
    <div className="home">
      <Header />
      <Hero />
      <PaperSelector />
      <QuestionTypes />
      <ExamStructure selectedPaper={selectedPaper} />
      <Stats />
      <Footer />
    </div>
  );
};

export default Home;
