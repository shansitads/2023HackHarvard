import React, { useState, useEffect } from 'react';
import { setDoc } from 'firebase/firestore' 

// Pairs of images stored in assets
let imagePairs = Array.from({ length: 5 }, (_, i) => {
    return {
        pair: `src/assets/imageDifferenceGame/pair${i + 1}`,
        images: ['image1.png', 'image2.png']
    };
});

function ImageDifferenceGame({ dataRef }) {
    const maxAttempts = 5;
    const [currentPair, setCurrentPair] = useState(null);
    const [shownImage, setShownImage] = useState(null);
    const [gamePhase, setGamePhase] = useState('loading'); // loading -> displayOne -> displayBoth -> result
    const [isCorrect, setIsCorrect] = useState(null);
    const [attempt, setAttempt] = useState(1);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (attempt <= maxAttempts) {
            loadNewImagePair();
        } else {
            console.log(`Final Score: ${score} out of ${maxAttempts}`);
            const calcScore = score / maxAttempts;
            setDoc(dataRef.current, { ImageDifference : calcScore }, { merge: true });
        }
    }, [attempt]);

    const loadNewImagePair = () => {
        // phase displayOne: load a pair of similar images and display one of them
        const randomPair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
        const randomImage = randomPair.images[Math.floor(Math.random() * 2)];

        setCurrentPair(randomPair);
        setShownImage(randomImage);
        setGamePhase('displayOne');
        setIsCorrect(null);

        // phase displayBoth: display both images and ask user to select the correct one
        const timer = setTimeout(() => {
            setGamePhase('displayBoth');
        }, 5000);

        return () => clearTimeout(timer);
    }

    // Shuffled images
    const shuffledImages = [...(currentPair?.images || [])].sort(() => Math.random() - 0.5);

    const handleImageClick = (selectedImage) => {
        setGamePhase('result');
        if (selectedImage === shownImage) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextClick = () => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setAttempt(attempt + 1);
    };

    return (
      <div className="App">
        {gamePhase === "displayOne" && (
          <>
            <h1>Remember this image</h1>
            <div>
            <img
              src={`${currentPair.pair}/${shownImage}`}
              alt="Game image"
              height={300}
              />
              </div>
          </>
        )}

        {(gamePhase === "displayBoth" || gamePhase === "result") && (
          <>
            <h1>Select the image you've just seen</h1>
            {shuffledImages.map((img, idx) => (
              <img
                key={idx}
                src={`${currentPair.pair}/${img}`}
                alt="Game image"
                onClick={() => handleImageClick(img)}
                style={{ cursor: "pointer" }}
                height={300}
              />
            ))}
          </>
        )}

        {gamePhase === "result" && (
          <>
            {isCorrect ? (
              <h2 style={{ color: "green" }}>Correct!</h2>
            ) : (
              <h2 style={{ color: "red" }}>Incorrect!</h2>
            )}
            {attempt < maxAttempts && (
              <button onClick={handleNextClick}>Next</button>
            )}
            {attempt == maxAttempts && (
              <button onClick={handleNextClick}>Done</button>
            )}
          </>
        )}
      </div>
    );
}

export default ImageDifferenceGame;
