import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin:"http://localhost:5173/",
    method:["GET","POST"],
    credentials:true
}});
const PORT=3000;

app.use(cors({
    origin:"http://localhost:5173/",
    method:["GET","POST"],
    credentials:true
}));
  
app.get("/",(req,res)=>{
     res.send("hello world");
})

 io.on("connection",(socket)=>{
       console.log("user connected",socket.id);

       socket.on('disconnect',()=>(console.log("user disconnected",socket.id)));
       socket.on("message",(data)=>{
            console.log(data);
            socket.broadcast.emit('received-message',data);
       })
      
       socket.emit('message',"hii Vipul");
 })
 server.listen(PORT,()=>{
     
    console.log(("Server is running " + "http://localhost:3000" ))

})

