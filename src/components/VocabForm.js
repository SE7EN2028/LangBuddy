import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VocabForm({ addVocab, settings }) {
  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    language: settings.activeLanguage,
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.word.trim()) {
      newErrors.word = 'Word is required';
    }
    
    if (!formData.translation.trim()) {
      newErrors.translation = 'Translation is required';
    }
    
    if (!formData.language) {
      newErrors.language = 'Language is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      addVocab(formData);
      
      setFormData({
        word: '',
        translation: '',
        language: settings.activeLanguage,
        notes: ''
      });
      
      navigate('/library');
    }
  };
  
  const handleCancel = () => {
    navigate('/library');
  };
  
  return (
    <div className="vocab-form">
      <h2 className="section-title">Add New Vocabulary</h2>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="word">Word:</label>
            <input
              type="text"
              id="word"
              name="word"
              className="form-control"
              value={formData.word}
              onChange={handleChange}
              placeholder="Enter the word"
            />
            {errors.word && <div className="error" style={{color: 'red'}}>{errors.word}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="translation">Translation:</label>
            <input
              type="text"
              id="translation"
              name="translation"
              className="form-control"
              value={formData.translation}
              onChange={handleChange}
              placeholder="Enter the translation"
            />
            {errors.translation && <div className="error" style={{color: 'red'}}>{errors.translation}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              name="language"
              className="form-control"
              value={formData.language}
              onChange={handleChange}
            >
              {settings.languages.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))}
            </select>
            {errors.language && <div className="error" style={{color: 'red'}}>{errors.language}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes (optional):</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes or context"
              rows="3"
            ></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-secondary">Add Word</button>
            <button type="button" className="btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      
      <div className="card">
        <h3>Tips for adding vocabulary</h3>
        <ul style={{ listStylePosition: 'inside', marginTop: '0.5rem' }}>
          <li>Add words that you encounter in daily life</li>
          <li>Include context or examples in the notes</li>
          <li>Focus on high-frequency words first</li>
          <li>Group related words together</li>
        </ul>
      </div>
    </div>
  );
}

export default VocabForm;