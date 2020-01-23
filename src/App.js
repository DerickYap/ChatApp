import React, {useState} from 'react';
//mport logo from './logo.svg';
import './App.css';
import NamePicker from './namepicker'

function App() {
  const [messages,setMessages] = useState([]) //initial state should be an empty array
  console.log(messages)


  return <main>

    <header>
      <div className = "logo-wrap">
      <img className = "logo"
        alt = "pic"
        src = "https://www.pngarts.com/files/1/Message-PNG-Image-with-Transparent-Background.png"/>
        <div className = "title">Talkie</div>
        </div>
        <div class = "namepicker"> <NamePicker onSave = {name => {}}/></div>
    </header>
 

  <div className = "messages">
  {/* html + jsx comment */}
  {messages.map((m,i)=>{
    return <div className = "message">{m}</div>

  })}
      
  <TextInput onSend={(text)=>{
    setMessages([text, ...messages]) //... spread operator
  }}/> 
  </div>

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
      if (text) props.onSend(text)
        setText('')
    }}>
      Send
    </button>
    </div>
    
  </div>
}
export default App;
