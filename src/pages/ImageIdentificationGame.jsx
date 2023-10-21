import React, { useRef, useEffect, useState } from 'react';

function ImageIdentificationGame() {
    const originalImages = useRef([]);
    const displayedImages = useRef([]);
    const newImage = useRef('');
    const isCorrect = useRef(null);
    const score = useRef(0);
    const rounds = useRef(0);

    // Dummy state to force re-render
    const [toggleRender, setToggleRender] = useState(false);
    
    // load the initial 4 images
    useEffect(() => {
        const fetchInitialImages = async () => {
            const imagePromises = Array(4).fill(null).map(() => fetch('https://picsum.photos/200'));
            const imageResponses = await Promise.all(imagePromises);
            const imageUrls = imageResponses.map(imgResp => imgResp.url);
            originalImages.current = imageUrls;
            displayedImages.current = imageUrls;
            setToggleRender(prev => !prev); // Force a re-render
        };
        fetchInitialImages();
    }, []);
    
    // load the new image and display it shuffled in with 3 of the original images
    useEffect(() => {
        const timer = setTimeout(async () => {
            const newImageResponse = await fetch('https://picsum.photos/200');
            const newImageUrl = newImageResponse.url;
            newImage.current = newImageUrl;
    
            const imagesToDisplay = [
                ...originalImages.current.slice(0, 3),
                newImageUrl
            ];
            displayedImages.current = imagesToDisplay.sort(() => Math.random() - 0.5);
            setToggleRender(prev => !prev); // Force a re-render
        }, 10000);
    
        return () => clearTimeout(timer);
    }, []);
    
    const handleImageClick = (imgSrc) => {
        // If an image has already been selected, exit early.
        if (isCorrect.current !== null) return;
    
        if (imgSrc === newImage.current) {
            isCorrect.current = true;
        } else {
            isCorrect.current = false;
        }
        score.current += 1;
        rounds.current += 1;
        console.log(rounds.current);
        setToggleRender(prev => !prev); // Force a re-render
    };
    

    return (
        <div className="App">
            <h1>Spot the New Image</h1>
            <div className="images-container">
                {displayedImages.current.map((imgSrc, idx) => (
                    <img
                        key={idx}
                        src={imgSrc}
                        alt="Random from Picsum"
                        onClick={() => handleImageClick(imgSrc)}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
            {isCorrect.current === true && <p style={{ color: 'green' }}>Correct!</p>}
            {isCorrect.current === false && <p style={{ color: 'red' }}>Incorrect!</p>}
        </div>
    );
    
}

export default ImageIdentificationGame;
