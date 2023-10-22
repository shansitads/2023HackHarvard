import React, { useState, useEffect } from 'react';

// Pairs of images stored in assets
let imagePairs = Array.from({ length: 5 }, (_, i) => {
    return {
        pair: `src/assets/imageDifferenceGame/pair${i + 1}`,
        images: ['image1.png', 'image2.png']
    };
});

function ImageDifferenceGame() {
    const [currentPair, setCurrentPair] = useState(null);
    const [shownImage, setShownImage] = useState(null);
    const [gamePhase, setGamePhase] = useState('loading'); // loading -> displayOne -> displayBoth -> result
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        // phase displayOne: load a pair of similar images and display one of them
        const randomPair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
        const randomImage = randomPair.images[Math.floor(Math.random() * 2)];

        setCurrentPair(randomPair);
        setShownImage(randomImage);

        setGamePhase('displayOne');

        // phase displayBoth: display both images and ask user to select the correct one
        const timer = setTimeout(() => {
            setGamePhase('displayBoth');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleImageClick = (selectedImage) => {
        setGamePhase('result');
        if (selectedImage === shownImage) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    // Shuffled images
    const shuffledImages = [...(currentPair?.images || [])].sort(() => Math.random() - 0.5);

    return (
        <div className="App">
            {gamePhase === 'displayOne' && (
                <>
                    <h1>Remember this image</h1>
                    <img src={`${currentPair.pair}/${shownImage}`} alt="Game image"/>
                </>
            )}

            {(gamePhase === 'displayBoth' || gamePhase === 'result') && (
                <>
                    <h1>Select the image you've just seen</h1>
                    {shuffledImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={`${currentPair.pair}/${img}`}
                            alt="Game image"
                            onClick={() => handleImageClick(img)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </>
            )}

            {(gamePhase === 'result' && isCorrect === true) && <h2 style={{ color: 'green' }}>Correct!</h2>}
            {(gamePhase === 'result' && isCorrect === false) && <h2 style={{ color: 'red' }}>Incorrect!</h2>}
        </div>
    );
}

export default ImageDifferenceGame;
