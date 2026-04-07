function register ({ registerHook, peertubeHelpers }) {
  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute();

  registerHook({
    target: 'action:application.init',
    handler: () => {
      // Replace favicon
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach(favicon => favicon.remove());

      const faviconLink = document.createElement('link');
      faviconLink.type = 'image/png';
      faviconLink.rel = 'shortcut icon';
      faviconLink.href = baseStaticUrl + '/images/favicon.png';
      document.getElementsByTagName('head')[0].appendChild(faviconLink);

      // Replace logo — use MutationObserver since Angular may render it after init
      const logoUrl = baseStaticUrl + '/images/FalconCast-nobg.png';

      function replaceLogo () {
        document.querySelectorAll('img.logo, .icon-logo img, .instance-name img').forEach(img => {
          if (img.src !== logoUrl) {
            img.src = logoUrl;
          }
        });
      }

      replaceLogo();

      const observer = new MutationObserver(replaceLogo);
      observer.observe(document.body, { childList: true, subtree: true });

      // Remove PeerTube's Smart App Banner
      const appBanner = document.querySelector('meta[name="apple-itunes-app"]');
      if (appBanner) appBanner.remove();

      // Add login state class to body for CSS targeting
      const isLoggedIn = peertubeHelpers.isLoggedIn();
      document.body.classList.add(isLoggedIn ? 'user-logged-in' : 'user-logged-out');
    }
  });
}

export {
  register
}
