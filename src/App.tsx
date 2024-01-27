import {  useState } from 'react'

import './App.css'

const clcbtns = [
  {key: 7 ,
   disc : "seven"
  }, 

  {key: 8,
    disc : "eight"
  }, 

  {key : 9,disc : "nine"}, 

  {key : '/' , disc : "divide"}, 

  {key : 4, disc : "four"}, 
  {key :5 , disc : "five"}, 
  {key :6 , disc : "six"}, 
  {key :'*', disc : "multiply"}, 
  {key : 1 , disc : "one"}, 
  {key :2 , disc : "two"}, 
  {key :3 , disc : "three"}, 
  {key : '-', disc : "subtract"}, 
  {key : 0 , disc : "zero"}, 
  { key :'.' , disc : "decimal"}, 
  { key : '=' , disc : "equals"}, 
  { key :'+' , disc : "add"}, 
  {key : 'C' , disc : "clear"}]


function App() {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [isEqualPressed, setIsEqualPressed] = useState(false);
  

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input.replace(/ /g, '')).toString());
        setIsEqualPressed(true);
        
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('0');
      setResult('0');
      setIsEqualPressed(false);
      
    }
   else if (value === '/' || value === '+' ||  value === '-' ||   value === '*') {
    setIsEqualPressed(false);
    const myRe = /[+*/-]$/g;
    setInput((prevInput) => (
      
      isEqualPressed ? result + value : prevInput.match(myRe) ? prevInput.slice(0, -1) + value   : prevInput === '0'  ?  '' + value : prevInput + value));
      
    setResult(value);
  }
     else {
      setIsEqualPressed(false);
      setInput((prevInput) => {
        if (value === '.' && prevInput.endsWith('.')  ) {
          // If '.' is already present, don't append another one
          return prevInput;
        }
        
        return prevInput === '0' ?  '' + value : prevInput + value;
      });
      //setInput((prevInput) => (prevInput === '0' ?  '' + value : prevInput + value));
      setResult((prevResult) => {
        if (value === '.' && prevResult.includes('.')) {
          // If '.' is already present, don't append another one
          return prevResult;
          
        }

        return prevResult === '0' || value === '/' || value === '+' || value === '-' || value === '*' ?  '' + value : prevResult + value;
      });
      //setResult((prevInput) => (prevInput === '0' || value === '/' || value === '+' || value === '-' || value === '*' ?  '' + value : prevInput + value));
    }
  };
  return (
    <>
     <div className="container">
      <div  className="display">
      <div  className="input">{input}</div>
        <div id='display' className="result">  {result}</div>
      </div>
      <div className="buttons">
        {clcbtns.map((btn) => (
          <button id={`${btn.disc}`} key={btn.key} onClick={() => handleButtonClick(btn.key)}>
            {btn.key}
          </button>
        ))}
      </div>
     </div>
     
    </>
  )
}

export default App
