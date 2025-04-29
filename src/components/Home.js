import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ progress, settings, vocabulary }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const calculatePercentComplete = () => {
    if (progress.totalWords === 0) return 0;
    return Math.round((progress.mastered / progress.totalWords) * 100);
  };
  
  const percentComplete = calculatePercentComplete();
  const todaysDate = new Date().toLocaleDateString();
  const activeLanguage = settings.activeLanguage;
  const wordsInActiveLanguage = vocabulary.filter(word => word.language === activeLanguage).length;
  
  const [vocabFilter, setVocabFilter] = useState('all');
  const [vocabSearch, setVocabSearch] = useState('');
  
  const filteredVocabulary = vocabulary.filter(item => {
    const matchesFilter = 
      vocabFilter === 'all' || 
      (vocabFilter === 'mastered' && item.mastered) || 
      (vocabFilter === 'learning' && !item.mastered) || 
      (vocabFilter === item.language);
    
    const matchesSearch = 
      item.word.toLowerCase().includes(vocabSearch.toLowerCase()) || 
      item.translation.toLowerCase().includes(vocabSearch.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const [quizLoading, setQuizLoading] = useState(false);
  const generateQuickQuiz = () => {
    setQuizLoading(true);
    setTimeout(() => {
      setQuizLoading(false);
    }, 1000);
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="section-title">Dashboard</h2>
        
        <div className="dashboard-tabs" style={{ 
          display: 'flex', 
          background: 'var(--darker-bg)',
          borderRadius: '9999px',
          padding: '0.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: activeTab === 'overview' ? 'var(--primary-color)' : 'transparent',
              border: 'none',
              borderRadius: '9999px',
              color: 'var(--text-color)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('vocabulary')} 
            className={`tab-button ${activeTab === 'vocabulary' ? 'active' : ''}`}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: activeTab === 'vocabulary' ? 'var(--primary-color)' : 'transparent',
              border: 'none',
              borderRadius: '9999px',
              color: 'var(--text-color)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Vocabulary
          </button>
          <button 
            onClick={() => setActiveTab('progress')} 
            className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: activeTab === 'progress' ? 'var(--primary-color)' : 'transparent',
              border: 'none',
              borderRadius: '9999px',
              color: 'var(--text-color)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Progress
          </button>
          <button 
            onClick={() => setActiveTab('quiz')} 
            className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: activeTab === 'quiz' ? 'var(--primary-color)' : 'transparent',
              border: 'none',
              borderRadius: '9999px',
              color: 'var(--text-color)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            Quick Quiz
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="dashboard-overview">
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="card stat-card">
              <div className="stat-value">{progress.totalWords}</div>
              <div className="stat-label">Total Words</div>
            </div>
            
            <div className="card stat-card">
              <div className="stat-value">{progress.mastered}</div>
              <div className="stat-label">Words Mastered</div>
            </div>
            
            <div className="card stat-card">
              <div className="stat-value">{percentComplete}%</div>
              <div className="stat-label">Complete</div>
            </div>
            
            <div className="card stat-card">
              <div className="stat-value">{progress.streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
          
          <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card">
              <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Welcome back!</h3>
              <p style={{ color: 'var(--text-color)' }}>Today is {todaysDate}. Keep up your <span style={{ color: 'var(--primary-light)', fontWeight: '600' }}>{progress.streak}</span> day streak!</p>
              
              <div className="progress-section">
                <h4 style={{ color: 'var(--text-color)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Your Progress</h4>
                <p style={{ color: 'var(--text-color)' }}>Daily Goal: <span style={{ color: 'var(--primary-light)', fontWeight: '600' }}>{progress.mastered}</span>/{settings.dailyGoal} words mastered</p>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${Math.min(100, (progress.mastered / settings.dailyGoal) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="button-group" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/flashcard" className="btn">Practice Flashcards</Link>
                <Link to="/quiz-select" className="btn btn-secondary">Take a Quiz</Link>
              </div>
            </div>
            
            <div className="card">
              <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Recent Activity</h3>
              <ul style={{ listStylePosition: 'inside', marginTop: '0.5rem', color: 'var(--text-color)' }}>
                {progress.history.slice(-5).reverse().map((entry, index) => (
                  <li key={index} style={{ marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{new Date(entry.date).toLocaleDateString()}</span>: 
                    Learned <span style={{ color: 'var(--primary-light)', fontWeight: '500' }}>{entry.wordsLearned}</span> new words
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Active Language: {activeLanguage}</h3>
            <p style={{ color: 'var(--text-color)' }}>You have <span style={{ color: 'var(--primary-light)', fontWeight: '600' }}>{wordsInActiveLanguage}</span> words in your {activeLanguage} vocabulary.</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <div style={{ color: 'var(--text-color)' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '1.5rem' }}>
                    {vocabulary.filter(word => word.language === activeLanguage && word.mastered).length}
                  </span> words mastered
                </div>
                <div>
                  <span style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '1.5rem' }}>
                    {vocabulary.filter(word => word.language === activeLanguage && !word.mastered).length}
                  </span> words still learning
                </div>
              </div>
              
              <Link to="/add" className="btn btn-accent" style={{ alignSelf: 'flex-end' }}>Add New Words</Link>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'vocabulary' && (
        <div className="dashboard-vocabulary">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-color)', fontWeight: '600' }}>Vocabulary Library</h3>
              <Link to="/add" className="btn btn-secondary">+ Add New Word</Link>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ flex: '1 1 30%', minWidth: '200px' }}>
                <select 
                  className="form-control"
                  value={vocabFilter}
                  onChange={(e) => setVocabFilter(e.target.value)}
                >
                  <option value="all">All Words</option>
                  <option value="mastered">Mastered</option>
                  <option value="learning">Still Learning</option>
                  {settings.languages.map((lang, index) => (
                    <option key={index} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ flex: '1 1 60%', minWidth: '200px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search words or translations"
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                />
              </div>
            </div>
            
            {filteredVocabulary.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-color)' }}>
                <p>No vocabulary words found. Try changing your filters or add some new words!</p>
              </div>
            ) : (
              <div className="vocab-table" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(99, 102, 241, 0.2)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Word</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Translation</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Language</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--text-color)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVocabulary.slice(0, 6).map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <td style={{ padding: '0.75rem', color: 'var(--text-color)' }}>{item.word}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-color)' }}>{item.translation}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-color)' }}>{item.language}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '9999px',
                              backgroundColor: item.mastered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                              color: item.mastered ? 'var(--secondary-color)' : 'var(--accent-color)',
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            {item.mastered ? 'Mastered' : 'Learning'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {filteredVocabulary.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link to="/library" className="btn">View All {filteredVocabulary.length} Words</Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'progress' && (
        <div className="dashboard-progress">
          <div className="card">
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1.5rem', fontWeight: '600' }}>Learning Progress</h3>
            
            <div className="progress-overview" style={{ marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-color)', marginBottom: '1rem' }}>
                You've mastered <strong style={{ color: 'var(--primary-light)' }}>{progress.mastered}</strong> out of 
                <strong style={{ color: 'var(--primary-light)' }}> {progress.totalWords}</strong> words.
              </p>
              
              <div className="progress-bar" style={{ margin: '1rem 0', height: '1rem' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
              
              <p style={{ color: 'var(--text-color)', textAlign: 'center' }}>
                <strong style={{ color: 'var(--primary-light)', fontSize: '1.25rem' }}>{percentComplete}%</strong> complete
              </p>
            </div>
            
            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
              <div className="mini-stat" style={{ 
                backgroundColor: 'var(--card-lighter)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Quizzes Taken</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '1.5rem', fontWeight: '600' }}>{progress.quizzesTaken}</div>
              </div>
              
              <div className="mini-stat" style={{ 
                backgroundColor: 'var(--card-lighter)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day Streak</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '1.5rem', fontWeight: '600' }}>{progress.streak}</div>
              </div>
              
              <div className="mini-stat" style={{ 
                backgroundColor: 'var(--card-lighter)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Learning Rate</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '1.5rem', fontWeight: '600' }}>
                  {progress.history.length < 2 ? "N/A" : 
                    (progress.history.reduce((sum, day) => sum + day.wordsLearned, 0) / progress.history.length).toFixed(1)}
                </div>
              </div>
              
              <div className="mini-stat" style={{ 
                backgroundColor: 'var(--card-lighter)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Last Studied</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '1.5rem', fontWeight: '600' }}>
                  {new Date(progress.lastStudied).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Words Learned Per Day</h4>
            
            <div style={{ 
              backgroundColor: 'var(--card-lighter)', 
              borderRadius: 'var(--border-radius)', 
              height: '200px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.5rem'
            }}>
              {progress.history.slice(-7).map((day, index) => (
                <div 
                  key={index} 
                  style={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div style={{ 
                    width: '100%', 
                    background: `linear-gradient(to top, var(--primary-color), var(--primary-light))`,
                    borderRadius: '4px 4px 0 0',
                    height: `${(day.wordsLearned / 10) * 100}%`,
                    minHeight: '10px',
                    maxHeight: '100%'
                  }}></div>
                  <div style={{ 
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    marginTop: '0.5rem',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'center center',
                    whiteSpace: 'nowrap'
                  }}>
                    {new Date(day.date).toLocaleDateString().split('/').slice(0, 2).join('/')}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/progress" className="btn">View Detailed Progress</Link>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'quiz' && (
        <div className="dashboard-quiz">
          <div className="card">
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1.5rem', fontWeight: '600' }}>Quick Quiz</h3>
            
            <div style={{ color: 'var(--text-color)', marginBottom: '2rem' }}>
              <p>Test your knowledge with a quick quiz of 5 questions in your active language: <strong>{activeLanguage}</strong></p>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--card-lighter)', 
              borderRadius: 'var(--border-radius)', 
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Quiz Options</h4>
              
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                <div style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius)',
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  cursor: 'pointer'
                }}>
                  <h5 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }}>Word to Translation</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    See the word, choose the correct translation
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius)',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}>
                  <h5 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Translation to Word</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    See the translation, choose the correct word
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius)',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}>
                  <h5 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Mixed</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    A combination of both question types
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              {quizLoading ? (
                <button className="btn btn-secondary" disabled style={{ opacity: 0.7 }}>
                  Generating Quiz...
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={generateQuickQuiz}>
                  Start Quick Quiz
                </button>
              )}
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/quiz-select" className="btn">Customize Full Quiz</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;