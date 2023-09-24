document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const url = `${window.location.host}/login`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
    .then(response => {
      if (response.ok) {
        // Redirect to the login page if the signup was successful
        window.location.assign('index.html');
      } else {
        response = response.json();
        alert(`Error signing up:${response.message}`);
      }
    })
    .catch(error => console.error('Error:', error));
  });