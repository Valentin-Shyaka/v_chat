const express=require("express")
const app=express()
const http=require("http")
const cors=require('cors')
const {Server}=require("socket.io")

app.use(cors())

const server= http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ['GET','POST'],
    }
});


io.on("connection",(socket)=>{
    // console.log(` User connected: ${socket.id}`);
     const addToRoom = (room)=>{
        socket.join(room)
     }
    socket.on("join_room",(data)=>{
        try{
            console.log('[user] joined room ', data);
            socket.join(data, (err)=>{
                if(err) return console.log('[ERROR] ', err)
            });
            socket.to(data).emit("joined", socket.id);
        }catch(e){
            console.log('[user] failed to join ', data);
        }
    });
    socket.on("send_Message",(data)=>{
        // socket.join(data);
        console.log(socket.rooms)
        // console.log("THE DATAAAAAAAAAAAA", data)
        io.to(data.room).emit('Receive_message',data)
    })
    socket.on('disconnect',()=>{
        console.log("disconnected",socket.id);
    });
})

server.listen(3001,()=>{
    console.log("server is running")
})