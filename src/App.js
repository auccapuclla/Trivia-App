import { useEffect, useState } from "react";
import axios from "axios";

const Choices = ({
  correctAnswer,
  incorrectAnswers,
  setNumTrivia,
  setCorrects,
}) => {
  const checkHandle = (answer) => {
    console.log(answer);

    if (answer === correctAnswer) {
      setCorrects((prev) => prev + 1);
      return;
    }

    setNumTrivia((prev) => prev + 1);
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

const Trivia = ({ play }) => {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [numTrivia, setNumTrivia] = useState(0);
  const [corrects, setCorrects] = useState(0);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => setTriviaQuestions(res?.data?.results ?? []))
      .catch((e) => console.log(e));
    /* console.log("i am inside axios"); */
  }, []);

  if (play) {
    /* console.log(triviaQuestions.length, 1); */

    if (triviaQuestions.length !== 0 && numTrivia < triviaQuestions.length) {
      const { correct_answer, incorrect_answers } = triviaQuestions[numTrivia];

      return (
        <>
          <div>{triviaQuestions[numTrivia].question}</div>

          <Choices
            correctAnswer={correct_answer}
            incorrectAnswers={incorrect_answers}
            setnumTrivia={setNumTrivia}
            setCorrects={setCorrects}
          />
        </>
      );
    } else if (
      triviaQuestions.length !== 0 &&
      numTrivia === triviaQuestions.length
    ) {
      return (
        <>
          <h1>Game over</h1>
          <h2>
            You have scored {corrects} out of {triviaQuestions.length} trivias
          </h2>
        </>
      );
    }
  }

  return null;
};

const App = () => {
  const [play, setPlay] = useState(false);

  const handlePlayClick = () => {
    setPlay(!play);
  };

  return (
    <div>
      <h1> Try your best on this Trivia Challenge </h1>

      <button onClick={handlePlayClick}>{play ? "Pause" : "Play"}</button>
      <button onClick={() => {}}>Reload game</button>

      <Trivia play={play} />
    </div>
  );
};
export default App;
