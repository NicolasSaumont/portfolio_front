import { apiBaseUrl, openNotification, closeNotification } from './utilsModule';

// window.addEventListener('load', () => {
//   // Réinitialiser les champs du formulaire lorsque la page est chargée
//   const userEmail = document.getElementById('userEmail');
//   const userPassword = document.getElementById('userPassword');
//   userEmail.value = '';
//   userPassword.value = '';
// });

function listenUserActions() {
  // Submit du login form
  document.querySelector('.login-form').addEventListener('submit', submitLogin);

  // Close notification
  document.querySelectorAll('.delete').forEach((deleteButton) => {
    deleteButton.addEventListener('click', closeNotification);
  });

  document.querySelectorAll('.login-form input').forEach((input) => {
    input.addEventListener('click', closeNotification);
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
      userEmail.value = '';
      userPassword.value = '';
      setTimeout(() => {
        checkSession();
      }, 1000);
    } else {
      const message = await response.json();
      console.log(message);
      openNotification();
    }
  } catch (error) {
    console.trace(error);
  }
}

// Fonction pour vérifier si une session est ouverte
function getSessionCookie() {
  const cookies = document.cookie.split(';');
  console.log(cookies);
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    console.log(cookie);
    if (name === 'adminCookie') {
      return value;
    }
  }
  return null;
}

// Utilisation de la fonction pour vérifier si une session est ouverte
export function checkSession() {
  console.log('Je passe la 1');
  const userToken = getSessionCookie(); // Utilisez une fonction pour récupérer le cookie de session
  console.log('Je passe la 2');
  console.log(userToken);
  if (userToken) {
    console.log('Je passe la 3');
    console.log('La session est ouverte.');
  } else {
    console.log("La session n'est pas ouverte.");
  }
}

// On rend effectif les branchements d'écouteurs d'event

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  listenUserActions();
});
