import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizSelect({ vocabulary, settings }) {
  const [quizType, setQuizType] = useState('translation');
  const [quizLength, setQuizLength] = useState(5);
  const [quizLanguage, setQuizLanguage] = useState(settings.activeLanguage);
  const [availableWords, setAvailableWords] = useState(0);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const count = vocabulary.filter(word => word.language === quizLanguage).length;
    setAvailableWords(count);
  }, [vocabulary, quizLanguage]);
  
  const handleQuizTypeChange = (e) => {
    setQuizType(e.target.value);
  };
  
  const handleQuizLengthChange = (e) => {
    setQuizLength(parseInt(e.target.value));
  };
  
  const handleLanguageChange = (e) => {
    setQuizLanguage(e.target.value);
  };
  
  const handleStartQuiz = () => {
    const quizConfig = {
      type: quizType,
      length: quizLength,
      language: quizLanguage
    };
    
    // In a real app, we would pass this data via state management or URL params
    // For now, we'll just use localStorage for simplicity
    localStorage.setItem('quizConfig', JSON.stringify(quizConfig));
    navigate('/quiz');
  };
  
  return (
    <div className="quiz-select">
      <h2 className="section-title">Create a Quiz</h2>
      
      <div className="card">
        <h3>Quiz Setup</h3>
        
        <div className="form-group">
          <label htmlFor="quizType">Quiz Type:</label>
          <select
            id="quizType"
            className="form-control"
            value={quizType}
            onChange={handleQuizTypeChange}
          >
            <option value="translation">Word to Translation</option>
            <option value="word">Translation to Word</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="quizLanguage">Language:</label>
          <select
            id="quizLanguage"
            className="form-control"
            value={quizLanguage}
            onChange={handleLanguageChange}
          >
            {settings.languages.map((lang, index) => (
              <option key={index} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="quizLength">Number of Questions:</label>
          <select
            id="quizLength"
            className="form-control"
            value={quizLength}
            onChange={handleQuizLengthChange}
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>
        
        {availableWords < quizLength ? (
          <div className="alert" style={{ 
            backgroundColor: 'rgba(231, 76, 60, 0.1)', 
            color: '#e74c3c', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginTop: '1rem' 
          }}>
            <p>You only have {availableWords} words in {quizLanguage}. Add more words or reduce the quiz length.</p>
          </div>
        ) : (
          <button 
            className="btn btn-secondary" 
            onClick={handleStartQuiz}
            style={{ marginTop: '1.5rem' }}
          >
            Start Quiz
          </button>
        )}
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>Quiz Types Explained</h3>
        
        <div style={{ marginTop: '1rem' }}>
          <h4>Word to Translation</h4>
          <p>You'll be shown a word in {quizLanguage} and need to select the correct translation.</p>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <h4>Translation to Word</h4>
          <p>You'll be shown a translation and need to select the correct word in {quizLanguage}.</p>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <h4>Mixed</h4>
          <p>A combination of both types for a more challenging quiz.</p>
        </div>
      </div>
    </div>
  );
}

export default QuizSelect;