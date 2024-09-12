// sw.js

// Define a fallback mechanism for modules and imports
if (!self.define) {
  let registry = {};
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      new Promise(resolve => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      })
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}

// Define the service worker using Workbox
define(['./workbox-631a4576'], (function (workbox) { 'use strict';

  importScripts('/workbox-631a4576.js'); 

  workbox.setConfig({ debug: false });
  workbox.core.setCacheNameDetails({ prefix: 'my-pwa' });

  self.skipWaiting();
  workbox.clientsClaim();

  workbox.routing.registerRoute(
    '/',
    new workbox.strategies.NetworkFirst({
      cacheName: 'start-url',
      plugins: [
        {
          cacheWillUpdate: async ({ response }) => {
            if (response && response.type === 'opaqueredirect') {
              return new Response(response.body, {
                status: 200,
                statusText: 'OK',
                headers: response.headers,
              });
            }
            return response;
          },
        },
      ],
    }),
    'GET'
  );

  workbox.routing.registerRoute(
    /.*/,
    new workbox.strategies.NetworkOnly({
      cacheName: 'dev',
      plugins: [],
    }),
    'GET'
  );

  self.__WB_DISABLE_DEV_LOGS = true;

}));
