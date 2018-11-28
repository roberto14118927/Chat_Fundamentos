
$(function(){
   
    var socket = io.connect('http://172.20.10.9:3000')

    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    send_message.click(function(){
        console.log('ok')
        socket.emit('new_message', {message: message.val()})
    })

    socket.on('new_message', (data) => {
        console.log(data.message)
    })
});