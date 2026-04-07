function register ({ registerHook, peertubeHelpers }) {
  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute();
  
  // Change favicon when application initializes
  registerHook({
    target: 'action:application.init',
    handler: () => {
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach(favicon => favicon.remove());
      
      // Add new favicon
      const faviconLink = document.createElement('link');
      faviconLink.type = 'image/png';
      faviconLink.rel = 'shortcut icon';
      faviconLink.href = baseStaticUrl + '/images/favicon.png';
      document.getElementsByTagName('head')[0].appendChild(faviconLink);
    }
  });
}

export {
  register
}
