import { apiBaseUrl, hideHomepage } from './utilsModule.js';
import { toggleMainMenu } from './menuModule.js';

export async function loadSites(firstLoading) {
  
  const response = await fetch(`${apiBaseUrl}/sites`);
  
  if (response.ok) {
    
    const sites = await response.json();

    if (firstLoading) {
    
      sites.forEach(site => {
          
        addSiteNameToDom(site);
          
      });
  
    } else {

      deleteSiteDetailsTemplate();

      deletePictures();

      hideHomepage();

      document.querySelectorAll('[slot="site-id"]').forEach(name => {

        name.classList.remove('active');

      });

      document.querySelectorAll('.see-all').forEach(name => {

        name.classList.add('active');

      });

      document.querySelector('.images.desktop').classList.add('is-hidden');
      document.querySelector('.projects.desktop').classList.add('is-hidden');

      sites.forEach(site => {
          
        addListSitesToDom(site);
          
      });

    }

    return sites;
  
  } else {
      
    document.querySelectorAll('.notification').classList.remove('is-hidden');

  }
  
}

export async function loadSiteDetails(siteData) {

  const response = await fetch(`${apiBaseUrl}/sites/${siteData.id}`);

  if (response.ok) {

    hideHomepage();

    document.querySelectorAll('[slot="site-id"], .see-all').forEach(name => {

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

  deleteSiteDetailsTemplate();

  deletePictures();

  const siteDetailsTemplate = document.getElementById('site-details-template');

  const cloneSiteDetails = siteDetailsTemplate.content.cloneNode(true);

  // Insert to DOM the site id
  cloneSiteDetails.querySelector('[slot="site-id"]').dataset.id = siteData.id; 

  // Insert to DOM the site name
  cloneSiteDetails.querySelector('[slot="site-name"]').textContent = siteData.name;

  // Insert to DOM the site description
  cloneSiteDetails.querySelector('[slot="site-description"]').textContent = siteData.description;

  // Insert to DOM the site technos
  siteData.technosFromSite.forEach(techno => {
    
    cloneSiteDetails.querySelector('[slot="site-technos"]').append(`#${techno.name} `);

  });

  // Insert to DOM the site link
  if (siteData.site_link !== null) {

    const linkToSite = document.createElement('a');
  
    linkToSite.href = siteData.site_link;
  
    linkToSite.textContent = 'View site ';
  
    linkToSite.classList.add('external_link');
  
    cloneSiteDetails.querySelector('[slot="site-links"]').append(linkToSite);

  }

  // Insert to DOM the github link
  if (siteData.github_link !== null) {

    const linkToGithub = document.createElement('a');

    linkToGithub.href = siteData.github_link;

    linkToGithub.textContent = 'Github';

    linkToGithub.classList.add('external_link');

    cloneSiteDetails.querySelector('[slot="site-links"]').append(linkToGithub);

  }

  // Insert to DOM the site pictures
  // - on mobile mode
  for (let index = 0; index < siteData.picturesFromSite.length; index++) {

    const image = document.createElement('img');
    image.src = `./assets/img/${siteData.picturesFromSite[index].name}.png`;
    image.alt = `picture of the site ${siteData.name}`;

    if (index === 0) {

      cloneSiteDetails.querySelector('[slot="first-picture"]').append(image);

    } else {

      cloneSiteDetails.querySelector('[slot="other-pictures"]').append(image);

    }
    
  }

  // - on desktop
  for (let index = 0; index < siteData.picturesFromSite.length; index++) {

    const image = document.createElement('img');

    image.src = `./assets/img/${siteData.picturesFromSite[index].name}.png`;

    image.classList.add('site-picture-desktop');

    image.alt = `picture of the site ${siteData.name}`;

    document.querySelector('.images .row').append(image);
      
  }

  // Finalize insertion
  const referenceNode = document.querySelector('.home');

  document.querySelector('.main .row').prepend(cloneSiteDetails, referenceNode);

}

export function addListSitesToDom(siteData) {
  
  console.log('Les sites ont été chargées dans la liste');

  const siteCardTemplate = document.getElementById('site-card-template');

  const cloneSiteCard = siteCardTemplate.content.cloneNode(true);

  // Insert to DOM the site id
  cloneSiteCard.querySelector('[slot="site-card-id"]').dataset.id = siteData.id; 

  // Insert to DOM the site name
  cloneSiteCard.querySelector('[slot="site-card-name"]').textContent = siteData.name;

  // Insert to DOM the site technos
  siteData.technosFromSite.forEach(techno => {
    
    cloneSiteCard.querySelector('[slot="site-card-technos"]').append(`#${techno.name} `);

  });

  // Insert to DOM the site picture
  for (let index = 0; index < 1; index++) {

    const image = document.createElement('img');
    image.src = `./assets/img/${siteData.picturesFromSite[index].name}.png`;
    image.alt = `picture of the site ${siteData.name}`;

    cloneSiteCard.querySelector('[slot="site-card-picture"]').append(image);
    
  }

  document.querySelector('.sites-list').append(cloneSiteCard);

}

export function deleteSiteDetailsTemplate() {

  const siteDetailsTemplatesToDelete = document.querySelector('#site-details');

  if (siteDetailsTemplatesToDelete) {
    siteDetailsTemplatesToDelete.remove();
  }

}

export function deletePictures() {

  const picturesToDelete = document.querySelectorAll('.site-picture-desktop');

  if (picturesToDelete) {

    picturesToDelete.forEach(picture => {
      
      picture.remove();

    });
  }

}

export function deleteSitesListTemplate() {

  const sitesCardsTemplatesToDelete = document.querySelectorAll('.site-card');

  if (sitesCardsTemplatesToDelete) {

    sitesCardsTemplatesToDelete.forEach(sitesCardTemplatesToDelete => {
      
      sitesCardTemplatesToDelete.remove();

    });

  }

}