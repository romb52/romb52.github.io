import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: '404', component: ErrorComponent },
{ path: 'auth', component: AuthComponent },
{ path: '**', redirectTo: '404' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
