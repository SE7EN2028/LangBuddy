import React, { useState, useEffect } from 'react';

function Flashcard({ vocabulary, updateWordMastery, settings }) {
  const [filteredVocabulary, setFilteredVocabulary] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyFilter, setStudyFilter] = useState('learning');
  
  useEffect(() => {
    filterVocabulary(studyFilter);
  }, [vocabulary, settings.activeLanguage, studyFilter]);
  
  const filterVocabulary = (filter) => {
    let filtered = vocabulary.filter(word => word.language === settings.activeLanguage);
    
    if (filter === 'learning') {
      filtered = filtered.filter(word => !word.mastered);
    } else if (filter === 'mastered') {
      filtered = filtered.filter(word => word.mastered);
    }
    
    if (filtered.length === 0) {
      filtered = vocabulary.filter(word => word.language === settings.activeLanguage);
    }
    
    setFilteredVocabulary(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  
  const handleFilterChange = (e) => {
    setStudyFilter(e.target.value);
  };
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < filteredVocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };
  
  const markAsMastered = () => {
    if (filteredVocabulary.length > 0) {
      const currentWord = filteredVocabulary[currentIndex];
      updateWordMastery(currentWord.id, true);
    }
  };
  
  const markAsLearning = () => {
    if (filteredVocabulary.length > 0) {
      const currentWord = filteredVocabulary[currentIndex];
      updateWordMastery(currentWord.id, false);
    }
  };
  
  const shuffleCards = () => {
    const shuffled = [...filteredVocabulary].sort(() => Math.random() - 0.5);
    setFilteredVocabulary(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  
  const currentWord = filteredVocabulary[currentIndex] || { word: "No cards available", translation: "Add some vocabulary first" };
  
  return (
    <div className="flashcard-container">
      <h2 className="section-title">Flashcards</h2>
      
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label htmlFor="studyFilter" style={{ display: 'block', marginBottom: '0.5rem' }}>Study:</label>
            <select
              id="studyFilter"
              className="form-control"
              value={studyFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Words</option>
              <option value="learning">Still Learning</option>
              <option value="mastered">Mastered Words</option>
            </select>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn" onClick={shuffleCards} style={{ width: '100%' }}>
              Shuffle Cards
            </button>
          </div>
        </div>
        
        <div className="flashcard-progress">
          <p>Card {currentIndex + 1} of {filteredVocabulary.length}</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentIndex + 1) / filteredVocabulary.length * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
          onClick={flipCard}
          style={{ height: '200px', margin: '2rem 0' }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <h2>{currentWord.word}</h2>
              <p>{currentWord.language}</p>
            </div>
            <div className="flashcard-back">
              <h2>{currentWord.translation}</h2>
              {currentWord.notes && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{currentWord.notes}</p>}
            </div>
          </div>
        </div>
        
        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Click the card to flip</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          
          {currentWord.mastered ? (
            <button className="btn btn-accent" onClick={markAsLearning}>
              Mark as Learning
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={markAsMastered}>
              Mark as Mastered
            </button>
          )}
          
          <button
            className="btn"
            onClick={handleNext}
            disabled={currentIndex === filteredVocabulary.length - 1}
            style={{ opacity: currentIndex === filteredVocabulary.length - 1 ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>Flashcard Tips</h3>
        <ul style={{ listStylePosition: 'inside', marginTop: '0.5rem' }}>
          <li>Practice a little bit every day</li>
          <li>Try to recall the word before flipping the card</li>
          <li>Use the "Mark as Mastered" button when you know the word well</li>
          <li>Shuffle cards regularly to improve recall</li>
        </ul>
      </div>
    </div>
  );
}

export default Flashcard;