import { io } from "../../node_modules/socket.io-client/dist/socket.io.esm.min.js";
import { GameService } from "./GameService.js";

export const ConnectionHandler = {
    connected: false,
    socket: null,
    url: null,
    gameService: new GameService(),
    init: (url, onConnectedCallBack, onDisconnectedCallBack) => {
         let { socket } = ConnectionHandler; 
         socket = io(url);
         socket.onAny((message, payload) => {
             console.log("Esta llegando: ");
             console.log(payload);
             console.log(payload.type);
             console.log(payload.content);

           });
         socket.on("connect", (data) => {
             socket.on("connectionStatus", (data) => {
                 ConnectionHandler.connected = true;
                 console.log(data);
                 onConnectedCallBack();
             });
             socket.on("message", (payload) => {
                 ConnectionHandler.gameService.do(payload);
                 //socket.emit("message",{ type: "HELLO", content: "Hello world!"});
             })
             socket.on("disconnect", () => {
                 ConnectionHandler.connected = false;
                 onDisconnectedCallBack();
             });
         })
    }
}