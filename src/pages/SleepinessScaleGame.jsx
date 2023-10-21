import React, { useState } from 'react';

function SleepinessScale() {
  const [selectedScale, setSelectedScale] = useState(null);

  const handleButtonClick = (scale) => {
    setSelectedScale(scale);
  };

  return (
    <div>
      <h1>Sleepiness Scale</h1>
      <p>Select your sleepiness scale:</p>
      <div>
        {[1, 2, 3, 4, 5].map((scale) => (
          <button
            key={scale}
            onClick={() => handleButtonClick(scale)}
            style={{
              marginRight: '10px',
              backgroundColor: selectedScale === scale ? 'blue' : 'gray',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {scale}
          </button>
        ))}
      </div>
      {selectedScale && (
        <p>You selected sleepiness scale {selectedScale}.</p>
      )}
    </div>
  );
}

export default SleepinessScale;
