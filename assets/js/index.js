import { loadSites } from './siteModule.js';
import { toggleMainMenu } from './menuModule.js';
import { closeNotification, showHomepage } from './utilsModule.js';

function init() {

  listenUserActions();

  const firstLoading = true;

  loadSites(firstLoading);

}

function listenUserActions() {
  
  // Toggle mobile main menu
  document.querySelectorAll('.main-menu_item, .main-menu_icons').forEach(menuItem => {
    
    menuItem.addEventListener('click', toggleMainMenu);

  });

  // Close notification 
  document.querySelectorAll('.delete').forEach(deleteButton => {
    deleteButton.addEventListener('click', closeNotification);
  });

  // Return to homepage
  document.querySelector('.logo').addEventListener('click', showHomepage);

  // See all sites
  document.querySelectorAll('.see-all').forEach(seeAllButton => {
    seeAllButton.addEventListener('click', () => {

      const firstLoading = false;

      loadSites(firstLoading);
      
    }); 
  });
    
}

init();
