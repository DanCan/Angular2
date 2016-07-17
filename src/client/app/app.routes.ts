import { provideRouter, RouterConfig } from '@angular/router';

import { HomeRoutes } from './+home/index';
import { AboutRoutes } from './+about/index';
import { AddNamesRoutes } from './+addnames/index';
import { CatchTheGameRoutes } from './+catchthegame/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...AddNamesRoutes,
  ...CatchTheGameRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
