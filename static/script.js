let username = '';

function startChat() {
  username = document.getElementById('username').value;

  if (username.trim() === '') {
    alert('Please enter your name.');
    return;
  }

  document.getElementById('name-container').style.display = 'none';
  document.getElementById('chatContainer').style.display = 'block';
  document.getElementById('exit').style.display = 'block';
}

function exitChat() {
    location.reload();
}
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

  // Scroll to the bottom of the chat area
  chatArea.scrollTop = chatArea.scrollHeight;
}



  