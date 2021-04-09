import React, { useState } from "react";

function Home(props){
    function CapsLock(props){
        const insertedText = props.texto;
        const textoEmCapsLock = insertedText.toUpperCase();
        return <div>{textoEmCapsLock}</div>
    }
    const [input, setInput] = useState('');

    return (
        <div>         
            <p><CapsLock texto="Hello Next.js"></CapsLock></p>
            <input placeholder="Insert your name..." value={input} onInput={e => setInput(e.target.value)}></input>
            <p>Your name: {input}</p>
        </div>    
    )
}

export default Home