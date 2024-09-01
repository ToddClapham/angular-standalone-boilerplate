import { Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { Oauth2callbackComponent } from './components/oauth2callback/oauth2callback.component';
import { MainComponent } from './components/main/main.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

export const routes: Routes = [
  { path: 'oauth2callback', component: Oauth2callbackComponent },

  { path: '', component: MainComponent, children: [

    { path: '', component: PlaceholderComponent },

    // Add more routes here

    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '/404' }
  ]},

];
