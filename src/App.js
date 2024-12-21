import './App.css';
import Container from './Container.js';
import axios from 'axios';
import React, { useState,useEffect } from 'react'

const App = () => {
  const [training, setTraining] = useState([]);
  const [competition, setCompetition] = useState([]);

  useEffect(() => {
    const getTrainingData = async () => {
      try {
        const response_1 = await axios.get('https://homework2-d5sm.onrender.com/api/Training');
        setTraining(response_1.data);
      } catch (error) {
        console.error('Error fetching training data: ', error);
      }
    };
    getTrainingData();
  }, []);

  useEffect(() => {
    const getCompetitionData = async () => {
      try {
        const response_2 = await axios.get('https://homework2-d5sm.onrender.com/api/Compotition');
        setCompetition(response_2.data);
      } catch (error) {
        console.error('Error fetching competition data: ', error);
      }
    };
    getCompetitionData();
  }, []);

  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="app-container">
        <TrainingList listTraining={training}/>
        <CompetitionList listCompetition={competition} />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <h1 className="logo">
        <a href="/">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798162/logo_tlwv1g.png" alt="LOGO" />
        </a>
        <span className="logo-text">GURYONGPO FS</span>
        <a href="https://www.instagram.com/9ryongpo_official/" target="_blank" rel="noreferrer">
          <img src="https://res.cloudinary.com/dod3qcnxx/image/upload/v1734798160/instagram_logo_rzbpl3.png" alt="insta_LOGO" style={{ width: '48px', height: '48px', marginLeft: '50px' }} />
        </a>
      </h1>
    </>
  );
};

const TrainingList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className='training'>
      <h2 className="training-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>훈련</h2>
      {isExpanded&&(
        props.listTraining.map(training => (
          <Container key={training.id} aurl={training.aurl} date={training.date} name={training.name} additionalContent={training.additionalContent} />
        ))
      )}
    </div>
  );
};

const CompetitionList = (props) => {
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className='competition'>
      <h2 className="competition-title" onClick={toggleTitle} style={{ cursor: 'pointer' }}>대회</h2>
      {isExpanded&&(
        props.listCompetition.map(competition => (
          <Container key={competition.id} aurl={competition.aurl} date={competition.date} name={competition.name} additionalContent={competition.additionalContent} />
        ))
      )}
    </div>
  );
};

export default App;