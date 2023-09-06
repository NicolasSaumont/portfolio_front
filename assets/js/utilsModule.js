export const apiBaseUrl = 'http://localhost:3000';

export async function closeNotification() {

  document.querySelectorAll('.notification').forEach(notification => {

    notification.classList.remove('is-active');

  });
}