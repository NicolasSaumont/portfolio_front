import { apiBaseUrl } from './utilsModule.js';

export async function loadSites() {

  const response = await fetch(`${apiBaseUrl}/sites`);

  if (response.ok) {

    const sites = await response.json();
  
    sites.forEach(site => {

      addSiteNameToDom(site);

    });
  } else {
    // On fait un alerte pour aller vite mais dans la vraie et pour le TP, il faudra quelque chose de plus joli !
    // Par exemple avec : https://bulma.io/documentation/elements/notification/
    alert('Oops petit souci côté serveur !');
  }
}

export async function loadSiteDetails(siteId) {

  console.log('Je charge le bon site');

  // const response = await fetch(`${apiBaseUrl}/sites/${siteId}`);

  // if (response.ok) {

  //   const site = await response.json();

  //   console.log(site);

  // }

}

function addSiteNameToDom(siteData) {

  const projectMenuItemTemplate = document.getElementById('project_item-template');

  const cloneProjectMenuItem = projectMenuItemTemplate.content.cloneNode(true);

  cloneProjectMenuItem.querySelector('[slot="site-name"]').textContent = siteData.name;
  cloneProjectMenuItem.querySelector('[slot="site-id"]').dataset.id = siteData.id; 

  cloneProjectMenuItem.addEventListener('click', () => {
    loadSiteDetails(siteData);
  });

  const referenceNode = document.querySelector('.projects.desktop .see-all');

  document.querySelector('.projects.desktop').append(cloneProjectMenuItem, referenceNode);

}