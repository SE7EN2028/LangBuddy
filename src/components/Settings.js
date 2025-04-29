import React, { useState } from 'react';

function Settings({ settings, updateSettings }) {
  const [formData, setFormData] = useState({
    dailyGoal: settings.dailyGoal,
    theme: settings.theme,
    activeLanguage: settings.activeLanguage
  });
  
  const [newLanguage, setNewLanguage] = useState('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleNewLanguageChange = (e) => {
    setNewLanguage(e.target.value);
  };
  
  const handleAddLanguage = () => {
    if (newLanguage && !settings.languages.includes(newLanguage)) {
      const updatedLanguages = [...settings.languages, newLanguage];
      updateSettings({ languages: updatedLanguages });
      setNewLanguage('');
    }
  };
  
  const handleRemoveLanguage = (languageToRemove) => {
    
    if (languageToRemove === formData.activeLanguage) {
      return;
    }
    
    const updatedLanguages = settings.languages.filter(lang => lang !== languageToRemove);
    updateSettings({ languages: updatedLanguages });
  };
  
  const handleSaveSettings = () => {
    updateSettings(formData);
    setShowSavedMessage(true);

    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };
  
  return (
    <div className="settings">
      <h2 className="section-title">Settings</h2>
      
      <div className="card">
        <h3>App Settings</h3>
        
        <div className="form-group">
          <label htmlFor="dailyGoal">Daily Goal (words):</label>
          <input
            type="number"
            id="dailyGoal"
            name="dailyGoal"
            className="form-control"
            value={formData.dailyGoal}
            onChange={handleChange}
            min="1"
            max="50"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            name="theme"
            className="form-control"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="activeLanguage">Active Language:</label>
          <select
            id="activeLanguage"
            name="activeLanguage"
            className="form-control"
            value={formData.activeLanguage}
            onChange={handleChange}
          >
            {settings.languages.map((language, index) => (
              <option key={index} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <button 
          className="btn btn-secondary" 
          onClick={handleSaveSettings}
          style={{ marginTop: '1rem' }}
        >
          Save Settings
        </button>
        
        {showSavedMessage && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.5rem', 
            backgroundColor: 'rgba(46, 204, 113, 0.1)', 
            color: '#2ecc71',
            borderRadius: '4px' 
          }}>
            Settings saved successfully!
          </div>
        )}
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>Manage Languages</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4>Current Languages:</h4>
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '0.5rem' }}>
            {settings.languages.map((language, index) => (
              <li key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #eee' 
              }}>
                {language}
                {language !== formData.activeLanguage && (
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleRemoveLanguage(language)}
                    style={{ padding: '0.2rem 0.5rem' }}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4>Add New Language:</h4>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              value={newLanguage}
              onChange={handleNewLanguageChange}
              placeholder="Enter new language"
              style={{ flex: 1 }}
            />
            <button 
              className="btn" 
              onClick={handleAddLanguage}
              disabled={!newLanguage.trim()}
              style={{ opacity: !newLanguage.trim() ? 0.5 : 1 }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>About LangBuddy</h3>
        <p style={{ marginTop: '0.5rem' }}>LangBuddy is your personal language learning companion. Track your progress, practice with flashcards, test your knowledge with quizzes, and build your vocabulary library.</p>
        <p style={{ marginTop: '0.5rem' }}>Version 1.0</p>
      </div>
    </div>
  );
}

export default Settings;