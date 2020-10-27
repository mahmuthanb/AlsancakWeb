import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard,redirectLoggedInTo,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard }},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
