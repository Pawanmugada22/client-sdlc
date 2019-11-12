import { HomeComponent } from './login/home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SdlcComponent } from './sdlc/sdlc.component';
import { SettingsComponent } from './settings/settings/settings.component';


const routes: Routes = [
  { path: 'loginpage', component : LoginComponent },
  { path: 'staging' , component : HomeComponent },
  { path: '' , redirectTo: 'loginpage', pathMatch: 'full' },
  { path: 'home' , component : SdlcComponent },
  { path: 'settings' , component : SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
