import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { InvitationComponent } from './content/invitation/invitation.component';
import { InvitationDetailComponent } from './content/invitation-detail/invitation-detail.component';
import { BannerComponent } from './banner/banner.component';
import { EmptyComponent } from './empty/empty.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'guestList', component: EmptyComponent },
  // {path: 'home', loadChildren: () => import('./content/home/home.component').then(mod => mod.HomeComponent)},
  // { path: 'invitation/:invitecode', component: InvitationDetailComponent },
  // { path: 'invitation', component: InvitationComponent },
  // { path: '', component: BannerComponent, outlet: 'banner' },
  // { path: 'home', component: BannerComponent, outlet: 'banner' },
  // { path: '**', component: EmptyComponent, outlet: 'banner' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
