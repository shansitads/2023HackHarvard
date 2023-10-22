import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds }) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      // Timer has reached 0, do something here
    }
  }, [count]);

  return <div>{count}</div>;
};

export default CountdownTimer;
