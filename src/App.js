import React, {useState} from 'react';
//mport logo from './logo.svg';
import './App.css';

function App() {
  return <main>


   
  <img classname="logo" src = "https://www.pngarts.com/files/1/Message-PNG-Image-with-Transparent-Background.png"/>
  <header>  
    <div class = "title">Talkie</div>
  </header>

  {/* html + jsx comment */}

  <TextInput onSend={t=>console.log(t)}/>

  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  //normal javascript comment


  return <div className="text-input">
    <input value={text} 
    placeholder= "  Type a message, @name..."
    onChange={e=>setText(e.target.value)}
    />

    <div className = "sendButton">
    <button onClick={()=> {
      if(props.onSend) props.onSend(text)
      setText('')
    }}>
      Send
    </button>
    </div>
    
  </div>
}
export default App;
