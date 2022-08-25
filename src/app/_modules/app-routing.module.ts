import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressGuard } from '../guards/addressForm.guard';
import { ClientPageGuard } from '../guards/clientPage.guard';
import { IdentityGuard } from '../guards/identityForm.guard';
import { ClientAddressComponent } from '../pages/client-form/client-address/client-address.component';
import { ClientFormComponent } from '../pages/client-form/client-form.component';
import { ClientComponent } from '../pages/client-form/client/client.component';
import { IdentityComponent } from '../pages/client-form/identity/identity.component';
import { CreatedClientComponent } from '../pages/created-client/created-client.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'client-form',
    pathMatch: 'full' 
  },

  {
    path: 'client-form',
    component: ClientFormComponent,
    children: [
      {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full' 
       },
      {
        path: 'client',
        component: ClientComponent
       },
       {
        path: 'client-address',
        component: ClientAddressComponent,
        canActivate: [AddressGuard]
       },
       {
        path: 'identity',
        component: IdentityComponent,
        canActivate: [IdentityGuard]
       },
    ]
  },
  {
    path: 'created-client',
    component: CreatedClientComponent,
    canActivate: [ClientPageGuard]
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     // {
  //     //   path: 'home',
  //     //   canActivate: [AuthGuard],
  //     //   loadChildren: () => import('../pages/home/modules/home.module').then(m => m.HomeModule)
  //     // },
  //   ]
  // },

  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
