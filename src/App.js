import React, { useState } from "react";
import Chat from "./componentes/Chat";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="joinOuterContainer">
    <div className="joinInnerContainer">
      {!registrado && (
        <form onSubmit={registrar}>
          <h1 className="heading">Ingrese su nombre</h1>
          <input placeholder="Name" className="joinInput" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button className={'button mt-20'} >Ingresar al chat</button>
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
    </div>
    </div>

  );
}

export default App;
