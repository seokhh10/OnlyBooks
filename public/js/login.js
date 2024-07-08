const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    // change to readers

    const response = await fetch('/api/readers/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      console.log('user not found');
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('Entrando a singup');

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/readers', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.statusText);


    if (response.ok) {
      console.log('singup ok and send to /profile');
      document.location.replace('/profile');
    } else {
      console.log('error en el fetch');
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

if (window.location.href.includes('login')) {
  document.getElementsByTagName('html')[0].classList.add('bg-black-intro');
  document.getElementById('log-in').setAttribute('style', 'display: none');
  document.getElementsByTagName('h1')[0].setAttribute('style', 'font-size: 50px');
} else {
  document.getElementsByTagName('html')[0].classList.remove('bg-black-intro');
  document.getElementById('log-in').setAttribute('style', 'display: block');
  document.getElementsByTagName('h1')[0].setAttribute('style', '');
}