import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {Home} from './components/home/home';
import {About} from './components/about/about';

@Component({
  selector: 'seed-app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/seed-app.html',
})
@Routes([
  { path: '/',       component: Home,       },
  { path: '/about',  component: About,      },
  ])
export class SeedApp {

  constructor() {}

}
