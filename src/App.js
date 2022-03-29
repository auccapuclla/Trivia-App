import { useEffect, useState } from "react";
import axios from "axios";

const Question = ({question}) => {
  return( <div>{question}</div> )
}
const Choices = ({ cAnswer,iAnswers,setnumTrivia,numTrivia,setCorrects,corrects }) => {
  
  const checkHandle = ( answer ) => {
      console.log(answer)
      if (answer === cAnswer) { setCorrects(corrects+1)
                                return } 
      return console.log("false111")
  }
  const answers = [cAnswer, ...iAnswers].sort(() => Math.random()-0.5)
  
  return ( 
        <> 
          {answers.map((answer,id) => <button key={id} onClick={()=>{checkHandle(answer); setnumTrivia(numTrivia+1)}}> {answer} </button> )}
        </>
        )
}

const Trivia = ({play,setPlay}) => {
  const [trivia,setTrivia] = useState([]);
  const [numTrivia, setnumTrivia] = useState(0);
  const [corrects, setCorrects] = useState(0);
  useEffect( () => {
    axios.get('https://opentdb.com/api.php?amount=10')
          .then(res => setTrivia(res.data.results))
          .catch(e => console.log(e));
    console.log("i am inside axios")
     
  }, [])
  if(play){
    console.log(trivia.length,1)//Something happens with the asyncronics axios, 
                                //wait for it till fetching is done
    if(trivia.length !== 0 && numTrivia<trivia.length ){
    return(<>
            <Question question={trivia[numTrivia].question} />
            <Choices cAnswer={trivia[numTrivia].correct_answer} iAnswers={trivia[numTrivia].incorrect_answers} 
                      setnumTrivia={setnumTrivia} numTrivia={numTrivia} corrects={corrects} setCorrects={setCorrects} />
          </>)}
    else if (trivia.length !== 0 && numTrivia === trivia.length) {
      return(
        <>
        <h1>Game over</h1>
        <h2>You have scored {corrects} out of {trivia.length} trivias</h2>
        </>
        )
    }
  }
  return null
}
const Button = ({play,setPlay}) => {
  
  const onPlay = () => setPlay(!play)
  
  if(!play){
    return (
          <> <button onClick={onPlay}>Play</button> <button onClick >Reload game</button> </>
    )
  }
  return (<> <button onClick={onPlay}>Pause</button> <button onClick >Reload game</button>  </>)
}
const App = () => {
  const [play,setPlay] = useState(false);
  return (
    <div>
      <h1> Try your best on this Trivia Challenge </h1>
      
      <Button play={play} setPlay={setPlay} />
      
      <Trivia play={play} setPlay={setPlay}/>
    </div>
  )
}
export default App;
