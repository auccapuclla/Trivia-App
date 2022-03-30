import { useEffect, useState } from "react";
import { useTrivias } from "./utils/getTrivias";

const Choices = ({ correctAnswer, incorrectAnswers, handleNext }) => {
  const checkHandle = (answer) => {
    console.log(answer);

    if (answer === correctAnswer) {
      handleNext(true);
      return;
    }

    handleNext(false);
    console.log("false");
  };

  const options = [correctAnswer, ...incorrectAnswers].sort(
    () => Math.random() - 0.5
  );

  return (
    <>
      {options.map((option, id) => (
        <button key={id} onClick={() => checkHandle(option)}>
          {option}
        </button>
      ))}
    </>
  );
};

const Trivia = ({ play, trivias: defaultTrivias }) => {
  const [trivias, setTrivias] = useState([]);
  const [corrects, setCorrects] = useState(0);

  const handleNext = (isCorrect) => {
    if (isCorrect) setCorrects((prev) => prev + 1);

    const newTrivias = [...trivias];
    newTrivias.shift();

    setTrivias(newTrivias);
  };

  useEffect(() => {
    setTrivias(defaultTrivias);
    setCorrects(0);
  }, [defaultTrivias]);

  if (play) {
    if (trivias.length) {
      const { correct_answer, incorrect_answers } = trivias[0];
      const question = trivias[0].question;

      return (
        <>
          <div>{question}</div>

          <Choices
            correctAnswer={correct_answer}
            incorrectAnswers={incorrect_answers}
            handleNext={handleNext}
          />
        </>
      );
    }

    if (corrects) {
      return (
        <>
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

  const handlePlayClick = () => {
    setPlay(!play);
    fetchTrivias();
  };

  const handleReloadClick = () => {
    fetchTrivias();
  };

  return (
    <div>
      <h1> Try your best on this Trivia Challenge </h1>

      <button onClick={handlePlayClick}>{play ? "Pause" : "Play"}</button>
      <button onClick={handleReloadClick}>Reload game</button>

      <Trivia play={play} trivias={trivias} />
    </div>
  );
};
export default App;
