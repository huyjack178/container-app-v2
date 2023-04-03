import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const activatedTime = Date.now();
document.addEventListener(
  'visibilitychange',
  function () {
    if (
      document.hidden === false &&
      Date.now() - activatedTime > 15 * 1000 * 60
    ) {
      location.reload();
    }
  },
  false
);
