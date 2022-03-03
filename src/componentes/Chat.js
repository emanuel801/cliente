import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import ScrollToBottom from 'react-scroll-to-bottom';
import "./Chat.css";

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div >
      <form className="form" onSubmit={submit}>
        <input
          className="input"
          type="text"
          placeholder="Escriba su mensaje"
         value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />


        <button className="sendButton">Enviar</button>
      </form>

      <div className="container">
        {mensajes.map((e, i) => (
          <div key={i}>
            <div>{e.nombre + ": "+e.mensaje}</div>
            
          </div>
        ))}
        <div ref={divRef}></div>
      </div>

    </div>





  );
};

export default Chat;
