console.log('Admin page');

function listenUserActions() {

  // Submit du login form
  document.getElementById('#login-btn').addEventListener('submit', submitLogin);

}

function submitLogin() {
  console.log('login submited');

  //   event.preventDefault(); // Empeche le refresh de la page
  
  //   // console.log(event.target);
  //   const addListForm = event.target; // On recup le formulaire

  //   // On crée un nouvel objet FormData
  //   const formData = new FormData(addListForm);
  //   // console.log(formData.get('name'));

  //   // On converti le FormData en objet JS "classique" plus facilement manipulable
  //   const formObject = Object.fromEntries(formData);
  //   // console.log(formObject);

  //   //? Ici on va avoir un soucis 400 Bad Request car on n'a pas la propriété position dans formObject
  //   //? Pour pallier à ça, on va simplement la rajouter et l'initialiser à 0
  //   //? Le mieux aurait été de gérer ce cas côté backend ! (si on ne recoit pas position, alors on l'initialise à 0)
  //   formObject.position = 0;

  //   // Fonction pour faire le CALL API
  //   creatList(formObject);




  

  // async function creatList(listObject) {
  //   // On converti notre object JS en JSON simplement
  //   // car c'est le JSON qu'on enverra à l'API plus tard
  //   const bodyJSON = JSON.stringify(listObject);

  //   // On place un try...catch dans le cas où on n'arriverait pas à atteindre l'API
  //   try {
  //     // On emet une requete HTTP et on recup la réponse de l'API
  //     const response = await fetch(`${apiBaseUrl}/lists`, {
  //       method: 'POST', // Méthode HTTP
  //       headers: { // En-têtes de requête
  //         'Content-type': 'application/json; charset=UTF-8' // On spécifit à l'API qu'il va recevoir des données en JSON et encodé en UTF-8
  //       },
  //       body: bodyJSON // Corps de la requête : on envoi les data au format JSON
  //     });
  //     // console.log(response);
  
  //     if (response.ok) {
  //       const newList = await response.json();
  //       // On insert dans le DOM la liste fraichement crée
  //       addListToDom(newList);
  //     } else {
  //       // On fait un alerte pour aller vite mais dans la vraie et pour le TP, il faudra quelque chose de plus joli !
  //       // Par exemple avec : https://bulma.io/documentation/elements/notification/
  //       alert('Oops petit soucis');
  //     }
  //   } catch (error) {
  //     console.trace(error);
  //   }
  // }

}

// On rend effectif les branchements d'écouteurs d'event
listenUserActions();