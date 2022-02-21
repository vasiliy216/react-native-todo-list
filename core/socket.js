import io from 'socket.io-client'

const socket = io("https://backend-todo-list-web-mob.herokuapp.com");

socket.on('message', data => console.log(data))

export default socket 