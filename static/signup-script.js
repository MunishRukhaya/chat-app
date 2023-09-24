document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const url = `${window.location.host}/signup`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password, confirmPassword})
  })
  .then(response => {
    if (response.ok) {
      // Redirect to the login page if the signup was successful
      alert('Signup successful. Please login');
      window.location.assign('login.html');
    } else {
      alert('Username already exists');
    }
  })
  .catch(error => console.error('Error:', error));
});