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

  const userEmail = document.getElementById('userEmail');
  const userPassword = document.getElementById('userPassword');

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
      console.log("L'utilisateur a pu se connecter");
    } else {
      openNotification();
    }
  } catch (error) {
    console.trace(error);
  }
}

// On rend effectif les branchements d'écouteurs d'event
listenUserActions();
