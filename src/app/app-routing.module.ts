import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Oauth2callbackComponent } from "./oauth2callback/oauth2callback.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'oauth2callback', component: Oauth2callbackComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
