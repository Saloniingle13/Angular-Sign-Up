import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
{
  path: '',
  pathMatch: 'full',
  component:LandingComponent
},
{
  path:'login',
  component:LoginComponent,
  ...canActivate(redirectLoggedInToHome),
},
{
  path:'signup',
  component:SignUpComponent,
  ...canActivate(redirectLoggedInToHome),
},
{
  path:'home',
  component:HomeComponent,
  ...canActivate(redirectUnauthorizedToLogin),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
