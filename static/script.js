const socket = io();

function getCookie(cookieName) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const username = getCookie('username');
socket.emit('user-joined', `${username} has joined the chat!`);

  socket.on('user-joined', (message) => {
    const chatArea = document.getElementById('chatArea');
    const newMessage = document.createElement('div');
    newMessage.className = 'join';
    newMessage.innerHTML = message;
    chatArea.appendChild(newMessage);
    chatArea.scrollTop = chatArea.scrollHeight;
});

function exitChat() {
  location.reload();
};
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  messageInput.value = '';

  if (message.trim() === '') {
    return;
  }

  const chatArea = document.getElementById('chatArea');
  const newMessage = document.createElement('div');
  newMessage.className = 'message sender';
  newMessage.innerHTML = `${username}: ${message}`;
  chatArea.appendChild(newMessage);
  socket.emit('chat-message', `${username}: ${message}`)
  chatArea.scrollTop = chatArea.scrollHeight;
}

socket.on('chat-message', (message) => {
  const chatArea = document.getElementById('chatArea');
  const newMessage = document.createElement('div');
  newMessage.className = 'message receiver';
  newMessage.innerHTML = message;
  chatArea.appendChild(newMessage);
  chatArea.scrollTop = chatArea.scrollHeight;
});



