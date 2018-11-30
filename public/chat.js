$(function () {

    var socket = io.connect('http://192.168.8.11:3000')

    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<div class='incoming_msg'><div class='incoming_msg_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div> <div class='received_msg'> <div class='received_withd_msg'> <p>"+ data.username + ": " + data.message + "</p> <span class='time_date'>"+new Date().toLocaleString()+"</span> </div> </div></div>")
    })

    send_username.click(function () {
        socket.emit('change_username', {
            username: username.val()
        })
    })

    message.bind("keypress", () => {
        socket.emit('typing')
    })

    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + "esta escribiendo..." + "</i></p>")
    })
});