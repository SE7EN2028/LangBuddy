import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz({ vocabulary, updateProgress, updateWordMastery, settings }) {
  const [quizConfig, setQuizConfig] = useState({
    type: 'translation',
    length: 5,
    language: settings.activeLanguage
  });
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizResults, setQuizResults] = useState({
    correct: 0,
    incorrect: 0,
    completed: false,
    answers: []
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedConfig = localStorage.getItem('quizConfig');
    if (savedConfig) {
      setQuizConfig(JSON.parse(savedConfig));
    }
  }, []);
  
  useEffect(() => {
    if (quizConfig) {
      generateQuestions();
    }
  }, [quizConfig, vocabulary]);
  
  const generateQuestions = () => {
    const { type, length, language } = quizConfig;
    
    const languageVocabulary = vocabulary.filter(word => word.language === language);
    
    if (languageVocabulary.length < length) {
      return; 
    }
    
    const shuffledVocab = [...languageVocabulary].sort(() => Math.random() - 0.5);
    
    const selectedVocab = shuffledVocab.slice(0, length);
    
    const generatedQuestions = selectedVocab.map((word, index) => {
      const questionType = type === 'mixed' 
        ? Math.random() > 0.5 ? 'translation' : 'word'
        : type;
      
      const incorrectOptions = generateIncorrectOptions(
        word,
        questionType === 'translation' ? 'translation' : 'word',
        languageVocabulary
      );
      
      const correctAnswer = questionType === 'translation' ? word.translation : word.word;
      const allOptions = [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);
      
      return {
        id: index,
        wordId: word.id,
        questionType,
        prompt: questionType === 'translation' ? word.word : word.translation,
        correctAnswer,
        options: allOptions
      };
    });
    
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizResults({
      correct: 0,
      incorrect: 0,
      completed: false,
      answers: []
    });
  };
  
  const generateIncorrectOptions = (correctWord, field, allWords) => {
    const possibleOptions = allWords
      .filter(word => word.id !== correctWord.id)
      .map(word => word[field]);
    
    const uniqueOptions = [...new Set(possibleOptions)];
    
    return uniqueOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, uniqueOptions.length));
  };
  
  const handleSelectAnswer = (answer) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answer);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const updatedResults = {
      ...quizResults,
      correct: isCorrect ? quizResults.correct + 1 : quizResults.correct,
      incorrect: !isCorrect ? quizResults.incorrect + 1 : quizResults.incorrect,
      answers: [
        ...quizResults.answers,
        {
          questionId: currentQuestion.id,
          wordId: currentQuestion.wordId,
          isCorrect
        }
      ]
    };
    
    setQuizResults(updatedResults);
    setShowAnswer(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      completeQuiz();
    }
  };
  
  const completeQuiz = () => {
    const finalResults = {
      ...quizResults,
      completed: true
    };
    setQuizResults(finalResults);
    
    finalResults.answers.forEach(answer => {
      if (answer.isCorrect) {
        const word = vocabulary.find(w => w.id === answer.wordId);
        
        if (word && !word.mastered) {
          updateWordMastery(word.id, true);
        }
      }
    });
    
    updateProgress(finalResults);
  };
  
  const handleRestartQuiz = () => {
    generateQuestions();
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  if (questions.length === 0) {
    return (
      <div className="quiz-loading">
        <h2 className="section-title">Loading Quiz...</h2>
        <p>If this takes too long, please go back and try again.</p>
        <button className="btn" onClick={() => navigate('/quiz-select')}>
          Back to Quiz Setup
        </button>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  if (quizResults.completed) {
    const scorePercentage = Math.round((quizResults.correct / questions.length) * 100);
    
    return (
      <div className="quiz-results">
        <h2 className="section-title">Quiz Results</h2>
        
        <div className="card">
          <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem' }}>Your Score: {scorePercentage}%</h3>
          <div className="progress-bar" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <div 
              className="progress-bar-fill" 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{quizResults.correct}</div>
              <div className="stat-label">Correct</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{quizResults.incorrect}</div>
              <div className="stat-label">Incorrect</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleRestartQuiz}>
              Take Another Quiz
            </button>
            <button className="btn" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="quiz">
      <h2 className="section-title">Quiz</h2>
      
      <div className="card">
        <div className="quiz-progress">
          <p style={{ color: 'var(--text-color)' }}>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="quiz-question" style={{ marginTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-color)' }}>{currentQuestion.questionType === 'translation' 
            ? `What does "${currentQuestion.prompt}" mean?` 
            : `How do you say "${currentQuestion.prompt}"?`}
          </h3>
          
          <div className="quiz-options" style={{ marginTop: '1.5rem' }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option ${selectedAnswer === option ? 'selected' : ''} ${
                  showAnswer && option === currentQuestion.correctAnswer ? 'correct' : ''
                } ${
                  showAnswer && selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleSelectAnswer(option)}
                style={{ color: 'var(--text-color)' }}
              >
                {option}
              </button>
            ))}
          </div>
          
          {!showAnswer ? (
            <button 
              className="btn btn-secondary" 
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              style={{ 
                marginTop: '1.5rem',
                opacity: !selectedAnswer ? 0.5 : 1
              }}
            >
              Check Answer
            </button>
          ) : (
            <div>
              <p style={{ 
                marginTop: '1.5rem', 
                color: selectedAnswer === currentQuestion.correctAnswer ? '#2ecc71' : '#e74c3c',
                fontWeight: 'bold'
              }}>
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? 'Correct!' 
                  : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
              </p>
              <button 
                className="btn" 
                onClick={handleNextQuestion}
                style={{ marginTop: '1rem' }}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;