document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
    .then(response => {
      if (response.ok) {
        // Redirect to the login page if the signup was successful
        window.location.assign('chat.html');
      } else {
        response = response.json();
        alert(`Error signing up:${response.message}`);
      }
    })
    .catch(error => console.error('Error:', error));
  });