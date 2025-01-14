import { useState } from 'react';
import DOMPurify from "dompurify";

import './App.css';
import cards from './assets/data/data.json';

function App() {
  const [inputCards, setInputCards] = useState([]);

  const onClickCard = (card) => {
    console.log('card',card);

    const isKey = card.className.includes('key');

    if (!isKey) {
      handleTextToSpeech(card?.text);
      setInputCards([...inputCards, card]);
    }
  };

  const handleTextToSpeech = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
  
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find((voice) =>
        voice.name.toLowerCase().includes("female")
      );

      utterance.voice = femaleVoice || voices[0];
      window.speechSynthesis.speak(utterance);
    };
  
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  };

  const onClickBackSpace = () => {
    setInputCards((prevCards) => prevCards.slice(0, -1));
  }

  const onClickPlayAll = () => {
    const message = inputCards.reduce((oldValue,newValue)=> oldValue + ' ' + newValue?.text,'')

    handleTextToSpeech(message)
  }

  return (
    <>
      <div className="header-container sticky-header">
        <div className='input-close-container'>
          <div className="input-container card-container">
            { 
              inputCards.map((card, i) => (
                <ChildCard card={card} key={i} />
              ))
            }
          </div>
          <div className="play-button-container d-flex v-h-center link" title='Play all' onClick={() => onClickPlayAll()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
          </div>
          <div className="close-button-container d-flex v-h-center link" title='Backspace' onClick={() => onClickBackSpace()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z" /></svg>
          </div>
        </div>

        <div className="menu-label-container">
          <span>vocab</span>
          <span></span>
          <span>menu</span>
        </div>
      </div>

      <section className="card-container">
        { 
          cards.map((card, i) => (
            <div onClick={() => onClickCard(card)} key={i}>
              <ChildCard card={card} />
            </div>
          ))
        }
      </section>
    </>
  );
}

const ChildCard = ({ card }) => {
  return (
    <div className={`card link ${card?.className || ''}`}>
      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card?.text) || "Default text" }}></span>
      { 
        card?.image && (
          <span className='image-container'>
            <img src={`public/images/cards/${card.image}`} alt={card?.text || 'Card image'} />
          </span>
        )
      }
    </div>
  );
};

export default App;
