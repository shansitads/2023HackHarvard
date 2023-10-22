import React, { useRef, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

function ImageIdentificationGame() {
    const maxAttempts = 3;
    const uniqueImages = useRef([]);
    const originalImages = useRef([]);
    const displayedImages = useRef([]);
    const isImageNew = useRef(null);
    const isCorrect = useRef(null);
    const [gamePhase, setGamePhase] = useState('loading'); // loading ->review -> select -> result
    const rounds = useRef(0);
    const [attempt, setAttempt] = useState(1);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (attempt <= maxAttempts) {
            playGame();
        } else {
            setGamePhase("done")
            console.log(`Final Score: ${score} out of ${attempt-1} = ${score/(attempt-1)}`);
        }
    }, [attempt]);

    const playGame = async () => {
        // Loading the 5 unique images initially
        setGamePhase('loading');
        const uniqueImageUrls = new Set(); // Use a Set to store unique URLs

        // Keep fetching images until we have 5 unique ones
        while (uniqueImageUrls.size < 5) {
            const response = await fetch(faker.image.urlLoremFlickr({ category: 'animals', height: 200, width: 200 }));
            uniqueImageUrls.add(response.url);
        }

        const imageUrlsArray = [...uniqueImageUrls]; // Convert the Set back to an Array
        uniqueImages.current = imageUrlsArray;
         // display only the first 4 images, the 5th is the new image we'll use later
        originalImages.current = imageUrlsArray.slice(0,4);
        displayedImages.current = imageUrlsArray.slice(0,4);
        setGamePhase('review');

        const timer = setTimeout(async () => {
            selectImage();
        }, 5000);

        return () => clearTimeout(timer);
    };

    // randomly select whether to display a new image or an old image
    const selectImage = async () => {
        if (Math.random() > 0.5) { // load a new image
            const imageUrl = uniqueImages.current[4];
            isImageNew.current = true;
            displayedImages.current = [imageUrl];
        } else { // use an old image
            const imageUrl = originalImages.current[Math.floor(Math.random() * originalImages.current.length)];
            isImageNew.current = false;
            displayedImages.current = [imageUrl];
        }
        
        setGamePhase('select'); // Force a re-render
    }
    
    const handleButtonClick = (answer) => {
        if ((answer === 'new' && isImageNew.current) || (answer === 'old' && !isImageNew.current)) {
            isCorrect.current = true;
            setScore(score + 1);
        } else {
            isCorrect.current = false;
        }
        setGamePhase('result');
    };


    const handleNextClick = () => {
        isImageNew.current = null;
        isCorrect.current = null;
        setAttempt(attempt + 1);
    };
    

    return (
        <div className="App">
            {gamePhase === 'review' && <h1>Go through these images</h1>}
            {(gamePhase === 'select' ||  gamePhase === 'result') && <h1>Is this image new or old?</h1>}
            <div className="images-container">
                {displayedImages.current.map((imgSrc, idx) => (
                    <img
                        key={idx}
                        src={imgSrc}
                        alt="Random animal images"
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
            {gamePhase === 'select' && (
                <div>
                    <button onClick={() => handleButtonClick('new')}>New</button>
                    <button onClick={() => handleButtonClick('old')}>Old</button>
                </div>
            )}
            {gamePhase === 'result' && (
                <>
                    {isCorrect.current ? (
                        <h2 style={{ color: 'green' }}>Correct!</h2>
                    ) : (
                        <h2 style={{ color: 'red' }}>Incorrect!</h2>
                    )}
                    {attempt < maxAttempts && <button onClick={handleNextClick}>Next</button>}
                    {attempt == maxAttempts && <button onClick={handleNextClick}>Done</button>}
                </>
            )}
        </div>
    );
    
}

export default ImageIdentificationGame;
