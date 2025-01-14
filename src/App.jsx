// import { useState } from 'react'
import './App.css'
import data from './assets/data.json'

function App() {

  return (
    <>
      <div className='card-container'>
          { 
            data.map((item,i) => (
              <div className={`card ${item?.group} ${item?.group}-${i}`} key={i}>
                <span>{item?.text}</span>
              </div>
            ))
          }
      </div>
    </>
  )
}

export default App
