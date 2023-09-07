import { apiBaseUrl, hideHomepage } from './utilsModule.js';
import { toggleMainMenu } from './menuModule.js';

export async function loadSites() {

  const response = await fetch(`${apiBaseUrl}/sites`);

  if (response.ok) {

    const sites = await response.json();
  
    sites.forEach(site => {

      addSiteNameToDom(site);

    });
  } else {
    
    document.querySelectorAll('.notification').classList.remove('is-hidden');

  }
}

export async function loadSiteDetails(siteData) {

  const response = await fetch(`${apiBaseUrl}/sites/${siteData.id}`);

  if (response.ok) {

    hideHomepage();

    document.querySelectorAll('[slot="site-id"]').forEach(name => {

      name.classList.remove('active');

    });

    document.querySelectorAll(`[data-id="${siteData.id}"]`).forEach(name => {

      name.classList.add('active');

    });

    const responseData = await response.json();

    addSiteDetailsToDom(responseData);

  } else {
    
    document.querySelectorAll('.notification').classList.remove('is-hidden');

  }

}

function addSiteNameToDom(siteData) {

  if (siteData.top_site === true) {

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

}

function addSiteDetailsToDom(siteData) {

  console.log('Je vais ajouter les détails du site');

  deleteSiteDetailsTemplate();

  const siteDetailsTemplate = document.getElementById('site-details-template');

  const cloneSiteDetails = siteDetailsTemplate.content.cloneNode(true);

  // cloneSiteDetails.querySelector('[slot="site-id"]').dataset.id = siteData.id; 
  cloneSiteDetails.querySelector('[slot="site-name"]').textContent = siteData.name;
  cloneSiteDetails.querySelector('[slot="site-description"]').textContent = siteData.description;
  // cloneSiteDetails.querySelector('[slot="site-technos"]').textContent = siteData.description;
  // cloneSiteDetails.querySelector('[slot="site-link"]').textContent = siteData.description;
  // cloneSiteDetails.querySelector('[slot="site-githublink"]').textContent = siteData.description;

  // cloneSiteDetails.querySelector('[slot="site-link"]').addEventListener('click', () => {
  //   loadSiteDetails(siteData);
  // });

  // cloneSiteDetails.querySelector('[slot="site-githublink"]').addEventListener('click', () => {
  //   loadSiteDetails(siteData);
  // });

  const referenceNode = document.querySelector('.home');

  document.querySelector('.main .row').prepend(cloneSiteDetails, referenceNode);

}

export function deleteSiteDetailsTemplate() {

  const siteDetailsTemplatesToDelete = document.querySelector('#site-details');

  if (siteDetailsTemplatesToDelete) {
    siteDetailsTemplatesToDelete.remove();
  }

}