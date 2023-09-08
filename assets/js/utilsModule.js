import { deleteSiteDetailsTemplate, deletePictures, deleteSitesListTemplate } from './siteModule.js';

export const apiBaseUrl = 'http://localhost:3000';

export async function closeNotification() {

  document.querySelectorAll('.notification').forEach(notification => {

    notification.classList.add('is-hidden');

  });
}

export function showHomepage() {

  deleteSiteDetailsTemplate();

  deletePictures();

  deleteSitesListTemplate();

  document.querySelector('.home').classList.remove('is-hidden');
  document.querySelector('.projects.desktop').classList.remove('is-hidden');
  document.querySelector('.images.desktop').classList.remove('is-hidden');

  document.querySelectorAll('[slot="site-id"]').forEach(name => {

    name.classList.remove('active');

  });

  document.querySelectorAll('.see-all').forEach(name => {

    name.classList.remove('active');

  });

}

export function hideHomepage() {

  document.querySelector('.home').classList.add('is-hidden');

}