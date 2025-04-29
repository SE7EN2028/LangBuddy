import React from 'react';

function ProgressChart({ progress }) {
  if (!progress || !progress.history || progress.history.length === 0) {
    return (
      <div className="progress-chart">
        <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Learning Progress</h3>
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          No learning history available yet. Start learning to see your progress!
        </div>
      </div>
    );
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  const maxWords = Math.max(...progress.history.map(day => day.wordsLearned)) || 1;
  const recentHistory = progress.history.slice(-7);
  
  return (
    <div className="progress-chart card">
      <h3 style={{ color: 'var(--text-color)', marginBottom: '1.5rem', fontWeight: '600' }}>Words Learned Per Day</h3>
      
      <div style={{ height: '250px', marginBottom: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          height: '200px', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          padding: '0 5px',
          backgroundColor: 'var(--card-lighter)',
          borderRadius: '8px',
          position: 'relative'
        }}>
          {recentHistory.map((day, index) => {
            const height = (day.wordsLearned / maxWords) * 100;
            return (
              <div 
                key={index} 
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: `${100 / recentHistory.length - 3}%`,
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    height: `${height}%`,
                    width: '100%',
                    background: 'linear-gradient(to top, var(--primary-color), var(--primary-light))',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '5px',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    position: 'absolute',
                    top: '-25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--primary-light)',
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                  }} className="bar-tooltip">
                    {day.wordsLearned} words
                  </div>
                </div>
                <div style={{ 
                  marginTop: '8px', 
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'left center',
                  whiteSpace: 'nowrap'
                }}>
                  {formatDate(day.date)}
                </div>
              </div>
            );
          })}
          
          <div style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            right: 0, 
            bottom: 0, 
            pointerEvents: 'none' 
          }}>
            <div style={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              bottom: '75%', 
              borderBottom: '1px dashed rgba(99, 102, 241, 0.2)' 
            }}></div>
            <div style={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              bottom: '50%', 
              borderBottom: '1px dashed rgba(99, 102, 241, 0.2)' 
            }}></div>
            <div style={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              bottom: '25%', 
              borderBottom: '1px dashed rgba(99, 102, 241, 0.2)' 
            }}></div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .progress-chart .bar-tooltip {
            opacity: 0;
          }
          .progress-chart [style*="height"] {
            transition: height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .progress-chart [style*="height"]:hover .bar-tooltip {
            opacity: 1;
          }
        `}
      </style>
      
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: '600' }}>Statistics</h4>
        <ul style={{ listStylePosition: 'inside', color: 'var(--text-color)' }}>
          <li>
            Best day: 
            <span style={{ color: 'var(--primary-light)', fontWeight: '500', marginLeft: '0.5rem' }}>
              {progress.history.reduce((max, day) => 
                day.wordsLearned > max.wordsLearned ? day : max, 
                { wordsLearned: 0 }
              ).wordsLearned} words
            </span>
          </li>
          <li>
            Average: 
            <span style={{ color: 'var(--primary-light)', fontWeight: '500', marginLeft: '0.5rem' }}>
              {(progress.history.reduce((sum, day) => 
                sum + day.wordsLearned, 0) / progress.history.length).toFixed(1)} words per day
            </span>
          </li>
          <li>
            Total days tracked: 
            <span style={{ color: 'var(--primary-light)', fontWeight: '500', marginLeft: '0.5rem' }}>
              {progress.history.length}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProgressChart;