import React, { useEffect, useState } from "react";
import "./Quiz.css";
import data from "../assets/data";

const Quiz = () => {
  // State management for the quiz
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [timer, setTimer] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);

  // Effect to handle the countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          nextQuestion();
          return 10;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [index]);

  // Effect to update the question when index changes
  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  // Function to proceed to the next question
  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex((prev) => prev + 1);
      setTimer(10);
      setIsLocked(false);
      const options = document.querySelectorAll("li");
      options.forEach((option) => {
        option.classList.remove("correct-ans", "wrong-ans");
      });
    } else {
      setIsGameOver(true);
    }
  };

  // Function to handle answer selection and scoring
  const checkAnswer = (e, answer) => {
    if (!isLocked) {
      if (question.answer === answer) {
        e.target.classList.add("correct-ans");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong-ans");
      }
      const nextInterval = setInterval(() => {
        nextQuestion();
        clearInterval(nextInterval);
      }, 2000);
      setIsLocked(true);
    }
  };

  // Render the quiz or game over screen based on the state
  if (isGameOver) {
    return (
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        <div>You scored {score} out of {data.length}.</div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="heading">
          <h1>Quiz App</h1>
          <h2>{timer}</h2>
        </div>
        <hr />
        <h2>
          {index + 1}. {question.question}
        </h2>
        <ul>
          {question.options.map((option, idx) => (
            <li onClick={(e) => checkAnswer(e, option)} key={idx}>
              {option}
            </li>
          ))}
        </ul>
        <button onClick={nextQuestion}>Next</button>
        <div className="index">
          {index + 1} out of {data.length} questions
        </div>
      </div>
    );
  }
};

export default Quiz;
