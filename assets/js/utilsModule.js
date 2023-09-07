import { deleteSiteDetailsTemplate } from './siteModule.js';

export const apiBaseUrl = 'http://localhost:3000';

export async function closeNotification() {

  document.querySelectorAll('.notification').forEach(notification => {

    notification.classList.add('is-hidden');

  });
}

export function showHomepage() {

  deleteSiteDetailsTemplate();

  document.querySelector('.home').classList.remove('is-hidden');

}

export function hideHomepage() {

  document.querySelector('.home').classList.add('is-hidden');

}