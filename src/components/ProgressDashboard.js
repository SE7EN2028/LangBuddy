import React from 'react';
import { Link } from 'react-router-dom';
import ProgressChart from './ProgressChart';

function ProgressDashboard({ progress }) {
  const calculatePercentComplete = () => {
    if (progress.totalWords === 0) return 0;
    return Math.round((progress.mastered / progress.totalWords) * 100);
  };
  
  const percentComplete = calculatePercentComplete();
  
  const calculateLearningRate = () => {
    if (progress.history.length < 2) return "Not enough data";
    
    const wordsLearned = progress.history.reduce((sum, day) => sum + day.wordsLearned, 0);
    const daysStudied = progress.history.length;
    
    return (wordsLearned / daysStudied).toFixed(1) + " words/day";
  };
  
  const learningRate = calculateLearningRate();
  const lastStudiedDate = new Date(progress.lastStudied).toLocaleDateString();
  
  return (
    <div className="progress-dashboard">
      <h2 className="section-title">Progress Dashboard</h2>
      
      <div className="card">
        <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Overall Progress</h3>
        <div className="progress-overview" style={{ marginTop: '1rem' }}>
          <p style={{ color: 'var(--text-color)' }}>
            You've mastered <strong style={{ color: 'var(--primary-light)' }}>{progress.mastered}</strong> out of 
            <strong style={{ color: 'var(--primary-light)' }}> {progress.totalWords}</strong> words.
          </p>
          
          <div className="progress-bar" style={{ margin: '1.5rem 0' }}>
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
          
          <p style={{ color: 'var(--text-color)', textAlign: 'center' }}>
            <strong style={{ color: 'var(--primary-light)', fontSize: '1.25rem' }}>{percentComplete}%</strong> complete
          </p>
        </div>
      </div>
      
      <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
        <div className="card stat-card">
          <div className="stat-value">{progress.quizzesTaken}</div>
          <div className="stat-label">Quizzes Taken</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-value">{progress.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-value">{learningRate}</div>
          <div className="stat-label">Learning Rate</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-value">{lastStudiedDate}</div>
          <div className="stat-label">Last Studied</div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <ProgressChart progress={progress} />
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Progress Tips</h3>
        <ul style={{ 
          listStylePosition: 'inside', 
          marginTop: '0.5rem',
          color: 'var(--text-color)'
        }}>
          <li>Consistency is key - try to study a little bit every day</li>
          <li>Review words you've mastered periodically to keep them fresh</li>
          <li>Mix up your learning with flashcards and quizzes</li>
          <li>Set realistic daily goals to maintain motivation</li>
        </ul>
      </div>
    </div>
  );
}

export default ProgressDashboard;