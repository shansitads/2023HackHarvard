import React, { useRef, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

function ImageIdentificationGame() {
    const originalImages = useRef([]);
    const displayedImages = useRef([]);
    const isImageNew = useRef(null);
    const isCorrect = useRef(null);
    const gamePhase = useRef(0);
    const score = useRef(0);
    const rounds = useRef(0);

    // Dummy state to force re-render
    const [toggleRender, setToggleRender] = useState(false);
    
    // load the initial 4 images
    useEffect(() => {
        const fetchInitialImages = async () => {
            const imagePromises = Array(4).fill(null).map(() => fetch(faker.image.urlLoremFlickr({ category: 'animals', height: 200,  width: 200 })));
            const imageResponses = await Promise.all(imagePromises);
            const imageUrls = imageResponses.map(imgResp => imgResp.url);
            originalImages.current = imageUrls;
            displayedImages.current = imageUrls;
            gamePhase.current = 0;
            setToggleRender(prev => !prev); // Force a re-render
        };
        fetchInitialImages();
    }, []);
    
    // randomly select whether to display a new image or an old image
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (Math.random() > 0.5) { // load a new image
                const newImageResponse = await fetch(faker.image.urlLoremFlickr({ category: 'animals', height: 200,  width: 200 }));
                const imageUrl = newImageResponse.url;
                isImageNew.current = true;
                displayedImages.current = [imageUrl];
            } else { // use an old image
                const imageUrl = originalImages.current[Math.floor(Math.random() * originalImages.current.length)];
                isImageNew.current = false;
                displayedImages.current = [imageUrl];
            }
            gamePhase.current = 1;
            setToggleRender(prev => !prev); // Force a re-render
        }, 10000);
    
        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = (answer) => {
        // If an image has already been selected, exit early.
        if (isCorrect.current !== null) return;

        if ((answer === 'new' && isImageNew.current) || (answer === 'old' && !isImageNew.current)) {
            isCorrect.current = true;
        } else {
            isCorrect.current = false;
        }
        score.current += 1;
        rounds.current += 1;
        setToggleRender(prev => !prev); // Force a re-render
    };
    

    return (
        <div className="App">
            {gamePhase.current === 0 && <h1>Go through these images</h1>}
            {gamePhase.current === 1 && <h1>Is this image new or old?</h1>}
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
            {gamePhase.current === 1 && (
                <div>
                    <button onClick={() => handleButtonClick('new')}>New</button>
                    <button onClick={() => handleButtonClick('old')}>Old</button>
                </div>
            )}
            {isCorrect.current === true && <p style={{ color: 'green' }}>Correct!</p>}
            {isCorrect.current === false && <p style={{ color: 'red' }}>Incorrect!</p>}
        </div>
    );
    
}

export default ImageIdentificationGame;
