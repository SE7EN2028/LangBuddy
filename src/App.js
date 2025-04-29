import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import QuizSelect from './components/QuizSelect';
import VocabForm from './components/VocabForm';
import VocabLibrary from './components/VocabLibrary';
import Settings from './components/Settings';
import ProgressChart from './components/ProgressChart';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  const [vocabulary, setVocabulary] = useState([

    { id: 1, word: 'Hola', translation: 'Hello', language: 'Spanish', mastered: true },
    { id: 2, word: 'Gracias', translation: 'Thank you', language: 'Spanish', mastered: true },
    { id: 3, word: 'Por favor', translation: 'Please', language: 'Spanish', mastered: false },
    { id: 4, word: 'Adiós', translation: 'Goodbye', language: 'Spanish', mastered: true },
    { id: 5, word: 'Sí', translation: 'Yes', language: 'Spanish', mastered: true },
    { id: 6, word: 'No', translation: 'No', language: 'Spanish', mastered: true },
    { id: 7, word: 'Bueno', translation: 'Good', language: 'Spanish', mastered: false },
    { id: 8, word: 'Malo', translation: 'Bad', language: 'Spanish', mastered: false },
    { id: 9, word: 'Amigo', translation: 'Friend', language: 'Spanish', mastered: true },
    { id: 10, word: 'Agua', translation: 'Water', language: 'Spanish', mastered: false },
    
    { id: 11, word: 'Desarrollador', translation: 'Developer', language: 'Spanish', mastered: false },
    { id: 12, word: 'Desafortunadamente', translation: 'Unfortunately', language: 'Spanish', mastered: false },
    { id: 13, word: 'Imprescindible', translation: 'Essential', language: 'Spanish', mastered: false },
    { id: 14, word: 'Enhorabuena', translation: 'Congratulations', language: 'Spanish', mastered: false },
    { id: 15, word: 'Murciélago', translation: 'Bat', language: 'Spanish', mastered: false },
    
    { id: 16, word: 'Bonjour', translation: 'Hello', language: 'French', mastered: true },
    { id: 17, word: 'Merci', translation: 'Thank you', language: 'French', mastered: true },
    { id: 18, word: 'S\'il vous plaît', translation: 'Please', language: 'French', mastered: false },
    { id: 19, word: 'Au revoir', translation: 'Goodbye', language: 'French', mastered: false },
    { id: 20, word: 'Oui', translation: 'Yes', language: 'French', mastered: true },
    { id: 21, word: 'Non', translation: 'No', language: 'French', mastered: true },
    { id: 22, word: 'Bon', translation: 'Good', language: 'French', mastered: false },
    { id: 23, word: 'Mauvais', translation: 'Bad', language: 'French', mastered: false },
    { id: 24, word: 'Ami', translation: 'Friend', language: 'French', mastered: false },
    { id: 25, word: 'Eau', translation: 'Water', language: 'French', mastered: true },
    
    { id: 26, word: 'Développeur', translation: 'Developer', language: 'French', mastered: false },
    { id: 27, word: 'Malheureusement', translation: 'Unfortunately', language: 'French', mastered: false },
    { id: 28, word: 'Incontournable', translation: 'Essential', language: 'French', mastered: false },
    { id: 29, word: 'Félicitations', translation: 'Congratulations', language: 'French', mastered: false },
    { id: 30, word: 'Chauve-souris', translation: 'Bat', language: 'French', mastered: false },

    { id: 31, word: 'Ciao', translation: 'Hello/Goodbye', language: 'Italian', mastered: true },
    { id: 32, word: 'Grazie', translation: 'Thank you', language: 'Italian', mastered: true },
    { id: 33, word: 'Per favore', translation: 'Please', language: 'Italian', mastered: false },
    { id: 34, word: 'Arrivederci', translation: 'Goodbye', language: 'Italian', mastered: false },
    { id: 35, word: 'Sì', translation: 'Yes', language: 'Italian', mastered: true },
    { id: 36, word: 'No', translation: 'No', language: 'Italian', mastered: true },
    { id: 37, word: 'Buono', translation: 'Good', language: 'Italian', mastered: false },
    { id: 38, word: 'Cattivo', translation: 'Bad', language: 'Italian', mastered: false },
    { id: 39, word: 'Amico', translation: 'Friend', language: 'Italian', mastered: false },
    { id: 40, word: 'Acqua', translation: 'Water', language: 'Italian', mastered: true },
    
    { id: 41, word: 'Sviluppatore', translation: 'Developer', language: 'Italian', mastered: false },
    { id: 42, word: 'Sfortunatamente', translation: 'Unfortunately', language: 'Italian', mastered: false },
    { id: 43, word: 'Indispensabile', translation: 'Essential', language: 'Italian', mastered: false },
    { id: 44, word: 'Congratulazioni', translation: 'Congratulations', language: 'Italian', mastered: false },
    { id: 45, word: 'Pipistrello', translation: 'Bat', language: 'Italian', mastered: false },
    
    { id: 46, word: 'Hallo', translation: 'Hello', language: 'German', mastered: false },
    { id: 47, word: 'Danke', translation: 'Thank you', language: 'German', mastered: false },
    { id: 48, word: 'Bitte', translation: 'Please', language: 'German', mastered: false },
    { id: 49, word: 'Auf Wiedersehen', translation: 'Goodbye', language: 'German', mastered: false },
    { id: 50, word: 'Ja', translation: 'Yes', language: 'German', mastered: true },
    { id: 51, word: 'Nein', translation: 'No', language: 'German', mastered: true },
    { id: 52, word: 'Gut', translation: 'Good', language: 'German', mastered: false },
    { id: 53, word: 'Schlecht', translation: 'Bad', language: 'German', mastered: false },
    { id: 54, word: 'Freund', translation: 'Friend', language: 'German', mastered: false },
    { id: 55, word: 'Wasser', translation: 'Water', language: 'German', mastered: false },
    
    { id: 56, word: 'Entwickler', translation: 'Developer', language: 'German', mastered: false },
    { id: 57, word: 'Bedauerlicherweise', translation: 'Unfortunately', language: 'German', mastered: false },
    { id: 58, word: 'Unentbehrlich', translation: 'Essential', language: 'German', mastered: false },
    { id: 59, word: 'Glückwünsche', translation: 'Congratulations', language: 'German', mastered: false },
    { id: 60, word: 'Fledermaus', translation: 'Bat', language: 'German', mastered: false }
  ]);

  const [progress, setProgress] = useState({
    totalWords: 5,
    mastered: 1,
    quizzesTaken: 3,
    streak: 5,
    lastStudied: new Date().toISOString(),
    history: [
      { date: '2025-04-22', wordsLearned: 2 },
      { date: '2025-04-23', wordsLearned: 1 },
      { date: '2025-04-24', wordsLearned: 0 },
      { date: '2025-04-25', wordsLearned: 1 },
      { date: '2025-04-26', wordsLearned: 1 },
    ]
  });

  const [settings, setSettings] = useState({
    dailyGoal: 5,
    theme: 'light',
    languages: ['Spanish', 'French', 'Italian', 'German'],
    activeLanguage: 'Spanish'
  });

  const addVocab = (newWord) => {
    setVocabulary([...vocabulary, { 
      id: vocabulary.length + 1, 
      ...newWord, 
      mastered: false 
    }]);
    
    setProgress({
      ...progress,
      totalWords: progress.totalWords + 1
    });
  };

  const updateWordMastery = (id, mastered) => {
    const updatedVocabulary = vocabulary.map(word => 
      word.id === id ? {...word, mastered} : word
    );
    
    setVocabulary(updatedVocabulary);
    
    const masteredCount = updatedVocabulary.filter(word => word.mastered).length;
    setProgress({
      ...progress,
      mastered: masteredCount
    });
  };

  const updateProgress = (quizResults) => {
    const newProgress = {
      ...progress,
      quizzesTaken: progress.quizzesTaken + 1,
      streak: progress.streak + 1,
      lastStudied: new Date().toISOString(),
      history: [
        ...progress.history,
        { date: new Date().toISOString().split('T')[0], wordsLearned: quizResults.correct }
      ]
    };
    
    setProgress(newProgress);
  };

  const updateSettings = (newSettings) => {
    setSettings({...settings, ...newSettings});
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>LangBuddy</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/flashcard">Flashcards</Link></li>
              <li><Link to="/quiz-select">Quizzes</Link></li>
              <li><Link to="/progress">Progress</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home progress={progress} settings={settings} vocabulary={vocabulary} />} />
            <Route path="/library" element={<VocabLibrary vocabulary={vocabulary} updateWordMastery={updateWordMastery} />} />
            <Route path="/add" element={<VocabForm addVocab={addVocab} settings={settings} />} />
            <Route path="/flashcard" element={<Flashcard vocabulary={vocabulary} updateWordMastery={updateWordMastery} settings={settings} />} />
            <Route path="/quiz-select" element={<QuizSelect vocabulary={vocabulary} settings={settings} />} />
            <Route path="/quiz" element={<Quiz vocabulary={vocabulary} updateProgress={updateProgress} updateWordMastery={updateWordMastery} settings={settings} />} />
            <Route path="/progress" element={<ProgressDashboard progress={progress} />} />
            <Route path="/progress/chart" element={<ProgressChart progress={progress} />} />
            <Route path="/settings" element={<Settings settings={settings} updateSettings={updateSettings} />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>LangBuddy - Your Language Learning Companion © 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;