import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService , ReverseAuthGuardService } from './_guard/auth.guard';
import {PageNotFoundComponent} from '../app/page-not-found/page-not-found.component';
const routes: Routes = [{ path: '',
loadChildren: () => import('./dashboared/dashboared.module').then(m => m.DashboaredModule)},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
{ path: 'chat/:userId/:role', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
{ path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {  scrollPositionRestoration: 'enabled' , onSameUrlNavigation: `reload`   })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
