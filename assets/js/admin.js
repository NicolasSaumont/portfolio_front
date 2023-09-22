import { apiBaseUrl, openNotification, closeNotification } from './utilsModule';

function listenUserActions() {
  // Submit du login form
  document.querySelector('.login-form').addEventListener('submit', submitLogin);

  // Close notification
  document.querySelectorAll('.delete').forEach((deleteButton) => {
    deleteButton.addEventListener('click', closeNotification);
  });
}

async function submitLogin(event) {
  event.preventDefault(); // Empeche le refresh de la page

  let userEmail = document.getElementById('userEmail');
  let userPassword = document.getElementById('userPassword');

  const loginDatas = {
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  const bodyJSON = JSON.stringify(loginDatas);

  try {
    const response = await fetch(`${apiBaseUrl}admin/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: bodyJSON,
    });

    if (response.ok) {
      const message = await response.json();
      console.log(message);
      document.querySelector('.login').classList.add('is-hidden');
    } else {
      const message = await response.json();
      console.log(message);
      openNotification();
    }
    userEmail.value = '';
    userPassword.value = '';
  } catch (error) {
    console.trace(error);
  }
}

// On rend effectif les branchements d'écouteurs d'event
listenUserActions();
