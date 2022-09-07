import './App.css';
import { useEffect, useState } from 'react';
import CardGrid from './Components/CardGrid';


const cardImages = [
  {"src" : "/img/helmet-1.png",matched : false},
  {"src" : "/img/potion-1.png",matched : false},
  {"src" : "/img/ring-1.png",matched : false},
  {"src" : "/img/scroll-1.png",matched : false},
  {"src" : "/img/shield-1.png",matched : false},
  {"src" : "/img/sword-1.png",matched : false}
]

function App() {

  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne,setChoiceOne] = useState(null)
  const[choiceTwo,setChoiceTwo] = useState(null)
  const[disabled,setDisabled] = useState(false)

  //Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id:Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // Choose Cards
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }
  // to count the turns and to to reset the two choices to null so the user can choose again 
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // to compare the two cards selected
  const compareChoices = () => {
    if(choiceOne && choiceTwo){
      setDisabled(true)//so the user cannot click on another card for a second cc: resetTurns()
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }
            else {
              return card
            }
          })
        })
        resetTurns()
      }
      else{
      setTimeout(() => resetTurns(),1000) 
      }

    }
  }
  // useEffect so we can compare the choices immediately after the palyer chooses
  useEffect(compareChoices,
    [choiceOne,choiceTwo])

  // another useEffect so the game starts when the component first mount
  useEffect(shuffleCards,[])

  // to move a block of code a little bit forward select all of it and press tab
  return (
    <div className="App">
      
      <h1> Magic Match</h1>
      <button onClick={shuffleCards}> New Game</button>
      <div className='card-grid'>
      {cards.map((card) => (
        < CardGrid 
        key={card.id} 
        card = {card}
        handleChoice = {handleChoice}
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled}
        
        />
      ))}
      </div>
      <p> Turns : {turns}</p>

    </div>
  );
}

export default App;
