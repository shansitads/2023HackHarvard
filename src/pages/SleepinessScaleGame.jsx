import React, { useState } from 'react';
import { setDoc } from 'firebase/firestore' ;

function SleepinessScale({dataRef, toggleSleepy}) {
  const [selectedScale, setSelectedScale] = useState(null);

  const handleButtonClick = (scale) => {
    setSelectedScale(scale);
    const sleepiness = (scale-1) / 4;
    setDoc(dataRef.current, { Sleepiness : sleepiness }, { merge: true });
    toggleSleepy();
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
