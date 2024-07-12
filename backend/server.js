const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
const messagesRouter = require('./routes/messages');
app.use('/messages', messagesRouter);

app.use('', require('./routes/userRoute'));
app.use('', require('./routes/adminRoute'));

server.listen(port, () => console.log(`Server started on port ${port}`));





const users = {}   

io.on('connection', socket => {
    socket.on('new-user', user => {   
        users[socket.id] = user         
        socket.broadcast.emit('user-joined', user)  
    })
    socket.on('send-message', (message,senderName,recive) => {  
            console.log("senderName from server"+senderName)
            socket.broadcast.emit('message', { message: message, senderName:senderName })  
        
        // else{
        //     console.log(senderName,recive)
        //     console.log("in server while NOT WORK")
        // }
     
    })
})