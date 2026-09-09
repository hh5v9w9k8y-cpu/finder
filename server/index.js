const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 允许所有来源，生产环境请改为你的域名
    methods: ["GET", "POST"]
  }
});

let waitingUser = null; // 等待匹配的用户

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  // 用户点击“开始匹配”
  socket.on('start_match', () => {
    console.log('用户请求匹配:', socket.id);
    
    if (waitingUser) {
      // 如果有人在等，直接匹配
      const roomName = `room_${waitingUser.id}_${socket.id}`;
      
      // 让两个人加入同一个房间
      socket.join(roomName);
      waitingUser.join(roomName);
      
      // 通知两个人匹配成功
      io.to(waitingUser.id).emit('match_success', { room: roomName, isCaller: true });
      io.to(socket.id).emit('match_success', { room: roomName, isCaller: false });
      
      console.log('匹配成功:', roomName);
      waitingUser = null;
    } else {
      // 没人等，自己先排队
      waitingUser = socket;
      console.log('用户进入队列:', socket.id);
    }
  });

  // 转发 WebRTC 信令
  socket.on('webrtc_signal', (data) => {
    // 把信号转发给房间里的另一个人
    socket.to(data.to).emit('webrtc_signal', {
      from: socket.id,
      signal: data.signal
    });
  });

  // 挂断/取消匹配
  socket.on('hangup', () => {
    if (waitingUser === socket) {
      waitingUser = null;
    }
    socket.leave(socket.room);
  });

  socket.on('disconnect', () => {
    console.log('用户断开:', socket.id);
    if (waitingUser === socket) {
      waitingUser = null;
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`信令服务器运行在端口 ${PORT}`);
});
