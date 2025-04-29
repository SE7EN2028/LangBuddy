import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VocabLibrary({ vocabulary, updateWordMastery }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('word');
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleMasteryToggle = (id, currentMastery) => {
    updateWordMastery(id, !currentMastery);
  };
  
  const filteredVocabulary = vocabulary.filter(item => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'mastered' && item.mastered) || 
      (filter === 'learning' && !item.mastered) || 
      (filter === item.language);
    
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.translation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const sortedVocabulary = [...filteredVocabulary].sort((a, b) => {
    if (sortBy === 'word') {
      return a.word.localeCompare(b.word);
    } else if (sortBy === 'translation') {
      return a.translation.localeCompare(b.translation);
    } else if (sortBy === 'language') {
      return a.language.localeCompare(b.language);
    }
    return 0;
  });
  
  const languageOptions = [...new Set(vocabulary.map(item => item.language))];
  
  return (
    <div className="vocab-library">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="section-title">Vocabulary Library</h2>
        <Link to="/add" className="btn btn-secondary">+ Add New Word</Link>
      </div>
      
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ flex: '1 1 30%', minWidth: '200px' }}>
            <label htmlFor="filter" style={{ display: 'block', marginBottom: '0.5rem' }}>Filter:</label>
            <select 
              id="filter" 
              className="form-control"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All Words</option>
              <option value="mastered">Mastered</option>
              <option value="learning">Still Learning</option>
              {languageOptions.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div style={{ flex: '1 1 30%', minWidth: '200px' }}>
            <label htmlFor="sort" style={{ display: 'block', marginBottom: '0.5rem' }}>Sort By:</label>
            <select 
              id="sort" 
              className="form-control"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="word">Word</option>
              <option value="translation">Translation</option>
              <option value="language">Language</option>
            </select>
          </div>
          
          <div style={{ flex: '1 1 30%', minWidth: '200px' }}>
            <label htmlFor="search" style={{ display: 'block', marginBottom: '0.5rem' }}>Search:</label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search words or translations"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {sortedVocabulary.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No vocabulary words found. Try changing your filters or add some new words!</p>
          </div>
        ) : (
          <div className="vocab-list">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Word</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Translation</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Language</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedVocabulary.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.75rem' }}>{item.word}</td>
                    <td style={{ padding: '0.75rem' }}>{item.translation}</td>
                    <td style={{ padding: '0.75rem' }}>{item.language}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <button
                        className={`btn ${item.mastered ? 'btn-secondary' : 'btn-accent'}`}
                        style={{ padding: '0.3rem 0.75rem' }}
                        onClick={() => handleMasteryToggle(item.id, item.mastered)}
                      >
                        {item.mastered ? 'Mastered' : 'Learning'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="stats-section" style={{ marginTop: '1.5rem' }}>
        <h3>Library Stats</h3>
        <div className="stats-grid" style={{ marginTop: '1rem' }}>
          <div className="card stat-card">
            <div className="stat-value">{vocabulary.length}</div>
            <div className="stat-label">Total Words</div>
          </div>
          
          <div className="card stat-card">
            <div className="stat-value">{vocabulary.filter(word => word.mastered).length}</div>
            <div className="stat-label">Mastered Words</div>
          </div>
          
          <div className="card stat-card">
            <div className="stat-value">{languageOptions.length}</div>
            <div className="stat-label">Languages</div>
          </div>
          
          <div className="card stat-card">
            <div className="stat-value">{vocabulary.filter(word => !word.mastered).length}</div>
            <div className="stat-label">Words to Learn</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabLibrary;