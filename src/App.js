import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";

async function fetchQuiz(id) {
  const resp = await fetch(
    `http://192.168.0.15:3030/api/quizes/${id}/questions`
  );
  const data = await resp.json();
  return data;
}

function App() {
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  useEffect(() => {
    const id = 1;
    fetchQuiz(id).then(setQuiz);
  }, []);
  const handleAnswerSelected = useCallback(
    (ev) => {
      console.log(ev);
      const { name, value } = ev.target;
      setSelectedAnswers((oldData) => ({ ...oldData, [name]: Number(value)}));
    },
    [setSelectedAnswers]
  );
  const handleCheckAnswers = useCallback(
    (ev) => {
      console.log(quiz, selectedAnswers)
      const allCorrect = quiz.every((question) => question.correct_answer_index === selectedAnswers[question.id])
      alert(allCorrect ? 'You win!' : 'Something is incorrect')
    },
    [quiz, selectedAnswers]
  );

  console.log(selectedAnswers)
  return (
    <div className="App">
      <header className="App-header">
        <h1> Hi! </h1>
        <ul>
          {quiz.map((question) => (
            <div key={question.id}>
              <h2>{question.question_text}</h2>
              {question.answers.map((answer, idx) => (
                <div key={idx}>
                  <label>
                    <input
                      checked={ idx === selectedAnswers[question.id]} 
                      onChange={handleAnswerSelected}
                      type="radio"
                      value={idx}
                      name={question.id}
                    />
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </ul>
        <button onClick={handleCheckAnswers}>Submit</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
