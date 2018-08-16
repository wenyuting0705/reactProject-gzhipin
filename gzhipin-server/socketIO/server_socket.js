const {ChatModel} = require('../db/models')

module.exports = function (server) {
  const io = require('socket.io')(server)
  io.on('connection',function (socket) {
    socket.on('sendMsg',function ({content,from,to}) {
      console.log('服务器接收到浏览器发送的消息', {content, from, to})
      const chat_id = [from,to].sort().join('_')
      const create_time = Date.now()

      new ChatModel({content, from, to,chat_id,create_time}).save((err,chatMsg)=>{
        io.emit('receiveMsg',chatMsg)
      })
    })
  })
}