import { apiBaseUrl } from './utilsModule.js';
import { toggleMainMenu } from './menuModule.js';

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

  // Desktop

  const projectMenuItemTemplate = document.getElementById('project_item-template');

  const cloneProjectMenuItem = projectMenuItemTemplate.content.cloneNode(true);

  cloneProjectMenuItem.querySelector('[slot="site-name"]').textContent = siteData.name;
  cloneProjectMenuItem.querySelector('[slot="site-id"]').dataset.id = siteData.id; 

  cloneProjectMenuItem.querySelector('[slot="site-name"]').addEventListener('click', () => {
    loadSiteDetails(siteData);
  });

  const desktopReferenceNode = document.querySelector('.projects.desktop .see-all');

  document.querySelector('.project-items').append(cloneProjectMenuItem, desktopReferenceNode);

  // Mobile

  const mainMenuItemTemplate = document.getElementById('main-menu_item-template');

  const cloneMainMenuItem = mainMenuItemTemplate.content.cloneNode(true);

  cloneMainMenuItem.querySelector('[slot="site-name"]').textContent = siteData.name;
  cloneMainMenuItem.querySelector('[slot="site-id"]').dataset.id = siteData.id; 

  cloneMainMenuItem.querySelector('[slot="site-name"]').addEventListener('click', () => {
    loadSiteDetails(siteData);
  });

  cloneMainMenuItem.querySelector('[slot="site-name"]').addEventListener('click', toggleMainMenu);

  const mobileReferenceNode = document.querySelector('.projects.mobile .see-all');

  document.querySelector('.main-menu_items').append(cloneMainMenuItem, mobileReferenceNode);

}