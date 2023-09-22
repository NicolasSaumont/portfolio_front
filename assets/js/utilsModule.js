import {
  deleteSiteDetailsTemplate,
  deletePictures,
  deleteSitesListTemplate,
} from './siteModule.js';

// export const apiBaseUrl = 'https://portfolio-back.nicolassaumont.com/';
export const apiBaseUrl = 'http://localhost:3000/';

export async function closeNotification() {
  document.querySelectorAll('.notification').forEach((notification) => {
    notification.classList.add('is-hidden');
  });
}

export async function openNotification() {
  document.querySelectorAll('.notification').forEach((notification) => {
    notification.classList.remove('is-hidden');
  });
}

export function showHomepage() {
  deleteSiteDetailsTemplate();

  deletePictures();

  deleteSitesListTemplate();

  showProjects();

  showImages();

  document.querySelector('.home').classList.remove('is-hidden');

  document.querySelectorAll('[slot="site-id"]').forEach((name) => {
    name.classList.remove('active');
  });

  document.querySelectorAll('.see-all').forEach((name) => {
    name.classList.remove('active');
  });
}

export function hideHomepage() {
  document.querySelector('.home').classList.add('is-hidden');
}

export function showProjects() {
  document.querySelector('.projects.desktop').classList.remove('is-hidden');
}

export function hideProjects() {
  document.querySelector('.projects.desktop').classList.add('is-hidden');
}

export function showImages() {
  document.querySelector('.images.desktop').classList.remove('is-hidden');
}

export function hideImages() {
  document.querySelector('.images.desktop').classList.add('is-hidden');
}
