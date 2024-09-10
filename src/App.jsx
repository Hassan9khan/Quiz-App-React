import axios from "axios";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [question, setQuestion] = useState(null);
  const [questionState , setQuestionState ] = useState(0)
  const checkedInput = useRef([])

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } , []);
  
  function nextQuestion(){
    if(questionState + 1 < question.length){
      setQuestionState(questionState + 1)
    }else{
      alert('Quiz Completed')
    }

    const checkedButton = checkedInput.current.find(input => input.checked)
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log('selected answer: ' , selectedValue);
      
    }
  }

  function shuffleArray(array) {

    let shuffled = array.slice();
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }
  

  return (
    <>
        <h1>Hello</h1>
        {question ? (
          <div>
            <h2>Q{questionState + 1}: {question[questionState].question.text}</h2>
            <ul>
              {shuffleArray([...question[questionState].incorrectAnswers, question[questionState].correctAnswer]).map(
                (item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        name="choice"           
                        id={item}
                        value={item}
                        ref={el => (checkedInput.current[index] = el)}
                      />
                      <label htmlFor={item}>{item}</label>
                    </li>
                  );
                }
              )}
            </ul>
            <button onClick={nextQuestion}>Next</button>
          </div>
        ) : (
          <h1>...Loading</h1>
        )}
    </>
  );
};

export default App;

//()=> questionState + 1 < question.length ? setQuestionState(questionState + 1) : alert('nikal yaha se')

// import axios from "axios"
// import { useEffect , useState } from "react"

// const App = () => {

//   const [ data , setData ]  = useState()

//   useEffect(() =>{
//       axios('https://the-trivia-api.com/v2/questions')
//       .then((res) => {
//         console.log(response.data);
//         setData(response.data)
//       }).catch((err) => {
//         console.log(err);
//       })
//   }, [])

//   return(
//     <>
//     <h1>Hello Quiz App</h1>
//     {data ? data.map((item) => {
//       return(
//           <div style={{
//             border: "1px solid black",
//             padding: "2rem",
//             margin: "5px"
//           }} key={item.id}>
//             <h2>{item.title}</h2>
//             <p>{item.description}</p>
//             <p>{item.price}</p>
//           </div>
//       )
//     }) : <h1>Loading</h1>
//     }
//     </>
//   )
// }

// export default App
