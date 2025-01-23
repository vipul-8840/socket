
import io from 'socket.io-client'
import './App.css'
import { useEffect, useMemo, useState } from 'react'
import {Container, Typography,TextField, Button} from "@mui/material"


function App() {
  const[message,setMessage] = useState('')
  const[room,setRoom] = useState('');
  const handleSubmit =(e)=>{
    e.preventDefault();
    socket.emit("message",message);
    setMessage('');
  }
  const socket = useMemo(()=>io('http://localhost:3000'),[]);
  
   useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected ",socket.id)
    })

    socket.on("message",(data)=>{
      console.log(data)
    })

    socket.on("received-message",(data)=>{
      console.log(data)
    })
    return ()=>{
      socket.disconnect();
    }
   },[])
  return (
    
       <Container maxWidth='sm'>
        <Typography variant="h3" component="div" gutterBottom>
          Welcome to Chat App
        </Typography>

          <form onSubmit={handleSubmit}>
            <TextField 
              value ={message}
              onChange={(e)=>setMessage(e.target.value)}
              id='outlined-basic'
              label="Message"
              variant='outlined'
            />
             <TextField 
              value ={room}
              onChange={(e)=>setRoom(e.target.value)}
              id='outlined-basic'
              label="Room"
              variant='outlined'
            />
            <Button type="submit" variant='contained' color='primary '>Send</Button>
          </form>
         
       </Container>
    
  )
}

export default App
