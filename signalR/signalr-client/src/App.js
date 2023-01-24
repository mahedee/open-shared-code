import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import { ErrorToastify, SuccessToastify } from "./Helpers/ToastifyMessage";
import Routers from "./Routers";

function App() {
  const [connection, setConnection] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [connectionId, setConnectionId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  //const {newMessage, events} = Connector();

  // const notify = () => {
  //   //console.log("button clicked!");
  //   toast("Wow so easy!");
  //   //toast("Button clicked!", {position: toast.POSITION.TOP_RIGHT});
  // }

  //   const newMessage = (message) => {
  //     console.log("log: newMessage method" + message);
  //     //this.connection.send("newMessage", "foo", message).then(x => console.log("sent"))
  // }

  // only on load fire
  useEffect(() => {
    const _userName = "maidul";
    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`https://localhost:7154/hub?username=${_userName}`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(socketConnection);
    console.log("socket connection set");
  }, []);

  // useEffect(() => {
  //   console.log("New Message: " + newMessage);
  //   console.log(connection);
  //   if (connection) {
  //     connection.send("newMessage", "mahedee", newMessage);
  //   }

  //   // if (connection) {
  //   //   connection.start()
  //   //     .then(() => {
  //   //       console.log("connection started!");
  //   //       console.log(connection);
  //   //       connection.send("newMessage", "mahedee", newMessage).then(x => console.log("sent"))
  //   //      //connection.send("newMessage", "test msg");

  //   //       // connection.invoke("GetConnectionId").then((res) => {
  //   //       //   console.log("Connection Id", res);
  //   //       //   setConnectionId(res);
  //   //       // });

  //   //       // for sucess message
  //   //       // connection.on("messageReceived", (user, message) => {
  //   //       //   toast(message);
  //   //       //   //setSuccessMessage(message);

  //   //       // });
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log("Error: ", err);
  //   //     });
  //   // }
  // }, [newMessage]);

  // onload fire

  // for receive
  useEffect(() => {
    //console.log("New Message: " + newMessage);
    console.log(connection);
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("GetConnectionId").then((res) => {
            console.log("Connection Id", res);
            setConnectionId(res);
          });

          connection.invoke("GetUserId").then((res) => {
            console.log("User Id", res);
            setUserId(res);
          });

          connection.on("SuccessMessage", (message) => {
            //debugger;
            console.log("Message: ", message);
            message && console.log("Message p1:", message);
            // connection.invoke("Message", message);

            message && SuccessToastify(message);
            setSuccessMessage(message);
          });

          connection.on("ErrorMessage", (message) => {
            message && console.log("Message p1:", message);
            // connection.invoke("Message", message);

            message && ErrorToastify(message.message);
            setErrorMessage(message);
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [connection]);

  return (
    <div>
      <Routers></Routers>
      {/* <button onClick={notify}>Click me!</button> */}
      {/* <button onClick={() => newMessage((new Date()).toISOString())}>send date </button> */}
      <button onClick={() => setNewMessage(new Date().toISOString())}>
        Send date{" "}
      </button>
    </div>
  );
}

export default App;

// import React, {useEffect, useState} from 'react'
// import logo from './logo.svg';
// import './App.css';
// import Connector from './signalr-connection.ts'

// function App() {

// const {newMessage, events} = Connector();
// const[message, setMessage] = useState("initial value");

// useEffect(()=> {
//   events((_, message) => setMessage(message));
// });

//   return (
//     <div className="App">
//       <span>message from signalR: <span style={{ color: "green" }}>{message}</span> </span>
//       <br />
//       <button onClick={() => newMessage((new Date()).toISOString())}>send date </button>
//     </div>
//   );
// }

// export default App;
