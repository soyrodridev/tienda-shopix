import { useState, useEffect } from "react";
import io from "socket.io-client";
import Image from "next/image";
import Chat from "@/styles/Chat.module.css";
import phone from "@/assets/img/phone.png";

let socket;
const urlRegex =
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [todosLosMensajes, setTodosLosMensajes] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    iniciarSockets();

    return () => {
      socket.disconnect();
    };
  }, []);

  function iniciarSockets() {
    fetch("/api/socket").then(() => {
      socket = io();

      socket.on("chat:mensaje", (mensajeNuevo) => {
        setTodosLosMensajes((mensajesAnteriores) => [
          ...mensajesAnteriores,
          mensajeNuevo,
        ]);
      });
    });
  }

  function manejarEnvioDeMensaje(evento) {
    evento.preventDefault();

    socket.emit("chat:mensaje", { username, contenido: message });

    setMessage("");
  }

  function toggleChat() {
    setShowChat(!showChat);
  }

  return (
    <>
      <button onClick={toggleChat} className={Chat.toggleButton}>
        <Image src={phone} alt="foto no disponible" />
      </button>
      <section className={`${Chat.body} ${showChat ? Chat.showChat : ""}`}>
        <div className={Chat.containerTitle}>
          <h1 className={Chat.title}>Chat de soporte</h1>
        </div>

        {showChat && (
          <form
            onSubmit={manejarEnvioDeMensaje}
            action=""
            className="text-black"
          >
            

            <ul className={Chat.msg_group}>
              {todosLosMensajes.map((mensaje, index) => (
                <li key={index} className={Chat.ContainerMensajes}>
                  {mensaje.contenido.match(urlRegex) ? (
                    <>
                      {mensaje.username}: <br />
                      <Image
                        src={mensaje.contenido}
                        alt=""
                        width={700}
                        height={700}
                      />
                    </>
                  ) : (
                    <span className={Chat.MensajeEnviado}>
                      {mensaje.username}: {mensaje.contenido}
                    </span>
                  )}
                </li>
              ))}
            </ul>
  <div className={Chat.inputs_control}>
    <div className={Chat.input_group}>
                <input
                  onChange={(evento) => setUsername(evento.target.value)}
                  className={Chat.usuario}
                  type="text"
                  placeholder="Nombre de usuario"
                />
    
                <input
                  onChange={(evento) => setMessage(evento.target.value)}
                  value={message}
                  className={Chat.msj}
                  type="text"
                  placeholder="Mensaje"
                />
                </div>
                <input
                  type="submit"
                  className={Chat.enviar}
                  value="Enviar mensaje"
                />
  </div>
          </form>
        )}
      </section>
    </>
  );
}
