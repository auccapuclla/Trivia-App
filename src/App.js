import { useEffect, useState } from "react";
import { useTrivias } from "./utils/getTrivias";
import './App.css'

const Choices = ({ correctAnswer, incorrectAnswers, handleNext }) => {
  const checkHandle = (answer) => {
    console.log(answer);

    if (answer === correctAnswer) {
      handleNext(true);
      return;
    }

    handleNext(false);
  };

  const options = [correctAnswer, ...incorrectAnswers].sort(
    () => Math.random() - 0.5
  );

  return (
    <ul className="options">
      {options.map((option, id) => (
        <li className="option"> <button className="button_option" key={id} onClick={() => checkHandle(option)}>
          {option}
        </button>
        </li>
      ))}
    </ul>
  );
};

const Trivia = ({ play, setPlay, fetchTrivias, trivias: defaultTrivias }) => {
  const [trivias, setTrivias] = useState([]);
  const [corrects, setCorrects] = useState(0);
  const [resume, setResume] = useState(true);
  
  const handleNext = (isCorrect) => {
    if (isCorrect) setCorrects((prev) => prev + 1);
    const newTrivias = [...trivias];
    newTrivias.shift();
    setTrivias(newTrivias);
  };
  const handleResumeClick = () => {
    setResume(!resume);
  };
  const handleReloadClick = () => {
    fetchTrivias();
  };
  useEffect(() => {
    setTrivias(defaultTrivias);
    setCorrects(0);
  }, [defaultTrivias]);
  const handleNewGame = () => setPlay(!play)
  if (play) {
    if (trivias.length) {
      const { correct_answer, incorrect_answers } = trivias[0];
      const question = trivias[0].question;
      return (
        <>
          <button onClick={handleResumeClick} className="button">{resume ? "Pause" : "Resume"}</button>
          <button onClick={handleReloadClick} className="button">Reload game</button> 
          {resume?
            <>
              <div>{question}</div>
              <Choices
                correctAnswer={correct_answer}
                incorrectAnswers={incorrect_answers}
                handleNext={handleNext}
              /> 
            </>:
            null
          }
        </>
      );
    }
    if (corrects) {
      return (
        <>
          <button onClick={handleNewGame} className="button">Start New</button>
          <h1>Game over</h1>
          <h2>
            You have scored {corrects} out of {defaultTrivias.length} trivias
          </h2>
        </>
      );
    }
    return null;
  }
  return null;
};

const App = () => {
  const [play, setPlay] = useState(false);
  const [trivias, fetchTrivias] = useTrivias();  
  
  const handleStartGame = () => {
    fetchTrivias();
    setPlay(!play);
  };
  return (
    <div>
      <h1> Try your best on this Trivia Challenge </h1>
      { !play ? 
        <button onClick={handleStartGame} className="button">Start</button> :  
        <Trivia play={play} setPlay={setPlay} trivias={trivias} fetchTrivias={fetchTrivias} />
      }
    </div>
  );
};
export default App;
